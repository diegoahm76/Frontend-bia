// eslint-disable-next-line @typescript-eslint/consistent-type-imports
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
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Departamento, DepartamentoResponse, Municipios, MunicipiosResponse, Paises, PaisesResponse, SucursalDireccionesProps } from './utils/interfac';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalDirecciones: FC<SucursalDireccionesProps> = ({ form_values, handleinput_change }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention  
    const [selected_pais, setselected_pais] = useState('');  
    const [paises, setpaises] = useState<Paises[]>([]);
    const [departamentos, set_departamentos] = useState<Departamento[]>([]);
    const [selected_departamento, setselected_departamento] = useState('');
    const [link, set_link] = useState('');
    const [selected_departamento_noti, setselected_departamento_noti] = useState('');
    const [departamentos_noti, set_departamentos_noti] = useState<Departamento[]>([]);
    const [municipios_noti, set_municipios_noti] = useState<Municipios[]>([]);

    const [municipios, setmunicipios] = useState<Municipios[]>([]);
    const [opengeneradordirecciones, setopengeneradordirecciones] = useState(false);
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
                const response = await fetch(`https://back-end-bia-beta.up.railway.app/api/listas/municipios/?cod_departamento=${selected_departamento}`);
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
    }, [selected_departamento]);

    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(`https://back-end-bia-beta.up.railway.app/api/listas/departamentos/?pais=`);
                const data: DepartamentoResponse = await response.json();
                if (data.success) {
                    set_departamentos_noti(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching departamentos de notificación:', error);
            }
        };
        void fetch_data();
    }, [selected_pais]);

    // Nuevo useEffect para obtener municipios de notificación del departamento seleccionado
    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(`https://back-end-bia-beta.up.railway.app/api/listas/municipios/?cod_departamento=${selected_departamento_noti}`);
                const data: MunicipiosResponse = await response.json();
                if (data.success) {
                    set_municipios_noti(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching municipios de notificación:', error);
            }
        };
        void fetch_data();
    }, [selected_departamento_noti]);


    // const set_value_direction = (_value: string, type: string): void => {

    //     switch (type) {
    //         case 'residencia':
    //             break;
    //         case 'notificacion':
    //             break;
    //         case 'laboral':
    //             break;
    //     }
    // };
    const [error] = useState<any>('');

    const is_error = error !== '';

    const [type_direction,
        // set_type_direction

    ] = useState('');
    console.log(is_error);

    const [same_address, setsame_address] = useState(false);

    const handle_checkbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setsame_address(event.target.checked);
        // setsame_address(event.target.checked);
        // When the checkbox is checked, update the direccion_notificacion_referencia field
        // with the value of direccion_sucursal_georeferenciada
        if (event.target.checked) {
            handleinput_change({
                target: {
                    name: 'direccion_notificacion_referencia',
                    value: form_values.direccion_sucursal_georeferenciada,
                },

            }); handleinput_change({
                target: {
                    name: 'direccion_notificacion',
                    value: form_values.direccion,
                },

            });handleinput_change({
                target: {
                    name: 'municipio_notificacion',
                    value: form_values.municipio,
                },

            });
            handleinput_change({
                target: {
                    name: 'municipio_notificacion',
                    value: form_values.municipio,
                },

            });
        }
    };
    
    const [direccion_generada, setdireccion_generada] = useState('');

    const mostrardireccion_generada = (direccion: any): void => {
        setdireccion_generada(direccion);
      };
      

    return (
        <>
            {/* <DialogGeneradorDeDirecciones
                open={opengeneradordirecciones}
                openDialog={setopengeneradordirecciones}
                onChange={set_value_direction}
                type={type_direction}
                
                
            /> */}
           <DialogGeneradorDeDirecciones
        open={opengeneradordirecciones}
        openDialog={setopengeneradordirecciones}
        onChange={mostrardireccion_generada} // Pasa la función para mostrar la dirección generada
        type={type_direction}
      />
      <div>
      {/* Aquí muestras la dirección generada */}
       <>
       {direccion_generada}
       </>
    

    
    </div>

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
                        <InputLabel shrink={true}>pais</InputLabel>
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
                        <InputLabel shrink={true}>Departamento</InputLabel>
                        <Select
                            label="Departamento"
                            value={selected_departamento}
                            onChange={(event) => {
                                setselected_departamento(event.target.value);
                            }}
                        >
                            {departamentos.map((departamento) => (
                                <MenuItem key={departamento.value} value={departamento.value}>
                                    {departamento.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel shrink={true}>Municipio</InputLabel>
                        <Select
                            label="Municipio"
                            name="municipio"
                            value={form_values.municipio}
                            onChange={handleinput_change}
                            inputProps={{ shrink: true }}
                        >
                            {municipios.map((municipio) => (
                                <MenuItem key={municipio.value} value={municipio.value}>
                                    {municipio.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="direccion  "
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion"    
                        value={form_values.direccion}
                        onChange={handleinput_change}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="direccion geografica  "
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion_sucursal_georeferenciada"
                        value={form_values.direccion_sucursal_georeferenciada}
                        onChange={handleinput_change}
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
                    <FormControl required size="small" fullWidth>
                        <InputLabel shrink={true}>Departamento</InputLabel>
                        <Select
                            label="Departamento"
                            value={selected_departamento_noti}
                            onChange={(event) => {
                                setselected_departamento_noti(event.target.value);
                            }}
                        >
                            {departamentos_noti.map((departamento) => (
                                <MenuItem key={departamento.value} value={departamento.value}>
                                    {departamento.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel shrink={true}>Municipio</InputLabel>
                        <Select
                            label="Municipio"
                            name="municipio_notificacion"
                            value={same_address ? form_values.municipio : form_values.municipio_notificacion}

                            // value={form_values.municipio_notificacion}
                            onChange={handleinput_change}
                        >
                            {municipios_noti.map((municipio) => (
                                <MenuItem key={municipio.value} value={municipio.value}>
                                    {municipio.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}   >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={same_address}
                                onChange={handle_checkbox}
                            />
                        }
                        label="Misma dirección física"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="direccion_notificacion  "
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion_notificacion"
                        // value={form_values.direccion_notificacion}
                        value={same_address ? form_values.direccion : form_values.direccion_notificacion}

                        onChange={handleinput_change}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="direccion_notificacion_geografica"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion_notificacion_referencia"
                        value={same_address ? form_values.direccion_sucursal_georeferenciada : form_values.direccion_notificacion_referencia}

                        // value={form_values.direccion_notificacion_referencia}
                        onChange={handleinput_change}
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