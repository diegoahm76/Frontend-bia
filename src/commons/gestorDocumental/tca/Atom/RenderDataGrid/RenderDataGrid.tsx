/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';

import { Grid, Box, ButtonGroup } from '@mui/material';
import { containerStyles } from '../../screens/utils/constants/constants';
import { Title } from '../../../../../components';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import type { dataGridTypesWithAdditionalElement } from '../../types/tca.types';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

export const RenderDataGrid: FC<dataGridTypesWithAdditionalElement> = ({
  rows,
  columns,
  title,
  aditionalElement
}: dataGridTypesWithAdditionalElement): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
      <Grid item xs={12}>
        <Title title={title} />
        <Box sx={{ mt: '20px', mb: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonGroup
                style={{
                  margin: 7,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                {download_xls({ nurseries: rows, columns })}
                {download_pdf({ nurseries: rows, columns, title })}
              </ButtonGroup>

              <Box sx={{ width: '100%' }}>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowHeight={75}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => uuidv4()}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {aditionalElement}
      </Grid>
    </Grid>
  );
};
