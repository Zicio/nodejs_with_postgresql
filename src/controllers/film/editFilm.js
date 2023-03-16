import pool from "../../database/database.js";

const editFilm = async (req, res) => {
  const { film_name, year } = req.body;
  const film = await pool.query(
    `UPDATE kinopoisk_lite.films
     SET film_name = $1,
         year      = $2
     WHERE id = $3
     RETURNING *`,
    [film_name, year, req.params.id]
  );
  if (film.rowCount === 0) {
    res.send({ message: `Запись с id ${req.params.id} не найдена` });
  } else {
    res.send({
      message: `Запись с id ${req.params.id} успешно изменена`,
      data: film.rows[0],
    });
  }
};

export default editFilm;
