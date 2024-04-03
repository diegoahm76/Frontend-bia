/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { control_error } from "./utils/control_error_or_success";
import { api } from "../../../../api/axios";
import { Title } from "../../../../components";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { IDataentidad } from "./utils/interfac";
 
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalEntidad: React.FC = () => {
    const initial_state_array: IDataentidad = {
        id_persona: 0,
        nombre_tipo_documento: "",
        numero_documento: "",
        digito_verificacion: "",
        razon_social: "",
    }; 
    const [data_entidad, setdata_entidad] = useState(initial_state_array);
    const { numero_documento,
        //  digito_verificacion,
        razon_social, nombre_tipo_documento } = data_entidad;
    const fetch_data = async (): Promise<void> => {
        const url = "transversal/configuracion/entidad/get/";
        try {
            const res = await api.get(url);
            setdata_entidad(res.data.data);

        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    }; 
    useEffect(() => {
        fetch_data().catch((error) => {
            console.error(error);
        });
    }, []); 
    return (
       <>
             
             <Title title="Sucursales de la entidad " />
               <Grid item xs={12} sm={3.5} > 
                <TextField
                    label="   Tipo Documento "
                    variant="outlined"
                    size="small"
                    disabled
                    fullWidth
                    value={nombre_tipo_documento.toString()}
                />
            </Grid>
            <Grid item xs={12} sm={3.5}  > 
                <TextField
                    label=" Num Documento "
                    variant="outlined"
                    size="small"
                    disabled
                    fullWidth
                    value={numero_documento.toString()}
                />
            </Grid>
            <Grid item xs={12} sm={3.5} >

                <TextField
                    label="Nombre"
                    variant="outlined"
                    size="small"
                    disabled
                    fullWidth
                    value={razon_social.toString()}
                />
            </Grid>
      
      </> 
    );
};