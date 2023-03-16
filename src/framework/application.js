import { EventEmitter } from "events";
import http from "http";

export class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  addRouter(routers) {
    for (const router of routers) {
      Object.keys(router.endpoints).forEach((path) => {
        const endpoint = router.endpoints[path];
        Object.keys(endpoint).forEach((method) => {
          this.emitter.on(this._getRouteMask(path, method), (req, res) => {
            const controller = endpoint[method];
            controller(req, res);
          });
        });
      });
    }
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        if (body) {
          req.body = JSON.parse(body);
        }
      });
      this.middlewares.forEach((middleware) => middleware(req, res));
      const emitted = this.emitter.emit(
        this._getRouteMask(req.pathname, req.method),
        req,
        res
      );
      if (!emitted) {
        res.end();
      }
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}
