import { useState, useEffect } from "react";
import { TextField, Grid, Box } from "@mui/material";
import { api } from "../../../../../../api/axios";
import { Title } from "../../../../../../components/Title";
import { control_error, control_success } from "../../../SucursalEntidad/utils/control_error_or_success";
import type { IconfiguracionEntidad } from "../../interfaces/interfacesConEntidad";


// Propiedades que espera recibir el componente MostrarEmail
interface MostrarEmailProps {
    parametro: boolean; // Puedes ajustar el tipo de acuerdo a lo que esperas recibir
}

    // eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEmail: React.FC<MostrarEmailProps> = (props: MostrarEmailProps) => {
    // Estado inicial de los datos de la sucursal de la empresa
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const initialState: IconfiguracionEntidad = {
     email_corporativo_sistema: "",
        fecha_inicio_dir_actual: "",
        fecha_inicio_coord_alm_actual: "",
        fecha_inicio_respon_trans_actual: "",
        fecha_inicio_coord_viv_actual: "",
        fecha_inicio_almacenista: "",
        id_persona_director_actual: 0,
        id_persona_coord_almacen_actual: 0,
        id_persona_respon_transporte_actual: 0,
        id_persona_coord_viveros_actual: 0,
        id_persona_almacenista: 0,
    };

    // Estado para controlar la activación de la función handleChangeEmail
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [activador, setActivador] = useState<boolean>(false);

    // Estado para almacenar los datos de la sucursal de la empresa
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataEntidad, setDataEntidad] = useState<IconfiguracionEntidad>(initialState);

    // Estado para almacenar el valor del campo de email
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [emailValue, setEmailValue] = useState<string>("");

    // Estado para almacenar el valor del campo de confirmación de email
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [confirmEmailValue, setConfirmEmailValue] = useState<string>("");

    // Estado para controlar si los correos coinciden o están vacíos
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [emailMismatch, setEmailMismatch] = useState<boolean>(false);

    // Función para obtener los datos de la sucursal de la empresa mediante una solicitud a la API
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchDataGet = async (): Promise<void> => {
        try {
            const url = "/transversal/configuracion/configuracionEntidad/3/";
            const res = await api.get(url);
            const facilidad_pago_data = res.data.data;
            setDataEntidad(facilidad_pago_data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    // Función para manejar el cambio de email y la lógica de actualización
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleChangeEmail = (): void => {
        if (emailValue === confirmEmailValue && emailValue !== "") {
            // Los correos coinciden y no están vacíos, se realiza el PUT
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const updatedDataEntidad: IconfiguracionEntidad = {
                ...dataEntidad,
                id_persona_director_actual: 10,
            };

            const payload = {
                ...updatedDataEntidad,
            };

            api
                .put("transversal/configuracion/configuracionEntidad/update/3/", payload)
                .then((response) => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const updatedEmail = response.data.id_persona_director_actual;
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const updatedDataEntidadWithUpdatedEmail: IconfiguracionEntidad = {
                        ...updatedDataEntidad,
                        id_persona_director_actual: updatedEmail,
                    };
                    setDataEntidad(updatedDataEntidadWithUpdatedEmail);  
                    control_success("Datos actualizados correctamente");
                   
                })
                .catch((error:any) => {
                    // console.error("Error al actualizar los datos:", error);
                    control_error(error.response.data.detail)

                    
                });
            setActivador(false);
            // Recargar la página no es recomendable después de una actualización exitosa, esta línea debería eliminarse
             window.location.reload();
                   
        } else {
            // Los correos no coinciden o están vacíos
            setEmailMismatch(true);
            setActivador(false);
         
        }
    };

    // Efecto para activar el cambio de email cuando el valor de "activador" cambia
    useEffect(() => {
        if (props.parametro) {
            setActivador(true);
        }
    }, [props.parametro]);

    // Efecto para llamar a handleChangeEmail cuando "activador" es true y luego restablecerlo a false
    useEffect(() => {
        if (activador) {
            handleChangeEmail();
          
        }
        setActivador(false); // Restablecer el valor de activador después de la ejecución
    }, [activador]);

    // Efecto para obtener los datos de la sucursal de la empresa al cargar el componente
    useEffect(() => {
        fetchDataGet().catch((error) => {
            console.error(error);
        });
    }, []);

  

    return (
        <Grid
            container
            sx={{
                position: "relative",
                background: "#FAFAFA",
                borderRadius: "15px",
                p: "20px",
                mb: "20px",
                boxShadow: "0px 3px 6px #042F4A26",
            }}
        >
            <Grid item md={12} xs={12}>
                <Title title="Editar Correo" />
                <Box component="form" sx={{ mt: "20px" }} noValidate autoComplete="off">
                    <Grid item container spacing={7}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Email"
                                fullWidth
                                value={emailValue}
                                onChange={(e) => {
                                    setEmailValue(e.target.value);
                                    setEmailMismatch(false);
                                }}
                                error={emailMismatch} // Agregar el error prop
                                helperText={emailMismatch ? "Los correos no coinciden o están vacíos" : ""} // Agregar el mensaje de error
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Confirmar Email"
                                fullWidth
                                value={confirmEmailValue}
                                onChange={(e) => {
                                    setConfirmEmailValue(e.target.value);
                                    setEmailMismatch(false);
                                }}
                                error={emailMismatch}
                                helperText={emailMismatch ? "Los correos no coinciden o están vacíos" : ""}
                            />
                            
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};
