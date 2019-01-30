import mangodb from 'mongoose';
import { Hideri } from '@maika.xyz/hideri';

export class Database {
    public logger: Hideri.Logger;

    constructor() {
        this.logger = Hideri.create();
    }

    public async connect() {
        this.logger.warn(`Connecting to MongoDB with ${(process.env.DB_URL || 'mongodb://localhost:27017/lolis')}...`);
        await mangodb.connect((process.env.DB_URL) as string, { useNewUrlParser: true });
        this.logger.info('Connected to the database!');
    }
}