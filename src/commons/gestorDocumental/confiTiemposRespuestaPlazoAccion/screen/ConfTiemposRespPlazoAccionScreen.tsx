/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import { Controller, useForm } from "react-hook-form";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormSelectController from "../../../../components/partials/form/FormSelectController";
import { IObjConfiTiemposPlazoAccion } from "../interface/ConfiTiemposPlazoAccion";
import {
  actualizar,
  get_configuraciones,
} from "../store/thunks/ConfTiemposRespThunks";
import SaveIcon from "@mui/icons-material/Save";
import { Title } from "../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import FormInputController from "../../../../components/partials/form/FormInputController";
import FormButton from "../../../../components/partials/form/FormButton";

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ConfiguracionTiemposRespScreen = () => {
  const {
    control: control_configuracion,
    getValues: get_values,
    handleSubmit: handle_submit,
  } = useForm<IObjConfiTiemposPlazoAccion>();

  const { configuraciones_tiempos } = useAppSelector(
    (state) => state.confi_tiempo_respuesta
  );
  const dispatch = useAppDispatch();
  const [
    selectedOptionInfo,
    setSelectedOptionInfo,
  ] = useState<IObjConfiTiemposPlazoAccion | null>(null);

  const [selected_option, set_selected_option] = useState<string>("");
  useEffect(() => {
    void dispatch(get_configuraciones());
  }, []);

  //  console.log('')(selected_option);

  const on_submit = (data: IObjConfiTiemposPlazoAccion): void => {
    //  console.log('')(data);
    const data_programar = {
      ...data,
    };

    void dispatch(actualizar(selected_option, data));
  };

  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "20px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
    >
      {" "}
      <Title title="CONFIGURACIÓN DE TIEMPOS DE RESPUESTA Y ACCIÓN" />
      <Grid container spacing={2} >
        <Grid item marginTop={2.5}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: "15px" }}
          >
            {"Acción a configurar: "}
          </Typography>
        </Grid>
        <Grid item xs={8} sm={4} marginTop={2.4} >
          <FormControl size="small" fullWidth>
            <Select
              value={selected_option}
              onChange={(event) =>
                set_selected_option(event.target.value as string)
              }
            >
              {configuraciones_tiempos.map(
                (configuracion) =>
                  // Verifica que configuracion y id_configuracion_tiempo_respuesta no sean nulos o indefinidos
                  configuracion &&
                  configuracion.id_configuracion_tiempo_respuesta && (
                    <MenuItem
                      key={configuracion.id_configuracion_tiempo_respuesta}
                      value={configuracion.id_configuracion_tiempo_respuesta.toString()}
                    >
                      {configuracion.nombre_configuracion}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2} marginTop={1.5} sm={2}>
          <Controller
            name="tiempo_respuesta_en_dias"
            control={control_configuracion}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="dense"
                fullWidth
                size="small"
                label="Días"
                variant="outlined"
                disabled={false}
                defaultValue={value}
                value={value}
                onChange={onChange}
                error={!(error == null)}
                sx={{
                  backgroundColor: "white",
                }}
                InputLabelProps={{ shrink: true }}
              ></TextField>
            )}
          />
        </Grid>
        <Grid item xs={4} marginTop={1.5} >
          <Controller
            name="observacion_ultimo_cambio"
            control={control_configuracion}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="dense"
                fullWidth
                size="small"
                label="Observación de la Configuración"
                variant="outlined"
                disabled={false}
                defaultValue={value}
                value={value}
                rows={4}
                onChange={onChange}
                error={!(error == null)}
                sx={{
                  backgroundColor: "white",
                }}
                InputLabelProps={{ shrink: true }}
              ></TextField>
            )}
          />
        </Grid>

      </Grid>
     

    

   
     
      <Grid container justifyContent="center" marginTop={2}>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            color="success"
            onClick={handle_submit(on_submit)}
            sx={{ marginRight: "8px" }}
          >
            Guardar
          </Button>
        </Grid>
        <Grid item xs={12} md={1.2}>
          <ButtonSalir />
        </Grid>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ConfiguracionTiemposRespScreen;
