import getAllFilms from "./film/getAllFilms.js";
import getOneFilm from "./film/getOneFilm.js";
import createFilm from "./film/createFilm.js";
import deleteFilm from "./film/deleteFilm.js";
import editFilm from "./film/editFilm.js";

const filmController = {
  getAllFilms,
  getOneFilm,
  createFilm,
  deleteFilm,
  editFilm,
};

export default filmController;
