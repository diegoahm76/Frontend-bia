/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../components/Title';
import { ModalFlujoDeTrabajo } from '../components/ModalWorkflow/ModalWorkFLow';

export const ConsultarWorkFlow = () => {
    // Datos quemados para las columnas y la data
    const columns = [
        { field: 'tipo_pqr', headerName: 'Tipo de PQR', width: 150 },
        { field: 'titular', headerName: 'Titular', width: 150 },
        { field: 'radicado', headerName: 'Radicado', width: 150 },
        { field: 'estado', headerName: 'Estado', width: 150 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 150,
            renderCell: () => <ModalFlujoDeTrabajo/>,
        },
    ];

    const data = [
        { id: uuidv4(), tipo_pqr: 'Tipo 1', titular: 'Titular 1', radicado: 'R-001', estado: 'Activo' },
        { id: uuidv4(), tipo_pqr: 'Tipo 2', titular: 'Titular 2', radicado: 'R-002', estado: 'Inactivo' },
        // Agrega más datos de prueba según sea necesario
    ];

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
                <Grid item xs={12} >
                    <Title title="Mis alertas" />
                </Grid>


                <Grid item xs={5} >

                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Año Actual"
                        value={123}
                        style={{ marginTop: 15, width: "90%" }}
                    />
                </Grid>

                <Grid item xs={5} >

                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Año Actual"
                        value={123}
                        style={{ marginTop: 15, width: "90%" }}
                    />
                </Grid>


                <Grid item xs={4} >

                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Año Actual"
                        value={123}
                        style={{ marginTop: 15, width: "90%" }}
                    />
                </Grid>

                <Grid item xs={4} >

                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Año Actual"
                        value={123}
                        style={{ marginTop: 15, width: "90%" }}
                    />
                </Grid>

                <Grid item xs={3} >

                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Año Actual"
                        value={123}
                        style={{ marginTop: 15, width: "90%" }}
                    />
                </Grid>

                <Grid item xs={3} >

                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Año Actual"
                        value={123}
                        style={{ marginTop: 15, width: "90%" }}
                    />
                </Grid>

                <Grid item xs={4}>
                    <Button
                        style={{ marginTop: 27, width: "90%" }}
                        // startIcon={<SaveIcon />}
                        color='success'
                        fullWidth
                        variant="contained"
                    >
                        Buscar
                    </Button>
                </Grid>




                <Grid item xs={12} style={{ marginTop: 15 }}>
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        rows={data}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.id}
                    />
                </Grid>
            </Grid>
        </>
    );
};
