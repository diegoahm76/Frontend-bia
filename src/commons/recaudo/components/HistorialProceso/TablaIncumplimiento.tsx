import { Avatar, Box, Grid } from "@mui/material"
import { CalendarMonth, InsertDriveFileOutlined, SmsOutlined } from "@mui/icons-material"
import { Title } from '../../../../components/Title';
import { DataGrid, GridToolbar, type GridColDef } from "@mui/x-data-grid";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaIncumplimiento: React.FC = () => {
  const rows_etapas = [
    {
      id: 1,
      descripcion: 'Fecha de último pago',
      datos: `${'21-02-2022'}`,
      fecha_registro: `${'25-02-2022'}`
    },
    {
      id: 2,
      descripcion: 'Acta de Incumplimiento',
      datos: `${'Acta 1012 del 2022'}`,
      fecha_registro: `${'01-02-2022'}`
    },
    {
      id: 3,
      descripcion: 'Observaciones',
      datos: `${'No se encuentran pagos relacionados con el compromiso de pago'}`,
      fecha_registro: `${'03-02-2022'}`
    }
  ]

  const columns_etapas: GridColDef[] = [
    {
      field: 'tipo',
      headerName: 'Tipo de Información',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {
              params.id === 1 ? (
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <CalendarMonth
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              ) : params.id === 2 ? (
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <InsertDriveFileOutlined
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              ) : params.id === 3 ? (
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <SmsOutlined
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              ) : null
            }
          </>
        )
      }
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'datos',
      headerName: 'Datos',
      minWidth: 500,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {
              params.id === 2 ? (
                <a href={`${'https://tec.mx/sites/default/files/inline-files/FormatoResolucion.pdf'}`}>{params.value}</a>
              ) : params.value
            }
          </>
        )
      }
    },
    {
      field: 'fecha_registro',
      headerName: 'Fecha de Registro',
      minWidth: 200,
      flex: 1,
    },
  ];

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title='Incumplimiento de pago' />
          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_etapas}
                columns={columns_etapas}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Title title={`Reclamación ${'17-06-2022'}`} />
        </Grid>
      </Grid>
    </>
  )
}

