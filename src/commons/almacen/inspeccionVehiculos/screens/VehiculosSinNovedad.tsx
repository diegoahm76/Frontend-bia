import { Grid } from "@mui/material";
import { Title } from "../../../../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { interface_vehiculos_sin_novedad } from "../interfaces/types";
import { v4 as uuidv4 } from 'uuid';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_vehiculos_sin_novedad }) => React.ReactNode;
}

interface props {
  data_vehiculos_sin_novedad: interface_vehiculos_sin_novedad[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const VehiculosSinNovedad: React.FC<props> = ({data_vehiculos_sin_novedad}) => {

/*
   "id_inspeccion_vehiculo": 6,
    "id_hoja_de_vida": 23,
    "placa": "test1",
    "marca": "FORD MILENIUM
*/
  
  const columns: CustomColumn[] = [
    {field: 'marca', headerName:'Nombre marca', minWidth:190, flex:1},
    {field: 'placa', headerName:'Placa de vehiculo', minWidth:130, flex:1},
  ]

  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        boxShadow: '0px 3px 6px #042F4A26',
        p: '20px',
        mb: '20px',
      }}
      >
      <Title title="Vehículos sin novedad" />
      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        rows={data_vehiculos_sin_novedad ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row.id_hoja_de_vida ?? uuidv4()}
      />
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default VehiculosSinNovedad;