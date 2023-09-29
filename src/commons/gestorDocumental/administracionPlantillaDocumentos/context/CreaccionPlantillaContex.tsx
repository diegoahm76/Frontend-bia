/* eslint-disable @typescript-eslint/naming-convention */

import { Dispatch, SetStateAction, createContext, useState } from 'react';


interface VariablesCreacionPlantilla {
    nombre: string;
    descripcion: string;
    id_formato_tipo_medio: number|any;
    asociada_a_tipologia_doc_trd: boolean;
    cod_tipo_acceso: string;
    codigo_formato_calidad_asociado: string;
    version_formato_calidad_asociado: string;
    archivo: any;
    otras_tipologias:string;
    acceso_unidades:any[];
}
interface FormContextstate {

    form: VariablesCreacionPlantilla;
    set_form: Dispatch<SetStateAction<VariablesCreacionPlantilla>>
}
const valores_defecto: VariablesCreacionPlantilla = {
    nombre: "",
    descripcion: "",
    id_formato_tipo_medio: 1,
    asociada_a_tipologia_doc_trd: true,
    cod_tipo_acceso: "TC",
    codigo_formato_calidad_asociado: "",
    version_formato_calidad_asociado: "",
    archivo: null,
    otras_tipologias:"",
    acceso_unidades:[]
}
export const FormCreacionContext = createContext<FormContextstate>({
    form: valores_defecto,
    set_form: () => { }
});

export const Form_provaider = ({ children }: any): JSX.Element => {

    const [form, set_form] = useState<VariablesCreacionPlantilla>(valores_defecto);
    console.log(form);


    return (

        <FormCreacionContext.Provider value={{ form, set_form }}>
            {children}
        </FormCreacionContext.Provider>
    );



}