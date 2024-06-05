/* eslint-disable @typescript-eslint/naming-convention */

import React, { useEffect, useState } from "react";
import { Button, Grid, Dialog } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { api } from "../../../../../../api/axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Definición de la interfaz para las filas de la tabla
interface Row {
    id: number;
    capacidad: string;
    valor: string;
    editable: boolean;
    formula: string;
}

export const ModalInfoCategoriaCostoProyecto = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
    const [rows, setRows] = useState<Row[]>([]); // Estado para almacenar los datos de la tabla

    // Función para abrir el modal
    const openModal = () => setIsModalOpen(true);

    // Función para cerrar el modal
    const closeModal = () => setIsModalOpen(false);

    // Función para obtener y cargar los datos de la tabla desde la API
    const Tabla_porcentajes = async (): Promise<void> => {
        try {
            const url = `/recaudo/configuracion_baisca/sueldo_minimo/get/`;
            const res = await api.get(url);
            const data_consulta = res.data.data;
            setRows(data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    // Definición de las columnas de la tabla
    const columns: GridColDef[] = [
        { field: 'capacidad', headerName: 'Capacidad', flex: 2 },
        { field: 'valor', headerName: 'Valor', flex: 0.5 },
        { field: 'editable', headerName: 'Editable', flex: 0.5, type: 'boolean' },
        { field: 'formula', headerName: 'Fórmula', flex: 2 },
    ];

    // Cargar los datos de la tabla al montar el componente
    useEffect(() => {
        Tabla_porcentajes();
    }, []);

    return (
        <>
            {/* Botón para abrir el modal */}
            <Button
                style={{ backgroundColor: "green", color: "white" }}
                color="success"
                fullWidth
                variant="contained"
                onClick={openModal}
            >
                <HelpOutlineIcon />
            </Button>

            {/* Modal */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Dialog open={isModalOpen} fullWidth maxWidth="md">
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
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
                                <Title title={`TABLA DE VALORES SEGUN LA RESOLUCIÓN 1280 DE 2010`} />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: 15 }}>
                                {/* DataGrid para mostrar la tabla */}
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    density="compact"
                                    autoHeight
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
                            </Grid>

                            {/* Botón para cerrar el modal */}
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
                        </Grid>
                    </Dialog>
                </Grid>
            </Grid>
        </>
    );
};
