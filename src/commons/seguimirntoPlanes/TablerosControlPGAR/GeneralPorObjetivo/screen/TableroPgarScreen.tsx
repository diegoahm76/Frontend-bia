import { useEffect, useState } from "react";
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { set_current_mode_planes } from "../../../store/slice/indexPlanes";
import { Title } from "../../../../../components/Title";
import { ButtonSalir } from "../../../../../components/Salir/ButtonSalir";
import { BusquedaIndicadorObjetivo } from "../components/BusquedaIndicadorObjetivo";
import { BusquedaIndicadorEjeEstrategico } from "../components/BusquedaIndicadorEjeEstrategico";
import { BusquedaIndicadorDetallado } from "../components/BusquedaIndicadorDetallado";
import { BusquedaIndicadorObjetivoyEje } from "../components/BusquedaIndicadorObjyEje";
import { TableroGeneralPgar } from "../components/TableroControlGralPgar";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableroPgarScreen: React.FC = () => {
    const { mode } = useAppSelector((state) => state.planes);
    const options = [
      {label: 'Tablero de Control General PGAR por Objetivo', value: 1},
      {label: 'Tablero de Control General PGAR por Eje Estratégico', value: 2},
      {label: 'Tablero de Control Detallado PGAR', value: 3},
      {label: 'Tablero de Control PGAR por Objetivo y Eje Estratégico', value: 4},
      {label: 'Tablero de Control General PGAR', value: 5},
    ];

    const [tablero_seleccionado, set_tablero_seleccionado] = useState(0)

    const handle_change_tablero = (event: any) => {
      set_tablero_seleccionado(event.target.value);
    }

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(
        set_current_mode_planes({
          ver: false,
          crear: false,
          editar: false,
        })
      );
    }, []);

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
            <Title title="Tableros de Control PGAR" />
          </Grid>
          <Grid item xs={12} sm={6} margin={'auto'}>
            <FormControl required size='small' fullWidth>
              <InputLabel>Tablero de Control</InputLabel>
              <Select
                multiline
                value={tablero_seleccionado}
                label="Tablero de Control"
                onChange={handle_change_tablero}
              >
                <MenuItem value={0}>
                  <em>Seleccione un tablero de control</em>
                </MenuItem>
                {options.map((opt: any) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Seleccione el tablero de control que desea visualizar</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        {tablero_seleccionado === 1 ? <BusquedaIndicadorObjetivo /> : null}
        {tablero_seleccionado === 2 ? <BusquedaIndicadorEjeEstrategico /> : null}
        {tablero_seleccionado === 3 ? <BusquedaIndicadorDetallado /> : null}
        {tablero_seleccionado === 4 ? <BusquedaIndicadorObjetivoyEje /> : null}
        {tablero_seleccionado === 5 ? <TableroGeneralPgar /> : null}
        {/* <BusquedaEjes />
        {mode.ver ? <ListarMetasPgar /> : null}
        {mode.crear || mode.editar ? <AgregarMetaPgar /> : null} */}
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
          justifyContent="flex-end"
        >
          {/* <BusquedaPrograma /> */}
          <Grid item>
            <ButtonSalir />
          </Grid>
        </Grid>
      </>
    );
  };