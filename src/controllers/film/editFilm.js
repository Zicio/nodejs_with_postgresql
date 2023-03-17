import pool from "../../database/database.js";

const editFilm = async (req, res) => {
  const client = await pool.connect();
  const { film_name, year, genres } = req.body;
  try {
    await client.query(`BEGIN`);
    const film = await client.query(
      `UPDATE films
       SET film_name = $1,
           year      = $2
       WHERE id = $3
       RETURNING *`,
      [film_name, year, req.params.id]
    );

    await client.query('DELETE FROM "film-genre" WHERE film_id = $1', [
      req.params.id,
    ]);

    const genresIdResult = await client.query(
      `SELECT id
       FROM genres
       WHERE genre_name = ANY ($1)`,
      [genres]
    );
    const genresIdArr = genresIdResult.rows.map((obj) => obj.id);

    const values = genresIdArr
      .map((id, index) => `($1, $${index + 2})`)
      .join(", ");
    const newFilm_genres = await client.query(
      `INSERT INTO "film-genre" (film_id, genre_id)
      VALUES
      ${values} RETURNING *`,
      [film.rows[0].id, ...genresIdArr]
    );
    await client.query(`COMMIT`);

    res.send({
      message: `Запись с id ${req.params.id} успешно изменена`,
      data: film.rows[0],
    });
  } catch (e) {
    await client.query(`ROLLBACK`);
    return res.send({
      message: `Произошла ошибка в изменении записи`,
      error: e.message,
    });
  } finally {
    client.release();
  }
};

export default editFilm;
