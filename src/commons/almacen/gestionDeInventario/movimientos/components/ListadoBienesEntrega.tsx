import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../../components/Title';
import {
  set_bien_selected,
  set_bienes_entrada_aux,
} from '../store/slice/indexEntrega';
import FormButton from '../../../../../components/partials/form/FormButton';
import type { IObjBienesEntrada } from '../interfaces/entregas';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoBienesEntrega = () => {
  const [selected_row, set_selected_row] = useState([]);
  const { bienes_entrada, bienes_entrada_aux, bienes_entrega } = useAppSelector(
    (state) => state.entrega_otros
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(bienes_entrada, bienes_entrega.length);
    if (bienes_entrada.length > 0) {
      if (bienes_entrega.length > 0) {
        const aux_items: IObjBienesEntrada[] = [];
        // let bien: IObjBienDespacho | undefined;
        let despachada: number = 0;

        bienes_entrada.forEach((option: IObjBienesEntrada) => {
          despachada = 0;
          bienes_entrega.forEach((option_entrega) => {
            if (option.id_bien === option_entrega.id_bien_despachado) {
              despachada =
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                despachada + (option_entrega.cantidad_despachada ?? 0);
              aux_items.push({
                ...option,
                cantidad_despachada: despachada,
                cantidad_faltante:
                  (option.cantidad_disponible ?? 0) - despachada,
              });
            } else {
              aux_items.push({ ...option });
            }
            console.log(option, despachada, aux_items);
          });
        });
        console.log(aux_items);
        dispatch(set_bienes_entrada_aux(aux_items));
      } else {
        dispatch(set_bienes_entrada_aux(bienes_entrada));
      }
    }
  }, [bienes_entrada]);

  useEffect(() => {
    if (bienes_entrada.length > 0) {
      if (bienes_entrega.length > 0) {
        const aux_items: IObjBienesEntrada[] = [];
        // let bien: IObjBienDespacho | undefined;
        let despachada: number = 0;

        bienes_entrada.forEach((option: IObjBienesEntrada) => {
          despachada = 0;
          bienes_entrega.forEach((option_entrega) => {
            if (option.id_bien === option_entrega.id_bien_despachado) {
              despachada =
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                despachada + (option_entrega.cantidad_despachada ?? 0);
            }
          });
          aux_items.push({
            ...option,
            cantidad_despachada: despachada,
            cantidad_faltante: (option.cantidad_disponible ?? 0) - despachada,
          });
        });
        dispatch(set_bienes_entrada_aux(aux_items));
      } else {
        dispatch(set_bienes_entrada_aux(bienes_entrada));
      }
    }
  }, [bienes_entrega]);

  const columns_bienes_entrega: GridColDef[] = [
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
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_disponible',
      headerName: 'Cantidad disponible',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {String(params.value) + String(params.row.unidad_medida ?? '')}
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
      width: 350,
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
    const model: IObjBienesEntrada | undefined = bienes_entrada_aux.find(
      (p) => p.id_bien === selected_row[0]
    );
    console.log(model);
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
          <Grid item xs={12} md={12} marginTop={-2}>

            <Title title="Bienes solicitados" />
          </Grid>
          <Grid item xs={12} md={12} marginTop={2}>
            <DataGrid
              onSelectionModelChange={handle_selection_change}
              density="compact"
              autoHeight
              columns={columns_bienes_entrega}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_bien}
              selectionModel={selected_row}
              rows={bienes_entrada_aux}
            /> 
            </Grid>
            <Grid item xs={12} md={12} marginTop={2}>
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
export default ListadoBienesEntrega;
