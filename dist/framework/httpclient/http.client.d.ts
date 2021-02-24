export declare class HttpClient {
    constructor();
    get(url: string): Promise<unknown>;
    createClient<T>(api: string, req?: any): Promise<T>;
}
