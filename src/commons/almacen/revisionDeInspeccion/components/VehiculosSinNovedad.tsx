/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { ButtonGroup, Grid } from "@mui/material";
import { Title } from "../../../../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { interface_vehiculos_sin_novedad } from "../interfaces/types";
import { v4 as uuidv4 } from 'uuid';
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import dayjs from "dayjs";

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_vehiculos_sin_novedad }) => React.ReactNode;
}

interface props {
  data_vehiculos_sin_novedad: interface_vehiculos_sin_novedad[];
}



const VehiculosSinNovedad: React.FC<props> = ({data_vehiculos_sin_novedad}) => {
  
  const columns: CustomColumn[] = [
    {field: 'fecha_registro', headerName:'Fecha revisión', minWidth:190, flex:1,
      renderCell: (params) => (dayjs(params.row.fecha_registro).format('DD/MM/YYYY').toString())
    },
    {field: 'dia_inspeccion', headerName:'Fecha inspección', minWidth:190, flex:1,
      renderCell: (params) => (dayjs(params.row.dia_inspeccion).format('DD/MM/YYYY').toString())
    },
    {field: 'marca', headerName:'Nombre marca', minWidth:190, flex:1},
    {field: 'placa', headerName:'Placa de vehiculo', minWidth:130, flex:1},
    {field: 'nombre_inspecciona', headerName:'Persona que inspecciono', minWidth:260, flex:1,
      renderCell: (params) => (params.row.nombre_inspecciona + ' ' + params.row.apellido_inspecciona)
    },
    {field: 'email_persona_inspecciona', headerName:'Correo de quien inspecciono', minWidth:290, flex:1},
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
        p: '30px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
      >
      <Title title="Vehículos sin novedad" />

      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_vehiculos_sin_novedad, columns })}
              {download_pdf({
                  nurseries: data_vehiculos_sin_novedad,
                  columns,
                  title: 'Vehículos sin novedad',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

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
        getRowId={() => uuidv4()}
      />
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default VehiculosSinNovedad;