import { Grid, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useEffect, useState, type FC } from 'react';
import { Title } from '../../../../components';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';


interface Municipios {
    label: string;
    value: string;
};

interface MunicipiosResponse {
    success: boolean;
    detail: string;
    data: Municipios[];
};

interface Paises {
    label: string;
    value: string;
};

interface PaisesResponse {
    success: boolean;
    detail: string;
    data: Paises[];
};

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
export const SucursalDirecciones: FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention 

    const [selected_pais, setselected_pais] = useState('');
     const [paises, setpaises] = useState<Paises[]>([]);
    const [departamentos, set_departamentos] = useState<Departamento[]>([]);
    const [link, set_link] = useState('');
 
    const [municipios, setmunicipios] = useState<Municipios[]>([]);

    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch('https://back-end-bia-beta.up.railway.app/api/listas/paises/');
                const data: PaisesResponse = await response.json();
                if (data.success) {
                    setpaises(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching paises:', error);
            }
        };
        void fetch_data();
    }, []);



    useEffect(() => {
        set_link(`https://back-end-bia-beta.up.railway.app/api/listas/departamentos/?pais=${selected_pais}`);
    }, [selected_pais]);
    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(link);
                const data: DepartamentoResponse = await response.json();
                if (data.success) {
                    set_departamentos(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching departamentos:', error);
            }
        };

        void fetch_data();
    }, [link]);


    

    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch('https://back-end-bia-beta.up.railway.app/api/listas/municipios/?cod_departamento=');
                const data: MunicipiosResponse = await response.json();
                if (data.success) {
                    setmunicipios(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching municipios:', error);
            }
        };

        void fetch_data();
    }, []);


    const [opengeneradordirecciones, setopengeneradordirecciones] = useState(false)
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
    const [error] = useState<any>('');

    const is_error = error !== '';

    const [type_direction,
        // set_type_direction

    ] = useState('');
    console.log(is_error);

    return (
        <>
            <DialogGeneradorDeDirecciones
                open={opengeneradordirecciones}
                openDialog={setopengeneradordirecciones}
                onChange={set_value_direction}
                type={type_direction}

            />


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
                    <FormControl required size="small" fullWidth>
                        <InputLabel>pais</InputLabel>
                        <Select
                            label="pais"
                            value={selected_pais}
                            onChange={(event) => {
                                setselected_pais(event.target.value);
                            }}
                        >
                            {paises.map((Paises) => (
                                <MenuItem key={Paises.value} value={Paises.value}>
                                    {Paises.label}
                                </MenuItem>
                            ))}
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
                        <Select label="Municipio">
                            {municipios.map((Municipios) => (
                                <MenuItem key={Municipios.value} value={Municipios.value}>
                                    {Municipios.label}
                                </MenuItem>
                            ))}
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
        </>
    );
}