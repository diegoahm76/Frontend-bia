/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';

export const TextFieldWithOutAction = (props: any): JSX.Element => {
  const { value = '', label = '' } = props;
  return (
    <Grid
      item
      xs={12}
      sm={6}
      sx={{
        mt: '.45rem',
        mb: '.45rem',
      }}
    >
      <TextField
        fullWidth
        disabled
        label={label}
        size="small"
        variant="outlined"
        value={value}
        InputLabelProps={{ shrink: true }}
        inputProps={{ maxLength: 255 }}
      />
    </Grid>
  );
};
