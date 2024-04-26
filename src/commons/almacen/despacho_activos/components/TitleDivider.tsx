import { Chip, Divider, Grid } from '@mui/material';
import React, { FC } from 'react';

interface props {
  title: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const TitleDivider: FC<props> = ({ title }) => {
  return (
    <Grid item xs={12} mt={2}>
      <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
        <Chip label={title} size="small" />
      </Divider>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TitleDivider;