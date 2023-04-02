// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Props = {
    text: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HelloWorld = ({ text }: Props): JSX.Element =>{
    return (
        <h1>{text}</h1>
    );
}




