/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import IconButton from '@mui/material/IconButton';
import { Title } from '../../../../components';
import { Button, Grid, } from '@mui/material';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import type React from 'react';
import AddIcon from '@mui/icons-material/Add';


interface IEncuesta {
    id_encabezado_encuesta: number;
    nombre_encuesta: string;
    fecha_creacion: string;
}
interface IProps {
    is_modal_active: boolean;
    setSelectedEncuestaId: any;
    handleClear: any;
    setShowContent: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaEncuesta: React.FC<IProps> = ({ handleClear, setSelectedEncuestaId, setShowContent, }) => {
    const [encuestas, setEncuestas] = useState<IEncuesta[]>([]);

    const fetchEncuestas = async () => {
        try {
            const res = await api.get("/gestor/encuestas/encabezado_encuesta/get/");
            if (res.data.success) {
                setEncuestas(res.data.data);
                console.log(setEncuestas);
                console.log("1111111111");
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchEncuestas(); // Llama a fetchEncuestas al montar el componente
    }, []);
    // const [selectedEncuestaId, setSelectedEncuestaId] = useState<number | null>(null); // Estado para almacenar el ID seleccionado

    const columns = [
        // { field: "id_encabezado_encuesta", headerName: "ID", width: 100 },
        { field: "nombre_encuesta", headerName: "Nombre de encuesta", width: 300, flex: 1, },
        {
            field: "fecha_creacion", headerName: "Fecha creacion", width: 300, flex: 1, valueFormatter: (params: { value: string | number | Date; }) => {
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
                <Title title="Configuracion de encuesta" />
            </Grid>
            <Grid item marginTop={2} xs={12} sm={1.6}>
              <Button startIcon={<AddIcon/>} variant="outlined" onClick={() => setShowContent(true)}>
                Crear encuesta
            </Button>   
            </Grid>
           
            <Grid item xs={12} marginTop={2}>
                <DataGrid
                    density="compact"
                    autoHeight
                    columns={columns}
                    rows={encuestas}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.id_encabezado_encuesta}
                />
            </Grid>


        </Grid>

    );
};
