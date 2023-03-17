import pool from "../../database/database.js";

const getFilms = async (req, res) => {
  try {
    let films;
    if (req.params.id) {
      films = await pool.query(
        `SELECT film_name, year, genre_name
         FROM films
                  LEFT JOIN "film-genre"
                            ON "film-genre".film_id = films.id
                  LEFT JOIN genres
                            ON "film-genre".genre_id = genres.id
         WHERE films.id = $1`,
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
    if (!req.params.id) {
      films = await pool.query(`SELECT film_name, year, genre_name
                                FROM films
                                         LEFT JOIN "film-genre"
                                                   ON "film-genre".film_id = films.id
                                         LEFT JOIN genres
                                                   ON "film-genre".genre_id = genres.id

      `);
      return res.send({
        message: "Все записи успешно загружены",
        data: films.rows,
      });
    }
    res.end();
  } catch (e) {
    return res.send({
      message: `Произошла ошибка в загрузке записей`,
      error: e.message,
    });
  }
};

export default getFilms;
