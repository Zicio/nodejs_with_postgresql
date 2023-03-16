import getFilms from "./film/getFilms.js";
import createFilm from "./film/createFilm.js";
import deleteFilm from "./film/deleteFilm.js";
import editFilm from "./film/editFilm.js";

const filmController = {
  getFilms,
  createFilm,
  deleteFilm,
  editFilm,
};

export default filmController;
