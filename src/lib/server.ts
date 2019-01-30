import express from 'express';
import { Hideri } from '@maika.xyz/hideri';
import { Database } from './database';
import { readdir } from 'fs';
import { Router } from './router';

export type LoliServerOptions = {
    port: number;
    routers: string;
    views: string;
    static: string;
}

export class LoliServer {
    public app: express.Application;
    public logger: Hideri.Logger;
    public database: Database;
    public port: number;
    public options: LoliServerOptions;

    constructor(options: LoliServerOptions) {
        this.options = Object.assign({}, options);
        this.port = options.port;
        this.app = express();
        this.logger = Hideri.create();
        this.database = new Database();

        // Freezes the options until another boot occured.
        Object.freeze(this.options);
        this.database.connect();
        this.startRouters()
            .startWebsite();
    }

    startRouters(): this {
        readdir(this.options.routers, (error: Error, files: string[]) => {
            if (error)
                this.logger.error(`Unable to build files:\n${error.stack}`);

            files.forEach(file => {
                const Sharp = require(`${this.options.routers}/${file}`);
                const router: Router = new Sharp();

                this.app.use(router.route, router.getRouter());
                this.logger.info(`Loaded ${router.route}.`);
            });
        });

        return this;
    }

    startWebsite(): this {
        this
            .app
            .set('view engine', 'ejs')
            .set('views', this.options.views)
            .use(express.static(this.options.static));

        return this;
    }

    start() {
        this.app.listen(this.options.port);
        this.logger.info(`Listening on port ${this.options.port}`);
    }
}