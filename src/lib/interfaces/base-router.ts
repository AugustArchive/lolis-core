import express from 'express';

export interface BaseRouter {
    run(): void;
    getRouter(): express.Router;
}