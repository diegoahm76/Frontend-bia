import { Grid, Box, Stack, TextField, Button, MenuItem, Select } from '@mui/material';
import { Title } from '../../../../../components/Title';
import SearchIcon from '@mui/icons-material/Search';

const tipo_mantenimiento = [
    {
        value: 'Com',
        label: 'Computo'
    },
    {
        value: 'Veh',
        label: 'Vehiculo'
    },
    {
        value: 'OAc',
        label: 'Otro'
    }
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramacionManteniento:React.FC = () => {
  return (
    <>
        <h1>ProgramacionManteniento</h1>
        <Grid 
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="Articulo"/>
                <Box
                    component="form"
                    sx={{ mt: '20px'}}
                    noValidate
                    autoComplete="off"
                >
                    {/* <FormControl fullWidth> */}

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Código"
                                helperText="Seleccione Código"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Nombre"
                                    helperText="Seleccione Nombre"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* <InputLabel id="demo">Tipo</InputLabel> */}
                                <Select
                                    id="demo"
                                    label="Tipo"
                                    size="small"
                                    fullWidth
                                >
                                    { tipo_mantenimiento.map(({value, label}) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                    {/* </FormControl> */}
                </Box>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    sx={{ mb: '20px' }}
                >
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={<SearchIcon />}
                    >
                        Buscar Articulo
                    </Button>
                </Stack>
            </Grid>

        </Grid>
    </>
  )
}
