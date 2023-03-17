import pool from "../../database/database.js";

const deleteFilm = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    await client.query(
      `
          DELETE
          FROM "film-genre"
          WHERE film_id = $1
      `,
      [req.params.id]
    );
    const film = await client.query(
      `
          DELETE
          FROM films
          WHERE id = $1
      `,
      [req.params.id]
    );
    await client.query(`COMMIT`);
    if (film.rowCount === 0) {
      res.send({ message: `Запись с id ${req.params.id} не найдена` });
    } else {
      res.send({ message: `Запись с id ${req.params.id} успешно удалена` });
    }
  } catch (e) {
    await client.query(`ROLLBACK`);
    return res.send({
      message: `Произошла ошибка в удалении записи`,
      error: e.message,
    });
  } finally {
    client.release();
  }
};

export default deleteFilm;
