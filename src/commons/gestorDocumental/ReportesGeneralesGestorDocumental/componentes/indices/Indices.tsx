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
            background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('https://scontent.fvvc1-1.fna.fbcdn.net/v/t39.30808-6/357496459_655185239982613_6885073345677477890_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=nMZ3JqjQTLwAX99_U2C&_nc_ht=scontent.fvvc1-1.fna&oh=00_AfBJRXAKL5qYgFc5aS50rBFeNPd2QWIeY3G0ULcyN7WiCQ&oe=65F3D4F1') no-repeat center center`,
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
