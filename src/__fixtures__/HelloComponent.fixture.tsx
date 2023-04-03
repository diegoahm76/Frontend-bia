interface Props {
    image:string
}

export const container_principal =({ image }: Props): JSX.Element => {
    return <img width={320} height="auto" src={image} className="rounded"/>
}