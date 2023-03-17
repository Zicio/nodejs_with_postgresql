import pool from "../../database/database.js";

const editGenre = async (req, res) => {
  try {
    const { genre_name } = req.body;
    const genre = await pool.query(
      `UPDATE genres
       SET genre_name = $1
       WHERE id = $2
       RETURNING *`,
      [genre_name, req.params.id]
    );

    if (genre.rowCount === 0) {
      res.send({ message: `Запись с id ${req.params.id} не найдена` });
    } else {
      res.send({ message: `Запись с id ${req.params.id} успешно изменена` });
    }
  } catch (e) {
    return res.send({
      message: `Произошла ошибка в изменении записи`,
      error: e.message,
    });
  }
};

export default editGenre;
