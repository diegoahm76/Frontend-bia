/* eslint-disable @typescript-eslint/naming-convention */

import { Dispatch, SetStateAction, createContext, useState } from 'react';


interface VariablesCreacionPlantilla{
nombre:string;
descripcion:string;
}
interface FormContextstate{

    form:VariablesCreacionPlantilla;
    set_form:Dispatch<SetStateAction<VariablesCreacionPlantilla>>
}
const valores_defecto:VariablesCreacionPlantilla ={
    nombre:"",
    descripcion:""
}
export const FormCreacionContext= createContext<FormContextstate>({
  form:valores_defecto,
  set_form:()=>{}
});

export const Form_provaider=({children}:any): JSX.Element =>{

const [form ,set_form]=useState<VariablesCreacionPlantilla>(valores_defecto);
console.log(form);


return(

    <FormCreacionContext.Provider value={{form,set_form}}>
        {children}
    </FormCreacionContext.Provider>
);



}