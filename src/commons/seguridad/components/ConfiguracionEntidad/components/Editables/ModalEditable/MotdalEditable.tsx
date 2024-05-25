/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { Dialog } from 'primereact/dialog';
import {
    Button,
    Grid, TextField
} from "@mui/material";
import { Title } from "../../../../../../../components/Title";
import { BuscadorPersona } from "../../../../../../../components/BuscadorPersona";
import { control_error, control_success } from "../../../../SucursalEntidad/utils/control_error_or_success";
import { api } from "../../../../../../../api/axios";
import type { ISucursalEmpresa } from "../../../interfaces/interfacesConEntidad";
import { ModificadorFormatoFecha } from "../../../utils/modificadorForematoFecha";
import EditIcon from '@mui/icons-material/Edit';
interface ModalEditarCargoProps {
    name: string;
    fecha: string;
    titlee: string;
    cod: number;
    onClick: () => void; // Prop para la función onClick del botón en el componente hijo
}
 interface Persona {
        id_persona: number;
        primer_nombre: string;
        segundo_nombre: string;
        primer_apellido: string;
        segundo_apellido: string;

    }

export const ModalEditarCargo: React.FC<ModalEditarCargoProps> = ({ name, fecha, titlee, cod, onClick }) => {

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


    const handleGuardarYPoner = (): void => {
        onClick();
        setVisible(false)
        setValue("");
        set_persona(undefined);
    };



    const [visible, setVisible] = React.useState<boolean>(false);

    const footer_content = (
        <div>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { handleGuardarYPoner() }} >Salir</Button>
            <Button style={{ margin: 3 }} type="submit" startIcon={<SaveIcon />}  variant="contained" onClick={() => { handleChangeEmail() }} color="success" >Guardar   </Button>

        </div>
    );

    const title = (<Title title={"Cambiar " + titlee + " Actual"} />);


    const handleClick = (): void => {
        setVisible(true);

    };


   
    const [persona, set_persona] = useState<Persona | undefined>();
    const [value, setValue] = useState<string>("");
    const [emailMismatch, setEmailMismatch] = useState<boolean>(false);
    const [dataEntidad, setDataEntidad] = useState<ISucursalEmpresa>(initialState);
    console.log(dataEntidad)
    const codigo = cod;

    const on_result = async (info_persona: Persona): Promise<void> => {
        set_persona(info_persona);
    }

    const {
        id_persona,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido } = persona ?? {}; // Usar el operador de encadenamiento opcional (??) para manejar persona undefined

    const nombre_completo = `${primer_nombre ?? ""} ${segundo_nombre ?? ""} ${primer_apellido ?? ""} ${segundo_apellido ?? ""}`;
    const nombre = nombre_completo ?? "";
    const id_personaa: number = id_persona ?? 0;


   

   
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
        let updatedDataEntidad: ISucursalEmpresa = { ...dataEntidad };
        if (value === "") {
            // alert("Ingrese un valor");
            setEmailMismatch(true);
            return;
        }
        setEmailMismatch(false);
        switch (codigo) {
            case 1:
                updatedDataEntidad = {
                    ...dataEntidad,
                    id_persona_director_actual: id_personaa,
                    observaciones_de_cambio_director: value,
                };

                break;

            case 2:
                updatedDataEntidad = {
                    ...dataEntidad,
                    id_persona_coord_almacen_actual: id_personaa,
                    observaciones_de_cambio_coord_almacen: value,
                };

                break;

            case 4:
                updatedDataEntidad = {
                    ...dataEntidad,
                    id_persona_coord_viveros_actual: id_personaa,
                    observaciones_de_cambio_coord_viveros: value,
                };

                break;

            case 3:
                updatedDataEntidad = {
                    ...dataEntidad,
                    id_persona_respon_transporte_actual: id_personaa,
                    observaciones_de_cambio_respon_transporte: value,
                };

                break;

            case 5:
                updatedDataEntidad = {
                    ...dataEntidad,
                    id_persona_almacenista: id_personaa,
                    observaciones_de_cambio_almacenista: value,
                };

                break;

            default:

                break;
        }

        const payload = {
            ...updatedDataEntidad,
        };

        api
            .put("transversal/configuracion/configuracionEntidad/update/3/", payload)
            .then((response) => {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const updatedEmail = response.data.id_persona_almacenista;
                // eslint-disable-next-line @typescript-eslint/naming-convention
                // const datosActualizados: ISucursalEmpresa = {
                //     ...updatedDataEntidad,
                //     id_persona_almacenista: updatedEmail,
                // };
                // setDataEntidad(datosActualizados);
                control_success("Cargo actualizado correctamente");
                setValue("");
                set_persona(undefined);
                setVisible(false);
                onClick();
            })
            .catch((error: any) => {

                // control_error(error.response.data.detail);
            });
    
        setDataEntidad(updatedDataEntidad);
        fetchDataGet();
    
        };
        
        useEffect(() => {
            fetchDataGet()
        },[])

    return (
        <div>

            <Button
                style={{ margin: 3, marginTop: 10, marginRight: 10 }}
                color="primary"
                startIcon={<EditIcon />}
                variant="contained"
                onClick={handleClick}
            >
                Editar
            </Button>
            <Dialog header={title} visible={visible} style={{ width: '50%' }} closable={false} onHide={() => { setVisible(false) }} footer={footer_content}>
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
                            value={ModificadorFormatoFecha(fecha)}
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
                            error={emailMismatch}
                            helperText={emailMismatch ? "El campo de observaciones esta vacio " : ""}
                        />

                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
};