/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

interface IProps {
    movimientos: any[];
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
                            {props.movimientos.map((tb: any) => (
                                // eslint-disable-next-line react/jsx-key
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="subtitle2">
                                        {dayjs(tb.fecha_movimiento).format('DD-MM-YYYY') + ' - ' + tb.movimiento + ' - ' + tb.nombre_vivero}
                                    </Typography>
                                </Grid>
                            ))}

                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}