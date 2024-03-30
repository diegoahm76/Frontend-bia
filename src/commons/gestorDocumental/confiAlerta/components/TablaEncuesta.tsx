/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { IEncuesta, IProps } from '../interfaces/types';
import { Button, Divider, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Title } from '../../../../components';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from "@mui/material";
import type React from 'react';

export const TablaEncuesta: React.FC<IProps> = ({ handleClear, setSelectedEncuestaId, setShowContent, }) => {
    const [encuestas, setEncuestas] = useState<IEncuesta[]>([]);
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
    useEffect(() => {
        fetchEncuestas();
    }, []);

    const handleSearch = (): void => {
        if (!searchTerm.trim()) {
            fetchEncuestas();
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
        { field: "nombre_encuesta", headerName: "Nombre de encuesta", width: 300, flex: 1, },
        {
            field: "fecha_creacion", headerName: "Fecha creación", width: 300, flex: 1, valueFormatter: (params: { value: string | number | Date; }) => {
                const date = new Date(params.value);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
                return formattedDate;
            },
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        aria-label="Ver"
                        onClick={() => {
                            handleClear();
                            //  console.log('')(params.row)
                            const id = params.row.id_encabezado_encuesta; // Obtener el ID de la fila seleccionada
                            setSelectedEncuestaId(id); // Almacenar el ID en el estado
                        }}
                    >
                        <PlaylistAddCheckIcon />
                    </IconButton>
                </>
            ),
        },
    ];
    return (
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
                <Title title="Configuración de encuesta" />
            </Grid>
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
            <Grid item xs={5.3}>
            </Grid>
            <Grid item marginTop={2} xs={12} sm={2}>
                <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setShowContent(true)}>
                    Crear encuesta
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
                    autoHeight
                    pageSize={10}
                    columns={columns}
                    density="compact"
                    rowsPerPageOptions={[10]}
                    rows={encuestas}
                    getRowId={(row) => row.id_encabezado_encuesta}
                />
            </Grid>
        </Grid>
    );
};
