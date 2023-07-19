/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { Box, Grid, Stack } from '@mui/material';
import { useAppSelector } from '../../../../../../../../hooks';
import { Title } from '../../../../../../../../components';

export const AdminTRDScreen = (): JSX.Element | null => {
  const { ccd_current_catalogo_ser_sub_unid } = useAppSelector(
    (state: any) => state.finished_ccd_slice
  );
//* crear modal open y close para administrar trd
  if (ccd_current_catalogo_ser_sub_unid === null || ccd_current_catalogo_ser_sub_unid === undefined) return null;

  console.log(
    'ccd_current_catalogo_ser_sub_unid',
    ccd_current_catalogo_ser_sub_unid
  );

  return (
    <>
      <Grid
        item
        sx={{
          width: '100%',
          marginTop: '1rem'
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Title title="Administración de TRD" />
          {/* <DataGrid
            sx={{
              marginTop: '.5rem'
            }}
            density="compact"
            autoHeight
            rows={catalogo_trd ?? []}
            columns={columns_catalogo_trd}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_catserie_unidadorg ?? 0}
          />
*/}
          <Stack
            direction="row"
            justifyContent="flex-start"
            spacing={2}
            sx={{ m: '20px 0' }}
          >
            {/* buttons start */}
            {/* <Button
          // color="info"
          color="warning"
          variant="contained"
          disabled={!trd_current}
          startIcon={<AdminPanelSettingsIcon />}
          onClick={() => console.log('ABRIR ADMINISTRACIÓN DE TRD')}
        >
          ADMINISTRAR CATÁLOGO TRD
        </Button> */}
          </Stack>
        </Box>
      </Grid>
    </>
  );
};
