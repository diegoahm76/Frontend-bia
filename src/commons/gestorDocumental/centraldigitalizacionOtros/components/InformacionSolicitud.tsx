/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import { Title } from "../../../../components/Title";

export const InformacionSolicitud = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  // Columnas del DataGrid
  const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'medioAlmacenamiento', headerName: 'Medio de Almacenamiento', flex: 1 },
    { field: 'numeroFolios', headerName: 'Número de Folios', flex: 1 },
    { field: 'digitalizado', headerName: 'Digitalizado', flex: 1 },
    { field: 'observacion', headerName: 'Observación', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (param: GridRenderCellParams) => (
        <Button variant="outlined" color="primary">
          Acción
        </Button>
      ),
    },
  ];

  // Datos del DataGrid
  const data = [
    {
      id: 1,
      nombre: 'Documento 1',
      medioAlmacenamiento: 'Almacenamiento 1',
      numeroFolios: 10,
      digitalizado: 'Sí',
      observacion: 'Sin observaciones',
    },
    {
      id: 2,
      nombre: 'Documento 2',
      medioAlmacenamiento: 'Almacenamiento 2',
      numeroFolios: 15,
      digitalizado: 'No',
      observacion: 'Con observaciones',
    },
    // Agrega más filas según sea necesario
  ];

  return (
    <Grid
      container
      sx={{
        marginTop:2,
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12} sm={2}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Fecha de Salida"
          value={currentDate}
          style={{ marginTop: 15, width: '90%' }}
        />
      </Grid>

      <Grid item xs={12} sm={5}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Titular"
          value="Stiven Vigoya"
          style={{ marginTop: 15, width: '90%' }}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Asunto"
          value="Hoy"
          style={{ marginTop: 15, width: '90%' }}
        />
      </Grid>

      <Grid item xs={12} sm={2}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Numero Anexos"
          value="5"  // Ajusta según el tipo de datos requerido
          style={{ marginTop: 15, width: '90%' }}
        />
      </Grid>

      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={8}>
          <div style={{ width: '100%', marginTop: 15 }}>
            <Title title="Listado de Anexos" />
            <DataGrid
              density="compact"
              rows={data}
              columns={columns}
              pageSize={5}
              autoHeight
              getRowId={(row) => uuidv4()}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
