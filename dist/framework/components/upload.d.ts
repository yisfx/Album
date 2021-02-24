import React from "react";
declare class IProps {
    UploadUrl: string;
    Success: (response: any) => void;
}
export declare function Upload(props: React.PropsWithChildren<IProps>): JSX.Element;
export {};
