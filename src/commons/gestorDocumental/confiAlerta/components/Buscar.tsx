/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { BucacarEncuesta, BuscarProps } from '../interfaces/types';
import {Divider, Button, Dialog, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Title } from '../../../../components';
import { api } from '../../../../api/axios';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from "@mui/material";
import type React from 'react';


export const Buscar: React.FC<BuscarProps> = ({ handleClear, setSelectedEncuestaId, is_modal_active, set_is_modal_active, }) => {
    // const [encuestas, setEncuestas] = useState<BucacarEncuesta[]>([]);
    const [encuestas, setEncuestas] = useState<BucacarEncuesta[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const fetchEncuestas = async () => {
        try {
            const res = await api.get("/gestor/encuestas/encabezado_encuesta/get/");
            if (res.data.success) {
                setEncuestas(res.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handle_close = (): void => {
        set_is_modal_active(false);
    };

    useEffect(() => {
        fetchEncuestas();
    }, []);

    const handleSearch = async (): Promise<void> => {
        if (!searchTerm.trim()) {
            await fetchEncuestas();
            return;
        }

        const filteredEncuestas = encuestas.filter(encuesta =>
            encuesta.nombre_encuesta.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setEncuestas(filteredEncuestas);
    };
    useEffect(() => {
        fetchEncuestas(); // Llama a fetchEncuestas al montar el componente
    }, []);
    // const [selectedEncuestaId, setSelectedEncuestaId] = useState<number | null>(null); // Estado para almacenar el ID seleccionado

    const columns = [
        // { field: "id_encabezado_encuesta", headerName: "ID", width: 100 },
        { field: "nombre_encuesta", headerName: "Nombre de Encuesta", width: 300, },
        {
            field: "fecha_creacion", headerName: "Fecha de creación", width: 300, valueFormatter: (params: { value: string | number | Date; }) => {
                const date = new Date(params.value);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
                return formattedDate;
            },
        },

        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200,

            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        aria-label="Ver"
                        onClick={() => {
                            handleClear();
                            const id = params.row.id_encabezado_encuesta; // Obtener el ID de la fila seleccionada
                            setSelectedEncuestaId(id); // Almacenar el ID en el estado
                            handle_close();
                        }}
                    >
                        <PlaylistAddCheckIcon />
                    </IconButton>
                </>
            ),
        },
    ];
    const handleActualizarTabla = () => {
        fetchEncuestas();

    };

    return (
        <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl" >
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}  >
                    <Title title="Seleccione encuesta para ver los detalles de configuración  " />
                </Grid>
                {/* <h1>{selectedEncuestaId !== null ? `ID seleccionado: ${selectedEncuestaId}` : ''}</h1> Mostrar el ID seleccionado en el h1 */}
                <Grid item xs={12} marginTop={2} sm={3}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Buscar"

                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item marginTop={2} marginLeft={2} xs={12} sm={1.5}>
                    <Button variant="contained" color='primary' startIcon={<SearchIcon />} onClick={handleSearch}>
                        Buscar
                    </Button>
                </Grid>
                <Divider
                style={{
                    width: '100%',
                    marginTop: '8px',
                    marginBottom: '8px',
                    marginLeft: 'auto',
                }}
            />
                <Grid item xs={12} marginTop={2}>
                    <DataGrid
                        density="compact"
                        autoHeight
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        columns={columns}
                        rows={encuestas}
                        getRowId={(row) => row.id_encabezado_encuesta}
                    />
                </Grid>
                <Grid container spacing={2} justifyContent="flex-end" >
                    <Grid item xs={12} marginTop={2} sm={1.5}>
                        <Button variant="contained" color='error' onClick={handle_close} fullWidth startIcon={<ClearIcon />}>
                            Salir
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
};
