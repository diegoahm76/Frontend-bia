/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import ClearIcon from '@mui/icons-material/Clear';
import { Title } from '../../../../../components/Title';
import { api } from '../../../../../api/axios';
import { control_error, control_success } from '../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success';
import { confirmarAccion } from '../../../deposito/utils/function';
import { BasicRating } from '../../utils/checkboxMediosConfiguracion';
import SearchIcon from '@mui/icons-material/Search';
import { ModalBusquedaMediosSolicitudContext } from '../../context/pasarDatosEditar';
import { MedioSolicitud } from '../../interfaces/inerfacesMediosSolicitud';


export const MostrarModalBuscarMediosSolicitud: React.FC = () => {


    const { set_datos_editar } = useContext(ModalBusquedaMediosSolicitudContext);



    const [visible, setVisible] = useState<boolean>(false);
    const [checked, setChecked] = useState(false);
    const [checkedtramites, set_checkedtramites] = useState(false);
    const [checkedOtros, set_checkedOtros] = useState<boolean>(false);
    const [activo, set_activo] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [data_tabla, set_data_tabla] = useState<MedioSolicitud[]>([]);
    const [filteredData, setFilteredData] = useState<MedioSolicitud[]>([]); // Inicialmente, mostrar todos los datos
    const [activador_busqueda, set_activador_busqueda] = useState(false);
    const titulo = <Title title={`Busqueda`} />;

    const footerContent = (
        <div>
            <Button
                style={{ margin: 3 }}
                variant="contained"
                startIcon={<ClearIcon />}
                color="error"
                onClick={() => {
                    setVisible(false);
                }}
            >
                Salir
            </Button>
        </div>
    );

    const fetch_get_tabla = async (): Promise<void> => {
        try {
            const url = `/gestor/pqr/tipos_pqr/buscar-medio-solicitud/`;
            const res: any = await api.get(url);
            let numero_consulta: any = res.data.data;

            if (numero_consulta.length > 0) {
                set_data_tabla(numero_consulta);
                return numero_consulta;
            } else {
                set_data_tabla([]);
                return [] as any;
            }

        } catch (error) {
            console.error(error);
            set_data_tabla([]);
            return [] as any;
        }
    };


    const fetch_delete_registro = async (idRegistro: number): Promise<void> => {
        try {

            //  console.log('')(idRegistro)
            // Define la URL del servidor junto con el ID del registro que deseas eliminar
            const url = `/gestor/pqr/tipos_pqr/eliminar-medio-solicitud/${idRegistro}/`;

            // Realiza una solicitud HTTP DELETE al servidor
            const { data } = await api.delete(url);

            // Verifica si la eliminación se realizó con éxito
            control_success(data?.detail);

            // Realiza una nueva consulta para actualizar la tabla después de la eliminación
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
            width: 200,
        },
        {
            field: 'aplica_para_pqrsdf',
            headerName: 'Aplica para PQRSDF',
            width: 150,
            valueGetter: (params: any) => (params.row.aplica_para_pqrsdf ? 'Sí' : 'No'),
        },
        {
            field: 'aplica_para_tramites',
            headerName: 'Aplica para Trámites',
            width: 150,
            valueGetter: (params: any) => (params.row.aplica_para_tramites ? 'Sí' : 'No'),
        },
        {
            field: 'aplica_para_otros',
            headerName: 'Aplica para Otros',
            width: 150,
            valueGetter: (params: any) => (params.row.aplica_para_otros ? 'Sí' : 'No'),
        },
        {
            field: 'registro_precargado',
            headerName: 'Registro Precargado',
            width: 150,
            valueGetter: (params: any) => (params.row.registro_precargado ? 'Sí' : 'No'),
        },
        {
            field: 'activo',
            headerName: 'Activo',
            width: 100,
            valueGetter: (params: any) => (params.row.activo ? 'Sí' : 'No'),
        },
        {
            field: 'item_ya_usado',
            headerName: 'Item Ya Usado',
            width: 150,
            valueGetter: (params: any) => (params.row.item_ya_usado ? 'Sí' : 'No'),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 150,
            sortable: false,
            renderCell: (params: any) => {
                const idMedioSolicitud = params.row.id_medio_solicitud;
                const valor_actualizar = params.row;

                const handleDeleteClick = () => {
                    // Llama a la función de eliminación pasando el idMedioSolicitud como parámetro
                    fetch_delete_registro(idMedioSolicitud).then(() => {
                        fetch_get_tabla().then((data) => {
                            applyFilter(data);
                        })

                    })
                };


                return (
                    <>
                        <IconButton

                            onClick={() => {
                                void confirmarAccion(
                                    handleDeleteClick,
                                    '¿Estás seguro de eliminar  este campo?'
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
                                    () => { set_datos_editar(valor_actualizar); setVisible(false) },
                                    '¿Estás seguro de editar este campo?'
                                );
                            }}>
                            <EditIcon />
                        </IconButton>
                    </>
                );
            },
        },

    ];


    const applyFilter = (data: any = data_tabla) => {
        const filteredItems = data.filter((item: any) => {
            // Aplicar filtro por nombre
            const nombreMatch = item.nombre.toLowerCase().includes(inputValue.toLowerCase());

            // Aplicar filtro por checkedtramites
            const tramitesMatch = !checkedtramites || item.aplica_para_tramites;

            //Aplica filtro para pqrs
            const pqrsMatch = !checked || item.aplica_para_pqrsdf;
            // Aplicar filtro por checkedOtros
            const otrosMatch = !checkedOtros || item.aplica_para_otros;

            // Aplicar filtro por activo
            const activoMatch = !activo || item.activo;

            // Combinar todas las condiciones
            return nombreMatch && tramitesMatch && otrosMatch && activoMatch && pqrsMatch;
        });

        setFilteredData(filteredItems);
    };

    const handleAplicarFiltro = async () => {
        set_activador_busqueda(!activador_busqueda);
        fetch_get_tabla().then((data) => {
            applyFilter(data);
        })
        // La acción que quieras realizar después de aplicar el filtro.
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
        <div className="card flex justify-content-center">
            <Button
                fullWidth
                variant="contained"
                color='primary'
                startIcon={<SearchIcon />}
                onClick={() => {
                    setVisible(true);
                }}
            >
                buscar
            </Button>
            <Dialog
                header={titulo}
                visible={visible}
                style={{ width: '60%' }}
                closable={false}
                onHide={(): void => {
                    setVisible(false);
                }}
                footer={footerContent}
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
                    }}
                >




                    <Grid item container spacing={1} style={{ margin: 1 }}>
                        <Grid item xs={12} sm={4}>
                            <h5>Nombre del Medio de Solicitud:</h5>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={inputValue} // Establece el valor del TextField desde el estado
                                onChange={handleInputChange} // Configura el manejador de eventos onChange
                                style={{ marginTop: 9, width: '95%' }}
                            />

                        </Grid>
                    </Grid>



                    <Grid item xs={12} sm={6} md={3} style={{display:"flex",justifyContent:"center",marginTop: 10 }}>
                        <label htmlFor="ingredient4" className="ml-2">
                            Aplica para PQRSDF :
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} style={{ marginTop: 10 }}>
                        <BasicRating
                            isChecked={checked}
                            setIsChecked={setChecked}
                        />

                    </Grid>



                    <Grid item xs={12} sm={6} md={3} style={{display:"flex",justifyContent:"center",marginTop: 10}}>
                        <label htmlFor="ingredient4" className="ml-2">
                            Aplica para Tramites :
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} style={{ marginTop: 10 }}>
                        <BasicRating
                            isChecked={checkedtramites}
                            setIsChecked={set_checkedtramites}
                        />

                    </Grid>



                    <Grid item xs={12} sm={5.6} md={3} style={{display:"flex",justifyContent:"center",marginTop: 10,marginLeft:-8 }}>
                        <label htmlFor="ingredient4" className="ml-2">
                            Aplica para Otros:
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={2.5} style={{ marginTop: 10 }}>
                        <BasicRating
                            isChecked={checkedOtros}
                            setIsChecked={set_checkedOtros}
                        />

                    </Grid>




                    <Grid item xs={12} sm={6}  style={{display:"flex",justifyContent:"center",marginTop: 10}}>
                        <FormControl fullWidth size="small" style={{ width: "70%" }} >
                            <InputLabel id="activo">activo</InputLabel>
                            <Select
                                labelId="activo"
                                id="activo"
                                required
                                value={activo.toString()}
                                label="activo"
                                onChange={(e) => {
                                    set_activo(e.target.value === "true");
                                }}
                            >
                                <MenuItem value={"true"}>Sí</MenuItem>
                                <MenuItem value={"false"}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid container style={{display:"flex",justifyContent:"flex-end"}}>
                        <Button
                      
                            color='primary'
                            variant='contained'
                            startIcon={<SearchIcon />}
                            fullWidth
                            onClick={handleAplicarFiltro}

                            style={{ width: 150, marginTop: 14,marginRight:14 }}
                        >
                            Buscar
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            component="form"
                            sx={{ mt: '20px' }}
                            noValidate
                            autoComplete="off"
                        >
                            <DataGrid
                                density="compact"
                                autoHeight
                                columns={columns}
                                rows={filteredData}
                                pageSize={15}
                                rowsPerPageOptions={[10]}
                                getRowId={(row) => uuidv4()}
                            />

                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
};
