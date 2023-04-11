// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Props = {
    text: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HelloWorld: React.FC<Props> = ({ text }: Props) =>{
    return (
        <h1>{text}</h1>
    );
}