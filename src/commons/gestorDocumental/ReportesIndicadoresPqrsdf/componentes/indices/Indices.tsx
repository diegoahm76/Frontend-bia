/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Typography } from '@mui/material';
import React from 'react';

interface IndicesProps {
  chartDataProp: { name: string; data: number[]; total?: number }[];
}

export const Indices: React.FC<IndicesProps> = ({
  chartDataProp,
}): JSX.Element => {
  //https://replit.com/@John-JairoJai19/examples#index.js
  console.log(chartDataProp);

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {chartDataProp?.map((indice: any, index: number) => (
        <Grid
          item
          xs={12}
          sm={3}
          key={index}
          sx={{
            position: 'relative',
            background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('data:image/png;base64,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') no-repeat center center`,
            backgroundSize: 'contain',
            backgroundOpacity: '0.1',
            borderRadius: '15px',
            gap: '20px',
            p: '1.2rem',
            my: '1.2rem',
            boxShadow: '0px 3px 6px #042F4A26',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexRow: 'row',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold',
              color: '#042F4A',
              mb: '1rem',
            }}
          >
            {indice?.name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 'bold',
              color: '#042F4A',
              mb: '1rem',
            }}
            variant="body1"
          >
            {indice?.total}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
