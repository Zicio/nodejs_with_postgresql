import getFilms from "./film/getFilms.js";
import createFilm from "./film/createFilm.js";
import deleteFilm from "./film/deleteFilm.js";
import editFilm from "./film/editFilm.js";
import getGenres from "./genre/getGenres.js";
import createGenre from "./genre/createGenre.js";
import deleteGenre from "./genre/deleteGenre.js";
import editGenre from "./genre/editGenre.js";

export const filmController = {
  getFilms,
  createFilm,
  deleteFilm,
  editFilm,
};

export const genreController = {
  getGenres,
  createGenre,
  deleteGenre,
  editGenre,
};
