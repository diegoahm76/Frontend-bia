/* eslint-disable @typescript-eslint/naming-convention */
import { useState, createContext, type SetStateAction } from "react";


interface AlertasTypes {
    numeroDeAlertas: number,
    setNumeroDeAlertas: React.Dispatch<SetStateAction<number>>
}

export const AlertasContext = createContext<AlertasTypes>({
    numeroDeAlertas: 0,
    setNumeroDeAlertas: () => { }
});


export const AlertasProvider = ({ children }: any): JSX.Element => {

    const [numeroDeAlertas, setNumeroDeAlertas] = useState<number>(0)

    const valueAlertas = {
        numeroDeAlertas,
        setNumeroDeAlertas

    }

    return (

        <AlertasContext.Provider
            value={valueAlertas}
        >

            {children}
        </AlertasContext.Provider>

    )


}

