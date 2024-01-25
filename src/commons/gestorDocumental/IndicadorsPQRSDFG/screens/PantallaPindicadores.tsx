/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from "@mui/material"
import { Title } from "../../../../components/Title"
import { Graficapiegraficaindicadores}from "../components/grafica"
import { api } from "../../../../api/axios";
import { useEffect, useState } from "react";


// const { porcentaje,setPorcentaje} = useContext(PorcentajeContext); 
export interface PQRSDFData {
    num_pqrsdf_recibidos: number;
    num_pqrsdf_respondidos: number;
    num_pqrsdf_no_respondidos: number;
    porcentaje_respondidos: number;
    porcentaje_no_respondidos: number;
    rango_cumplimiento: string;
    porcentaje_oportunas: number;
    porcentaje_vencidas:number;
  }
  
  const initialPQRSDFData: PQRSDFData = {
    num_pqrsdf_recibidos: 0,
    num_pqrsdf_respondidos: 0,
    num_pqrsdf_no_respondidos: 0,
    porcentaje_respondidos: 0.0,
    porcentaje_no_respondidos: 0.0,
    rango_cumplimiento: "Sin definir",
    porcentaje_oportunas:0,
    porcentaje_vencidas:0
  };







export const PantallaPindicadores = () => {

    const [P_AtencionAPQRSDF,SET_P_AtencionAPQRSDF]=useState<PQRSDFData>(initialPQRSDFData)


    const  AtencionAPQRSDF= async (): Promise<void> => {
        try {
            let url = '/gestor/pqr/indicadores/indicador-pqrsdf-vencidas/';
            const res = await api.get(url);
            const Data_consulta = res.data;
            SET_P_AtencionAPQRSDF(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };
    
useEffect(() => {
    AtencionAPQRSDF()
},[])
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
                <Grid item xs={12} >
                    <Title title="Periocidad" />
                </Grid>
                <Grid item xs={12} >
                    <Graficapiegraficaindicadores P_AtencionAPQRSDF={P_AtencionAPQRSDF}    />
                </Grid>

                <Grid item xs={3} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>

                <Grid item xs={3} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>
                <Grid item xs={3} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>


        
            </Grid>
        
        
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
                <Grid item xs={12} >
                    <Title title="Indicadores" />
                </Grid>
                <Grid item xs={6} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>

                <Grid item xs={6} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>

                <Grid item xs={6} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>


                <Grid item xs={6} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>


                <Grid item xs={6} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>


                <Grid item xs={6} >
                    {/*<Graficapiegraficaindicadores />*/}
                </Grid>
            </Grid>
        </>
    )
}

