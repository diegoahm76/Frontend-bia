
import { Box, Grid, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';

interface IProps {
    documento: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InformacionDocumento: React.FC<IProps> = (props: IProps) => {

    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Información de documento" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Identificación"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.documento ?? 'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Nombre"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.documento ?? 'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Asunto"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.documento ?? '2023'}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};