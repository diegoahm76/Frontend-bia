/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { IArchivoFisico, IObjDepositos } from '../interface/archivoFisico';
import { IList } from '../../configuracionMetadatos/interfaces/Metadatos';
import { api } from '../../../../api/axios';
import {
  avanzada_bandeja,
  avanzada_caja,
  avanzada_carpeta,
  avanzada_deposito,
  avanzada_estante,
} from '../store/thunks/thunksArchivoFisico';

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
  const { depositos, estantes, bandejas,cajas,carpetas } = useAppSelector(
    (state) => state.archivo_fisico
  );
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
      field: 'orden_ubicacion_por_caja',
      headerName: 'Órden de carpeta',
      sortable: true,
      width: 200,
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
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <Button
          // onClick={() => handle_selected_expediente(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
  ];
  console.log(depositos);
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
      console.log(estantes);
    }
  }, [deposito_seleccionado]);

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
              marginTop: '20px',
              marginLeft: '-5px',
            }}
          >
            <Title title="BÚSQUEDA AVANZADA" />
            <Grid container sx={{ mt: '10px', mb: '20px' }}>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
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

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                  <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Depósito"
                    variant="outlined"
                    disabled={
                      tipo_elemento_seleccionado !== 'Depósito de Archivo'
                    }
                    error={!(Error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    InputLabelProps={{ shrink: true }}
                    value={tipo_elemento_seleccionado}
                    onChange={(event) => {
                      const selected_deposito = depositos.find(
                        (option) =>
                          option.id_deposito ===
                          (event.target.value
                            ? parseInt(event.target.value, 10)
                            : null)
                      );

                      set_deposito_seleccionado(selected_deposito || null);
                    }}
                  >
                    {depositos.map((option) => (
                      <MenuItem
                        key={option.id_deposito}
                        value={option.id_deposito ?? ''}
                      >
                        {option.nombre_deposito}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                  <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Estante"
                    variant="outlined"
                    disabled={
                      tipo_elemento_seleccionado !== 'Estante' &&
                      (!deposito_seleccionado || isNaN(deposito_seleccionado.id_deposito || NaN))
                    }
                    
                    error={!(Error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) =>
                      set_tipo_elemento_seleccionado(event.target.value)
                    }
                  >
                    {estantes.map((option) => (
                      <MenuItem
                        key={option.id_estante_deposito}
                        value={option.id_estante_deposito ?? ''}
                      >
                        {option.identificacion_por_deposito}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
              <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                  <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Bandeja"
                    variant="outlined"
                    disabled={
                      tipo_elemento_seleccionado !== 'Bandeja' &&
                      (!deposito_seleccionado || isNaN(deposito_seleccionado.id_deposito || NaN))
                    }
                    
                    error={!(Error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) =>
                      set_tipo_elemento_seleccionado(event.target.value)
                    }
                  >
                    {bandejas.map((option) => (
                      <MenuItem
                        key={option.id_bandeja_estante}
                        value={option.id_bandeja_estante ?? ''}
                      >
                        {option.identificacion_por_estante}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> <Grid item xs={12} sm={3.5} margin={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Caja"
                    variant="outlined"
                    disabled={
                      tipo_elemento_seleccionado !== 'Caja' &&
                      (!deposito_seleccionado || isNaN(deposito_seleccionado.id_deposito || NaN))
                    }
                    
                    error={!(Error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) =>
                      set_tipo_elemento_seleccionado(event.target.value)
                    }
                  >
                    {cajas.map((option) => (
                      <MenuItem
                        key={option.id_caja_bandeja}
                        value={option.id_caja_bandeja ?? ''}
                      >
                        {option.identificacion_por_bandeja}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Carpeta"
                    variant="outlined"
                    disabled={
                      tipo_elemento_seleccionado !== 'Carpeta' &&
                      (!deposito_seleccionado || isNaN(deposito_seleccionado.id_deposito || NaN))
                    }
                    
                    error={!(Error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) =>
                      set_tipo_elemento_seleccionado(event.target.value)
                    }
                  >
                    {carpetas.map((option) => (
                      <MenuItem
                        key={option.id_carpeta_caja}
                        value={option.id_carpeta_caja ?? ''}
                      >
                        {option.identificacion_por_caja}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

               
              </Grid>

              <>
                {expedientes.length > 0 && (
                  <Grid item xs={12}>
                    <Title title="Resultados de la búsqueda" />
                    {/* <Typography>Resultados de la búsqueda</Typography> */}
                  </Grid>
                )}
                {expedientes.length > 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                      <>
                        <DataGrid
                          density="compact"
                          autoHeight
                          columns={columns}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          rows={expedientes}
                          getRowId={(row) => row.id_expediente_documental}
                        />
                      </>
                    </Box>
                  </Grid>
                )}
              </>
              <Grid
                container
                spacing={2}
                marginTop={2}
                justifyContent="flex-end"
              >
                <Grid item margin={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={mostrar_busqueda_expediente}
                  >
                    Buscar
                  </Button>
                </Grid>

                <Grid item margin={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    // onClick={handle_close_buscar}
                  >
                    Salir
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BusquedaAvanzadaFisico;
