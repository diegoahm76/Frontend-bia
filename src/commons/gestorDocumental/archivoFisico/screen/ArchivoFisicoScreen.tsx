/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, useEffect } from 'react';
import { ColumnProps } from 'primereact/column';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Title } from '../../../../components';
import { LoadingButton } from '@mui/lab';
import BusquedaAvanzadaFisico from '../components/BusquedaAvanzada';
import {
  avanzada_deposito,
  get_expediente,
  tabla_arbol_deposito,
} from '../store/thunks/thunksArchivoFisico';
import {
  IObjBandejaArbol,
  IObjCajaArbol,
  IObjCarpetaArbol,
  IObjDepositos,
  IObjEstanteArbol,
} from '../interface/archivoFisico';
import {
  initial_state_deposito,
  reset_state,
  set_listado_depositos,
} from '../store/slice/indexArchivoFisico';
import StoreIcon from '@mui/icons-material/Store';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import StorageIcon from '@mui/icons-material/Storage';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import FolderIcon from '@mui/icons-material/Folder';
import {
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
import TableRowExpansion from '../../../../components/partials/form/TableRowExpansion';
import { Controller, useForm } from 'react-hook-form';
import { ButtonAdminCarpetas } from '../components/BotonCarpetas';
import { ButtonAdminCajas } from '../components/BotonCajas';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import VerExpediente from '../components/Expediente';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
export const ArchivoFisicoScreen: React.FC = () => {
  const { control: control_deposito, reset } = useForm<IObjDepositos>();
  const { control: control_estante, reset: reset_estante } =
    useForm<IObjEstanteArbol>();
  const { control: control_bandeja, reset: reset_bandeja } =
    useForm<IObjBandejaArbol>();
  const { control: control_caja, reset: reset_caja } = useForm<IObjCajaArbol>();
  const { control: control_carpeta, reset: reset_carpeta } =
    useForm<IObjCarpetaArbol>();
  const { arbol_deposito, depositos_tabla } = useAppSelector(
    (state) => state.archivo_fisico
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [selected_arbol, set_selected_arbol] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [expanded_rows, set_expanded_rows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [rows_update, set_rows_update] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [open_modal_avanzada, set_open_modal_avanzada] = useState(false);

  const [open_modal_exp, set_open_modal_exp] = useState(false);
  const handle_buscar = () => {
    set_open_modal_avanzada(true);
  };
  const handle_exp = () => {
    set_open_modal_exp(true);
  };
  const handle_close_exp = () => {
    set_open_modal_exp(false);
  };


  const handle_close_buscar = () => {
    set_open_modal_avanzada(false);
  };
  const reiniciar = (): void => {
    void dispatch(avanzada_deposito());
    set_selected_arbol(null)
    set_expanded_rows({})
  };
  useEffect(() => {
    reset(selected_arbol);
    reset_estante(selected_arbol);
    reset_bandeja(selected_arbol);
    reset_caja(selected_arbol);
    reset_carpeta(selected_arbol);
    console.log(selected_arbol);
  }, [selected_arbol]);




  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  const columns_arbol_deposito: ColumnProps[] = [
    {
      field: 'nombre_deposito',
      header: (
        <div>
          <span>Deposito</span>
          <span style={{ marginLeft: '5px' }}>
            <StoreIcon />
          </span>
        </div>
      ),
    },
    {
      field: 'identificacion_por_entidad',
      header: (
        <div>
          <span>Identificación</span>
          <span style={{ marginLeft: '5px' }}>
            <StoreIcon />
          </span>
        </div>
      ),
    },
  ];
  const columns_arbol_estantes: ColumnProps[] = [
    {
      field: 'Informacion_Mostrar',
      header: (
        <div>
          <span>Estante</span>
          <span style={{ marginLeft: '5px' }}>
            <IndeterminateCheckBoxIcon />
          </span>
        </div>
      ),
    },
    {
      field: 'identificacion_por_estante',
      header: (
        <div>
          <span>Identificación</span>
          <span style={{ marginLeft: '5px' }}>
            <IndeterminateCheckBoxIcon />
          </span>
        </div>
      ),
    },
  ];
  const columns_arbol_bandejas: ColumnProps[] = [
    {
      field: 'Informacion_Mostrar',
      header: (
        <div>
          <span>Bandeja</span>
          <span style={{ marginLeft: '5px' }}>
            <StorageIcon />
          </span>
        </div>
      ),
    },
    {
      field: 'identificacion_por_bandeja',
      header: (
        <div>
          <span>Identificación</span>
          <span style={{ marginLeft: '5px' }}>
            <StorageIcon />
          </span>
        </div>
      ),
    },
  ];
  const columns_arbol_cajas: ColumnProps[] = [
    {
      field: 'Informacion_Mostrar',
      header: (
        <div>
          <span>Cajas</span>
          <span style={{ marginLeft: '5px' }}>
            <Inventory2TwoToneIcon />
          </span>
        </div>
      ),
    },
    {
      field: 'identificacion_por_caja',
      header: (
        <div>
          <span>Identificación</span>
          <span style={{ marginLeft: '5px' }}>
            <Inventory2TwoToneIcon />
          </span>
        </div>
      ),
    },
  ];
  const columns_arbol_carpetas: ColumnProps[] = [
    {
      field: 'Informacion_Mostrar',
      header: (
        <div>
          <span>Carpeta</span>
          <span style={{ marginLeft: '5px' }}>
            <FolderIcon />
          </span>
        </div>
      ),
    },
    {
      field: 'identificacion_por_carpeta',
      header: (
        <div>
          <span>Identificación</span>
          <span style={{ marginLeft: '5px' }}>
            <FolderIcon />
          </span>
        </div>
      ),
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
      column_id: 'identificacion_por_carpeta',
      level: 4,
      columns: columns_arbol_carpetas,
      table_name: 'Carpetas',
      property_name: 'carpetas',
    },
  ];

  useEffect(() => {
    void dispatch(avanzada_deposito());
  }, []);

  useEffect(() => {
    console.log(expanded_rows);
  }, [expanded_rows]);
  console.log(selected_arbol);
  useEffect(() => {
    const deposito_actual: IObjDepositos | undefined = depositos_tabla.find(
      (objeto) => objeto.id_deposito === arbol_deposito.deposito.id_deposito
    );
    if (deposito_actual !== undefined) {
      let deposito_actual_aux: IObjDepositos = initial_state_deposito;
      deposito_actual_aux = {
        ...deposito_actual,
        estante: arbol_deposito.estantes,
      };
      const depositos_aux: IObjDepositos[] = depositos_tabla.map((objeto) => {
        if (objeto.id_deposito === deposito_actual_aux?.id_deposito) {
          return deposito_actual_aux;
        }
        return objeto;
      });
      dispatch(set_listado_depositos(depositos_aux));
    }
  }, [arbol_deposito]);
  const expansion_row_principal = (data: any) => {
    const rows_update_aux = [];
    for (let propiedad in data.data) {
      const elemento_encontrado = rows_update.find(
        (elemento) => elemento === propiedad
      );
      if (elemento_encontrado === undefined) {
        const deposito_actual = depositos_tabla.find(
          (objeto) => objeto.identificacion_por_entidad === propiedad
        );
        if (deposito_actual) {
          const flag = 'estante' in deposito_actual;
          if (!flag) {
            void dispatch(
              tabla_arbol_deposito(deposito_actual?.id_deposito ?? '')
            );
          }
        }
      }
      rows_update_aux.push(propiedad);
    }
    set_rows_update(rows_update_aux);
  };
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
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Title title="ARCHIVO FÍSICO" />
        {selected_arbol && selected_arbol.id_deposito && (
          <Grid container justifyContent={'center'}>
            <Typography
              variant="h6"
              align="center"
              marginTop={2}
              style={{ fontSize: '0.9rem' }}
            >
              TIPO DE ELEMENTO - DEPOSITOS
            </Typography>
          </Grid>
        )}
        {selected_arbol && selected_arbol.id_deposito && (
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="nombre_deposito"
                control={control_deposito}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Nombre"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="direccion_deposito"
                control={control_deposito}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Direccion"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="identificacion_por_entidad"
                control={control_deposito}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Identificacion"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="orden_ubicacion_por_entidad"
                control={control_deposito}
                defaultValue={0}
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Orden"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
        {selected_arbol && selected_arbol.id_estante && (
          <Grid container justifyContent={'center'}>
            <Typography
              variant="h6"
              align="center"
              marginTop={2}
              style={{ fontSize: '0.9rem' }}
            >
              TIPO DE ELEMENTO - ESTANTE
            </Typography>
          </Grid>
        )}
        {selected_arbol && selected_arbol.id_estante && (
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="identificacion_por_estante"
                control={control_estante}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Identificacion"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="orden_estante"
                control={control_estante}
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Orden"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
        {selected_arbol && selected_arbol.id_bandeja && (
          <Grid container justifyContent={'center'}>
            <Typography
              variant="h6"
              align="center"
              marginTop={2}
              style={{ fontSize: '0.9rem' }}
            >
              TIPO DE ELEMENTO - BANDEJA
            </Typography>
          </Grid>
        )}
        {selected_arbol && selected_arbol.id_bandeja && (
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="identificacion_por_bandeja"
                control={control_bandeja}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Identificacion"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="orden_bandeja"
                control={control_bandeja}
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Orden"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
        {selected_arbol && selected_arbol.id_caja && (
          <Grid container justifyContent={'center'}>
            <Typography
              variant="h6"
              align="center"
              marginTop={2}
              style={{ fontSize: '0.9rem' }}
            >
              TIPO DE ELEMENTO - CAJA
            </Typography>
          </Grid>
        )}
        {selected_arbol && selected_arbol.id_caja && (
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="identificacion_por_caja"
                control={control_caja}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Identificacion"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="orden_caja"
                control={control_caja}
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Orden"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
            <Grid item marginTop={2.5}>
              <ButtonAdminCajas />
            </Grid>
          </Grid>
        )}

        {selected_arbol && selected_arbol.id_carpeta && (
          <Grid container justifyContent={'center'}>
            <Typography
              variant="h6"
              align="center"
              marginTop={2}
              style={{ fontSize: '0.9rem' }}
            >
              TIPO DE ELEMENTO - CARPETA
            </Typography>
          </Grid>
        )}
        {selected_arbol && selected_arbol.id_carpeta && (
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="identificacion_por_carpeta"
                control={control_carpeta}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Identificación"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="orden_carpeta"
                control={control_carpeta}
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Órden"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2} margin={2} marginTop={2.5}>
              <Controller
                name="numero_expediente"
                control={control_carpeta}
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    label="Número de Expediente"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                    error={!(error == null)}
                    sx={{
                      backgroundColor: 'white',
                    }}
                    disabled={true}
                  />
                )}
              />
            </Grid>

            <Grid item marginTop={2.6}>
              <ButtonAdminCarpetas />
            </Grid>
            {selected_arbol && selected_arbol.id_expediente && (
            <Grid container justifyContent={'center'}>
              <Grid item marginTop={2.5} marginLeft={2}>
                <Button
                 variant="outlined"
                 color="warning"
                  onClick={handle_exp}
                  disabled={false}
                >
                  Ver expediente
                </Button>
              </Grid>{' '}
            </Grid>
              )}
          </Grid>
        )}

        <Grid container justifyContent={'center'}>
          <TableRowExpansion
            products={depositos_tabla}
            definition_levels={definition_levels}
            selectedItem={selected_arbol}
            setSelectedItem={set_selected_arbol}
            expandedRows={expanded_rows}
            setExpandedRows={set_expanded_rows}
            onRowToggleFunction={expansion_row_principal}
            initial_allow_expansion={true}
          />
        </Grid>
        {open_modal_avanzada && (
          <Grid item xs={12} marginY={1}>
            <BusquedaAvanzadaFisico
              open={open_modal_avanzada}
              handle_close_buscar={handle_close_buscar}
              set_tipo={set_expanded_rows}
            />
          </Grid>
        )}

        <Grid container justifyContent="center" marginTop={2} spacing={2}>
          <Grid item>
            <LoadingButton
              variant="contained"
              onClick={handle_buscar}
              disabled={false}
            >
              Busqueda Avanzada
            </LoadingButton>
          </Grid>

          <Grid item>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={reiniciar}
              variant_button={'outlined'}
              clean_when_leaving={false}
            />
          </Grid>
        </Grid>

        
        {open_modal_exp && (
          <VerExpediente
            open={open_modal_exp}
            handle_close_exp={handle_close_exp}
            selected_arbol={selected_arbol}

          />
        )}
      </Grid>
    </>
  );
};
