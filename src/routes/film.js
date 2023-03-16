import { Router } from "../framework/router.js";
import filmController from "../controllers/index.js";

export const filmRouter = new Router();

filmRouter.get("/films", filmController.getAllFilms);

/*filmRouter.post("films", (req, res) => {
  const film = req.body;
  // res.end(JSON.stringify()) // TODO
});*/
