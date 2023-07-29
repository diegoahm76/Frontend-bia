import { Box, Grid, Button } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { api } from "../../../../../../api/axios";
import type { ItablaUnidades } from "../../interfaces/interfacesConEntidad";



// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaLineresUnidadesOrganizacionales: React.FC = () => {

    const datos_asignacion: ItablaUnidades[] = [];

    const [data_lideres, setdata_lideres] = useState<ItablaUnidades[]>(datos_asignacion);

    const fetch_data_get = async (): Promise<void> => {
        try {
            const url = "/transversal/lideres/get-list-actual/";
            const res = await api.get(url);
            const facilidad_pago_data = res.data.data;
            setdata_lideres(facilidad_pago_data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch_data_get().catch((error) => {
            console.error(error);
        });
    }, []);

    const columns = [

        { field: "codigo_unidad_org", headerName: "Código Unidad Org", width: 200, flex: 1 },
        { field: "nombre_unidad_org", headerName: "Nombre Unidad Org", width: 200, flex: 1 },
        { field: "nombre_completo", headerName: "Nombre Completo", width: 200, flex: 1 },

    ];

    return (
        <Grid container sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
        }}
        >
            <Grid item xs={12}>
                <Title title="Lideres de Unidades Organizacionales" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        rows={data_lideres}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.id_persona}
                    />
                </Box>
            </Grid>
            <Button style={{ margin: 8 }} color="primary" variant="contained">Ir a lideres de grupo</Button>
        </Grid>
    );
};