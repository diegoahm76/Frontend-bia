/* eslint-disable @typescript-eslint/naming-convention */

import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material"
import { Title } from "../../../../../../../../../components/Title"
import { useContext, useEffect, useState } from "react";
import { api } from "../../../../../../../../../api/axios";
import { ConfiguracionValoresEmpresa } from "../ConfiguracionNivelEmpresa/ConfiguracionNivelEmpresa";
import { ConfiguracionUnidadOrganizacional } from "../ConfiguracionUnidadOrganizacional/ConfiguracionUnidadOrganizacional";
import { TipodeCeaccionContext } from "../../context/CreacionTipologuia";



export const AñoConfiguracionn = () => {


    const { Formulario_Empresa, Set_Formulario_Empresa } = useContext(TipodeCeaccionContext);


    const [tipologia_documental, set_tipologia_documental] = useState<any>(null);

    const year = new Date().getFullYear();



    const HandleCompletarDatos = (e: any) => {
        Set_Formulario_Empresa({
            ...Formulario_Empresa,
            [e.target.name]: e.target.value

        })
    }

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



    const options = {
        Empresa: "EM",
        SecciónSubsección: 'SS',
    };

    return (
        <>
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
                    <Title title="Configuracion de Tipologias" />
                </Grid>

                <Grid item container spacing={1} style={{ margin: 1 }}>


                    <Grid item xs={12} >

                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            label="Año Actual"
                            value={year}
                            style={{ marginTop: 5, width: 140, marginRight: 40 }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="choise-label">Selecciona tipología documental</InputLabel>
                            <Select
                                id="demo-simple-select-2"
                                name="id_tipologia_documental"
                                style={{ width: "95%" }}
                                label="Selecciona tipología documentall"
                                value={Formulario_Empresa.id_tipologia_documental || ""}
                                onChange={HandleCompletarDatos}
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

                        <Grid item container spacing={1} style={{ display: "flex", justifyContent: "center" }}>

                            <h5>¿Maneja número de consecutivo?</h5>

                            <Grid item xs={1} style={{ margin: 7, marginRight: 50 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="maneja_consecutivo"
                                            checked={Formulario_Empresa.maneja_consecutivo}
                                            onChange={(e) => {
                                                const newOption = Formulario_Empresa.maneja_consecutivo ? "Ninguno" : Formulario_Empresa.maneja_consecutivo;
                                                Set_Formulario_Empresa({
                                                    ...Formulario_Empresa,
                                                    maneja_consecutivo: !Formulario_Empresa.maneja_consecutivo,
                                                    opcion_seleccionada: newOption
                                                });
                                            }}
                                        />
                                    }
                                    label={Formulario_Empresa.maneja_consecutivo === true ? "Si" : "No"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {Formulario_Empresa.maneja_consecutivo === true && (

                        <Grid item xs={12} sm={6}>


                            <FormControl fullWidth>
                                <InputLabel id="choice-label">Seleccionar</InputLabel>
                                <Select
                                    name="opcion_seleccionada"
                                    label="Seleccionar"
                                    labelId="choice-label"
                                    style={{ width: "95%" }}
                                    id="demo-simple-select-2"
                                    value={Formulario_Empresa.opcion_seleccionada}
                                    onChange={HandleCompletarDatos}
                                >
                                    {/* Agrega la opción "Ninguno" al principio de la lista */}
                                    <MenuItem value="Ninguno">Ninguno</MenuItem>

                                    {/* Ahora agrega las opciones restantes desde tu objeto "options" */}
                                    {Object.entries(options).map(([etiqueta, codigo]) => (
                                        <MenuItem key={codigo} value={codigo}>
                                            {etiqueta}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}


                </Grid>
            </Grid>



            {Formulario_Empresa.opcion_seleccionada === "EM" && (
                <ConfiguracionValoresEmpresa />
            )}



            {Formulario_Empresa.opcion_seleccionada === "SS" && (
                <ConfiguracionUnidadOrganizacional />
            )}



        </>
    )
}
