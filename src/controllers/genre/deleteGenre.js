import pool from "../../database/database.js";

const deleteGenre = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    await client.query(
      `
          DELETE
          FROM "film-genre"
          WHERE genre_id = $1
      `,
      [req.params.id]
    );
    const genre = await client.query(
      `
          DELETE
          FROM genres
          WHERE id = $1
      `,
      [req.params.id]
    );
    await client.query(`COMMIT`);
    if (genre.rowCount === 0) {
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

export default deleteGenre;
