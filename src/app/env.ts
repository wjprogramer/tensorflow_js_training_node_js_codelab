import * as dotenv from 'dotenv';

export type Env = {
    FOO_ENV_KEY: string,
}

export const initEnv = (): Env => {
    dotenv.config();

    return {
        FOO_ENV_KEY: process.env.FOO_ENV_KEY!,
    };
}