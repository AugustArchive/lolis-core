// Typings package from @loli-services/core

declare module '@loli-services/core' {
    import express from 'express';
    import { Hideri } from '@maika.xyz/hideri';

    /**
     * The version of `@loli-services/core`
     */
    export const version: string;

    /**
     * Create a new instance of the Loli server class.
     * @param options The options to set
     * @returns The loli server instance
     */
    export function create(options: LoliServerOptions): LoliServer;

    /** The main of the core; the server. */
    export class LoliServer {
        constructor(options: LoliServerOptions);

        public app: express.Application;
        public database: Database;
        public options: LoliServerOptions;
        public logger: Hideri.Logger;
        public start(): void;
        public startRouters(): this;
        public startWebsite(): this;
    }

    /** The router class */
    export class Router implements BaseRouter {
        constructor(route: string);

        public route: string;
        public router: express.Router;
        public run(): void;
        public getRouter(): express.Router;
    }

    /** The database */
    export class Database {
        constructor();

        public logger: Hideri.Logger;
        public connect(): Promise<void>;
    }

    /**
     * The file exception class.
     * 
     * Only use this when a file exception has occured.
     */
    export class FileException {
        constructor(res: express.Response, req: express.Request);
        public build(): express.Response;
    }

    /** The base router interface */
    export interface BaseRouter {
        run(): void;
        getRouter(): express.Router;
    }

    /** The options type */
    export type LoliServerOptions = {
        port: number;
        routers: string;
        views: string;
        static: string;
    }
}