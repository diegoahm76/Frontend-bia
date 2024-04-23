import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch } from "../../../../hooks";
import { useContext, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { set_current_indicador_pgar, set_current_linea_base, set_current_mode_planes } from "../../store/slice/indexPlanes";
import { Avatar, Box, Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import { Title } from "../../../../components/Title";
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import { v4 as uuidv4 } from 'uuid';
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarIndicadoresPgar: React.FC = () => {
    const columns: GridColDef[] = [
      {
        field: 'nombre_actividad',
        headerName: 'NOMBRE ACTIVIDAD',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'nombre_indicador',
        headerName: 'NOMBRE INDICADOR',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'medida',
        headerName: 'MEDIDA',
        sortable: true,
        minWidth: 250,
        flex: 1,
        valueGetter: (params) => {
          if (params.row.medida == 'NUM') {
              return 'Número';
          } else if (params.row.medida == 'POR') {
              return 'Porcentaje';
          } else {
              return 'Tiempo';
          }
      }
      },
      {
        field: 'tipo_indicador',
        headerName: 'TIPO INDICADOR',
        sortable: true,
        minWidth: 250,
        flex: 1,
        valueGetter: (params) => params.row.tipo_indicador == 'MAN' ? 'Mantenimiento' : 'Incremento'
      },
      {
        field: 'cumplio',
        headerName: '¿CUMPLIÓ?',
        sortable: true,
        minWidth: 120,
        flex: 1,
        renderCell: (params) => (params.value ? 'Sí' : 'No'),
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
                // set_id_meta_eje(params.row.id_meta_eje);
                // set_id_linea_base(params.row.id_linea_base);
                set_id_actividad(params.row.id_actividad);
                set_id_indicador(params.row.id_indicador);
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: false,
                    editar: true,
                  })
                );
                dispatch(set_current_indicador_pgar(params.row));
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
      id_actividad,
      rows_indicador,
      set_id_actividad,
      set_id_indicador,
      fetch_data_indicador_pgar,
    } = useContext(DataContextPgar);

    useEffect(() => {
      if (id_actividad) {
        fetch_data_indicador_pgar();
      }
    }, [id_actividad]);

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
            <Title title="Listado de Indicadores" />
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
                {download_xls({ nurseries: rows_indicador, columns })}
                {download_pdf({
                  nurseries: rows_indicador,
                  columns,
                  title: 'RIndicadores',
                })}
              </ButtonGroup>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_indicador}
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
                Agregar Indicador
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
};