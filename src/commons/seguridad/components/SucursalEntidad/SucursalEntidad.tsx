import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { type FC, } from 'react';
import { Title } from '../../../../components';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalEntidad: FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention


    return (
        <>

            <Grid
                container
                spacing={2} border={1}
                direction="row"
                borderColor="lightgray"
                padding={2}
                borderRadius={2}
                sx={{ marginTop: '10px', marginLeft: "7px", }}
            >
                {/* ENTIDAD,  se encuentra DOC , NUMERO DOC, NOMBRE, BOTON BUSCAR */}
                <Grid item xs={12} sx={{ marginTop: "-20px" }}     >
                    <Title title="Entidad" />
                </Grid>
                <Grid item xs={12} sm={1.5} >
                    <TextField variant="outlined"
                        label="Tipo Doc"
                        style={{ marginBottom: '10px' }}
                        fullWidth
                        size="small"
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField variant="outlined"
                        size="small"
                        style={{ marginBottom: '10px' }}
                        label="Numero Doc"
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField variant="outlined"
                        size="small"
                        style={{ marginBottom: '10px' }} label="Nombre "
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={1.5}>
                    <Button
                        variant="contained" disabled
                    >
                        <SearchIcon />
                    </Button>
                </Grid>
            </Grid>

        </>
    );
}