/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DetalleLiquidacion } from "../DetalleLiquidacion/DetalleLiquidacion";
import { api } from "../../../../../api/axios";
import { Persona } from "../../../WorkFlowPQRSDF/interface/IwordFlow";
import { BuscadorPerzonasStiven } from "../../../WorkFlowPQRSDF/components/BuscadorPersonaPersonalizado/BuscadorPerzonas";
import { useSelector } from "react-redux";
import type { AuthSlice } from '../../../../auth/interfaces/authModels';
import { Title } from "../../../../../components/Title";
import { PreciosContext } from "../../context/PersonalContext";

export const GenerarLiquidacion = () => {


  const {
    userinfo: { id_persona, email, telefono_celular, numero_documento }
  } = useSelector((state: AuthSlice) => state.auth);

  console.log(id_persona);

  const {form,setForm } = useContext(PreciosContext);

  
  // const [form, setForm] = useState({
  //   id_expediente: '', // Ejemplo de propiedad que se actualizará desde un componente
  //   Email: '', // Ejemplo de propiedad que se actualizará desde un componente
  //   telefono_cliente: '', // Ejemplo de propiedad para el ciclo de liquidación
  // });


  const handleSelectChange = (event: any) => {
    setForm({ ...form, [event.target.name || '']: event.target.value as string });
  };

  // Función para manejar el cambio en los componentes de tipo TextField
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name || '']: event.target.value });
  };

  const [data_choise, setDataChoise] = useState<any[]>([]);




  const fetch_datos_choises = async (): Promise<void> => {
    try {
      const url = '/recaudo/choices/pagos-tipo-id/';
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const data_consulta = res.data.data;
      setDataChoise(data_consulta);
      // control_success('Datos actualizados correctamente');
    } catch (error) {
      console.error(error);
    }
  };

  const [persona, set_persona] = useState<Persona | undefined>();

  const {

    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
  } = persona ?? {};
  const nombres_concatenados = `${primer_nombre ?? ''} ${segundo_nombre ?? ''}`;
  const apellidos_concatenados = `${primer_apellido ?? ''} ${segundo_apellido ?? ''}`;



  useEffect(() => {
    fetch_datos_choises();
  }, [])

  const handleResult = async (persona?: Persona): Promise<void> => {
    if (persona) {
      // Haz lo que necesites con la información de la persona
      set_persona(persona);

    } else {
      // Manejar el caso en el que la persona es undefined
      console.log("No se seleccionó ninguna persona.");
    }
  };


  return (
    <>
      {/* Maquetación de los componentes */}
      <Grid container spacing={2}>


        <Grid container justifyContent="center">
          <Grid item xs={12} >
            <Grid container alignItems="center" justifyContent="center">
              <Title title="Solicitante" />
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            label='Email'
            name="Email"
            value={email || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Telefono Celular'
            name="telefono_celular"
            value={telefono_celular || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Numero Documento'
            name="numero_documento"
            value={numero_documento || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>


        <Grid container justifyContent="center">
          <Grid item xs={12} >
            <Grid container alignItems="center" justifyContent="center">
              <Title title="Beneficiario" />
            </Grid>
          </Grid>
        </Grid>


        <Grid container justifyContent="center" style={{ marginTop: 15 }}>


          {nombres_concatenados && (
            <>
              <Grid item xs={12} sm={5}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Nombre Titular"
                  value={nombres_concatenados}
                  disabled
                  style={{ width: '95%' }}
                />
              </Grid>


              <Grid item xs={12} sm={5}>
                <TextField
                  label='Apeliido Cliente'
                  name="apellido_cliente"
                  value={apellidos_concatenados}
                  size="small"
                  style={{ width: '95%' }}
                  disabled
                  fullWidth
                />
              </Grid>
            </>
          )}

          <Grid item xs={1} >

            <BuscadorPerzonasStiven onResultt={handleResult} />
          </Grid>

        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Tipo Pago</InputLabel>
            <Select
              label='Expediente'
              name="id_expediente"
              value={form.id_expediente}
              onChange={handleSelectChange}
            >
              {data_choise.map((option, index) => (
                <MenuItem key={option[0]} value={option[0]}>
                  {option[1]}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione el expediente</FormHelperText>
          </FormControl>
        </Grid>






        <Grid item xs={12} sm={4}>
          <TextField
            label='Email'
            name="Email"
            value={form.Email}
            size="small"
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>



        <Grid item xs={12} sm={4}>
          <TextField
            label='Telefono Cliente'
            name="telefono_cliente"
            value={form.telefono_cliente}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>





        {/* </Grid> */}


      </Grid >


      <DetalleLiquidacion />
    </>
  );
};
