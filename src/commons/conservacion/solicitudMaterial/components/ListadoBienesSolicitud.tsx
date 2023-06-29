import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjBienesSolicitud } from '../interfaces/solicitudVivero';
import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../components/Title';
import FormButton from '../../../../components/partials/form/FormButton';
import SearchIcon from '@mui/icons-material/Search';
import {
  set_bien_selected,
  set_bienes_solicitud_aux,
} from '../../distribucion/store/slice/distribucionSlice';
import { type IObjBienDespacho } from '../../distribucion/interfaces/distribucion';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoBienesSolicitud = () => {
  const [selected_row, set_selected_row] = useState([]);

  // const [action, set_action] = useState<string>("agregar");

  const { bienes_solicitud } = useAppSelector(
    (state) => state.solicitud_vivero
  );
  const { bienes_solicitud_aux, bienes_despacho } = useAppSelector(
    (state) => state.distribucion
  );

  // const [item_solicitudes, set_item_solicitudes] = useState<ItemSolicitudConsumible[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(bienes_solicitud, bienes_despacho.length);
    if (bienes_solicitud.length > 0) {
      if (bienes_despacho.length > 0) {
        const aux_items: IObjBienesSolicitud[] = [];
        let bien: IObjBienDespacho | undefined;
        let despachada: number = 0;

        bienes_solicitud.forEach((option) => {
          if (option.cod_tipo_elemento_vivero === 'IN') {
            bien = bienes_despacho.find((p) => p.id_bien === option.id_bien);
            aux_items.push({
              ...option,
              cantidad_despachada: bien?.cantidad_despachada,
              cantidad_faltante:
                (option.cantidad ?? 0) - (bien?.cantidad_despachada ?? 0),
            });
          } else {
            bienes_despacho.forEach((option_despacho) => {
              if (option.id_bien === option_despacho.id_bien) {
                despachada =
                  despachada + (option_despacho.cantidad_despachada ?? 0);
              }
            });
            aux_items.push({
              ...option,
              cantidad_despachada: despachada,
              cantidad_faltante: (option.cantidad ?? 0) - despachada,
            });
          }
        });
        dispatch(set_bienes_solicitud_aux(aux_items));
      } else {
        dispatch(set_bienes_solicitud_aux(bienes_solicitud));
      }
    }
  }, [bienes_solicitud]);

  useEffect(() => {
    console.log(bienes_solicitud_aux);
  }, [bienes_solicitud_aux]);

  useEffect(() => {
    if (bienes_solicitud.length > 0) {
      if (bienes_despacho.length > 0) {
        const aux_items: IObjBienesSolicitud[] = [];
        let bien: IObjBienDespacho | undefined;
        let despachada: number = 0;

        bienes_solicitud.forEach((option) => {
          if (option.cod_tipo_elemento_vivero === 'IN') {
            bien = bienes_despacho.find((p) => p.id_bien === option.id_bien);
            aux_items.push({
              ...option,
              cantidad_despachada: bien?.cantidad_despachada,
              cantidad_faltante:
                (option.cantidad ?? 0) - (bien?.cantidad_despachada ?? 0),
            });
          } else {
            bienes_despacho.forEach((option_despacho) => {
              if (option.id_bien === option_despacho.id_bien) {
                despachada =
                  despachada + (option_despacho.cantidad_despachada ?? 0);
              }
            });
            aux_items.push({
              ...option,
              cantidad_despachada: despachada,
              cantidad_faltante: (option.cantidad ?? 0) - despachada,
            });
          }
        });
        dispatch(set_bienes_solicitud_aux(aux_items));
      } else {
        dispatch(set_bienes_solicitud_aux(bienes_solicitud));
      }
    }
  }, [bienes_despacho]);

  const columns_bienes_solicitud: GridColDef[] = [
    {
      field: 'codigo_bien',
      headerName: 'Codigo',
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
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === 'IN' ? 'Insumo' : 'Planta'}
        </div>
      ),
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad solictada',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_despachada',
      headerName: 'Cantidad despachada',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ?? 0}
        </div>
      ),
    },
    {
      field: 'cantidad_faltante',
      headerName: 'Cantidad faltante',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ?? params.row.cantidad}
        </div>
      ),
    },
    {
      field: 'observaciones',
      headerName: 'Observación',
      width: 150,
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
    const model = bienes_solicitud_aux.find(
      (p) => p.id_bien === selected_row[0]
    );
    if (model !== undefined) {
      dispatch(set_bien_selected(model));
    }
  };

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
            <Title title="Bienes solicitados"></Title>
            <DataGrid
              onSelectionModelChange={handle_selection_change}
              density="compact"
              autoHeight
              rows={bienes_solicitud_aux}
              columns={columns_bienes_solicitud}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_bien}
              selectionModel={selected_row}
            />
            <Grid item xs={12} md={12}>
              <FormButton
                variant_button="contained"
                on_click_function={select_model}
                icon_class={<SearchIcon />}
                label={'Buscar bien seleccionado'}
                type_button="button"
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoBienesSolicitud;
