import { Router } from "../framework/router.js";

export const filmRouter = new Router();

const data = [{ name: "grib" }, { name: "abra" }];

filmRouter.get("/films", (req, res) => {
  res.send(data); // TODO
});

/*filmRouter.post("films", (req, res) => {
  const film = req.body;
  // res.end(JSON.stringify()) // TODO
});*/
