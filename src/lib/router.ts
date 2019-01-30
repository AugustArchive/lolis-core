import express from 'express';
import { BaseRouter } from './interfaces/base-router';

export class Router implements BaseRouter {
    public route: string;
    public router: express.Router;
    
    constructor(route: string) {
        this.route = route;
        this.router = express.Router();
        this.run();
    }

    public run() {
        throw new SyntaxError(`Router ${this.constructor.name} doesn't bind a run() function.`);
    }

    public getRouter(): express.Router {
        return this.router;
    }
}