/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Divider, Grid, Typography } from "@mui/material";
import { Title } from "../../../../../components/Title"
import { BusquedaAvanzada } from "../../components/BusquedaAvanzadaPORH/BusquedaAvanzada";
import type { InfoAvance, InfoPorh } from "../../Interfaces/interfaces";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/contextData";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { RegistroAvance } from "../../components/RegistrarAvance/registroAvance";
import { BusquedaAvances } from "../../components/BusquedaAvances/BusquedaAvances";
import { EditarAvance } from "../../components/EditarAvance/EditarAvance";


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
        fetch_data_avances,
        rows_avances,
        set_id_proyecto,
        id_proyecto,
        is_register_avance,
        set_is_register_avance,
        is_select_avance,
        is_editar_avance,
    } = useContext(DataContext);


    const [info, set_info] = useState<InfoPorh>();
    const [info_avance, set_info_avance] = useState<InfoAvance>();


    const on_result = (info_porh: InfoPorh): void => {
        // reset();
        set_is_register_avance(false);
        set_info(info_porh);
        set_id_proyecto(info_porh?.id_proyecto)
    };

    const on_result_avance = (Info_avance: InfoAvance): void => {
        // reset();
        set_info_avance(Info_avance);
        console.log(info_avance)
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (info) {
            void fetch_data_avances();
        }
    }, [info]);
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
                {id_proyecto ? (
                    <Grid item>
                        <LoadingButton
                            variant="outlined"
                            onClick={() => {
                                set_is_register_avance(true);
                            }}
                        >
                            Registrar Avance
                        </LoadingButton>
                    </Grid>
                ) : null
                }
                <BusquedaAvances
                    onResult={on_result_avance} />
            </Grid>
            {is_register_avance && (
                <RegistroAvance />
            )}
            {is_select_avance && (
                <EditarAvance />)}
            {is_editar_avance && (
                <EditarAvance />)}
        </Grid>
    );
};
