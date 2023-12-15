import { Database } from "better-sqlite3";
import path from 'path';
import { existsSync, copyFileSync, constants } from 'fs';
import { Env } from "./app";

type GlobalType = {
    projectRoot: string,
    db: Database,
    env: Env,
}

let myGlobal: GlobalType | undefined;

export const setGlobal = (payload: GlobalType) => {
    myGlobal = payload;
}

export const getGlobal = (): GlobalType => {
    return myGlobal!;
}