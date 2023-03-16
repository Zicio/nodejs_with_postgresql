import { Router } from "../framework/router.js";
import filmController from "../controllers/index.js";

export const filmRouter = new Router();

filmRouter.get("/films", filmController.getFilms);

filmRouter.post("/films", filmController.createFilm);

filmRouter.put("/films", filmController.editFilm);

filmRouter.delete("/films", filmController.deleteFilm);
