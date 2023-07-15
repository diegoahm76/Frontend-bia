import { Box, Button, Grid } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { api } from "../../../../../../api/axios";

interface ISucursalEmpresa {
    id_sucursal_empresa: number;
    numero_sucursal: number;
    descripcion_sucursal: string;
    direccion: string;
    direccion_sucursal_georeferenciada: string | null;
    municipio: string | null;
    pais_sucursal_exterior: string | null;
    direccion_notificacion: string;
    direccion_notificacion_referencia: string | null;
    municipio_notificacion: string | null;
    email_sucursal: string;
    telefono_sucursal: string;
    es_principal: boolean;
    activo: boolean;
    item_ya_usado: boolean;
    id_persona_empresa: number;
}



// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaSucursales: React.FC = () => {



    // eslint-disable-next-line @typescript-eslint/naming-convention
    const initialStateArraytanle: ISucursalEmpresa = {
        id_sucursal_empresa: 0,
        numero_sucursal: 0,
        descripcion_sucursal: "",
        direccion: "",
        direccion_sucursal_georeferenciada: "",
        municipio: null,
        pais_sucursal_exterior: null,
        direccion_notificacion: "",
        direccion_notificacion_referencia: "",
        municipio_notificacion: "",
        email_sucursal: "",
        telefono_sucursal: "",
        es_principal: true,
        activo: true,
        item_ya_usado: false,
        id_persona_empresa: 0
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataEntidad, setdataEntidad] = useState(initialStateArraytanle);


    const {
        id_sucursal_empresa,
        // numero_sucursal,
        // descripcion_sucursal,
        // direccion,
        // direccion_sucursal_georeferenciada,
        // municipio,
        // pais_sucursal_exterior,
        // direccion_notificacion,
        // direccion_notificacion_referencia,
        // municipio_notificacion,
        // email_sucursal,
        // telefono_sucursal,
        // es_principal,
        // activo,
        // item_ya_usado,
        // id_persona_empresa
                             } = dataEntidad;
    console.log(id_sucursal_empresa);
    console.log(2);


    const url = "transversal/sucursales/sucursales-empresa-lista/3";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchData = async (): Promise<void> => {
        try {
            const res = await api.get(url);
            setdataEntidad(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData().catch((error) => {
            console.error(error);
        });
    }, []);

    
    const roles= [
        { field: "apple", headerName: "Apple", width: 150 },
        { field: "banana", headerName: "Banana", width: 150 },
        { field: "orange", headerName: "Orange", width: 150 },
        { field: "red", headerName: "Red", width: 150 },
        { field: "green", headerName: "Green", width: 150 },
    ];

    const rows = [
        { id: 1, apple: "Apple 1", banana: "Banana 1", orange: "Orange 1", red: "Banana 1", green: "Orange 1" },
        { id: 2, apple: "Apple 2", banana: "Banana 2", orange: "Orange 2", red: "Banana 1", green: "Orange 1" },
        { id: 3, apple: "Apple 3", banana: "Banana 3", orange: "Orange 3", red: "Banana 1", green: "Orange 1" }, 
        { id: 4, apple: "Apple 2", banana: "Banana 2", orange: "Orange 2", red: "Banana 1", green: "Orange 1" },
        { id: 5, apple: "Apple 3", banana: "Banana 3", orange: "Orange 3", red: "Banana 1", green: "Orange 1" },
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
                <Title title="Tabla sucursales" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={roles}
                        rows={rows}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.id}
                    />
                </Box>
               
            </Grid>
             <Button style={{margin:8}} color="primary" variant="contained">Ir a sucursales</Button>
        </Grid>
    );
};