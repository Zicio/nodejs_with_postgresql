import url from "url";
import * as path from "path";
import dotenv from "dotenv";
import { Application } from "./framework/application.js";
import { jsonParse } from "./framework/middleware/jsonParse.js";
import routers from "./routes/index.js";
import urlParse from "./framework/middleware/urlParse.js";

const PORT = process.env.PORT || 5000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../config/.env") });

const app = new Application();
app.use(jsonParse);
app.use(urlParse(`http://localhost:${PORT}`));

app.addRouter(routers);

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
