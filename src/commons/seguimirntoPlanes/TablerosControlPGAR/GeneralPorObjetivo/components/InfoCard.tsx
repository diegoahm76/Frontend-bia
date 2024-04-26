import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InfoCard = ({ value, label, color }: {value: any, label: string, color: string}) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', backgroundColor: color }}>
      <Typography variant="h5" component="h2">
        {value}
      </Typography>
      <Typography color="textSecondary">
        {label}
      </Typography>
    </Paper>
  );
};
