import React, { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import {
    Button,
    Grid, TextField
} from "@mui/material";
import { Title } from "../../../../../../../components/Title";
import { BuscadorPersona } from "../../../../../../../components/BuscadorPersona";
import { control_error, control_success } from "../../../../SucursalEntidad/utils/control_error_or_success";
import { api } from "../../../../../../../api/axios";

interface ModalEditarCargoProps {
    name: string;
    fecha: string;
    titlee: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalEditarCargo: React.FC<ModalEditarCargoProps> = ({ name, fecha, titlee }) => {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = React.useState<boolean>(false);

    const footer_content = (
        <div>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { setVisible(false) }} >Salir</Button>
            <Button style={{ margin: 3 }} type="submit" variant="contained" onClick={() => { handleChangeEmail() }} color="success" >Guardar  </Button>
        </div>
    );

    const title = (<Title title={"Cambiar " + titlee + " Actual"} />);


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (): void => {
        setVisible(true);

    };


    interface Persona {
        id_persona: number;
        primer_nombre: string;
        segundo_nombre: string;
        primer_apellido: string;
        segundo_apellido: string;

        // Otras propiedades...
    }
    // const initialPersona: Persona = {
    //     id_persona: 0,
    //     primer_nombre: "",
    //     segundo_nombre: "",
    //     primer_apellido: "",
    //     segundo_apellido: "",
    //     // Otras propiedades... (si las hay)
    // };


    const [persona, set_persona] = useState<Persona | undefined>();

    const on_result = async (info_persona: Persona): Promise<void> => {
        set_persona(info_persona);

    }

    const {
        //   id_persona ,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido } = persona ?? {}; // Usar el operador de encadenamiento opcional (??) para manejar persona undefined

    const nombre_completo = `${primer_nombre ?? ""} ${segundo_nombre ?? ""} ${primer_apellido ?? ""} ${segundo_apellido ?? ""}`;
    const nombre = nombre_completo ?? "";


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [value, setValue] = useState<string>('');






    interface ISucursalEmpresa {
        email_corporativo_sistema: string | null;
        fecha_inicio_dir_actual: string | null;
        fecha_inicio_coord_alm_actual: string | null;
        fecha_inicio_respon_trans_actual: string | null;
        fecha_inicio_coord_viv_actual: string | null;
        fecha_inicio_almacenista: string | null;
        id_persona_director_actual: number;
        id_persona_coord_almacen_actual: number;
        id_persona_respon_transporte_actual: number;
        id_persona_coord_viveros_actual: number;
        id_persona_almacenista: number;
        observaciones_de_cambio_director: string;
        observaciones_de_cambio_coord_almacen: string;
        observaciones_de_cambio_respon_transporte: string;
        observaciones_de_cambio_coord_viveros: string;
        observaciones_de_cambio_almacenista: string;
    }

    // Inicialización de la variable personaEntidad con valores predeterminados
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const initialState: ISucursalEmpresa = {

        email_corporativo_sistema: null,
        fecha_inicio_dir_actual: null,
        fecha_inicio_coord_alm_actual: null,
        fecha_inicio_respon_trans_actual: null,
        fecha_inicio_coord_viv_actual: null,
        fecha_inicio_almacenista: null,
        id_persona_director_actual: 0,
        id_persona_coord_almacen_actual: 0,
        id_persona_respon_transporte_actual: 0,
        id_persona_coord_viveros_actual: 0,
        id_persona_almacenista: 0,
        observaciones_de_cambio_director: "",
        observaciones_de_cambio_coord_almacen: "",
        observaciones_de_cambio_respon_transporte: "",
        observaciones_de_cambio_coord_viveros: "",
        observaciones_de_cambio_almacenista: "",
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataEntidad, setDataEntidad] = useState<ISucursalEmpresa>(initialState);
    console.log(dataEntidad);
    console.log(1);
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    const [personaEntidad, setPersonaEntidad] = useState<Persona | undefined>();

    // Utilizando el hook useState para crear el estado personaEntidad y su función para actualizarlo
    // eslint-disable-next-line @typescript-eslint/naming-convention
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



    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleChangeEmail = (): void => {


        // eslint-disable-next-line @typescript-eslint/naming-convention
        const updatedDataEntidad: ISucursalEmpresa = {
            ...dataEntidad,
            email_corporativo_sistema: "jajajaajjaja",
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
                const datosActualizados: ISucursalEmpresa = {
                    ...updatedDataEntidad,
                    email_corporativo_sistema: updatedEmail,
                };
                setDataEntidad(datosActualizados);


                control_success("Datos actualizados correctamente");
                // mensaje();
            })
            .catch((error: any) => {
                // console.error("Error al actualizar los datos:", error);
                control_error(error.response.data.detail)


            });

    };

    useEffect(() => {
        fetchDataGet().catch((error) => {
            console.error(error);
        });
    }, []);


    return (
        <div>

            <Button
                style={{ margin: 3, marginTop: 10, marginRight: 10 }}
                color="primary"
                variant="contained"
                onClick={handleClick}
            >
                Cambiar
            </Button>
            <Dialog header={title} visible={visible} style={{ width: '50%' }} onHide={() => { setVisible(false) }} footer={footer_content}>
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >


                    <Grid item xs={12} sm={6} >

                        <TextField
                            style={{ width: "85%" }}
                            label="Director Actual"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={name}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} >

                        <TextField
                            style={{ width: "85%" }}
                            label="Fecha de registro"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={fecha}
                        />
                    </Grid>
                </Grid>

                <Title title={"Nuevo " + titlee} />
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >
                    <BuscadorPersona
                        onResult={(data) => {
                            void on_result(data);
                        }}
                    />

                    <Grid item xs={12} >

                        <TextField
                            style={{ margin: 6 }}
                            label="Nombre Completo"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={nombre}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            style={{ margin: 6, width: "100%" }}
                            label={`Observaciones del cambio de el  ${titlee}`}
                            id="description"
                            value={value}
                            onChange={(e: any): void => { setValue(e.target.value) }}
                        />

                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
};