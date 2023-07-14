import { useState, type FC, useEffect } from 'react';
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
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import { control_error } from './utils/control_error_or_success';

const columns = [

    { field: 'id', headerName: 'Nro Sucursal', width: 150, flex: 1 },
    { field: 'nombre', headerName: 'descripcin', width: 120, flex: 1 },
    { field: 'principal', headerName: 'Principal', width: 120, flex: 1 },

];

const rows = [
    { id: 1, principal: 'Sí', nombre: 'miguel' },
    // Agrega más filas según sea necesario
];

interface Departamento {
    label: string;
    value: string;
};

interface DepartamentoResponse {
    success: boolean;
    detail: string;
    data: Departamento[];
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalEntidad: FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch('https://back-end-bia-beta.up.railway.app/api/listas/departamentos/?pais=CO');
                const data: DepartamentoResponse = await response.json();
                if (data.success) {
                    setDepartamentos(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching departamentos:', error);
            }
        };

        void fetch_data();
    }, []);

    const [nueva_sucursal, setnueva_sucursal] = useState('');
    const [nombrenuebo, setnombrenuebo] = useState('');

    const [data_rows, set_data_rows] = useState(rows);


    const agregar_sucursal = (): void => {
        const nueva_sucursal_obj = {
            id: data_rows.length + 1,
            principal: nueva_sucursal,
            nombre: nombrenuebo,
        };

        const nuevas_filas = [...data_rows, nueva_sucursal_obj];
        set_data_rows(nuevas_filas);
        setnueva_sucursal('');
        setnombrenuebo('');
    };

    const [email, set_email] = useState('');
    const [confirm_email, set_confirm_email] = useState('');
    const [error, set_error] = useState<any>('');

    const handle_email_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
        set_email(event.target.value);
    };

    const handle_confirm_email_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
        set_confirm_email(event.target.value);
    };

    const handle_submit = (): void => {
        if (email === confirm_email) {
            set_error('');
        } else {
            set_error(control_error('Los Emails  no coinciden'));
        }
    };
    const is_error = error !== '';
    const [opengeneradordirecciones, setopengeneradordirecciones] = useState(false)
    const [type_direction,
        // set_type_direction

    ] = useState('');
    console.log(is_error);
    // Establece la dirección generada en el generador de direcciones
    const set_value_direction = (_value: string, type: string): void => {

        switch (type) {
            case 'residencia':
                break;
            case 'notificacion':
                break;
            case 'laboral':
                break;
        }
    };

    return (
        <>
            < >
                <DialogGeneradorDeDirecciones
                    open={opengeneradordirecciones}
                    openDialog={setopengeneradordirecciones}
                    onChange={set_value_direction}
                    type={type_direction}
                />
            </>
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
                            value={nombrenuebo} onChange={(event) => { setnombrenuebo(event.target.value) }}
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
                            <FormControl required size="small" fullWidth>
                                <InputLabel>Departamento</InputLabel> 
                                <Select label="Departamento">
                                    {departamentos.map((departamento) => (
                                        <MenuItem key={departamento.value} value={departamento.value}>
                                            {departamento.label}
                                        </MenuItem>
                                    ))}
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
                                onClick={() => {
                                    setopengeneradordirecciones(true);
                                }}
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
                            <FormControl size='small' fullWidth>
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
                            <FormControl size='small' fullWidth>
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
                                onClick={() => {
                                    setopengeneradordirecciones(true);
                                }}
                            >
                                Generar dirección
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: '10px' }}
                            label="Email de notificaciónes"
                            fullWidth
                            value={email}
                            onChange={handle_email_change}
                        />
                        {/* {is_error && <div
                        //   style={{color: "red"}} 
                        >{error}</div>} */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: '10px' }}
                            label="Confirmar Email de notificaciónes"
                            fullWidth
                            value={confirm_email}
                            onChange={handle_confirm_email_change}
                        />
                        {/* {is_error && <div
                        //   style={{color: "red"}} 
                        >{error}</div>} */}
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
                            <Select value={nueva_sucursal} onChange={(event) => { setnueva_sucursal(event.target.value) }}
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
                        <Button variant='contained' onClick={handle_submit}>Verificar correos </Button>
                    </Grid>
                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid rows={data_rows} columns={columns} />
                    </div>
                    <Button onClick={agregar_sucursal}>agregar</Button>
                </Grid>
            </Grid>
        </>
    );
}