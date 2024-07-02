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

/**
 * Renders a data grid and provides options to download the data as an XLS or PDF file.
 * @param rows - The data to be rendered in the data grid.
 * @param columns - The columns to be displayed in the data grid.
 * @param title - The title of the data grid.
 */
export const RenderDataGrid: FC<dataGridTypesWithAdditionalElement> = ({
  rows,
  columns,
  title,
  aditionalElement,
}: dataGridTypesWithAdditionalElement): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
      <Grid item xs={12}>
        {title && <Title title={title} />}
        <Box sx={{ mt: '20px', mb: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonGroup
                style={{
                  margin: 7,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {download_xls({ nurseries: rows, columns })}
                {download_pdf({ nurseries: rows, columns, title })}
              </ButtonGroup>

              <Box sx={{ width: '100%' }}>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows ?? []}
                  columns={columns ?? []}
                  pageSize={11}
                  rowHeight={75}
                  getRowHeight={() => 'auto'}
                  rowsPerPageOptions={[11]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={() => {
                    try {
                      return uuidv4();
                    } catch (error) {
                      console.error(error);
                      //? Genera un ID de respaldo único
                      return `fallback-id-${Date.now()}-${Math.random()}`;
                    }
                  }}
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
