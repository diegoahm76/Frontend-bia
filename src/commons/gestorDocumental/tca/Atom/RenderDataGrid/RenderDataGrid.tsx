/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';

import { Grid, Box } from '@mui/material';
import { containerStyles } from '../../screens/utils/constants/constants';
import { Title } from '../../../../../components';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

export const RenderDataGrid: FC<any> = ({
  rows,
  columns,
  title,
  aditionalElement
}: any): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
      <Grid item xs={12}>
        <Title title={title} />
        <Box sx={{ mt: '20px', mb: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
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
