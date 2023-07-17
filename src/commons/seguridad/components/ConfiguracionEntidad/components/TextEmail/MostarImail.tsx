import { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { api } from "../../../../../../api/axios";

interface ISucursalEmpresa {
    id_persona_entidad: number;
    email_corporativo_sistema: string;
    fecha_inicio_dir_actual: string;
    fecha_inicio_coord_alm_actual: string;
    fecha_inicio_respon_trans_actual: string;
    fecha_inicio_coord_viv_actual: string;
    fecha_inicio_almacenista: string;
    id_persona_director_actual: number;
    id_persona_coord_almacen_actual: number;
    id_persona_respon_transporte_actual: number;
    id_persona_coord_viveros_actual: number;
    id_persona_almacenista: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEmail: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const initialState: ISucursalEmpresa = {
        id_persona_entidad: 3,
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

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataEntidad, setDataEntidad] = useState<ISucursalEmpresa>(initialState);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [emailValue, setEmailValue] = useState("");

    useEffect(() => {
        fetchData().catch((error) => {
            console.error(error);
        });
    }, []);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchData = async (): Promise<void> => {
        try {
            const url = "/transversal/configuracion/configuracionEntidad/3/";
            const res = await api.get(url);
            const facilidad_pago_data = res.data.data;
            setDataEntidad(facilidad_pago_data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleChangeEmail = (): void => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const updatedDataEntidad: ISucursalEmpresa = {
            ...dataEntidad,
            email_corporativo_sistema: emailValue,
        };

        const payload = {
            ...updatedDataEntidad,
        };

        api
            .put("transversal/configuracion/configuracionEntidad/update/3/", payload)
            .then((response) => {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const updatedEmail = response.data.email_corporativo_sistema;
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const updatedDataEntidadWithUpdatedEmail: ISucursalEmpresa = {
                    ...updatedDataEntidad,
                    email_corporativo_sistema: updatedEmail,
                };
                setDataEntidad(updatedDataEntidadWithUpdatedEmail);
                console.log("Datos actualizados correctamente");
            })
            .catch((error) => {
                console.error("Error al actualizar los datos:", error);
            });

        setEmailValue(""); // Limpiar el campo de texto después de enviar los datos
    };

    return (
        <Grid
            container
            sx={{
                position: "relative",
                background: "#FAFAFA",
                borderRadius: "15px",
                p: "10px",
                mb: "10px",
                boxShadow: "0px 3px 6px #042F4A26",
            }}
        >
            <Grid item xs={12}>
                <Grid container spacing={7}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: "10px" }}
                            label="Email"
                            fullWidth
                            value={emailValue}
                            onChange={(e)=>{ setEmailValue(e.target.value)}}
                        />
                        <Button onClick={handleChangeEmail}>Guardar</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                       
                        <TextField
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: "10px" }}
                            label="Confirmacion Email"
                            fullWidth
                          
                        />
                        <label>{dataEntidad.email_corporativo_sistema}</label>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
