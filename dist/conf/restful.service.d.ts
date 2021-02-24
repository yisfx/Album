declare class Resuful {
    Method: "POST" | "GET";
    URL: string;
    Service: ServiceType;
}
declare enum ServiceType {
    Album = "Album"
}
declare const ServiceHost: {
    [key: string]: string;
};
declare const RestfulService: {
    [key: string]: Resuful;
};
export { RestfulService, ServiceHost };
