import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../../components/Title';
import { set_bien_selected, set_bienes_entrada, } from '../store/slice/indexEntrega';
import FormButton from '../../../../../components/partials/form/FormButton';
import type { IObjBienesEntrada } from '../interfaces/entregas';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoBienesEntrega = () => {
  const [selected_row, set_selected_row] = useState([]);
  const { bienes_entrada, bienes_entrada_aux } = useAppSelector((state) => state.entrega_otros);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(bienes_entrada);
    if (bienes_entrada.length > 0) {

      dispatch(set_bienes_entrada(bienes_entrada));
    }
  }, [bienes_entrada]);

  const columns_bienes_entrega: GridColDef[] = [

    {
      field: 'codigo_bien',
      headerName: 'Codigo',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_bien',
      headerName: 'Nombre',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_disponible',
      headerName: 'Cantidad disponible',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {String(params.value) + String(params.row.unidad_medida ?? '')}
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
    }
  ];

  const handle_selection_change = (selection: any): void => {
    set_selected_row(selection);
  };

  const select_model = (): void => {
    const model: IObjBienesEntrada | undefined = bienes_entrada_aux.find(
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
            <Title title="Bienes solicitados" />
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
              rows={bienes_entrada}

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
export default ListadoBienesEntrega;
