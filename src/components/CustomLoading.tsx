import { CircularProgress, Grid, Typography } from '@mui/material';

interface Props {
  message?: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CustomLoading: React.FC<Props> = ({ message }: Props) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      sx={{ padding: 2, opacity: 0.5 }}
    >
      <Grid item xs={12} container justifyContent="center">
        <CircularProgress />
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Typography mt={2}>{message}</Typography>
      </Grid>
    </Grid>
  );
};
