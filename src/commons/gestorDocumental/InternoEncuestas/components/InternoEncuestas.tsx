/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IProps, AsignacionEncuestaUsuario, miEstilo } from '../interfaces/types';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Button, ButtonGroup, Divider, Grid, } from '@mui/material';
import { AuthSlice } from '../../../auth/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Title } from '../../../../components';
import { TextField } from '@material-ui/core';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type React from 'react';


export const TablaEncuestaInterno: React.FC<IProps> = ({ selectedEncuestaId, setSelectedEncuestaId }) => {
    const { userinfo: { id_persona } } = useSelector((state: AuthSlice) => state.auth);

    const [asignaciones, setAsignaciones] = useState<AsignacionEncuestaUsuario[]>([]);
    const cargarAsignaciones = async () => {
        try {
            const response = await api.get(`/gestor/encuestas/asignacion_encuesta_usuario/get/${id_persona}/`);
            if (response.data.success) {
                setAsignaciones(response.data.data);
            }
        } catch (error) {
            console.error('Error al cargar las asignaciones', error);
        }
    };
    useEffect(() => {


        cargarAsignaciones();
    }, []);
    // const [selectedEncuestaId, setSelectedEncuestaId] = useState<number | null>(null);

    const columns = [
        { field: 'id_asignar_encuesta', headerName: 'Asignación', width: 200, flex: 1 },
        { field: 'nombre_completo', headerName: 'Nombre Completo', width: 200, flex: 1 },
        { field: 'nombre_encuesta', headerName: 'Nombre Encuesta', width: 200, flex: 1 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200, flex: 1,

            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        aria-label="Ver"
                        onClick={() => {

                            const id = params.row.id_encuesta; // Obtener el ID de la fila seleccionada
                            setSelectedEncuestaId(id); // Almacenar el ID en el estado
                        }}
                    >
                        <PlaylistAddCheckIcon />
                    </IconButton>
                </>
            ),
        },
    ];
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (): void => {
        if (!searchTerm.trim()) {
            cargarAsignaciones();
            return;
        }

        const filteredEncuestas = asignaciones.filter(asignaciones =>
            asignaciones.nombre_encuesta.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setAsignaciones(filteredEncuestas);
    };
    return (
        <Grid container
            item xs={12} spacing={2} marginLeft={2} marginRight={2} marginTop={3}
            sx={miEstilo}
        >
            <Title title="Encuestas a realizar" />


            <Grid item xs={12} marginTop={2} sm={3}>
                <TextField
                    fullWidth
                    size="small"
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Grid>
            <Grid item marginTop={2} marginLeft={2} xs={12} sm={1.5}>
                <Button variant="contained" color='primary' startIcon={<SearchIcon />} onClick={handleSearch}>
                    Buscar
                </Button>
            </Grid>
            <Grid item xs={5.3}  ></Grid>
            <Grid item xs={12} sm={2} >
                <ButtonGroup style={{ margin: 5, }}>
                    {download_xls({ nurseries: asignaciones, columns })}
                    {download_pdf({
                        nurseries: asignaciones,
                        columns,
                        title: 'Mis alertas',
                    })}
                </ButtonGroup>
            </Grid>

            <Divider
                style={{
                    width: '98%',
                    marginTop: '8px',
                    marginBottom: '8px',
                    marginLeft: 'auto',
                }}
            />
            <Grid container item xs={12} marginTop={-1} >
                <DataGrid
                    autoHeight
                    pageSize={10}
                    density="compact"
                    columns={columns}
                    rows={asignaciones || []}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.id_asignar_encuesta}
                />
            </Grid>

            {/* <h1>{selectedEncuestaId}</h1> */}

        </Grid>
    );
};
