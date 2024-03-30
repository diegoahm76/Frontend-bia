/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';
import { api } from '../../../../../api/axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { VisorDocumento } from '../components/visorDocumento';
import { Registro } from '../interfaces/IAprobarDocumento';
import { handleActionClick } from '../AcionesFinalesUpDate/Update.service';
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom"; // Asumo que estás utilizando react-router
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';





export const AprobarDocumento = () => {

    const [nitFilter, setNitFilter] = useState<string>('');
    const [nombreFilter, setNombreFilter] = useState<string>('');
    const [aprobadoFilter, setAprobadoFilter] = useState<boolean|null>(false);
    const [data_table, set_data_tabla] = useState<Registro[]>([]);
    const navigate = useNavigate();
const [activador,set_activador]=useState(false);






    const columns = [
        {
            field: 'nit',
            headerName: 'Nit',
            flex: 1,
            renderCell: (params: any) => params.value,
        },
        {
            field: 'nombreRepresentanteLegal',
            headerName: 'Nombre Representante Legal',
            flex: 1,
            renderCell: (params: any) => params.value,
        },
        {
            field: 'tipoUsuario',
            headerName: 'Tipo Usuario',
            flex: 1,
            renderCell: (params: any) => params.value,
        },
        {
            field: 'razonSocial',
            headerName: 'Razon Social',
            flex: 1,
            renderCell: (params: any) => params.value,
        },
        {
            field: 'aprobado',
            headerName: 'Aprobado',
            flex: 1,
            renderCell: (params: any) => (
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: params.value ? 'green' : 'red',
                        color: 'white',
                        // Establece el radio de la esquina para hacerlo redondo
                        height: '36px', // Ajusta el tamaño según tus preferencias
                        padding: 0, // Elimina el relleno para que sea completamente redondo
                    }}
                >
                    {params.value ? 'Sí' : 'No'}
                </Button>
            ),
        },
        {
            field: 'captacionesMensualesAgua',
            headerName: 'Captaciones Mensuales',
            flex: 1,
            renderCell: (params: any) => {
                const periodosUso = params.value.map((fuente: any) => fuente.periodoUso);
                return periodosUso.join(', ');
            },
        },
        {
            field: 'informacionFuentesAbastecimiento',
            headerName: 'Fuentes Abastecimiento',
            flex: 1,
            renderCell: (params: any) => {
                const nombresFuentes = params.value.map((fuente: any) => fuente.nombreFuente);
                return nombresFuentes.join(', ');
            },
        },
        {
            field: 'ruta_archivo',
            headerName: 'Documento Anexo',
            width: 110,
            flex: 1,
            renderCell: (params: any) => (
              params.value ? (
                <DownloadButton
                  condition={false}
                  fileUrl={params.value.ruta_archivo}
                  fileName={params.value.nombre_de_Guardado}
                />
              ) : null
            ),
          },
          
        {
            field: 'acciones',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <Button

                        color="primary"
                        onClick={() => handleActionClick(params.row.id)}
                    >
                        <CheckCircleIcon />
                    </Button>


                    <VisorDocumento data_r={params.row} Actualizar_tabla={Actualizar_tabla} />
                </>
            ),
        },
    ];

    // const Peticion_Busqueda_Avanzada = async (): Promise<void> => {
    //     try {
    //         let url = '/recaudo/formulario/ver_formulario/';
    //         const res = await api.get(url, { params: { nit: nitFilter, nombreRepresentanteLegal: nombreFilter, aprobado: "false" } });
    //         const Data_consulta: Registro[] = res.data.data;
    //         set_data_tabla(Data_consulta);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const Peticion_Busqueda_Avanzada = async (): Promise<void> => {
        try {
            let url = '/recaudo/formulario/ver_formulario/';
            const res = await api.get(url);
            const Data_consulta: Registro[] = res.data.data;
    
            // Realiza la filtración en la data_table
            const dataFiltrada = Data_consulta.filter(item =>
                (aprobadoFilter === null || String(item.aprobado).includes(String(aprobadoFilter))) &&
                (nitFilter === '' || String(item.nit).includes(nitFilter)) &&
                (nombreFilter === '' || String(item.nombreRepresentanteLegal).includes(nombreFilter))
                // Puedes agregar más condiciones de filtrado aquí según tus necesidades
            );
    
            set_data_tabla(dataFiltrada);
        } catch (error) {
            console.error(error);
        }
        
    };
    
    
    const Actualizar_tabla = () => {
        Peticion_Busqueda_Avanzada();
        set_activador(!activador);
    };

    
    useEffect(() => {
        Peticion_Busqueda_Avanzada();
    }, [activador]);



    useEffect(() => {
        Peticion_Busqueda_Avanzada();
    }, [nitFilter, nombreFilter ,aprobadoFilter]);

    return (
        <>
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
                    <Title title="Aprobar Documento  " />
                </Grid>

                <Grid item xs={12} style={{ marginTop: 15 }}>
                    <TextField
                        label="Buscar por Nit"
                        variant="outlined"
                        size="medium"
                        value={nitFilter}
                        onChange={(e) => setNitFilter(e.target.value)}
                        style={{ marginRight: '10px' }}
                    />
                    <TextField
                        label="Buscar por Nombre Representante Legal"
                        variant="outlined"
                        size="medium"
                        style={{ marginRight: '10px' }}
                        value={nombreFilter}
                        onChange={(e) => setNombreFilter(e.target.value)}
                    />

                    {/* ... (Resto del código) */}
                    <FormControl variant="outlined" style={{ marginRight: '10px', minWidth: 120 }}>
                        <InputLabel id="aprobado-filter-label">Aprobado</InputLabel>
                        <Select
                            labelId="aprobado-filter-label"
                            id="aprobado-filter"
                            value={aprobadoFilter || ''}
                            onChange={(e) => setAprobadoFilter(e.target.value as boolean | null)}
                            label="Aprobado"
                        >
                           
                            <MenuItem value="true">Sí</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </Select>
                    </FormControl>




                    <Button variant="contained" color="primary" style={{height:60}} onClick={Actualizar_tabla}>
                        Buscar
                    </Button>
                </Grid>
                {/* ... (Resto del código) */}
                <Grid item xs={12}>
                    {/* ... (Resto del código) */}
                    <ButtonGroup
                        style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                    >
                        {/* ... (Resto del código) */}
                    </ButtonGroup>
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        rows={data_table || []}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={() => uuidv4()}
                    />
                </Grid>

                <Grid item container justifyContent="flex-end">
                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            startIcon={<ClearIcon />}
                            fullWidth
                            style={{ width: "90%", marginTop: 15 }}
                            variant="contained"
                            color="error"
                            onClick={() => {
                                navigate('/app/home');
                            }}
                        >
                            Salir
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

        </>
    );
};