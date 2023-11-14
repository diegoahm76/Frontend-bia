/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import { Title } from "../../../../../../../../../components/Title"
import { useEffect, useState } from "react"
import { api } from "../../../../../../../../../api/axios";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import CleanIcon from '@mui/icons-material/CleaningServices';

export const ConsultaAñosAnteriores = () => {

    const [tipologia_documental, set_tipologia_documental] = useState<any>([]);
    const navigate = useNavigate();


    const fetch_data_desplegable_no = async (): Promise<void> => {
        try {
            const url = `/gestor/plantillas/tipos_tipologia/get/`;
            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_tipologia_documental(numero_consulta);
            // console.log(numero_consulta);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch_data_desplegable_no().catch((error) => {
            console.error(error);
        });
    }, []);


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
                    <Title title="Consultar Años Anterires" />
                </Grid>

                <Grid item container spacing={1} style={{ margin: 1 }}>



                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="choise-label">Selecciona tipología documental</InputLabel>
                            <Select
                                id="demo-simple-select-2"
                                name="id_tipologia_documental"
                                style={{ width: "95%" }}
                                label="Selecciona tipología documentall"
                                value={tipologia_documental || ""}
                                onChange={(e) => set_tipologia_documental(e.target.value)}
                            >
                                {tipologia_documental?.map((item: any, index: number) => (
                                    <MenuItem key={index} value={item.id_tipologia_documental}>
                                        {item.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

            
            <Grid
                container

                justifyContent="flex-end"
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >


                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button color='primary' style={{ width: "90%", marginTop: 15 }} variant="outlined" fullWidth startIcon={<CleanIcon />}>
                        Limpiar
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                        startIcon={<ClearIcon />}
                        fullWidth
                        style={{ width: "90%", marginTop: 15 }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                            navigate('/app/home');
                        }}
                    >
                        Salir
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
