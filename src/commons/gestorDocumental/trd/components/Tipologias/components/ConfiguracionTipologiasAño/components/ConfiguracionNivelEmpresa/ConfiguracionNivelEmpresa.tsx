/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from "@mui/material"
import { Title } from "../../../../../../../../../components/Title"
import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataGrid } from "@mui/x-data-grid";
import { TipodeCeaccionContext } from "../../context/CreacionTipologuia";




export const ConfiguracionValoresEmpresa = () => {

    const { Formulario_Empresa, Set_Formulario_Empresa } = useContext(TipodeCeaccionContext);

    const HandleCompletarDatos = (e: any) => {
        Set_Formulario_Empresa({
            ...Formulario_Empresa,
            [e.target.name]: e.target.value

        })
    }


    const valorNumerico = isNaN(Formulario_Empresa.valor_inicial) ? 0 : Number(Formulario_Empresa.valor_inicial);
    const valorFormateado = String(valorNumerico).padStart(Formulario_Empresa.cantidad_digitos, '0');


    const datos_tabla = [
        {
            "Consecutivo_inicial": 100,
            "Consecutivo_Actual": 120,
            "Persona_Última_Configuración": "Usuario1",
            "Fecha_Última_Configuración": "2023-11-02",
        }
    ];

    const columna_numero_1 = [
        { attribute: "Tipo de Expediente", value: datos_tabla ? datos_tabla[0]?.Consecutivo_inicial : "" },
        { attribute: "Año de Expediente", value: datos_tabla ? datos_tabla[0]?.Consecutivo_Actual : "" },
        { attribute: "Código de Expediente", value: datos_tabla ? datos_tabla[0]?.Persona_Última_Configuración : "" },
        { attribute: "Consecutivo Inicial", value: datos_tabla ? datos_tabla[0]?.Fecha_Última_Configuración : "" },

    ]




    return (


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
                <Title title="Configuracion Valores Iniciales- Nivel de Empresa" />
            </Grid>





            <Grid container alignItems="center" justifyContent="center">

                <Grid item xs={3.5}>
                    <TextField
                        style={{ width: '95%', marginTop: 20 }}
                        variant="outlined"
                        label="Valor Inicial"
                        fullWidth
                        name="valor_inicial"
                        value={Formulario_Empresa.valor_inicial}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^\d*$/.test(input)) {  // Esta expresión regular permite solo dígitos
                                Set_Formulario_Empresa({
                                    ...Formulario_Empresa,
                                    valor_inicial: +input
                                });
                            }
                        }}
                    />


                </Grid>

                <Grid item xs={3.5}>
                    <TextField
                        style={{ width: '95%', marginTop: 20 }}
                        variant="outlined"
                        label="cantidad_digitos"
                        fullWidth
                        name="cantidad_digitos"
                        value={Formulario_Empresa.cantidad_digitos}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^\d*$/.test(input)) {  // Esta expresión regular permite solo dígitos
                                Set_Formulario_Empresa({
                                    ...Formulario_Empresa,
                                    cantidad_digitos: +input
                                });
                            }
                        }}
                    />


                </Grid>

                <Grid item xs={4}>
                    <TextField
                        style={{ width: '95%', marginTop: 20 }}
                        variant="outlined"
                        label="Valor Inicial"
                        fullWidth
                        disabled
                        name="Ejemplo consecutivo"
                        value={valorFormateado}
                        onChange={HandleCompletarDatos}
                    />
                </Grid>
                <Grid item xs={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                    {datos_tabla?.length !== 0 ? (
                        <DataGrid
                            density="compact"
                            style={{ marginTop: 15, width: "100%" }}
                            autoHeight
                            rows={columna_numero_1 || ""}
                            columns={[
                                { field: "attribute", headerName: "Atributo", flex: 1, align: "center", headerAlign: "center" },
                                { field: "value", headerName: "Valor", flex: 1, align: "center", headerAlign: "center" },
                            ]}

                            getRowId={(row) => uuidv4()} />) :
                        (<h3>No hay datos para mostrar</h3>)}

                </Grid>
            </Grid>

        </Grid>

    )
}
