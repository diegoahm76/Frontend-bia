/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect, useState } from 'react';
import CleanIcon from '@mui/icons-material/CleaningServices';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    CircularProgress,
    Checkbox,
    ButtonGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import ClearIcon from '@mui/icons-material/Clear';
import { Title } from '../../../../../components/Title';
import { api } from '../../../../../api/axios';
import { control_error, control_success } from '../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success';
import { confirmarAccion } from '../../../deposito/utils/function';
import SearchIcon from '@mui/icons-material/Search';
import { ModalBusquedaMediosSolicitudContext } from '../../context/pasarDatosEditar';
import { MedioSolicitud } from '../../interfaces/inerfacesMediosSolicitud';
import { BotonInformativo } from '../../../TramitesServicios/JuridicaTramites/utils/BotonInformativo';
import Chip from '@mui/material/Chip';
import { ModalConfiguracionTipoMedio } from '../../screens/ModalConfiguracionTipoMedio/ModalConfiguracionTipoMedio';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
interface ModalConfiguracionTipoMedioProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

export const MostrarModalBuscarMediosSolicitud: React.FC<ModalConfiguracionTipoMedioProps> = ({ openModal, setOpenModal }: ModalConfiguracionTipoMedioProps) => {
    const { set_datos_editar } = useContext(ModalBusquedaMediosSolicitudContext);

    const [checked, setChecked] = useState(false);
    const [checkedtramites, set_checkedtramites] = useState(false);
    const [checkedOtros, set_checkedOtros] = useState<boolean>(false);
    const [activo, set_activo] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [data_tabla, set_data_tabla] = useState<MedioSolicitud[]>([]);
    const [filteredData, setFilteredData] = useState<MedioSolicitud[]>([]);
    const [activador_busqueda, set_activador_busqueda] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);



    const fetch_get_tabla = async (): Promise<void> => {
        try {
            setLoading(true);
            const url = `/gestor/pqr/tipos_pqr/buscar-medio-solicitud/`;
            const res: any = await api.get(url);
            let numero_consulta: any = res.data.data;

            if (numero_consulta.length > 0) {
                set_data_tabla(numero_consulta);
                setLoading(false);
                return numero_consulta;
            } else {
                set_data_tabla([]);
                setLoading(false);
                return [] as any;
            }

        } catch (error) {
            console.error(error);
            set_data_tabla([]);
            setLoading(false);
            return [] as any;
        }
    };

    const fetch_delete_registro = async (idRegistro: number): Promise<void> => {
        try {
            const url = `/gestor/pqr/tipos_pqr/eliminar-medio-solicitud/${idRegistro}/`;
            const { data } = await api.delete(url);
            control_success(data?.detail);
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };

    const handleInputChange = (e: any): void => {
        setInputValue(e.target.value);
    };

    const columns = [
        {
            field: 'nombre',
            headerName: 'Nombre',
            flex: 1,
        },
        {
            field: 'aplica_para_pqrsdf',
            headerName: 'Aplica para PQRSDF',
            flex: 1,
            renderCell: (params: any) => (
                <Chip label={params.row.aplica_para_pqrsdf ? 'Sí' : 'No'} color={params.row.aplica_para_pqrsdf ? 'success' : 'error'} />
            ),
        },
        {
            field: 'aplica_para_tramites',
            headerName: 'Aplica para Trámites',
            flex: 1,
            renderCell: (params: any) => (
                <Chip label={params.row.aplica_para_tramites ? 'Sí' : 'No'} color={params.row.aplica_para_tramites ? 'success' : 'error'} />
            ),
        },
        {
            field: 'aplica_para_otros',
            headerName: 'Aplica para Otros',
            flex: 1,
            renderCell: (params: any) => (
                <Chip label={params.row.aplica_para_otros ? 'Sí' : 'No'} color={params.row.aplica_para_otros ? 'success' : 'error'} />
            ),
        },
        {
            field: 'registro_precargado',
            headerName: 'Registro Precargado',
            flex: 1,
            renderCell: (params: any) => (
                <Chip label={params.row.registro_precargado ? 'Sí' : 'No'} color={params.row.registro_precargado ? 'success' : 'error'} />
            ),
        },
        {
            field: 'activo',
            headerName: 'Activo',
            flex: 1,
            renderCell: (params: any) => (
                <Chip label={params.row.activo ? 'Sí' : 'No'} color={params.row.activo ? 'success' : 'error'} />
            ),
        },
        {
            field: 'item_ya_usado',
            headerName: 'Item Ya Usado',
            flex: 1,
            renderCell: (params: any) => (
                <Chip label={params.row.item_ya_usado ? 'Sí' : 'No'} color={params.row.item_ya_usado ? 'success' : 'error'} />
            ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            flex: 1,
            sortable: false,
            renderCell: (params: any) => {
                const idMedioSolicitud = params.row.id_medio_solicitud;
                const valor_actualizar = params.row;

                const handleDeleteClick = () => {
                    fetch_delete_registro(idMedioSolicitud).then(() => {
                        fetch_get_tabla().then((data) => {
                            applyFilter(data);
                        });
                    });
                };

                return (
                    <>
                        <IconButton
                            onClick={() => {
                                void confirmarAccion(
                                    handleDeleteClick,
                                    '¿Estás seguro de eliminar este campo?'
                                );
                            }}
                        >
                            <DeleteIcon style={{ color: "red" }} />
                        </IconButton>

                        <IconButton
                            color="primary"
                            aria-label="Editar"
                            onClick={() => {
                                void confirmarAccion(
                                    () => { set_datos_editar(valor_actualizar); setOpenModal(true) },
                                    '¿Estás seguro de editar este campo?'
                                );
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </>
                );
            },
        },
    ];


    const applyFilter = (data: any = data_tabla) => {
        const filteredItems = data.filter((item: any) => {
            const nombreMatch = item.nombre.toLowerCase().includes(inputValue.toLowerCase());
            const tramitesMatch = !checkedtramites || item.aplica_para_tramites;
            const pqrsMatch = !checked || item.aplica_para_pqrsdf;
            const otrosMatch = !checkedOtros || item.aplica_para_otros;
            const activoMatch = !activo || item.activo;
            return nombreMatch && tramitesMatch && otrosMatch && activoMatch && pqrsMatch;
        });

        setFilteredData(filteredItems);
    };

    const limpiarDatos = () => {
        // Limpiar los estados de los campos y los datos filtrados
        setInputValue('');
        setChecked(false);
        set_checkedtramites(false);
        set_checkedOtros(false);
        set_activo(false);
        setFilteredData([]);
    };

    const handleAplicarFiltro = async () => {
        set_activador_busqueda(!activador_busqueda);
        fetch_get_tabla().then((data) => {
            applyFilter(data);
        });
    };

    useEffect(() => {
        fetch_get_tabla().catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        fetch_get_tabla().catch((error) => {
            console.error(error);
        });
    }, [activador_busqueda]);

    return (
        <div>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >

                <Grid item xs={12}>
                    <Title title="Edicio de Tipos de Medios de Solicitud" />
                </Grid>

                <Grid container justifyContent="flex-end">
                    <BotonInformativo texto="Este módulo permite identificar los diferentes tipos de medios por los cuales se radican las solicitudes a la corporación, y clasificarlos según su categoría específica." />
                </Grid>


                <Grid item container spacing={1} style={{ margin: 1 }}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Nombre del Medio de Solicitud"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
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










                <Grid container style={{ display: "flex", justifyContent: "flex-end" }} spacing={2}>
                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>

                        <ModalConfiguracionTipoMedio openModal={openModal} setOpenModal={setOpenModal} />
                    </Grid>

                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            color='primary'
                            variant="outlined"
                            onClick={limpiarDatos}
                            fullWidth
                            startIcon={<CleanIcon />}
                            style={{ flex: 1, marginTop: 14, marginRight: 14 }}

                        >
                            Limpiar
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            color='primary'
                            variant='contained'
                            startIcon={<SearchIcon />}
                            fullWidth
                            onClick={handleAplicarFiltro}
                            style={{ flex: 1, marginTop: 14, marginRight: 14 }}
                        >
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center" >
                    <Grid item  >
                        <ButtonGroup style={{ marginTop: 15, }}>
                            {download_xls({ nurseries: filteredData, columns })}
                            {download_pdf({
                                nurseries: filteredData,
                                columns,
                                title: 'Solicitudes realizadas',
                            })}
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        component="form"
                        // sx={{ mt: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <DataGrid
                                density="compact"
                                autoHeight
                                columns={columns}
                                rows={filteredData}
                                pageSize={15}
                                rowsPerPageOptions={[10]}
                                getRowId={(row) => uuidv4()}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};
