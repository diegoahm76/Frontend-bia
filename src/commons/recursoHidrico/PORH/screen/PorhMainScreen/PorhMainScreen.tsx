import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { AgregarPrograma } from '../../components/AgregarNuevoPrograma/AgregarPrograma';
import { useContext, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Avatar, Divider, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';
import { get_data_id } from '../../components/AgregarProyectos/Services/request.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PorhMainScreen: React.FC = () => {

  const {
    rows,
    set_rows,
  } = useContext(DataContext);
 
  const columns: GridColDef[] = [

    {
      field: 'nombre',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      width: 170,
    },
    {
      field: 'fecha_inicio',
      headerName: 'FECHA INICIO',
      sortable: true,
      width: 170,
    },
    {
      field: 'fecha_fin',
      headerName: 'FECHA FIN',
      sortable: true,
      width: 170,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params: any) => {
        const fecha_fin = params.row.fecha_fin;
        if (fecha_fin !== null && new Date(fecha_fin) > new Date()) {
          return (
            <>
              <IconButton>
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <EditIcon
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                    onClick={() => {
                      // handle_open_editar();
                      // set_cargos(params.row);
                    }}
                  />
                </Avatar>
              </IconButton>
              <IconButton
                onClick={() => {
                  // confirmar_eliminar_cargo(params.row.id_cargo as number)
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <DeleteIcon
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />
                </Avatar>
              </IconButton>
            </>
          );
        } else {
          return null;
        }
      },
    },


  ];

  const [is_agregar, set_is_agregar] = useState(false);

  useEffect(() => {
    void get_data_id(1, set_rows, 'get/programas');
  }, []);

  return (
    <>
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
          <Title title="CONTENIDO PROGRAMÁTICO PLAN DE ORDENAMIENTO DE RECURSO HÍDRICO" />
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          {rows.length > 0 && (
            <>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                getRowId={(row) => row.nombre}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </>
          )}
          {/* <Grid item xs={12}>
                        <Grid container justifyContent="center" textAlign="center">
                            <Alert icon={false} severity="info">
                                <LinearProgress />
                                <Typography>No se encontraron resultados...</Typography>
                            </Alert>
                        </Grid>
                    </Grid> */}
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              onClick={() => { set_is_agregar(true) }}
            >
              Agregar programa
            </LoadingButton>
          </Grid>
        </Grid>
        {is_agregar && (
          <>
            <AgregarPrograma />
          </>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              color='warning'
              type='submit'
            >
              Salir
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              variant="contained"
              color='success'
              type='submit'
            >
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
