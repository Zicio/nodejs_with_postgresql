export class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method = "GET", path, controller) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`${method} по адресу ${path} уже существует`);
    }
    endpoint[method] = controller;
  }

  get(path, controller) {
    this.request("GET", path, controller);
  }

  post(path, controller) {
    this.request("POST", path, controller);
  }

  put(path, controller) {
    this.request("PUT", path, controller);
  }

  delete(path, controller) {
    this.request("DELETE", path, controller);
  }
}
