export declare class Album {
    Name: string;
    Cover: string;
    Date: string;
    Path: string;
    PicList: Picture[];
    Description: string;
}
export interface Picture {
    Name: string;
    MiniPath: string;
    MaxPath: string;
    OrgPath: string;
    Album: string;
}
