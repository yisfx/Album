/// <reference types="node" />
export declare class HttpClient {
    constructor();
    get(url: string): Promise<string | string[] | Buffer | import("stream").Readable | Buffer[]>;
    private createClient;
}
