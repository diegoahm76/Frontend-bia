import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";
import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import { BusquedaEjes } from "../components/busquedaEjes";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import { ListarMetasPgar } from "../components/ListarMetasPgar";
import { AgregarMetaPgar } from "../components/AgregarMeta";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MetasPgarScreen: React.FC = () => {
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
            <Title title="Cargue de Metas en Eje Estratégico PGAR " />
          </Grid>
        </Grid>

        <BusquedaEjes />
        {(evaluate && mode.ver) ? <ListarMetasPgar /> : null}
        {mode.crear || mode.editar ? <AgregarMetaPgar /> : null}
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