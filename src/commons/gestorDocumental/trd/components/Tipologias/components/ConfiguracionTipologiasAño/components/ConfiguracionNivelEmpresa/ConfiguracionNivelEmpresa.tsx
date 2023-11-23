/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from "@mui/material"
import { Title } from "../../../../../../../../../components/Title"
import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataGrid } from "@mui/x-data-grid";
import { TipodeCeaccionContext } from "../../context/CreacionTipologuia";




export const ConfiguracionValoresEmpresa = () => {

    const { Formulario_Empresa, Set_Formulario_Empresa ,Datos_Return} = useContext(TipodeCeaccionContext);

    const HandleCompletarDatos = (e: any) => {
        Set_Formulario_Empresa({
            ...Formulario_Empresa,
            [e.target.name]: e.target.value

        })
    }


    const valorNumerico = isNaN(Formulario_Empresa.valor_inicial) ? 0 : Number(Formulario_Empresa.valor_inicial);
    const valorFormateado = String(valorNumerico).padStart(Formulario_Empresa.cantidad_digitos, '0');

    const {
        Persona_ult_config_implemen,
        T247fechaUltConfigImplemen,
        T247consecutivoInicial,
        T247consecutivoActualAMostrar
    
    }= Datos_Return;

 
    
    const columna_numero_1 = [
        { attribute: "Consecutivo inicial", value: T247consecutivoInicial || "" },
        { attribute: "Consecutivo Actual", value: T247consecutivoActualAMostrar || "" },
        { attribute: "Persona Ultima Configuracion", value: Persona_ult_config_implemen || "" },
        { attribute: "Fecha Ultima Configuracion (sin T)", value: T247fechaUltConfigImplemen ? new Date(T247fechaUltConfigImplemen).toISOString().split('T')[0] : "" },    ]




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
                    {Datos_Return?.length !== 0 ? (
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
                        (<h3>...</h3>)}

                </Grid>
            </Grid>

        </Grid>

    )
}
