/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  IArchivoFisico,
  IObjBandejas,
  IObjDepositos,
  IObjEstantes,
  IObjcajas,
} from '../interface/archivoFisico';
import { IList } from '../../configuracionMetadatos/interfaces/Metadatos';
import { api } from '../../../../api/axios';
import {
  avanzada_bandeja,
  avanzada_caja,
  avanzada_carpeta,
  avanzada_deposito,
  avanzada_estante,
  tabla_arbol_deposito,
} from '../store/thunks/thunksArchivoFisico';
import { ColumnProps } from 'primereact/column';
import TableRowExpansion from '../../../../components/partials/form/TableRowExpansion';
import {
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
import { initial_state_deposito, set_listado_depositos } from '../store/slice/indexArchivoFisico';

interface IProps {
  open: any;
  handle_close_buscar: any;
}

const BusquedaAvanzadaFisico = ({ open, handle_close_buscar }: IProps) => {
  const { control: control_busqueda_archivo_fisico, getValues: get_values } =
    useForm<IArchivoFisico>();
  const { expedientes } = useAppSelector((state) => state.cierre_expedientes);
  const dispatch = useAppDispatch();
  const [tipo_elemento, set_tipo_elemnto] = useState<IList[]>([]);
  const [tipo_elemento_seleccionado, set_tipo_elemento_seleccionado] =
    useState('');
  const [deposito_seleccionado, set_deposito_seleccionado] =
    useState<IObjDepositos | null>(null);
  const [estante_seleccionado, set_estante_seleccionado] =
    useState<IObjEstantes | null>(null);
  const [bandeja_seleccionado, set_bandeja_seleccionado] =
    useState<IObjBandejas | null>(null);
  const [caja_seleccionado, set_caja_seleccionado] = useState<IObjcajas | null>(
    null
  );
  const [selectedPqr, setSelectedPqr] = useState<any>();

  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [rows_update, set_rows_update] =
    useState<string[]>([]);
  const [selected_items, set_selected_items] = useState({
    tipoElemento: '',
    deposito: null,
    estante: null,
    bandeja: null,
    caja: null,
    carpeta: null,
  });
  const {
    depositos,
    estantes,
    bandejas,
    cajas,
    carpetas,
    arbol_deposito,
    depositos_tabla,
  } = useAppSelector((state) => state.archivo_fisico);

  // ARBOL //////////////////////////////////////////////

  const columns_arbol_deposito: ColumnProps[] = [
    {
      field: 'identificacion_por_entidad',
      header: 'Identificaciòn Entidad',
    },
    {
      field: 'nombre_deposito',
      header: 'Deposito',
    },
  ];
  const columns_arbol_estantes: ColumnProps[] = [
    {
      field: 'Informacion_Mostrar',
      header: 'Estante',
    },
    {
      field: 'identificacion_por_estante',
      header: 'Identificacion',
    },
  ];
  const columns_arbol_bandejas: ColumnProps[] = [
    {
      field: 'Informacion_Mostrar',
      header: 'Bandeja',
    },
    {
      field: 'identificacion_por_bandeja',
      header: 'Identificacion',
    },
  ];
  const columns_arbol_cajas: ColumnProps[] = [
    {
      field: 'Informacion_Mostrar',
      header: 'Cajas',
    },
    {
      field: 'identificacion_por_caja',
      header: 'Identificacion',
    },
  ];
  const columns_arbol_carpetas: ColumnProps[] = [
    {
      field: 'Informacion_Mostrar',
      header: 'Carpeta',
    },
    {
      field: 'identificacion_por_carpeta',
      header: 'Identificaciona',
    },
  ];

  const definition_levels = [
    {
      column_id: 'identificacion_por_entidad',
      level: 0,
      columns: columns_arbol_deposito,
      table_name: 'Depositos',
      property_name: '',
    },
    {
      column_id: 'identificacion_por_estante',
      level: 1,
      columns: columns_arbol_estantes,
      table_name: 'Estantes',
      property_name: 'estante',
    },
    {
      column_id: 'identificacion_por_bandeja',
      level: 2,
      columns: columns_arbol_bandejas,
      table_name: 'Bandejas',
      property_name: 'bandejas',
    },
    {
      column_id: 'identificacion_por_caja',
      level: 3,
      columns: columns_arbol_cajas,
      table_name: 'Cajas',
      property_name: 'cajas',
    },
    {
      column_id: 'identificacion_por_carpetas',
      level: 4,
      columns: columns_arbol_carpetas,
      table_name: 'Carpetas',
      property_name: 'carpetas',
    },
  ];

  // AVANZADA//////////////////////////////////////////////////////
  useEffect(() => {
    //  void dispatch(get_trd())
    //   void dispatch(get_tipologias())
  }, []);

  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };

  const columns: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          // onClick={() => handle_selected_expediente(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'orden_ubicacion_por_caja',
      headerName: 'Órden de carpeta',
      sortable: true,
      width: 100,
    },
    {
      field: 'identificacion_por_caja',
      headerName: 'Identificación de la Carpeta',
      sortable: true,
      width: 200,
    },
    {
      field: 'numero_expediente',
      headerName: 'Número de expediente',
      width: 200,
    },
    {
      field: 'identificacion_caja',
      headerName: 'Identificación de la caja',
      width: 250,
    },
    {
      field: 'identificacion_bandeja',
      headerName: 'Identificación de la Bandeja',
      width: 200,
    },
    {
      field: 'identificacion_estante',
      headerName: 'Identificación del Estante',
      width: 200,
    },
    {
      field: 'nombre_deposito',
      headerName: 'Nombre del Depósito',
      width: 200,
    },
  ];

  const columns_estantes: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <Button
          // onClick={() => handle_selected_expediente(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'orden_ubicacion_por_deposito',
      headerName: 'Orden Estante',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_por_deposito',
      headerName: 'Estante',
      sortable: true,
      width: 200,
    },

    {
      field: 'nombre_deposito',
      headerName: 'Nombre Depósito',
      sortable: true,
      width: 200,
    },
  ];

  const columns_depositos: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          // onClick={() => handle_selected_expediente(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'nombre_deposito',
      headerName: 'Nombre Depósito',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_por_entidad',
      headerName: 'Identificación Depósito',
      sortable: true,
      width: 200,
    },
  ];

  const columns_bandejas: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          // onClick={() => handle_selected_expediente(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'orden_ubicacion_por_estante',
      headerName: 'Orden',
      sortable: true,
      width: 100,
    },
    {
      field: 'identificacion_por_estante',
      headerName: 'Bandeja',
      sortable: true,
      width: 200,
    },

    {
      field: 'identificacion_estante',
      headerName: 'Estante',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_deposito',
      headerName: 'Deposito',
      sortable: true,
      width: 200,
    },
  ];

  const columns_cajas: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          // onClick={() => handle_selected_expediente(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'orden_ubicacion_por_bandeja',
      headerName: 'Orden',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_por_bandeja',
      headerName: 'Caja',
      sortable: true,
      width: 200,
    },

    {
      field: 'identificacion_bandeja',
      headerName: 'Bandeja',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_estante',
      headerName: 'Estante',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_deposito',
      headerName: 'Deposito',
      sortable: true,
      width: 200,
    },
  ];

  const columns_carpetas: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_caja',
      headerName: 'Orden',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_por_caja',
      headerName: 'Carpeta',
      sortable: true,
      width: 200,
    },
    {
      field: 'numero_expediente',
      headerName: 'Num. Expediente',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_caja',
      headerName: 'Caja',
      sortable: true,
      width: 200,
    },

    {
      field: 'identificacion_bandeja',
      headerName: 'Bandeja',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_estante',
      headerName: 'Estante',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_deposito',
      headerName: 'Deposito',
      sortable: true,
      width: 200,
    },
  ];

  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: tipo_elemento_no_format } = await api.get(
          'gestor/choices/tipo-elemento-deposito/'
        );

        const tipo_elemento_format: IList[] = text_choise_adapter(
          tipo_elemento_no_format
        );

        set_tipo_elemnto(tipo_elemento_format);
      } catch (err) {
        console.log(err);
      }
    };

    void get_selects_options();
  }, []);

  useEffect(() => {
    if (tipo_elemento_seleccionado === 'Depósito de Archivo') {
      void dispatch(avanzada_deposito());
    }
    if (tipo_elemento_seleccionado === 'Estante') {
      void dispatch(avanzada_estante(null));
    }
    if (tipo_elemento_seleccionado === 'Bandeja') {
      void dispatch(avanzada_bandeja(null));
    }
    if (tipo_elemento_seleccionado === 'Caja') {
      void dispatch(avanzada_caja(null));
    }
    if (tipo_elemento_seleccionado === 'Carpeta') {
      void dispatch(avanzada_carpeta(null));
    }
  }, [tipo_elemento_seleccionado]);

  useEffect(() => {
    if (
      deposito_seleccionado !== null &&
      deposito_seleccionado.id_deposito !== undefined
    ) {
      void dispatch(avanzada_estante(deposito_seleccionado.id_deposito));
      console.log(deposito_seleccionado);
    }
  }, [deposito_seleccionado]);

  useEffect(() => {
    if (
      estante_seleccionado !== null &&
      estante_seleccionado.identificacion_por_deposito !== undefined
    ) {
      estante_seleccionado !== null &&
        void dispatch(
          avanzada_bandeja(estante_seleccionado.identificacion_por_deposito)
        );
      console.log(estante_seleccionado);
    }
  }, [estante_seleccionado]);

  useEffect(() => {
    if (
      bandeja_seleccionado !== null &&
      bandeja_seleccionado.identificacion_por_estante !== undefined
    ) {
      estante_seleccionado !== null &&
        void dispatch(
          avanzada_caja(bandeja_seleccionado.identificacion_por_estante)
        );
      console.log(bandeja_seleccionado);
    }
  }, [bandeja_seleccionado]);

  useEffect(() => {
    if (
      caja_seleccionado !== null &&
      caja_seleccionado.identificacion_por_bandeja !== undefined
    ) {
      estante_seleccionado !== null &&
        void dispatch(
          avanzada_carpeta(caja_seleccionado.identificacion_por_bandeja)
        );
      console.log(caja_seleccionado);
    }
  }, [caja_seleccionado]);
  useEffect(() => {
    const deposito_actual:IObjDepositos | undefined = depositos_tabla.find(objeto => objeto.id_deposito === arbol_deposito.deposito.id_deposito);
    if(deposito_actual !== undefined){
      let deposito_actual_aux: IObjDepositos = initial_state_deposito
      deposito_actual_aux = {
        ...deposito_actual,
        estante:arbol_deposito.estantes
      };
      const depositos_aux:IObjDepositos[] = depositos_tabla.map(objeto => {
        if (objeto.id_deposito === deposito_actual_aux?.id_deposito) {
          return deposito_actual_aux;
        }
        return objeto;
      });
      dispatch(set_listado_depositos(depositos_aux))
    }
  }, [arbol_deposito]);

  const handleBuscarClick = () => {
    set_selected_items((prevItems: any) => ({
      ...prevItems,
      tipoElemento: tipo_elemento_seleccionado,
    }));
  };

  const expansion_row_principal = (data:any) => {
    const rows_update_aux=[]
    for (let propiedad in data.data) {
      const elemento_encontrado = rows_update.find(elemento => elemento === propiedad);
      if (elemento_encontrado === undefined) {
        const deposito_actual = depositos_tabla.find(objeto => objeto.identificacion_por_entidad === propiedad);
        if (deposito_actual){
          const flag = 'estante' in deposito_actual
          if(!flag){
          void dispatch (tabla_arbol_deposito(deposito_actual?.id_deposito ?? ''))}
        }
      } 
        rows_update_aux.push(propiedad);
    }
    set_rows_update(rows_update_aux)
  };

  return (
    <>
      <Grid item>
        <Button variant="contained" color="primary">
          Buscar
        </Button>
      </Grid>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handle_close_buscar}>
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginLeft: '-5px',
            }}
          >
            <TableRowExpansion
              products={depositos_tabla}
              definition_levels={definition_levels}
              selectedItem={selectedPqr}
              setSelectedItem={setSelectedPqr}
              expandedRows={expandedRows}
              setExpandedRows={setExpandedRows}
              onRowToggleFunction={expansion_row_principal}
              initial_allow_expansion={true}
            />

            <Title title="BÚSQUEDA AVANZADA" />
            <Grid container sx={{ mt: '10px', mb: '20px' }}>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={3.5} margin={2} marginTop={1.2}>
                  <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Tipo de Elemento"
                    variant="outlined"
                    disabled={false}
                    error={!(Error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) =>
                      set_tipo_elemento_seleccionado(event.target.value)
                    }
                  >
                    {tipo_elemento.map((option) => (
                      <MenuItem key={option.label} value={option.label ?? ''}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={3.5} margin={2}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={depositos}
                    value={depositos.find(
                      (option) =>
                        option.id_deposito ===
                        (tipo_elemento_seleccionado
                          ? parseInt(tipo_elemento_seleccionado, 10)
                          : null)
                    )}
                    onChange={(event, newValue) => {
                      set_deposito_seleccionado(newValue || null);
                    }}
                    getOptionLabel={(option) => option.nombre_deposito ?? ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Depósito"
                        variant="outlined"
                        size="small"
                        disabled={
                          tipo_elemento_seleccionado !== 'Depósito de Archivo'
                        }
                        error={!(Error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3.5} margin={2}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={estantes}
                    value={estantes.find(
                      (option) =>
                        option.id_estante_deposito ===
                        (tipo_elemento_seleccionado
                          ? parseInt(tipo_elemento_seleccionado, 10)
                          : null)
                    )}
                    onChange={(event, newValue) => {
                      set_estante_seleccionado(newValue || null);
                    }}
                    getOptionLabel={(option) =>
                      option.identificacion_por_deposito ?? ''
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Estante"
                        variant="outlined"
                        size="small"
                        disabled={tipo_elemento_seleccionado !== 'Estante'}
                        error={!(Error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
                <Grid item xs={12} sm={3.5} margin={2}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={bandejas}
                    value={bandejas.find(
                      (option) =>
                        option.id_bandeja_estante ===
                        (tipo_elemento_seleccionado
                          ? parseInt(tipo_elemento_seleccionado, 10)
                          : null)
                    )}
                    onChange={(event, newValue) => {
                      set_bandeja_seleccionado(newValue || null);
                    }}
                    getOptionLabel={(option) =>
                      option.identificacion_por_estante ?? ''
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Bandeja"
                        variant="outlined"
                        size="small"
                        disabled={tipo_elemento_seleccionado !== 'Bandeja'}
                        error={!(Error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3.5} margin={2}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={cajas}
                    value={cajas.find(
                      (option) =>
                        option.id_bandeja_estante ===
                        (tipo_elemento_seleccionado
                          ? parseInt(tipo_elemento_seleccionado, 10)
                          : null)
                    )}
                    onChange={(event, newValue) => {
                      set_caja_seleccionado(newValue || null);
                    }}
                    getOptionLabel={(option) =>
                      option.identificacion_por_bandeja ?? ''
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Caja"
                        variant="outlined"
                        size="small"
                        disabled={tipo_elemento_seleccionado !== 'Caja'}
                        error={!(Error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3.5} margin={2}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={carpetas}
                    value={carpetas.find(
                      (option) =>
                        option.id_carpeta_caja ===
                        (tipo_elemento_seleccionado
                          ? parseInt(tipo_elemento_seleccionado, 10)
                          : null)
                    )}
                    onChange={(event, newValue) => {
                      set_deposito_seleccionado(newValue || null);
                    }}
                    getOptionLabel={(option) =>
                      option.identificacion_por_caja ?? ''
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Carpeta"
                        variant="outlined"
                        size="small"
                        disabled={tipo_elemento_seleccionado !== 'Carpeta'}
                        error={!(Error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>

                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item marginRight={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBuscarClick}
                    >
                      Buscar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
                <>
                  {selected_items.tipoElemento === 'Depósito de Archivo' && (
                    <Box sx={{ width: '50%' }}>
                      <>
                        <DataGrid
                          density="compact"
                          autoHeight
                          columns={columns_depositos}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          rows={depositos}
                          getRowId={(row) => row.id_deposito}
                        />
                      </>
                    </Box>
                  )}
                  {selected_items.tipoElemento === 'Estante' && (
                    <Box sx={{ width: '60%' }}>
                      <>
                        <DataGrid
                          density="compact"
                          autoHeight
                          columns={columns_estantes}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          rows={estantes}
                          getRowId={(row) => row.id_estante_deposito}
                        />
                      </>
                    </Box>
                  )}
                  {selected_items.tipoElemento === 'Bandeja' && (
                    <Box sx={{ width: '75%' }}>
                      <>
                        <DataGrid
                          density="compact"
                          autoHeight
                          columns={columns_bandejas}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          rows={bandejas}
                          getRowId={(row) => row.id_bandeja_estante}
                        />
                      </>
                    </Box>
                  )}
                  {selected_items.tipoElemento === 'Caja' && (
                    <Grid item xs={12}>
                      <Box sx={{ width: '100%' }}>
                        <>
                          <DataGrid
                            density="compact"
                            autoHeight
                            columns={columns_cajas}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            rows={cajas}
                            getRowId={(row) => row.id_caja_bandeja}
                          />
                        </>
                      </Box>
                    </Grid>
                  )}
                  {selected_items.tipoElemento === 'Carpeta' && (
                    <Grid item xs={12}>
                      <Box sx={{ width: '100%' }}>
                        <>
                          <DataGrid
                            density="compact"
                            autoHeight
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            rows={carpetas}
                            getRowId={(row) => row.id_carpeta_caja}
                          />
                        </>
                      </Box>
                    </Grid>
                  )}
                </>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BusquedaAvanzadaFisico;
