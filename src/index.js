import url from "url";
import * as path from "path";
import dotenv from "dotenv";
import * as http from "http";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../config/.env") });

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-type": "application/json",
  });
  res.end("Сервер рабоает");
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
