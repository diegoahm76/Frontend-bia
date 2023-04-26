import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import SeleccionarSiembra from "../componentes/SeleccionarSiembra";
import { useAppSelector } from '../../../../hooks';
import SeleccionarPersona from "../../../../components/partials/SeleccionarPersona";
import { set_planting_person, set_current_planting } from '../store/slice/materialvegetalSlice';
import { useEffect } from "react";


// eslint-disable-next-line @typescript-eslint/naming-convention
export function SiembraSemillasScreen(): JSX.Element {
  const { current_planting, planting_person } = useAppSelector((state) => state.material_vegetal);

  useEffect(() => {
    set_current_planting({ ...current_planting, id_persona_siembra: planting_person?.id_persona })
  }, [planting_person]);


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
        <Grid item xs={12} marginY={2}>
          <Title title="Siembras"></Title>
        </Grid>
        <SeleccionarSiembra />
        <SeleccionarPersona
          title={"Persona que siembra"}
          set_persona={set_planting_person}
        />
        {/* {current_planting.id_siembra !== null &&
          <SeleccionarBienSiembra/>
        } */}


      </Grid>
    </>
  );
}
