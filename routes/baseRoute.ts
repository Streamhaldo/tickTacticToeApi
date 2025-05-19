import { Router } from "express";

// Base class for routes
export abstract class BaseRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // Method to define routes, to be implemented in subclasses
  abstract routes(): void;
}
