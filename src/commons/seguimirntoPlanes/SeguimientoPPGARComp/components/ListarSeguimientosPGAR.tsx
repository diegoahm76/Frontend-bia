import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch } from "../../../../hooks";
import { useContext, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { set_current_actividad_pgar, set_current_armonizacion_pgar, set_current_linea_base, set_current_mode_planes, set_current_seguimiento_pgar } from "../../store/slice/indexPlanes";
import { Avatar, Box, Button, ButtonGroup, Chip, Grid, IconButton } from "@mui/material";
import { Title } from "../../../../components/Title";
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import { v4 as uuidv4 } from 'uuid';
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarSeguimientosPGAR: React.FC = () => {
    const columns: GridColDef[] = [
      {
        field: 'nombre_armonizacion',
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
        field: 'pavance_fisico',
        headerName: 'PORCENTAJE AVANCE FÍSICO',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'pavance_financiero',
        headerName: 'PORCENTAJE AVANCE FINANCIERO',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'pavance_recurso_obligado',
        headerName: 'PORCENTAJE AVANCE RECURSOs OBLIGATORIOS',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'ano_PGAR',
        headerName: 'AÑO PGAR',
        sortable: true,
        minWidth: 120,
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
                set_id_seguimiento_pgar(params.row.id_PGAR);
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: false,
                    editar: true,
                  })
                );
                dispatch(set_current_seguimiento_pgar(params.row));
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
      rows_seguimiento_pgar,
      set_id_seguimiento_pgar,
      fetch_data_seguimiento_pgar,
    } = useContext(DataContextPgar);

    useEffect(() => {
      fetch_data_seguimiento_pgar();
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
            <Title title="Listado de Seguimientos PGAR" />
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
                {download_xls({ nurseries: rows_seguimiento_pgar, columns })}
                {download_pdf({
                  nurseries: rows_seguimiento_pgar,
                  columns,
                  title: 'RSeguimientosPGAR',
                })}
              </ButtonGroup>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_seguimiento_pgar}
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
                Agregar Seguimiento PGAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
};