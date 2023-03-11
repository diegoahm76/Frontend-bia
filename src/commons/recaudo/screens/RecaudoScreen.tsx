import { Grid } from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoScreen: React.FC = () => {
  return (
    <>
      <Grid container direction='row'>
        <Grid item xs={2} direction='column'>1</Grid>
        <Grid item xs={2} direction='column'>2</Grid>
        <Grid item xs={2} direction='column'>3</Grid>
        <Grid item xs={2} direction='column'>4</Grid>
        <Grid item xs={2} direction='column'>5</Grid>

        <Grid container direction='row'>
          <Grid item xs={2} direction='column'>1</Grid>
          <Grid item xs={2} direction='column'>2</Grid>
          <Grid item xs={2} direction='column'>3</Grid>
          <Grid item xs={2} direction='column'>4</Grid>
        </Grid>
      </Grid>
    </>
  )
}
