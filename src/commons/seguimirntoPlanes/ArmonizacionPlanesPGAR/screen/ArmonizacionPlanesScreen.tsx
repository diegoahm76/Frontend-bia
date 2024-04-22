import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";
import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import { ListarArmonizaciones } from "../components/ListarArmonizaciones";
import { AgregarArmonizacionPlanes } from "../components/AgregarArmonizacion";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArmonizacionPlanesScreen: React.FC = () => {
    const { mode } = useAppSelector((state) => state.planes);

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
            <Title title="Armonizar Planes " />
          </Grid>
        </Grid>

        <ListarArmonizaciones />
        {/* {mode.ver ? <ListarIndicadoresPgar /> : null} */}
        {mode.crear || mode.editar ? <AgregarArmonizacionPlanes /> : null}
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