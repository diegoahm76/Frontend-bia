/* eslint-disable @typescript-eslint/naming-convention */

import { Autocomplete, Chip, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material"
import { Title } from "../../../../../components/Title"
import { useEffect, useState } from "react";
import { api } from "../../../../../api/axios";
import { Controller } from "react-hook-form";
import Divider from '@mui/material/Divider';


export const MetadatosInfo = () => {


    const [choise_origen_archivo_data, set_choise_origen_archivo_data] = useState([{ value: "", label: "" }]);
    const [tipologia_documental, set_tipologia_documental] = useState<any>(null);
    const [switchValue, setSwitchValue] = useState(false);
    const [palabrasClavesSeleccionadas, setPalabrasClavesSeleccionadas] = useState<string[]>([]);

    const choise_origen_archivo = async (): Promise<void> => {
        try {
            let url = '/gestor/choices/cod-tipo-consecutivo/';
            const res = await api.get(url);
            const Data_consulta = res.data.data;
            set_choise_origen_archivo_data(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        choise_origen_archivo();
    }, []);

    const fetch_data_desplegable_no = async (): Promise<void> => {
        try {
            const url = `/gestor/plantillas/tipos_tipologia/get/`;
            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_tipologia_documental(numero_consulta);
            // //  console.log('')(numero_consulta);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch_data_desplegable_no().catch((error) => {
            console.error(error);
        });
    }, []);



    const getSwitchColors = (activa: boolean) => {
        return activa
            ? { color: 'success', background: 'green', label: 'Si' }
            : { color: 'error', background: 'red', label: 'No' };
    };


    return (
        <>
            <Grid container alignItems="center" justifyContent="center">

                <Grid item xs={10}>
                    <Title title="Informacion Metadatos" />
                </Grid>


                <Grid container xs={10}>


                    <Grid item xs={12} sm={2}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            label="Numero de Folios"
                            value={5}
                            style={{ marginTop: 25, width: '90%' }}
                        />
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            label="Asunto"
                            value={5}
                            style={{ marginTop: 25, width: '90%' }}
                        />
                    </Grid>


                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            style={{ marginTop: 25, width: '90%' }}
                            type="date"
                            size="small"
                            variant="outlined"
                            value={11 / 2 / 2000}
                            label=" Fecha desde "
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>





                    <Grid item xs={12} sm={3}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            label="Archivo Origen en el Sistema"
                            value={"si"}
                            style={{ marginTop: 25, width: '100%' }}
                        />
                    </Grid>




                    <Grid item xs={12} sm={4}>
                        <FormControl style={{ marginTop: 25, width: "95%" }}>
                            <InputLabel>Origen de Archivo</InputLabel>
                            <Select
                                id="demo-simple-select"
                                name="origen_archivo"
                                size="small"
                                label="Origen de Archivo"
                                value={""}

                            >
                                {choise_origen_archivo_data.map((item: any) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth style={{ marginTop: 25, width: "95%" }}>
                            <InputLabel>Categoria de Archivo</InputLabel>
                            <Select
                                id="demo-simple-select"
                                name="origen_archivo"
                                size="small"
                                label="Categoria de Archivo"
                                value={""}

                            >
                                {choise_origen_archivo_data.map((item: any) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>







                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth style={{ marginTop: 25, width: '100%' }}>
                            <InputLabel>Selecciona si tiene copia física</InputLabel>
                            <Select
                                name="tiene_copia_fisica"
                                size="small"
                                label="Selecciona si tiene copia física"
                                value={"si"}
                            >
                                <MenuItem value="si">Sí</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>




                    <Grid item xs={12} sm={2}>

                        <Grid container xs={12}>
                            <Grid item xs={2}>

                                <h5 >Activo</h5>
                            </Grid>
                            <Grid item >

                                <FormControlLabel
                                    style={{ marginTop: 15, marginLeft: 8 }}
                                    control={
                                        <Switch
                                            checked={switchValue}
                                            onChange={(event) => setSwitchValue(event.target.checked)}
                                            color={getSwitchColors(switchValue).color as 'success' | 'warning'}
                                        />
                                    }
                                    label={getSwitchColors(switchValue).label}
                                    sx={{
                                        '& .Mui-checked': {
                                            color: 'white',
                                        },
                                        [`& .Mui-checked.Mui-${getSwitchColors(switchValue).color}`]: {
                                            backgroundColor: getSwitchColors(switchValue).background,
                                        },
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </Grid>



                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth style={{ marginTop: 25, width: "95%" }}>
                            <InputLabel>Selecciona tipología documental</InputLabel>
                            <Select
                                name="id_tipologia_documental"
                                size="small"
                                style={{ width: "95%" }}
                                label="Selecciona tipología documentall"
                                value={""}
                            >
                                {tipologia_documental?.map((item: any, index: number) => (
                                    <MenuItem key={index} value={item.id_tipologia_documental}>
                                        {item.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            label="Nombre de Tipologuia Documental"
                            value={5}
                            style={{ marginTop: 25, width: '100%' }}
                        />
                    </Grid>




                    <Grid item xs={6} >

                        <Autocomplete
                            onChange={(event, newValue) => {
                                setPalabrasClavesSeleccionadas(newValue);
                            }}
                            value={palabrasClavesSeleccionadas}
                            multiple
                            style={{ marginTop: 25, width: '95%' }}
                            
                            id="tags-filled"
                            options={[]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        key={index}
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Palabras claves"
                                    placeholder="Seleccionar"
                                />
                            )}
                        />

                    </Grid>




                    <Grid item xs={6}>
                        <TextField
                            style={{ marginTop: 25, width: '100%' }}
                            label={`Descripccion`}
                            id="Descripccion"
                            value={"Esto te permitirá mantener el valor del switch en el estado local switchValue"}
                            name="Descripccion"
                            multiline
                            rows={1}

                        // error={emailMismatch}
                        // helperText={emailMismatch ? "El campo de Descripcciones esta vacio " : ""}
                        />
                    </Grid>









                    <Grid item xs={12}>
                        <TextField
                            style={{ marginTop: 25, width: '100%' }}
                            label={`Observacion`}
                            id="description"
                            value={"Esto te permitirá mantener el valor del switch en el estado local switchValue. Si necesitas enviar este valor"}
                            name="observacion"
                            multiline
                            rows={2}

                        // error={emailMismatch}
                        // helperText={emailMismatch ? "El campo de observaciones esta vacio " : ""}
                        />
                    </Grid>






                </Grid>

            </Grid>
        </>
    )
}
