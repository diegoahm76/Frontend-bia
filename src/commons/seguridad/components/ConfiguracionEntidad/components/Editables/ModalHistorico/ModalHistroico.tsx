
import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Box, Button, Grid } from "@mui/material";
import type { Itablaucursales } from "../../../interfaces/interfacesConEntidad";
import { Title } from "../../../../../../../components/Title";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../../../../../../api/axios";


interface CodigoBuscar {
  
    codi: number;
   
}


// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrrModalHistorico: React.FC<CodigoBuscar> = (codi) => {
    
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const footerContent = (
        <div>

            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { setVisible(false) }} >Salir</Button>
        </div>
    );


        // eslint-disable-next-line @typescript-eslint/naming-convention
        const initialData: Itablaucursales[] = [];

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const [dataEntidad, setDataEntidad] = useState<Itablaucursales[]>(initialData);

        const titulo = <Title title="Tabla historico" />;

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
            { field: "numero_sucursal", headerName: "Número de Sucursal", width: 200, flex: 1 },
            { field: "descripcion_sucursal", headerName: "Descripción", width: 200, flex: 1 },
            { field: "es_principal", headerName: "Es Principal", width: 150, flex: 1 },

        ];

        

    return (
        <div className="card flex justify-content-center">

            <Button
                style={{ margin: 3, marginTop: 10, marginRight: 10 }}
                color="primary"
                variant="outlined"
                onClick={() => {setVisible(true)}}

            >Historico
            </Button>

            <Dialog header={titulo} visible={visible} style={{ width: '50vw' }} onHide={():void => {setVisible(false)}} footer={footerContent}>
                
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
                                columns={columns}
                                rows={dataEntidad}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                getRowId={(row) => row.id_sucursal_empresa}
                            />
                            <h1>{codi.codi}</h1>
                        </Box>
                    </Grid>
                    
                </Grid>




            </Dialog>
        </div>
    )
}