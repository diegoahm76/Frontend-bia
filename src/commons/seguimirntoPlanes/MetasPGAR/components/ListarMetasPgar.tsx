import { Avatar, Box, Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { set_current_meta_pgar, set_current_mode_planes } from "../../store/slice/indexPlanes";
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from "../../../../hooks";
import { useContext, useEffect } from "react";
import { Title } from "../../../../components/Title";
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import { v4 as uuidv4 } from 'uuid';
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarMetasPgar: React.FC = () => {
    const columns: GridColDef[] = [
      {
        field: 'nombre_plan_objetivo',
        headerName: 'NOMBRE DEL PLAN',
        sortable: true,
        minWidth: 250,
        flex: 1,
      },
      {
        field: 'nombre_eje_estrategico',
        headerName: 'EJE ESTRATÉGICO',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'nombre_objetivo',
        headerName: 'NOMBRE OBJETIVO',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'nombre_meta_eje',
        headerName: 'NOMBRE META',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'numero_meta_eje',
        headerName: 'NÚMERO META',
        sortable: true,
        minWidth: 150,
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
                set_id_eje_estrategico(params.row.id_eje_estrategico);
                set_id_meta_eje(params.row.id_meta_eje);
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: false,
                    editar: true,
                  })
                );
                dispatch(set_current_meta_pgar(params.row));
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
      id_eje_estrategico,
      rows_meta_pgar,
      set_id_eje_estrategico,
      set_id_meta_eje,
      fetch_data_meta_pgar,
    } = useContext(DataContextPgar);

    useEffect(() => {
      if (id_eje_estrategico) {
        fetch_data_meta_pgar();
      }
      console.log(id_eje_estrategico)
    }, [id_eje_estrategico]);

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
            <Title title="Listado de metas PGAR" />
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
                {download_xls({ nurseries: rows_meta_pgar, columns })}
                {download_pdf({
                  nurseries: rows_meta_pgar,
                  columns,
                  title: 'RProgramas',
                })}
              </ButtonGroup>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_meta_pgar}
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
                Agregar Meta PGAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
};