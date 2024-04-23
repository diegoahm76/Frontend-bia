import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch } from "../../../../hooks";
import { useContext, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { set_current_actividad_pgar, set_current_armonizacion_pgar, set_current_linea_base, set_current_mode_planes } from "../../store/slice/indexPlanes";
import { Avatar, Box, Button, ButtonGroup, Chip, Grid, IconButton } from "@mui/material";
import { Title } from "../../../../components/Title";
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import { v4 as uuidv4 } from 'uuid';
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarArmonizaciones: React.FC = () => {
    const columns: GridColDef[] = [
      {
        field: 'nombre_relacion',
        headerName: 'NOMBRE ARMONIZACIÓN',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'nombre_planPGAR',
        headerName: 'PLAN PGAR',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'nombre_planPAI',
        headerName: 'PLAN PAI',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'estado',
        headerName: 'VIGENCIA',
        sortable: true,
        minWidth: 120,
        flex:1,
        renderCell: (params) => {
          return params.row.estado === true ? (
            <Chip
              size="small"
              label="vigente"
              color="success"
              variant="outlined"
            />
          ) : (
            <Chip
              size="small"
              label="No vigente"
              color="error"
              variant="outlined"
            />
          );
        },
      },
      {
        field: 'fecha_creacion',
        headerName: 'FECHA DE CREACIÓN',
        sortable: true,
        minWidth: 160,
        flex: 1
      },
      {
        field: 'acciones',
        headerName: 'ACCIONES',
        sortable: true,
        minWidth: 120,
        flex: 1,
        renderCell: (params) => (
          <>
            <IconButton
              size="small"
              onClick={() => {
                set_id_armonizar(params.row.id_armonizar);
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: false,
                    editar: true,
                  })
                );
                dispatch(set_current_armonizacion_pgar(params.row));
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
                <EditIcon
                  titleAccess="Editar Programa"
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
          </>
        ),
      },
    ];

    const dispatch = useAppDispatch();
    const {
      rows_armonizacion,
      set_id_armonizar,
      fetch_data_armonizaciones,
    } = useContext(DataContextPgar);

    useEffect(() => {
      fetch_data_armonizaciones();
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
            <Title title="Listado de Armonizaciones" />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <ButtonGroup
                style={{
                  margin: 7,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {download_xls({ nurseries: rows_armonizacion, columns })}
                {download_pdf({
                  nurseries: rows_armonizacion,
                  columns,
                  title: 'RArmonizaciones',
                })}
              </ButtonGroup>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_armonizacion}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => uuidv4()}
                getRowHeight={() => 'auto'}
              />
            </Box>
          </Grid>
          <Grid container spacing={2} mt={1} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                disabled={false}
                onClick={() => {
                  dispatch(
                    set_current_mode_planes({
                      ver: true,
                      crear: true,
                      editar: false,
                    })
                  );
                }}
              >
                Agregar Armonización
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
};