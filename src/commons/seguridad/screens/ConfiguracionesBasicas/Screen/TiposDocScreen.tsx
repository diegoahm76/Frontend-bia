import {
    Grid,
    Stack,
} from '@mui/material';
import { Title } from '../../../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TiposDocumentoScreen: React.FC = () => {

    return (
        <>
            <Grid
                container
                spacing={1}
                m={2}
                p={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    m: '10px 0 20px 0',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}>
                    <Title title="CONFIGURACIONES BÁSICAS TIPOS DE DOCUMENTO" />
                </Grid>
                <Grid item xs={12}>
                    <Stack
                        justifyContent="flex-end"
                        sx={{ m: '10px 0 20px 0' }}
                        direction="row"
                        spacing={1}
                    >
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};
