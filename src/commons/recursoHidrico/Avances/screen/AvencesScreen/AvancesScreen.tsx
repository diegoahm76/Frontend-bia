import { Divider, Grid, Typography } from "@mui/material";
import { Title } from "../../../../../components/Title"
import { BusquedaAvanzada } from "../../components/BusquedaAvanzadaPORH/BusquedaAvanzada";
import type { InfoPorh } from "../../Interfaces/interfaces";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/contextData";
import { control_error } from "../../../../../helpers";
import { get_data_id } from "../../request/request";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { RegistroAvance } from "../../components/RegistrarAvance/registroAvance";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const AvanceScreen: React.FC = () => {

    const columns: GridColDef[] = [

        {
            field: 'id_avance',
            headerName: 'No Avance',
            sortable: true,
            width: 170,
        },
        {
            field: 'accion',
            headerName: 'ACCIÓN',
            sortable: true,
            width: 250,
        },
        {
            field: 'descripcion',
            headerName: 'DESCRIPCIÓN',
            sortable: true,
            width: 250,
        },
        {
            field: 'fecha_reporte',
            headerName: 'FECHA REPORTE',
            sortable: true,
            width: 250,
        },
        {
            field: 'evidencia',
            headerName: 'EVIDENCIA',
            sortable: true,
            width: 250,
        }
    ];
    const {
        set_rows_avances,
        rows_avances
    } = useContext(DataContext);


    const [info, set_info] = useState<InfoPorh>();
    const [is_register, set_is_register] = useState<boolean>(false);

    const on_result = (info_porh: InfoPorh): void => {
        // reset();
        set_info(info_porh);
    };
    const fetch_data = async (): Promise<void> => {
        try {
            if (info?.id_proyecto !== undefined) {
                await get_data_id(info?.id_proyecto, set_rows_avances, 'get/avances/por/proyectos');
            }
        } catch (error) {
            control_error(error);
        }
    };

    useEffect(() => {
        void fetch_data();
    }, [info === undefined]);
    return (
        <Grid
            container
            spacing={2}
            m={2}
            p={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="AVANCES POR PROYECTO" />
            </Grid>
            <BusquedaAvanzada onResult={on_result} />
            {rows_avances.length > 0 && (
                <>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Avances
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>

                        <DataGrid
                            autoHeight
                            rows={rows_avances}
                            columns={columns}
                            getRowId={(row) => row.id_avance}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Grid>
                </>
            )}
            <Grid item spacing={2} justifyContent="end" container>
                <Grid item>
                    <LoadingButton
                        variant="outlined"
                        onClick={() => {
                            set_is_register(true);
                        }}
                    >
                        Registrar Avance
                    </LoadingButton>
                </Grid>
            </Grid>
            {is_register && (
                <RegistroAvance />
            )}
        </Grid>
    );
};
