import pool from "../../database/database.js";

const createFilm = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const { film_name, year, genres } = req.body;
    const newFilm = await client.query(
      `INSERT INTO films (film_name, year)
       VALUES ($1, $2)
       RETURNING *`,
      [film_name, year]
    );

    if (genres.length) {
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
        [newFilm.rows[0].id, ...genresIdArr]
      );
    }

    await client.query(`COMMIT`);

    res.send({
      message: `Запись успешно создана`,
      data: newFilm.rows[0],
    });
  } catch (e) {
    await client.query(`ROLLBACK`);
    return res.send({
      message: `Произошла ошибка в создании записи`,
      error: e.message,
    });
  } finally {
    client.release();
  }
};

export default createFilm;
