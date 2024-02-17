/* eslint-disable @typescript-eslint/naming-convention */
import { useState, createContext, type SetStateAction, ReactNode } from "react";


interface inter_opcion_otros {
    opcion_otros: number,
    set_opcion_otros: React.Dispatch<SetStateAction<number>>
}

export const OpcionOtrosContext = createContext<inter_opcion_otros>({
    opcion_otros: 0,
    set_opcion_otros: () => { }
});

interface Inter_Son{
    children: ReactNode;
}

export const OpcionOtrosProvider = ({children}:Inter_Son): JSX.Element => {

    const [opcion_otros, set_opcion_otros] = useState<number>(5)

    const valueAlertas = {
        opcion_otros,
        set_opcion_otros

    }

    return (

        <OpcionOtrosContext.Provider value={valueAlertas}   >
            {children}
        </OpcionOtrosContext.Provider>

    )
}
