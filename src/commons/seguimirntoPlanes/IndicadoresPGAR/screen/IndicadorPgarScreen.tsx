import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";
import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import { BusquedaActividadesPgar } from "../components/busquedaActividadesPgar";
import { ListarIndicadoresPgar } from "../components/ListarIndicadoresPgar";
import { AgregarIndicadorPgar } from "../components/AgregarIndicadorPgar";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IndicadorPgarScreen: React.FC = () => {
    const { mode } = useAppSelector((state) => state.planes);
    const [evaluate, set_evaluate] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
      set_evaluate(true);
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
            <Title title="Cargue de Indicadores en Actividades PGAR " />
          </Grid>
        </Grid>

        <BusquedaActividadesPgar />
        {evaluate && mode.ver ? <ListarIndicadoresPgar /> : null}
        {evaluate && (mode.crear || mode.editar) ? <AgregarIndicadorPgar /> : null}
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