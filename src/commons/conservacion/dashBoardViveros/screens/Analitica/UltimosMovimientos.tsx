import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

interface IProps {
    resumen: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const UltimosMovimientos: React.FC<IProps> = (props: IProps) => {

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction="row" justifyContent="center">
                        <Typography variant="h5">
                            Últimos movimientos
                        </Typography>
                    </Stack>
                        <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                            <Grid item container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                </Grid>
                            </Grid>
                        </Box>
                </CardContent>
            </Card>
        </>
    );
}