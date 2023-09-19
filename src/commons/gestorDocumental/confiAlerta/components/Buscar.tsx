/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Dialog, Grid, } from '@mui/material';
import type React from 'react';
import { useState, type Dispatch, type SetStateAction, useEffect } from 'react';
import { Title } from '../../../../components';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { api } from '../../../../api/axios';



interface IEncuesta {
    id_encabezado_encuesta: number;
    nombre_encuesta: string;
    fecha_creacion: string;
}
interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Buscar: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, }) => {
    const [encuestas, setEncuestas] = useState<IEncuesta[]>([]);

    useEffect(() => {
        const fetchEncuestas = async () => {
            try {
                const res = await api.get("/gestor/encuestas/encabezado_encuesta/get/");
                if (res.data.success) {
                    setEncuestas(res.data.data);
                    console.log(setEncuestas)
                    console.log("1111111111")

                }
            } catch (error) {
                console.error(error);
            }
        };

        void fetchEncuestas();
    }, []);

    const handle_close = (): void => {
        set_is_modal_active(false);
    };

    const columns = [
        // { field: "id_encabezado_encuesta", headerName: "ID", width: 100 },
        { field: "nombre_encuesta", headerName: "Nombre de Encuesta", width: 300, flex: 1, },
        { field: "fecha_creacion", headerName: "Fecha de Creación", width: 250, flex: 1, },
        {
            field: 'acciones', headerName: 'Acciones', width: 200, flex: 1, renderCell: (params: any) => (
                <>

                    <IconButton
                        color="primary"
                        aria-label="Eliminar"
                    >
                        <PlaylistAddCheckIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl">
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
                    <Title title="Selecione encuensta para ver los detalles de configuracion  " />
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
        </Dialog>
    );
};
