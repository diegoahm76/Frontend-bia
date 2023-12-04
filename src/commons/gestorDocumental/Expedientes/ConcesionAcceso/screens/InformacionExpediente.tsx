
import { Box, Grid, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import dayjs from 'dayjs';

interface IProps {
    expediente: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InformacionExpediente: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Información de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                label="Título"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.titulo_expediente ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                label="Código"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.codigo_exp_und_serie_subserie ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                label="Año de apertura"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente !== null ? dayjs(props.expediente?.fecha_apertura_expediente).format('YYYY') : ''}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};