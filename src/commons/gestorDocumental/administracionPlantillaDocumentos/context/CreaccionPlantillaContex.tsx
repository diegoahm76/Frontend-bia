/* eslint-disable @typescript-eslint/naming-convention */

import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { VariablesCreacionPlantilla } from '../interfaces/interfacesAdministradorPlantillas';



interface FormContextstate {

    form: VariablesCreacionPlantilla;
    set_form: Dispatch<SetStateAction<VariablesCreacionPlantilla>>
}
export const valores_defecto: VariablesCreacionPlantilla = {
    borrar_text:0,
    id_actualizar:0,
    nombre: "",
    descripcion: "",
    id_formato_tipo_medio: 1,
    asociada_a_tipologia_doc_trd: "True",
    cod_tipo_acceso: '',
    codigo_formato_calidad_asociado: "",
    version_formato_calidad_asociado: "",
    archivo: null,
    otras_tipologias:"",
    acceso_unidades:[],
    acceso_unidades_dos:[],
    observacion:"",
    activa:false,
    id_tipologia_doc_trd:0,
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