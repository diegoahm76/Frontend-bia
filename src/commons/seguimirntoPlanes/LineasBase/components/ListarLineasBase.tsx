import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch } from "../../../../hooks";
import { useContext, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { set_current_linea_base, set_current_mode_planes } from "../../store/slice/indexPlanes";
import { Avatar, Box, Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import { Title } from "../../../../components/Title";
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import { v4 as uuidv4 } from 'uuid';
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarLineasBase: React.FC = () => {
    const columns: GridColDef[] = [
      // {
      //   field: 'nombre_plan',
      //   headerName: 'Nombre del Plan',
      //   sortable: true,
      //   minWidth: 250,
      //   flex: 1
      // },
      {
        field: 'nombre_objetivo',
        headerName: 'NOMBRE DEL OBJETIVO',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'nombre_meta',
        headerName: 'NOMBRE META',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'nombre_eje_estrategico',
        headerName: 'EJE ESTRATÉGICO',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'nombre_linea_base',
        headerName: 'NOMBRE DE LA LÍNEA BASE',
        sortable: true,
        minWidth: 250,
        flex: 1
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
                set_id_meta_eje(params.row.id_meta_eje);
                set_id_linea_base(params.row.id_linea_base);
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: false,
                    editar: true,
                  })
                );
                dispatch(set_current_linea_base(params.row));
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
      id_meta_eje,
      rows_linea_base,
      set_id_meta_eje,
      set_id_linea_base,
      fetch_data_linea_base,
    } = useContext(DataContextPgar);

    useEffect(() => {
      if (id_meta_eje) {
        fetch_data_linea_base();
      }
    }, [id_meta_eje]);

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
            <Title title="Listado de Líneas Base de Metas PGAR" />
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
                {download_xls({ nurseries: rows_linea_base, columns })}
                {download_pdf({
                  nurseries: rows_linea_base,
                  columns,
                  title: 'RLineasBase',
                })}
              </ButtonGroup>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_linea_base}
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
                Agregar Linea Base
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
};