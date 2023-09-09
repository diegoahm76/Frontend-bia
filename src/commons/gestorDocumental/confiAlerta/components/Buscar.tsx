/* eslint-disable @typescript-eslint/no-misused-promises */
import { Dialog, Grid, } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { Title } from '../../../../components';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Buscar: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, }) => {


    const rows = [
        { id: 1,Nombre_encuesta:"encuesta macarenia corpo",Fecha:"30-04-2023", opciones: 'Opción 1', acciones:  ""},
        { id: 2,Nombre_encuesta:"encuesta macarenia corpo",Fecha:"04-08-2023", opciones: 'Opción 2', acciones:  ""},
        { id: 3,Nombre_encuesta:"encuesta macarenia corpo",Fecha:"03-09-2023", opciones: 'Opción 3', acciones:  ""},
        { id: 4,Nombre_encuesta:"encuesta macarenia corpo",Fecha:"02-11-2023", opciones: 'Opción 4', acciones:  ""},
        { id: 5,Nombre_encuesta:"encuesta macarenia corpo",Fecha:"020-3-2023", opciones: 'Opción 5', acciones: "" },
        { id: 6,Nombre_encuesta:"encuesta macarenia corpo",Fecha:"01-01-2023", opciones: 'Opción 6', acciones: "" },
        // Agrega más filas según tus datos
    ];
        
        // Columnas de la datagrid
    const columns = [
        { field: 'Nombre_encuesta', headerName: 'Nombre encuesta', width: 200, flex: 1, },
        { field: 'Fecha', headerName: 'Fecha creación', width: 200, flex: 1, },
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

    const handle_close = (): void => {
        set_is_modal_active(false);
    };


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



                <Grid item xs={12} marginTop={2}  >
                    <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows}
                        columns={columns}
                        rowsPerPageOptions={[5]}
                        pageSize={5} // Cantidad de filas por página
                        disableSelectionOnClick // Desactiva la selección al hacer clic en una fila
                    />
                    {/* </div> */}
                </Grid>


            </Grid>
        </Dialog>
    );
};
