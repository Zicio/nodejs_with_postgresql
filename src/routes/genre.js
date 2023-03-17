import { Router } from "../framework/router.js";
import { genreController } from "../controllers/index.js";

export const genreRouter = new Router();

genreRouter.get("/genres", genreController.getGenres);

genreRouter.post("/genres", genreController.createGenre);

genreRouter.put("/genres", genreController.editGenre);

genreRouter.delete("/genres", genreController.deleteGenre);
