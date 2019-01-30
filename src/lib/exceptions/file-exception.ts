import express from 'express';

export class FileException {
    public res: express.Response;
    public req: express.Request;

    constructor(res: express.Response, req: express.Request) {
        this.res = res;
        this.req = req;
    }

    /**
     * Sends the "file exception" error.
     * @returns The express response
     */
    public build(): express.Response {
        return this.res.status(500).json({
            success: false,
            message: 'Unable to process the file, try again later.'
        });
    }
}