import pool from "../../database/database.js";

const getFilms = async (req, res) => {
  let films;
  if (req.params.id) {
    films = await pool.query(
      `SELECT *
       FROM kinopoisk_lite.films
       WHERE id = $1`,
      [req.params.id]
    );
    if (films.rowCount === 0) {
      res.send({ message: `Запись с id ${req.params.id} не найдена` });
    } else {
      res.send({
        message: `Запись с id ${req.params.id} успешно найдена`,
        data: films.rows[0],
      });
    }
  }
  films = await pool.query(`SELECT *
                            FROM kinopoisk_lite.films `);

  return res.send(films.rows);
};

export default getFilms;
