/* eslint-disable @typescript-eslint/naming-convention */
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Checkbox, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Tooltip, Typography } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { ModalBusquedaMediosSolicitudContext } from '../../context/pasarDatosEditar';
import { api } from '../../../../../api/axios';
import { control_error, control_success } from '../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success';
import { Title } from '../../../../../components/Title';
import { confirmarAccion } from '../../../deposito/utils/function';


interface ModalConfiguracionTipoMedioProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

export const ModalConfiguracionTipoMedio: React.FC<ModalConfiguracionTipoMedioProps> = ({ openModal, setOpenModal }:ModalConfiguracionTipoMedioProps) => {

    const [checked, setChecked] = useState<boolean>(false);
    const [checkedtramites, set_checkedtramites] = useState<boolean>(false);
    const [checkedOtros, set_checkedOtros] = useState<boolean>(false);
    const [activo, set_activo] = useState<boolean>(false);
    const [dataChoise, setDataChoise] = useState(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [id_medio_solicitud, set_id_medio_solicitud] = useState<number>(0);
    // const [openModal, setOpenModal] = useState<boolean>(false);

    const { datos_Editar } = useContext(ModalBusquedaMediosSolicitudContext);


    const fetch_crear_medio_solicitud = async () => {
        try {
            const url = '/gestor/pqr/tipos_pqr/crear-medio-solicitud/';
            const postData = {
                "nombre": inputValue,
                "aplica_para_pqrsdf": checked,
                "aplica_para_tramites": checkedtramites,
                "aplica_para_otros": checkedOtros,
                "activo": activo
            };
            const res = await api.post(url, postData);
            const numeroConsulta = res.data.data;
            setDataChoise(numeroConsulta);
            control_success("se creo correctamente");
        } catch (error: any) {

            control_error(error.response.data.detail);
        }
    };

    const fetch_actualizar_medio_solicitud = async () => {
        try {
            const url = `/gestor/pqr/tipos_pqr/actualizar-medio-solicitud/${id_medio_solicitud}/`;
            const putData = {
                "nombre": inputValue,
                "aplica_para_pqrsdf": checked,
                "aplica_para_tramites": checkedtramites,
                "aplica_para_otros": checkedOtros,
                "activo": activo
            };

            const res = await api.put(url, putData);
            control_success(`El medio con Id: ${id_medio_solicitud} se actualizó correctamente `);
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };

    const limpiar_datos = () => {
        setChecked(false);
        setInputValue("");
        set_checkedOtros(false);
        set_activo(false);
        set_checkedtramites(false);
        set_id_medio_solicitud(0);
    };

    const handleInputChange = (e: any): void => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (datos_Editar) {
            setInputValue(datos_Editar.nombre)
            set_checkedtramites(datos_Editar.aplica_para_tramites);
            set_checkedOtros(datos_Editar.aplica_para_otros);
            setChecked(datos_Editar.aplica_para_pqrsdf);
            set_activo(datos_Editar.activo === true ? true : false);
            set_id_medio_solicitud(datos_Editar.id_medio_solicitud);
        }

    }, [datos_Editar])


    return (

        <>

            <Button variant="contained" onClick={() => setOpenModal(true)}>Abrir Modal</Button>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Grid
                    container
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px',
                        mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                        maxWidth: '60vw', // Cambia el ancho máximo del modal según tus necesidades
                        maxHeight: '80vh', // Establece la altura máxima del modal
                        overflowY: 'auto' // Permite que el contenido sea desplazable verticalmente si excede la altura máxima
                    }}
                >
                    <Grid item xs={12}>
                        <Title title="Tipos de Medios de Solicitud" />
                    </Grid>

                    <Grid item container spacing={1} style={{ margin: 1 }}>

                        <Grid item xs={12}>
                            <TextField
                                label="Nombre del Medio de Solicitud"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={inputValue} // Establece el valor del TextField desde el estado
                                onChange={handleInputChange} // Configura el manejador de eventos onChange
                                style={{ marginTop: 9, width: '100%' }}
                            />

                        </Grid>
                    </Grid>








                    <Grid item xs={12} sm={6} md={3} container alignItems="center" spacing={2} style={{ marginTop: 15 }}>
                        <Grid item>
                            <Checkbox
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                color="primary"
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="aplicaPQRSDF" className="ml-2">
                                Aplica para PQRSDF
                            </label>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} container alignItems="center" spacing={2} style={{ marginTop: 15 }}>
                        <Grid item>
                            <Checkbox
                                checked={checkedtramites}
                                onChange={(e) => set_checkedtramites(e.target.checked)}
                                color="primary"
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="aplicaTramites" className="ml-2">
                                Aplica para Trámites
                            </label>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} container alignItems="center" spacing={2} style={{ marginTop: 15 }}>
                        <Grid item>
                            <Checkbox
                                checked={checkedOtros}
                                onChange={(e) => set_checkedOtros(e.target.checked)}
                                color="primary"
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="aplicaOtros" className="ml-2">
                                Aplica para Otros
                            </label>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} container alignItems="center" spacing={2} style={{ marginTop: 15 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="activo">Activo</InputLabel>
                                <Select
                                    labelId="activo"
                                    id="activo"
                                    required
                                    value={activo.toString()}
                                    label="Activo"
                                    onChange={(e) => {
                                        set_activo(e.target.value === "true");
                                    }}
                                >
                                    <MenuItem value={"true"}>Sí</MenuItem>
                                    <MenuItem value={"false"}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>



                    <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: 20 }}>
                        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                            <Button
                                startIcon={<SaveIcon />}
                                onClick={() => {
                                    if (id_medio_solicitud === 0 || id_medio_solicitud === undefined) {
                                        void confirmarAccion(
                                            fetch_crear_medio_solicitud, // Llama a la función de creación si no hay datos_Editar
                                            '¿Estás seguro de crear este campo?'
                                        );
                                    } else {
                                        void confirmarAccion(
                                            fetch_actualizar_medio_solicitud, // Llama a la función de actualización si hay datos_Editar
                                            '¿Estás seguro de actualizar este campo?'
                                        );
                                    }
                                }}
                                color={id_medio_solicitud === 0 || id_medio_solicitud === undefined ? 'success' : 'success'} // Cambia el color según si es una actualización o creación
                                fullWidth
                                variant="contained"
                            >
                                {id_medio_solicitud === 0 || id_medio_solicitud === undefined ? 'Guardar' : 'Actualizar'}
                            </Button>
                        </Grid>




                        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                            <Button color='primary' variant="outlined" onClick={limpiar_datos} fullWidth startIcon={<CleanIcon />}>
                                Limpiar
                            </Button>
                        </Grid>
                       

                    </Grid>
                </Grid>
            </Modal>


        </>

    );
};