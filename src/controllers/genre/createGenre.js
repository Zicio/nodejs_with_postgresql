import pool from "../../database/database.js";

const createGenre = async (req, res) => {
  try {
    const { genre_name } = req.body;
    const newGenre = await pool.query(
      `INSERT INTO genres (genre_name)
       VALUES ($1)
       RETURNING *`,
      [genre_name]
    );

    res.send({
      message: `Запись успешно создана`,
      data: newGenre.rows[0],
    });
  } catch (e) {
    return res.send({
      message: `Произошла ошибка в создании записи`,
      error: e.message,
    });
  }
};

export default createGenre;
