import pool from "../../database/database.js";

const deleteFilm = async (req, res) => {
  const film = await pool.query(
    `DELETE
     FROM kinopoisk_lite.films
     WHERE id = $1`,
    [req.params.id]
  );
  if (film.rowCount === 0) {
    res.send({ message: `Запись с id ${req.params.id} не найдена` });
  } else {
    res.send({ message: `Запись с id ${req.params.id} успешно удалена` });
  }
};

export default deleteFilm;
