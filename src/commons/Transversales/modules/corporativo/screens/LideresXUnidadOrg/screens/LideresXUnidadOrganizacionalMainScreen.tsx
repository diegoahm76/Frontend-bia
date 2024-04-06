/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from 'react';

import {
  get_asignaciones_lideres_organigrama_actual_service,
  get_organigrama_actual_lideres_screen_service
} from '../toolkit/LideresThunks/OrganigramaLideresThunks';
import {
  get_list_asignaciones_lideres,
  set_organigrama_lideres_current
} from '../toolkit/LideresSlices/LideresSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { OrganigramaLideresScreen } from '../components/Organigrama/screen/OrganigramaLideresScreen';
import { UnidadOrganizacionalScreen } from '../components/UnidadOrganizacional/screen/UnidadOrganizacionalScreen';
import { AsignacionesDeLideresScreen } from '../components/Asignados/screen/AsignacionesLideresScreen';

/* import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'; */
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { containerStyles } from '../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../utils/Loader/Loader';

export const LideresXUnidadOrganizacionalMainScreen = (): JSX.Element => {
  const navigate = useNavigate();
  //* dispatch declarations
  const dispatch = useAppDispatch();

  const { organigrama_lideres_current } = useAppSelector(
    (state) => state.lideres_slice
  );

  // const [loaderLideresCarga, setLoaderLideresCarga] = useState<boolean>(false);

  //* ----- fetch current organigrama  (carga por defecto inicial) -------
  const fetchCurrentOrganigrama = async (): Promise<void> => {
    try {
      const resOrganigramaActual =
        await get_organigrama_actual_lideres_screen_service();
      //* !resOrganigramaActual.id_organigrama
      if (resOrganigramaActual.id_organigrama) {
        const resAsignacionesLideresOrganigramaActual =
          await get_asignaciones_lideres_organigrama_actual_service();

        dispatch(set_organigrama_lideres_current(resOrganigramaActual));
        dispatch(
          get_list_asignaciones_lideres(resAsignacionesLideresOrganigramaActual)
        );
      } else {
        void Swal.fire({
          icon: 'warning',
          title: 'NO HAY ORGANIGRAMA ACTUAL',
          text: 'Porfavor seleccione uno para usar este módulo',
          showCloseButton: false,
          allowOutsideClick: false,
          // showCancelButton: true,
          showConfirmButton: true,
          // cancelButtonText: 'Cancelar',
          confirmButtonText: 'Ir a crear organigrama',
          confirmButtonColor: '#042F4A',

          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            //  console.log('')('ir a crear organigrama');
            navigate('/app/gestor_documental/organigrama/crear');
          }
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    void fetchCurrentOrganigrama();
  }, []);
  if (!organigrama_lideres_current?.descripcion) {
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          position: 'static',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Loader altura="100vh" />
      </Grid>
    );
  }

  return (
    <>
      {/* firt part of screen: Organigrama */}
      <OrganigramaLideresScreen />

      {/* segunda parte asignacion lideres Unidad organizacional */}

      <UnidadOrganizacionalScreen />

      {/* listado de asignaciones de lideres a unidades organizacionales por organigrama seleccionado */}

      <AsignacionesDeLideresScreen />
    </>
  );
};
