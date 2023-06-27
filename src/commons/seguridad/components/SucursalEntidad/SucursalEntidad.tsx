import { Grid, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Title } from '../../../../components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Nro Sucursal', width: 150 },
    { field: 'descripcion', headerName: 'Descripción de la Sucursal', width: 200 },
    { field: 'principal', headerName: 'Principal', width: 120 },
    { field: 'direccion', headerName: 'Dirección', width: 250 },
    { field: 'accion', headerName: 'Acción', width: 120 },
];

const rows = [
    { id: 1, descripcion: 'Sucursal 1', principal: 'Sí', direccion: 'Calle 1, Ciudad', accion: 'Editar' },
    { id: 2, descripcion: 'Sucursal 2', principal: 'No', direccion: 'Calle 2, Ciudad', accion: 'Editar' },
    { id: 3, descripcion: 'Sucursal 3', principal: 'No', direccion: 'Calle 3, Ciudad', accion: 'Editar' },
    // Agrega más filas según sea necesario
];


// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalEntidad: React.FC = () => {
    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                    marginTop: '20px',
                    marginLeft: '-5px',
                }}
            >
                <Grid
                    container
                    spacing={2} border={1}
                    direction="row"
                    borderColor="lightgray"
                    padding={2}
                    borderRadius={2}
                    sx={{ marginTop: '10px', marginLeft: "7px", }}
                >
                    {/* ENTIDAD////////////////////////////////// */}
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

                <Grid
                    container
                    spacing={2}
                    direction="row"
                    border={1} padding={2}
                    borderColor="lightgray"
                    borderRadius={2}
                    sx={{ marginTop: '10px', marginLeft: "7px", }}
                >
                    {/* SUCURSAL////////////////////////////////// */}
                    <Grid item xs={12} sx={{ marginTop: "-20px" }}     >
                        <Title title="Sucursal" />
                    </Grid>
                    <Grid item xs={12} sm={1.5} >
                        <TextField variant="outlined"
                            size="small"
                            label="Nro"
                            style={{ marginBottom: '10px' }}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={10.3} >
                        <TextField variant="outlined"
                            size="small"
                            style={{ marginBottom: '10px' }}
                            label=" Descripcion"
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        border={1} padding={2}
                        borderColor="lightgray"
                        borderRadius={2}
                        sx={{ marginTop: '10px', marginLeft: "7px", }}
                    >
                        <Grid item xs={12} sx={{ marginTop: "-20px" }}     >
                            <Title title="Dirección física" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Pais</InputLabel>
                                <Select
                                    label="Pais"
                                >
                                    <MenuItem>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Dpto</InputLabel>
                                <Select
                                    label="Dpto"

                                >
                                    <MenuItem>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Municipio</InputLabel>
                                <Select
                                    label="Municipio"
                                >
                                    <MenuItem>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField variant="outlined"
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Dirección  "
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField variant="outlined"
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Dirección geografica  "
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                            >
                                Generar dirección
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        border={1} padding={2}
                        borderColor="lightgray"
                        borderRadius={2}
                        sx={{ marginTop: '10px', marginLeft: "7px", }}
                    >
                        <Grid item xs={12} sx={{ marginTop: "-20px" }} >
                            <Title title="Dirección de notificación nacional" />
                        </Grid>
                   


                        <Grid item xs={12} sm={4}>
                            <FormControl   size='small' fullWidth>
                                <InputLabel>Dpto</InputLabel>
                                <Select
                                    label="Dpto"

                                >
                                    <MenuItem>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl   size='small' fullWidth>
                                <InputLabel>Municipio</InputLabel>
                                <Select
                                    label="Municipio"

                                >
                                    <MenuItem>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}   >
                        <FormControlLabel control={<Checkbox />} label="Misma dirección física" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField variant="outlined"
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Dirección    "
                                fullWidth

                            />
                        </Grid> 
                        <Grid item xs={12} sm={4}>
                            <TextField variant="outlined"
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Dirección geografica  "
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                            >
                                Generar dirección
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField variant="outlined"
                            size="small"
                            style={{ marginBottom: '10px' }}
                            label="Email de notificaciónes "
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField variant="outlined"
                            size="small"
                            style={{ marginBottom: '10px' }}
                            label="Confirmar Email de notificaciónes"
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <TextField variant="outlined"
                            label="Telf. contacto"
                            style={{ marginBottom: '10px' }}
                            fullWidth
                            size="small"
                          
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl required size="small" fullWidth>
                            <InputLabel>Principal</InputLabel>
                            <Select
                                label="Principal"
                            >
                                <MenuItem value="si">Sí</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl required size="small" fullWidth>
                            <InputLabel>Activo</InputLabel>
                            <Select
                                label="Activo"
                            >
                                <MenuItem value="si">Sí</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div style={{ height: 300, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} />
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}