/**
 * Ref: https://stackoverflow.com/questions/34673902/typescript-equivalent-to-dart-completer
 */

type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;
type PromiseRejectCallback = (error?: any, stackTrace?: string) => void;

export interface PromiseCompleter<R> {
    promise: Promise<R>;
    resolve: PromiseResolver<R>;
    reject: PromiseRejectCallback;
}

export class PromiseWrapper {
    static resolve<T>(obj: T): Promise<T> { return Promise.resolve(obj); }

    static reject(obj: any, _?: string): Promise<any> { return Promise.reject(obj); }

    // Note: We can't rename this method into `catch`, as this is not a valid
    // method name in Dart.
    static catchError<T>(promise: Promise<T>,
                         onError: (error: any) => T | PromiseLike<T>): Promise<T> {
        return promise.catch(onError);
    }

    static all(promises: any[]): Promise<any> {
        if (promises.length == 0) return Promise.resolve([]);
        return Promise.all(promises);
    }

    static then<T, U>(promise: Promise<T>, success: (value: T) => U | PromiseLike<U>,
                      rejection?: (error: any, stack?: any) => U | PromiseLike<U>): Promise<U> {
        return promise.then(success, rejection);
    }

    static wrap<T>(computation: () => T): Promise<T> {
        return new Promise((res, rej) => {
            try {
                res(computation());
            } catch (e) {
                rej(e);
            }
        });
    }

    static scheduleMicrotask(computation: () => any): void {
        PromiseWrapper.then(PromiseWrapper.resolve(null), computation, (_) => {});
    }

    static isPromise(obj: any): boolean { return obj instanceof Promise; }

    static completer<T>(): PromiseCompleter<T> {
        let resolve: PromiseResolver<T> = (_) => {};
        let reject: PromiseRejectCallback = (_, __) => {};

        let p = new Promise<T>(function(res, rej) {
            resolve = res;
            reject = rej;
        });

        return { promise: p, resolve: resolve, reject: reject };
    }
}