import pool from "../../database/database.js";

const createFilm = async (req, res) => {
  const { film_name, year } = req.body;
  const newFilm = await pool.query(
    `INSERT INTO kinopoisk_lite.films (film_name, year)
     VALUES ($1, $2)
     RETURNING *`,
    [film_name, year]
  );
  res.send({
    message: `Запись успешно создана`,
    data: newFilm.rows[0],
  });
};

export default createFilm;
