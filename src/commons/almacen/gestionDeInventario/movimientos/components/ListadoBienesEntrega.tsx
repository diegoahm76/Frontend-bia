import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';

import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../../components/Title';
import { set_bienes_entrega } from '../store/slice/indexEntrega';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoBienesEntrega = () => {
  const [selected_row, set_selected_row] = useState([]);

  const { bienes_entrega } = useAppSelector((state: { entrega_otros: any; }) => state.entrega_otros.bienes_entrega);
  const { bienes_solicitud_aux, bienes_despacho } = useAppSelector(
    (state) => state.despacho
  );

  // const [item_solicitudes, set_item_solicitudes] = useState<ItemSolicitudConsumible[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(bienes_entrega, bienes_despacho.length);
    if (bienes_entrega.length > 0)
      dispatch(set_bienes_entrega(bienes_entrega));
  }, [bienes_entrega]);

  useEffect(() => {
    console.log(bienes_solicitud_aux);
  }, [bienes_solicitud_aux]);



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
      field: 'cantidad',
      headerName: 'Cantidad solictada',
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
              columns={columns_bienes_solicitud}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_bien}
              selectionModel={selected_row} rows={[]} />

          </Box>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoBienesEntrega;

