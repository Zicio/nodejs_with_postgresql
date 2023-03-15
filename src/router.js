class Router {
  constructor() {
    this.endpoins = {};
  }

  request(method, path, controller) {
    if (!this.endpoins[path]) {
      this.endpoins[path] = {};
    }
    const endpoint = this.endpoins[path];
    if (endpoint[method]) {
      throw new Error(`${method} по адресу ${path} уже существует`);
    }
    endpoint[method] = controller;
    // TODO
  }
}
