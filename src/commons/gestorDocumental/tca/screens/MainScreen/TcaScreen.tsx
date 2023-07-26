// Components Material UI
import { type FC } from 'react';
import {
  // MenuItem,
  Stack,
  // ButtonGroup,
  Button
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TcaScreen: FC<any> = (props): JSX.Element => {
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
            //* -- <SaveIcon /> : <SyncIcon />
            <SaveIcon />
          }
        >
          {/*  condicional de terminación de tca necesarua  */}
          TERMINAR TCA
        </Button>
      </Stack>
      {/* fin parte 4 */}
    </>
  );
};
