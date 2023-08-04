import {  Box, Button, Grid, Chip } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../../../../../api/axios";
import { useEffect, useState } from "react";
import type { Itablaucursales } from "../../interfaces/interfacesConEntidad";



// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaSucursales: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const initialData: Itablaucursales[] = [];

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataEntidad, setDataEntidad] = useState<Itablaucursales[]>(initialData);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchDataGet = async (): Promise<void> => {
        try {
            const url = "/transversal/sucursales/sucursales-empresa-lista/3";
            const res = await api.get(url);
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const sucursalesData = res.data.data;
            setDataEntidad(sucursalesData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataGet().catch((error) => {
            console.error(error);
        });
    }, []);

    const columns = [
        {
            field: "numero_sucursal",
            headerName: "Número de Sucursal",
            width: 100,
            flex: 1,
        },
        {
            field: "descripcion_sucursal",
            headerName: "Descripción",
            width: 200,
            flex: 1,
        },
        {
            field: "es_principal",
            headerName: "Es Principal",
            width: 150,
            flex: 1,
            renderCell: (params: any ) => {
                const value = params.value as boolean; // Asegurarse de que el tipo sea booleano
                if (typeof value === 'boolean') {
                    return value ? (
                        <Chip
                            size="small"
                            label="Activo"
                            color="success"
                            variant="outlined"
                        />
                    ) : (
                        <Chip
                            size="small"
                            label="Inactivo"
                            color="error"
                            variant="outlined"
                        />
                    );
                } else {
                    // Manejar el caso en el que el tipo no sea booleano (opcional)
                    return null; // O muestra algún otro valor predeterminado
                }
            },
        },
    ];

    return (
        <Grid
            container
            sx={{
                position: "relative",
                background: "#FAFAFA",
                borderRadius: "15px",
                p: "20px",
                mb: "20px",
                boxShadow: "0px 3px 6px #042F4A26",
            }}
        >
            <Grid item xs={12}>
                <Title title="Tabla sucursales" />
                <Box component="form" sx={{ mt: "20px" }} noValidate autoComplete="off">
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        rows={dataEntidad}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.id_sucursal_empresa}
                    />
                </Box>
            </Grid>
            <Button style={{ margin: 8 }} color="primary" variant="contained">
                Ir a sucursales
            </Button>
        </Grid>
    );
};
