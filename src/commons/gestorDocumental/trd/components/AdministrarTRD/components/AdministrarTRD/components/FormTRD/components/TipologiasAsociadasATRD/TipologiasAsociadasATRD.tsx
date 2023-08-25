/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { Grid, Box, Button, Stack, Chip } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../../../../../../../components';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../../../hooks';
import { ModalContextTRD } from '../../../../../../../../context/ModalsContextTrd';
import { get_tipologias_documentales_by_name } from '../../../../../../../../toolkit/TRDResources/thunks/TRDResourcesThunks';

export const colums_tipologias_asociadas = [
  {
    field: 'id_tipologia_documental',
    headerName: 'ID',
    width: 100
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 200
  },
  {
    field: 'cod_tipo_medio_doc',
    headerName: 'Cód. tipo medio doc',
    width: 200
  },
  {
    headerName: 'Activo',
    field: 'activo',
    width: 70,
    renderCell: (params: any) =>
      params.row.activo ? (
        <Chip label="Si" color="error" variant="outlined" />
      ) : (
        <Chip label="No" color="info" variant="outlined" />
      )
  },
  {
    headerName: 'Usado',
    field: 'item_ya_usado',
    width: 70,
    renderCell: (params: any) =>
      params.row.item_ya_usado ? (
        <Chip label="Si" color="error" variant="outlined" />
      ) : (
        <Chip label="No" color="info" variant="outlined" />
      )
  }
];

export const TipologiasAsociadasATRD = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context declaration
  const { openModalEstablecerTipologiaDocumentalATRD, setCreateTRDLoadingButton } =
    useContext(ModalContextTRD);

  //* get element from store
  const { tipologias_asociadas_a_trd } = useAppSelector(
    (state) => state.trd_slice
  );

  return (
    <>
      <Grid item xs={12} sm={12}>
        <Grid item>
          <Box /* sx={{ width: '100%' }} */>
            <Title
              title={
                tipologias_asociadas_a_trd.length > 0
                  ? 'Tipologias asociadas a TRD'
                  : 'No hay tipologias asociadas a TRD'
              }
            />

            {tipologias_asociadas_a_trd.length > 0 ? (
              <DataGrid
                sx={{ marginTop: '1.5rem' }}
                density="compact"
                autoHeight
                rows={tipologias_asociadas_a_trd || []}
                columns={colums_tipologias_asociadas}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => uuidv4()}
              />
            ) : null}
          </Box>
        </Grid>
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ marginTop: '1rem' }}
        >
          <Button
            variant="contained"
            color="warning"
            // type="submit"
            onClick={() => {
              openModalEstablecerTipologiaDocumentalATRD();
              dispatch(
                get_tipologias_documentales_by_name(setCreateTRDLoadingButton)
              );
            }}
            startIcon={<SaveAsIcon />}
            // disabled={ccd_current?.actual}
          >
            ESTABLECER / VER TIPOLOGIAS
          </Button>
        </Stack>
      </Grid>
    </>
  );
};
