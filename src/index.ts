import { LoliServer, LoliServerOptions } from './lib/server';

export function create(options: LoliServerOptions): LoliServer {
    return new LoliServer(options);
}

export * from './lib/server';
export * from './lib/router';
export * from './lib/database';
export * from './lib/exceptions/file-exception';
export * from './lib/interfaces/base-router';
export const version = '0.0.1';