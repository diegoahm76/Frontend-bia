/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from "react";
import { Button, Grid, Dialog } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { api } from "../../../../../../api/axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


interface Row {
    id: number;
    capacidad: string;
    valor: string;
    editable: boolean;
    formula: string;
}


export const ModalInfoCategoriaCostoProyecto = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [rows, setRows] = useState<Row[]>([]);

    const Tabla_porcentajes = async (): Promise<void> => {
        try {
            const url = `/recaudo/configuracion_baisca/sueldo_minimo/get/`;
            const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
            const data_consulta = res.data.data;
            setRows(data_consulta)
        } catch (error) {
            console.error(error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'capacidad', headerName: 'Capacidad', flex: 2 },
        { field: 'valor', headerName: 'Valor', flex: 0.5 },
        { field: 'editable', headerName: 'Editable', flex: 0.5, type: 'boolean' },
        { field: 'formula', headerName: 'Fórmula', flex: 2 },
    ];



    useEffect(() => {
        Tabla_porcentajes();
    }, [])


    return (
        <>

            <Button
                style={{ backgroundColor: "green", color: "white" }}
                color="success" // Cambia el color según si es una actualización o creación
                fullWidth
                variant="contained"
                onClick={openModal}
            >
                <HelpOutlineIcon />
            </Button>

            <Grid container spacing={2}>


                <Grid item xs={12}>
                    <Dialog open={isModalOpen} fullWidth maxWidth="md">



                        <Grid
                            container
                            alignItems="center" justifyContent="center"
                            sx={{
                                position: 'relative',
                                background: '#FAFAFA',
                                borderRadius: '15px',
                                p: '20px',
                                mb: '20px',
                                boxShadow: '0px 3px 6px #042F4A26'
                            }}
                        >
                            <Grid item xs={12}>
                                <Title title={`Informacion a Enviar a `} />
                            </Grid>

                            <Grid item xs={12} style={{marginTop:15}}>


                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    density="compact"
                                    autoHeight
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
                            </Grid>



                            <Grid container alignItems="flex-end" justifyContent="flex-end">


                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<CancelIcon />}
                                    style={{ width: 150, margin: 7 }}
                                    onClick={closeModal}
                                >
                                    Salir
                                </Button>
                            </Grid>
                        </Grid >
                    </Dialog >
                </Grid>
            </Grid>
        </>
    );
};
