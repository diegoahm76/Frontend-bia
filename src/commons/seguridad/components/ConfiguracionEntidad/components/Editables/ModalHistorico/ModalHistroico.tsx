
import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { Title } from "../../../../../../../components/Title";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../../../../../../api/axios";
import { control_error } from "../../../../SucursalEntidad/utils/control_error_or_success";
import type { DatosHistoricoPerfilEntidad } from "../../../interfaces/interfacesConEntidad";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModificadorFormatoFecha } from "../../../utils/modificadorForematoFecha";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';



interface interfazModalHistorico {

    cargo: string;
    codig: number;

}



// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrrModalHistorico: React.FC<interfazModalHistorico> = ({ cargo, codig }: interfazModalHistorico) => {


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const footerContent = (
        <div>

            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { setVisible(false) }} >Salir</Button>
        </div>
    );


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const datosInicialesHistorico: DatosHistoricoPerfilEntidad[] = [];

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataHistorico, setdataHistorico] = useState<DatosHistoricoPerfilEntidad[]>(datosInicialesHistorico);

    const titulo = <Title title={`Tabla Histórico de ${cargo}`} />;


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [mostraobser, setmostraobser] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [id_personam, setid_personam] = useState<string>("");

    const handle_mostar = (da: string): void => {
        setmostraobser(da)
     };
    const handle_mosta = (daa: any): void => {
        setid_personam(daa)
    };

    const titulo_observacio=`Observaciones Numero de Registro : ${id_personam}`;

    const codigoo = codig;
   

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const peticionHistorico = async (): Promise<void> => {
        try {
            let seccion = ""; // Declaramos la variable seccion aquí y le asignaremos un valor dentro del switch

            switch (codigoo) {
                case 1:

                    seccion = "Dire";

                    break;

                case 4:

                    seccion = "CViv";

                    break;
                case 3:

                    seccion = "RTra";

                    break;
                case 2:

                    seccion = "CAlm";

                    break;
                case 5:

                    seccion = "Alma";

                    break;

                default:

                    break;
            }



            const url = `transversal/configuracion/historico_perfiles_entidad/get/${seccion}/`;
            const res = await api.get(url);
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const sucursalesData = res.data.data;
           
            setdataHistorico(sucursalesData);
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };

   
    const columns = [
        // { field: "cod_tipo_perfil_histo", headerName: "Código Tipo Perfil", width: 150, flex: 1 },
        { field: "consec_asignacion_perfil_histo", headerName: "Consecutivo", width: 90,  },
        { field: "nombre_completo", headerName: "Nombre Completo",  width: 190 },
        { field: "fecha_inicio_periodo", headerName: "Inicio Periodo", width: 45, flex: 1, valueGetter: (params: any) => ModificadorFormatoFecha(params.value) }, 
        { field: "fecha_fin_periodo", headerName: "Fin Periodo", width: 25, flex: 1, valueGetter: (params: any) => ModificadorFormatoFecha(params.value) },
    
        {
            field: "accion",
            headerName: "observaciones",
            width: 100, 
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        aria-label="Editar"
                        onClick={() => {
                            handle_mostar(params.row.observaciones_cambio);
                            handle_mosta(params.row.consec_asignacion_perfil_histo);
                        }}
                    >
                        <VisibilityIcon/>
                    </IconButton>

                </>
            ),
        },
    ];
 
    useEffect(() => {
        peticionHistorico().catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        peticionHistorico().catch((error) => {
            console.error(error);
        });
    }, [visible]);


    return (
        <div className="card flex justify-content-center"  >

            <Button
                style={{ margin: 3, marginTop: 10, marginRight: 10 }}
                color="primary"
                startIcon={<AutoStoriesIcon />}
                variant="outlined"
                onClick={() => { setVisible(true) }}

            >Histórico
            </Button>

            <Dialog header={titulo} visible={visible} style={{ width: "55%" }} closable={false} onHide={(): void => { setVisible(false) }} footer={footerContent}>

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


                        <Box component="form" sx={{ mt: "20px" }} noValidate autoComplete="off">

                            <DataGrid
                                density="compact"
                                autoHeight
                                columns={columns ?? []}
                                rows={dataHistorico ?? []}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                getRowId={(row) => row.id_historico_perfil_entidad}
                            />

                        </Box>
                    </Grid>
                
                    <Grid item xs={12}>


                        <Box component="form" sx={{ mt: "20px" }} noValidate autoComplete="off">


                            <TextField fullWidth label={titulo_observacio} value={mostraobser} id="fullWidth" />

                        </Box>

                    </Grid>
                </Grid>


            </Dialog>
        </div >
    );
};