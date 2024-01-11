/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { FormControl, Grid, TextField, } from '@mui/material';
import { Title } from '../../../components/Title';
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../auth/interfaces';
import { InputLabel, MenuItem, Select, SelectChangeEvent, } from "@mui/material";
import { api } from '../../../api/axios';




export const AutodeclaracionFormulario: React.FC = () => {
    const { userinfo: { nombre_de_usuario, telefono_celular, email, nombre_unidad_organizacional } } = useSelector((state: AuthSlice) => state.auth);

    const initialFormData = {
        municipio_cap: "",
        municipio_v: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const [municipios, setMunicipios] = useState<Array<[string, string]>>([]);
    const [municipios_v, setMunicipios_v] = useState<Array<[string, string]>>([]);

    const fetchDepartamentos = async () => {
        try {
            const url = "/choices/municipios/";
            const res = await api.get(url);
            const departamentosData: Array<[string, string]> = res.data;
            setMunicipios(departamentosData);
            setMunicipios_v(departamentosData);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchDepartamentos();
    }, []);




    return (
        <>


            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Title title="Formulario auto declaración  " />


                

                <Grid container item xs={12} spacing={2} marginTop={2}>


                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label=" Nombre de usuario    "
                            name="Nombre de usuario "
                            value={nombre_de_usuario}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="telefono_celular"
                            name="telefono_celular"
                            value={telefono_celular}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="email"
                            name="email"
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="nombre_unidad_organizacional"
                            name="nombre_unidad_organizacional"
                            value={nombre_unidad_organizacional}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required

                            fullWidth
                            size="small"
                            variant="standard"
                            label="Reprecentante legal"
                            name="Reprecentante legal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Dilegenciado por "
                            name="Dilegenciado por "
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Cargo"
                            name="Cargo"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    </Grid>
                </Grid>





            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12} sm={7}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Cuerpo de agua en la que hace la capacitacion"
                        name="Cuerpo de agua en la que hace la capacitacion"
                    />municipios_v
                </Grid>
            
                <Grid item xs={12} marginLeft={3} sm={3}>
                    <FormControl required variant="standard" size="small" fullWidth>
                        <InputLabel id="municipio-select-label">municipio</InputLabel>
                        <Select
                            labelId="municipio-select-label"
                            id="municipio-select"
                            value={formData.municipio_cap}
                            label="municipio"
                            onChange={handleInputChange}
                            name="municipio_cap"
                        >
                            {municipios.map((municipio) => (
                                <MenuItem key={municipio[0]} value={municipio[0]}>
                                    {municipio[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>



                <Grid item xs={12} sm={7}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Cuerpo de agua en la que hace el vertimiento "
                        name="Cuerpo de agua en la que hace el vertimiento "
                    />
                </Grid>

                <Grid item xs={12} marginLeft={3} sm={3}>
                    <FormControl required variant="standard" size="small" fullWidth>
                        <InputLabel id="municipio-select-label">municipio</InputLabel>
                        <Select
                            labelId="municipio-select-label"
                            id="municipio-select"
                            value={formData.municipio_v}
                            label="municipio"
                            onChange={handleInputChange}
                            name="municipio_v"
                        >
                            {municipios_v.map((municipio) => (
                                <MenuItem key={municipio[0]} value={municipio[0]}>
                                    {municipio[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>




            </Grid>


        </>
    );
};