import pool from "../../database/database.js";

const getGenres = async (req, res) => {
  try {
    let genres;
    if (req.params.id) {
      genres = await pool.query(
        `SELECT genre_name
         FROM genres
         WHERE id = $1`,
        [req.params.id]
      );
      if (genres.rowCount === 0) {
        res.send({ message: `Запись с id ${req.params.id} не найдена` });
      } else {
        res.send({
          message: `Запись с id ${req.params.id} успешно найдена`,
          data: genres.rows[0],
        });
      }
    }
    if (!req.params.id) {
      genres = await pool.query(
        `SELECT genre_name
         FROM genres`
      );
      return res.send({
        message: "Все записи успешно загружены",
        data: genres.rows,
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
export default getGenres;
