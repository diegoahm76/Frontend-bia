import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InfoCard = ({ value, label, color }: {value: any, label: string, color: string}) => {
  return (
    <Paper elevation={3} style={{ display:'flex', padding: '0 20px', flexDirection: 'column', justifyContent: 'center', backgroundColor: color, height: '8rem' }}>
      <Typography variant="h5" component="h2" color="white" sx={{textAlign: 'center', fontWeight: 'bold'}}>
        {value + '%'}
      </Typography>
      <Typography color="white" sx={{textAlign: 'center', fontWeight: 'bold'}}>
        {label}
      </Typography>
    </Paper>
  );
};
