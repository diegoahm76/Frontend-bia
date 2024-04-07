/* eslint-disable @typescript-eslint/restrict-plus-operands */

import {
  Box,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjDespacho, type IObjItem } from '../interfaces/vivero';
import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../components/Title';
import FormButton from '../../../../components/partials/form/FormButton';
import SearchIcon from '@mui/icons-material/Search';
import {
  set_bien_selected,
  set_current_bien,
  set_items_despacho_aux,
  set_despacho_manual,
} from '../store/slice/viveroSlice';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoBienesDespacho = () => {
  const [selected_row, set_selected_row] = useState([]);
  const [distribucion_manual, set_distribucion_manual] =
    useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [titulo, set_titulo] = useState<string>('Bienes Recibidos');

  // const [action, set_action] = useState<string>("agregar");

  const {
    items_despacho,
    items_despacho_aux,
    items_distribuidos,
    current_despacho,
    realizar_despacho_manual,
  } = useAppSelector((state) => state.nursery);

  useEffect(() => {
    current_despacho.id_vivero_solicita !== null
      ? set_titulo(
          'Bienes recibidos y solicitados por vivero ' +
            current_despacho.nombre_vivero_solicita
        )
      : set_titulo('Bienes recibidos');
  }, [current_despacho]);

  // const [item_solicitudes, set_item_solicitudes] = useState<ItemSolicitudConsumible[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (items_despacho.length > 0) {
      if (items_distribuidos.length > 0) {
        const aux_items: IObjItem[] = [];
        let distribuida: number = 0;

        items_despacho.forEach((option) => {
          distribuida = 0;

          items_distribuidos.forEach((option_distribucion) => {
            if (option.id_bien === option_distribucion.id_bien) {
              distribuida =
                distribuida + (option_distribucion.cantidad_asignada ?? 0);
            }
          });
          aux_items.push({
            ...option,
            cantidad_distribuida: distribuida,
            cantidad_restante: (option.cantidad_entrante ?? 0) - distribuida,
          });
        });
        dispatch(set_items_despacho_aux(aux_items));
      } else {
        dispatch(set_items_despacho_aux(items_despacho));
      }
    }
  }, [items_despacho]);

  useEffect(() => {
    //  console.log('')(items_distribuidos);
    if (items_despacho.length > 0) {
      if (items_distribuidos.length > 0) {
        const aux_items: IObjItem[] = [];
        let distribuida: number = 0;

        items_despacho.forEach((option) => {
          distribuida = 0;

          items_distribuidos.forEach((option_distribucion) => {
            if (option.id_bien === option_distribucion.id_bien) {
              distribuida =
                distribuida + (option_distribucion.cantidad_asignada ?? 0);
            }
          });
          aux_items.push({
            ...option,
            cantidad_distribuida: distribuida,
            cantidad_restante: (option.cantidad_entrante ?? 0) - distribuida,
          });
        });
        dispatch(set_items_despacho_aux(aux_items));
      } else {
        dispatch(set_items_despacho_aux(items_despacho));
      }
    }
  }, [items_distribuidos]);

  const columns_items_despacho: GridColDef[] = [
    {
      field: 'codigo_bien',
      headerName: 'Código',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_bien',
      headerName: 'Nombre',
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cod_tipo_elemento_vivero',
      headerName: 'Tipo',
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === 'P'
            ? 'Producción'
            : params.value === 'D'
            ? 'Distribución'
            : params.value === 'G'
            ? 'Germinación'
            : '-'}
        </div>
      ),
    },
    {
      field: 'cantidad_entrante',
      headerName: 'Cantidad entrante',
      width: 140,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_distribuida',
      headerName: current_despacho.distribucion_confirmada
        ? 'Cantidad distribuida'
        : 'Cantidad a distribuir',
      width: 140,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ?? 0}
        </div>
      ),
    },
    {
      field: 'cantidad_restante',
      headerName: 'Cantidad restante',
      width: 140,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ?? params.row.cantidad}
        </div>
      ),
    },
    {
      field: 'tipo_documento',
      headerName: 'Tipo de documento',
      width: 140,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ?? params.row.cantidad}
        </div>
      ),
    },
    {
      field: 'observacion',
      headerName: 'Observación',
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const handle_selection_change = (selection: any): void => {
    set_selected_row(selection);
  };

  const select_model = (): void => {
    const model = items_despacho_aux.find((p) => p.id_bien === selected_row[0]);
    if (model !== undefined) {
      dispatch(set_bien_selected(model));
      dispatch(set_current_bien(model));
    }
  };

  useEffect(() => {
    const despacho_manual: IObjDespacho = {
      realizar_despacho_manual: distribucion_manual,
    };
    dispatch(set_despacho_manual(despacho_manual));
  }, [distribucion_manual]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          direction="row"
          marginTop={2}
        >
          <Box sx={{ width: '100%' }}>
            <Title title={titulo}></Title>
            <ButtonGroup
              style={{
                margin: 7,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {download_xls({
                nurseries: items_despacho_aux,
                columns: columns_items_despacho,
              })}
              {download_pdf({
                nurseries: items_despacho_aux,
                columns: columns_items_despacho,
                title: 'Resultados',
              })}
            </ButtonGroup>
            {items_despacho_aux && items_despacho_aux.length > 0 ? (
              <DataGrid
                onSelectionModelChange={handle_selection_change}
                density="compact"
                autoHeight
                rows={items_despacho_aux}
                columns={columns_items_despacho}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_bien}
                selectionModel={selected_row}
              />
            ) : (
              <Typography variant="h6" component="h2">
                No hay datos disponibles
              </Typography>
            )}
            {current_despacho.id_vivero_solicita !== null && (
              <Grid item xs={12} md={12}>
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <FormGroup>
                    <FormControlLabel
                      label="Realizar districución manual"
                      control={
                        <Checkbox
                          checked={distribucion_manual}
                          onChange={() => {
                            set_distribucion_manual(!distribucion_manual);
                          }}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                    />
                  </FormGroup>
                </Stack>
              </Grid>
            )}
            {(realizar_despacho_manual.realizar_despacho_manual ||
              current_despacho.id_vivero_solicita === null) && (
              <Grid item xs={12} md={12}>
                <FormButton
                  variant_button="contained"
                  on_click_function={select_model}
                  icon_class={<SearchIcon />}
                  label={'Distribuir bien seleccionado'}
                  type_button="button"
                />
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoBienesDespacho;
