import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Title } from "../../../../../components/Title";
import { DataContextPgar } from "../../../SeguimientoPGAR/context/context";
import { InfoCard } from "./InfoCard";
import { StackedBarChart } from "./StackedBarChart";
import { LineChart } from "./LineChart";
import { get_tablero_general_ejes, get_tablero_general_objetivos, get_tablero_por_eje } from "../services/services";
import { control_error } from "../../../../../helpers";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableroGeneralPgar: React.FC = () => {

  const [form_values, set_form_values] = useState({
    id_armonizar: '',
    id_planPGAR: '',
    id_planPAI: '',
    nombre_planPGAR: '',
    nombre_planPAI: '',
    objetivoPGAR: [],
    ejesEstrategicosPAI: [],
    estado: '',
  });

  const [show_loader, set_show_loader] = useState(false);
  const [show_dashboard, set_show_dashboard] = useState(false);
  const [data_chart, set_data_chart] = useState([]);
  const [line_data_chart, set_line_data_chart] = useState([{}]);
  const {rows_armonizacion, fetch_data_armonizaciones, fetch_data_seguimiento_pgar} = useContext(DataContextPgar);

  useEffect(() => {
    fetch_data_armonizaciones();
  }, []);

  const handle_change_armonizacion = (event: any) => {
    const id_armonizacion_select = event.target.value;
    const armonizacion_select = rows_armonizacion.find(armonizacion => armonizacion.id_armonizar === id_armonizacion_select);
    if (armonizacion_select) {
      set_form_values({
        ...form_values,
        id_armonizar: armonizacion_select.id_armonizar,
        id_planPGAR: armonizacion_select.id_planPGAR,
        id_planPAI: armonizacion_select.id_planPAI,
        nombre_planPGAR: armonizacion_select.nombre_planPGAR,
        nombre_planPAI: armonizacion_select.nombre_planPAI,
        objetivoPGAR: armonizacion_select.objetivoPGAR,
        ejesEstrategicosPAI: armonizacion_select.ejesEstrategicosPAI,
        estado: armonizacion_select.estado,
      });
    }
  }

  useEffect(() => {
    if(form_values.id_planPAI && form_values.id_planPGAR) {
      set_show_loader(true);
      set_show_dashboard(false);
      get_tablero_por_eje(Number(form_values.id_planPAI), Number(form_values.id_planPGAR)).then((data: any) => {
        set_show_dashboard(true);
        set_show_loader(false);
        set_data_chart(data);
      }).catch((error: any) => {
        set_show_loader(false);
        control_error(error);
      });

      get_tablero_general_ejes(Number(form_values.id_planPAI), Number(form_values.id_planPGAR)).then((data: any) => {
        set_show_dashboard(true);
        set_show_loader(false);
        handle_data_cards(data);
      }).catch((error: any) => {
        set_show_loader(false);
        control_error(error);
      });

      get_tablero_general_objetivos(Number(form_values.id_planPAI), Number(form_values.id_planPGAR)).then((data: any) => {
        set_show_dashboard(true);
        set_show_loader(false);
        set_line_data_chart(data);
      }).catch((error: any) => {
        set_show_loader(false);
        control_error(error);
      });

    }
  }, [form_values.id_planPAI, form_values.id_planPGAR]);

  const [card_data, set_card_data] = useState([
    { value: null, label: 'PORCENTAJE AVANCE FISICO', color: '#47B9F6' },
    { value: null, label: 'PORCENTAJE AVANCE FISICO ACUMULADO', color: '#45F7BC' },
    { value: null, label: 'PORCENTAJE AVANCE FINANCIERO', color: '#91F647' },
    { value: null, label: 'PORCENTAJE AVANCE RECURSOS OBLIGADOS', color: '#C447F6' },
  ]);

  const handle_data_cards = (data: any) => {
    set_card_data([
      { value: data.pvance_fisico, label: 'PORCENTAJE AVANCE FISICO', color: '#47B9F6' },
      { value: data.pavance_fisico_acomulado, label: 'PORCENTAJE AVANCE FISICO ACUMULADO', color: '#45F7BC' },
      { value: data.pavance_financiero, label: 'PORCENTAJE AVANCE FINANCIERO', color: '#91F647' },
      { value: data.pavance_recursos_obligados, label: 'PORCENTAJE AVANCE RECURSOS OBLIGADOS', color: '#C447F6' },
    ]);
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Tablero de Control General PGAR" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl required size='small' fullWidth>
            <InputLabel>Nombre Armonización</InputLabel>
            <Select
              multiline
              value={form_values.id_armonizar || ''}
              label="Nombre Armonización"
              onChange={handle_change_armonizacion}
            >
              <MenuItem value="">
                <em>Seleccione una opción</em>
              </MenuItem>
              {rows_armonizacion.map((tipos: any) => (
                <MenuItem key={tipos.id_armonizar} value={tipos.id_armonizar}>
                  {tipos.nombre_relacion}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione una armonización</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            size='small'
            multiline
            fullWidth
            label="Nombre PGAR"
            value={form_values.nombre_planPGAR || ''}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size='small'
            fullWidth
            label="Estado"
            value={form_values.estado ? 'Vigente' : 'No Vigente'}
            disabled
         />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            multiline
            size='small'
            fullWidth
            label="Nombre PAI"
            value={form_values.nombre_planPAI}
            disabled
          />
        </Grid>
        {show_loader && <div className="loader"></div>}
        {show_dashboard && <Grid item xs={12} sm={12} my={6}>
          <Grid container spacing={6}>
            {/* Tarjetas de información */}
            {card_data.map((data, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <InfoCard value={data.value} label={data.label} color={data.color} />
              </Grid>
            ))}

            {/* Gráfico de barras apiladas */}
            <Grid item xs={12} lg={6}>
              <StackedBarChart data={data_chart}/>
            </Grid>

            {/* Gráfico de líneas */}
            <Grid xs={12} lg={6} mt={6}>
              <LineChart data={line_data_chart} />
            </Grid>
          </Grid>
        </Grid>}
      </Grid>
    </>
  )
}