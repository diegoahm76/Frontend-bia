// Components Material UI
import { useState, type FC, useEffect } from 'react';
import {
  // MenuItem,
  Stack,
  // ButtonGroup,
  Button
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// ? colums and rows for the table
import {
  columsCatalogoTRD,
  rowsCatalogoTRD
} from '../utils/columnasCatalogos/CatalogoTRD/CatalogoTRD';
import {
  columsCatalogoTCA,
  rowsCatalogoTCA
} from '../utils/columnasCatalogos/CatalogoTCA/CatalogoTCA';

import { CatalogoTRDSeleccionado } from '../../components/MainScreenComponents/CatalogoTRDSeleccionado/CatalogoTRDSeleccionado';
import { CatalogoTCASeleccionado } from '../../components/MainScreenComponents/CatalogoTCASeleccionado/CatalogoTCASeleccionado';
import { CreateAndUpdateTca } from '../../components/MainScreenComponents/CreateAndUpdateTca/CreateAndUpdateTca';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { finish_resume_tca_service } from '../../toolkit/TCAResources/thunks/TcaServicesThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TcaScreen: FC<any> = (props): JSX.Element => {
  // ? useDispatch declaration --------------------->
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();

  // ? useSelector declaration --------------------->
  const { tca_current } = useAppSelector((state) => state.tca_slice);

  // ? useState declaration --------------------->
  const [flag_finish_or_or_edit_trd, set_flag_finish_or_edit_trd] =
    useState<boolean>(false);

  //* neccesary hook useEffect for the code in this module or component

  useEffect(() => {
    set_flag_finish_or_edit_trd(
      tca_current?.fecha_terminado !== null &&
        tca_current?.fecha_terminado !== '' &&
        tca_current?.fecha_terminado !== undefined
    );
    console.log(
      '🚀 CcdScreen.tsx ~ 45 ~ useEffect ~ trd_current?.fecha_terminado',
      tca_current?.fecha_terminado
    );
  }, [tca_current?.fecha_terminado]);

  return (
    <>
      {/* parte 1. crear, actualizar TCA - ver TRD's usados, ver TCA's Terminados - busqueda de tca */}
      <CreateAndUpdateTca />
      {/* fin parte 1 */}

      {/* parte 2. catalogo TRD seleccionado */}
      <CatalogoTRDSeleccionado
        rows={rowsCatalogoTRD}
        columns={columsCatalogoTRD}
        title="Catálogo TRD seleccionado"
      />
      {/* fin parte 2 */}

      {/* parte 3. catalogo TCA */}
      <CatalogoTCASeleccionado
        rows={rowsCatalogoTCA}
        columns={columsCatalogoTCA}
        title="Catálogo TCA ( Tabla control de acceso )"
      />
      {/* fin parte 3 */}

      {/* parte 4 - finalizar TCA  */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mt: '20px' }}
      >
        <Button
          color="success"
          variant="contained"
          startIcon={
            flag_finish_or_or_edit_trd ? <RestartAltIcon /> : <SaveIcon />
          }
          onClick={() => {
          /*  if (flag_finish_or_or_edit_trd) {
               dispatch(
              resume_trd_service(
                trd_current?.id_trd,
                set_flag_finish_or_edit_trd
              )
            );
              set_flag_finish_or_edit_trd(false);
            } else {
             dispatch(
              finish_trd_service(
                trd_current?.id_trd,
                set_flag_finish_or_edit_trd
              )
            )
              set_flag_finish_or_edit_trd(true);
            }
*/
            void finish_resume_tca_service(
              tca_current?.id_tca,
              flag_finish_or_or_edit_trd,
              set_flag_finish_or_edit_trd
            );
          }}
        >
          {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            flag_finish_or_or_edit_trd ? 'REANUDAR TRD' : 'FINALIZAR TRD'
          }
        </Button>
      </Stack>
      {/* fin parte 4 */}
    </>
  );
};
