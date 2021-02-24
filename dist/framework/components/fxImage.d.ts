import React from "react";
declare enum ImageType {
    Normal = 0,
    Album = 1
}
interface IProps extends React.ComponentProps<"img"> {
    name: string;
    type: ImageType;
    desc: string;
}
declare function FXImage(props: IProps): JSX.Element;
export { ImageType, FXImage };
