import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { obtener_bienes, obtener_bienes_por_pagina, obtener_entradas_filtros } from '../commons/almacen/entradaDeAlmacen/thunks/Entradas';
import { useAppDispatch } from '../hooks';
import { Title } from './Title';
import SearchIcon from '@mui/icons-material/Search';
import { download_xls_dos } from '../documentos-descargar/XLS_descargar';
import { download_pdf_dos } from '../documentos-descargar/PDF_descargar';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: any[] }) => React.ReactNode;
}

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  articulo: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaArticulos: React.FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [codigo, set_codigo] = useState<string>('');
  const [nombre, set_nombre] = useState<string>('');
  const [bienes, set_bienes] = useState<any>(null);
  const [seleccion_articulo, set_seleccion_articulo] = useState<Record<string, any> | null>(null);
  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  const on_change_codigo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_codigo(e.target.value);
  };

  const on_change_nombre: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre(e.target.value);
  };

  const accionar_busqueda: any = () => {
    set_loadding_tabla(true);

    dispatch(obtener_entradas_filtros(codigo ?? '', nombre ?? '')).then(
      (response: any) => {
        if (Object.keys(response).length !== 0) {
          set_bienes(()=>{
            return {
              pagination: response.pagination,
              articulos: response.data
            };
          });
          set_loadding_tabla(false);
        }
      }
    );
  };

  const limpiar_form = () => {
    set_codigo('');
    set_nombre('');
  }

  const selected_product_grid: any = () => {
    props.articulo(seleccion_articulo);
    props.set_is_modal_active(false);
    console.log(bienes);
  };

  useEffect(() => {
    dispatch(obtener_bienes()).then(
      (response: any) => {
        if (response.success) {
          const articulos = response.data.filter(
            (e: { nivel_jerarquico: number }) => e.nivel_jerarquico === 5
          );
          set_bienes(() => {
            return {
              pagination: response.pagination,
              articulos: articulos
            };
          });
        }
      }
    );
  }, []);

  const columnsss: custom_column[] = [
    {
      field: 'id_bien',
      headerName: 'Id',
      minWidth: 80,
      maxWidth: 100
    },
    {
      field: 'codigo_bien',
      headerName: 'Código',
      minWidth: 160,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      minWidth: 420,
    },
    {
      field: 'tipo_bien',
      headerName: 'Tipo bien',
      minWidth: 100
    },
  ];

  const handle_seleccionar_filas = (selectionModel: GridRowId[]) => {
    // Filtrar objetos basados en los IDs seleccionados
    const filas_filtradas = selectionModel.map(id_bien => {
      // Encontrar el objeto con el ID correspondiente
      return bienes?.articulos.find((bien : any) => bien.id_bien === id_bien);
    });

    // Filtrar objetos nulos (por si no se encuentra coincidencia)
    const filas_filtradas_validas = filas_filtradas.filter(bien => bien !== undefined);

    // Actualizar el estado con las filas seleccionadas
    set_seleccion_articulo(filas_filtradas_validas[0]);
  };

  const pagina_siguiente = () => {
    if (Number(bienes.pagination.pagina_actual) === Number(bienes.pagination.total_paginas)) {
      return;
    }

    set_loadding_tabla(true);

    dispatch(obtener_bienes_por_pagina(
      (Number(bienes?.pagination.pagina_actual) + 1).toString())
    ).then(
      (response: any) => {
        if (response.success) {
          const articulos = response.data.filter(
            (e: { nivel_jerarquico: number }) => e.nivel_jerarquico === 5
          );
          set_bienes(() => {
            return {
              pagination: response.pagination,
              articulos: articulos
            };
          });
          set_loadding_tabla(false);
        }
      }
    );
  }

  const pagina_atras = () => {
    if (Number(bienes.pagination.pagina_actual) === 1) {
      return;
    }

    set_loadding_tabla(true);

    dispatch(obtener_bienes_por_pagina(
      (Number(bienes?.pagination.pagina_actual) - 1).toString())
    ).then(
      (response: any) => {
        if (response.success) {
          const articulos = response.data.filter(
            (e: { nivel_jerarquico: number }) => e.nivel_jerarquico === 5
          );
          set_bienes(() => {
            return {
              pagination: response.pagination,
              articulos: articulos
            };
          });
          set_loadding_tabla(false);
        }
      }
    );
  }


  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.is_modal_active}
      onClose={() => {
        props.set_is_modal_active(false);
      }}
    >
      <DialogTitle>Selección de articulos</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Código"
                  helperText="Ingrese código"
                  size="small"
                  fullWidth
                  value={codigo}
                  onChange={on_change_codigo}
                />
              </Grid>

              <Grid item xs={12} lg={4}>
                <TextField
                  label="Nombre"
                  helperText="Ingrese nombre"
                  size="small"
                  fullWidth
                  value={nombre}
                  onChange={on_change_nombre}
                />
              </Grid>

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={accionar_busqueda}
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="error"
                  variant="outlined"
                  startIcon={<CleaningServicesIcon />}
                  onClick={limpiar_form}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <Grid item xs={12} sm={12}>
                <Title title="Resultados" />
                <Box sx={{ width: '100%', mt: '20px' }}>
                  <ButtonGroup
                    style={{
                      margin: 7,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {download_xls_dos({
                      nurseries: bienes?.articulos,
                      columns: columnsss,
                    })}
                    {download_pdf_dos({
                      nurseries: bienes?.articulos,
                      columns: columnsss,
                      title: 'Resultados',
                    })}
                  </ButtonGroup>
                  <DataGrid
                    style={{ margin: '15px 0px' }}
                    density="compact"
                    loading={loadding_tabla}
                    autoHeight
                    rows={bienes?.articulos ?? []}
                    columns={columnsss ?? []}
                    pageSize={10}
                    rowHeight={55}
                    experimentalFeatures={{ newEditingApi: true }}
                    onSelectionModelChange={handle_seleccionar_filas}
                    getRowId={(res) => res?.id_bien === undefined ? uuidv4() : res.id_bien}
                    hideFooterPagination
                  />
                  <Grid item xs={12} container sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    mt: '20px',
                  }}>
                    <Grid item sx={{
                      cursor: 'pointer',
                      background: '#F5F5F5',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      boxShadow: '0px 3px 6px #042F4A26',
                      // quitamos el hover si es la primera pagina o si no hay datos
                      ...(Number(bienes?.pagination.pagina_actual) === 1  && {
                        pointerEvents: 'none',
                        background: '#f2f2f2',
                      }),
                      '&:hover': {
                        background: '#E0E0E0',
                        transition: 'all 0.3s ease',
                      },
                      '&:active': {
                        background: '#BDBDBD',
                        transition: 'all 0.3s ease',
                      }
                    }}
                      onClick={() => pagina_atras()}
                    >
                      <ChevronLeftIcon />
                    </Grid>

                    <Grid item sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#042F4A',
                      mx: '20px',
                    }}>
                      {bienes?.pagination.pagina_actual ?? '...'} de {bienes?.pagination.total_paginas ?? '...'}
                    </Grid>

                    <Grid item sx={{
                      cursor: 'pointer',
                      background: '#F5F5F5',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      boxShadow: '0px 3px 6px #042F4A26',
                      // quitamos el hover si es la ultima pagina
                      ...(Number(bienes?.pagination.pagina_actual) === Number(bienes?.pagination.total_paginas) && {
                        pointerEvents: 'none',
                        background: '#F5F5F5',
                      }),
                      '&:hover': {
                        background: '#E0E0E0',
                        transition: 'all 0.3s ease',
                      },
                      '&:active': {
                        background: '#BDBDBD',
                        transition: 'all 0.3s ease',
                      }
                    }}
                      onClick={() => pagina_siguiente()}
                    >
                      <NavigateNextIcon />
                    </Grid>

                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          variant="contained"
          onClick={() => {
            props.set_is_modal_active(false);
          }}
        >
          Cerrar
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={selected_product_grid}
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
