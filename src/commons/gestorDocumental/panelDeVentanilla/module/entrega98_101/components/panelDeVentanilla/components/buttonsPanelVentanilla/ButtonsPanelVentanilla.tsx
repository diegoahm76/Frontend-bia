/* eslint-disable @typescript-eslint/naming-convention */
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ButtonsPqrsdf } from './buttonsPqrsdf/ButtonsPqrsdf';
import { ButtonsComplementos } from './buttonsPqrsdf/buttonsComplementos/ButtonsComplementos';
import { ButtonsOpas } from './buttonsOpas/ButtonsOpas';
import { ButtonsOtros } from './buttonsOtros/ButtonsOtros';

//* este array de acciones debe asignarsele a un elemento en redux para que se pueda actualizar el estado interno de los elementos según condicionales(ARRAY DE ACTIONS YA HACE PARTE DEL SLICE DE PANEL DE VENTANILLA)

{
  /* se van a tener que añadir las condiciones, ya que el panel de Ventanilla va a terminar teniendo 3 bloques de botones
  1. botones de pqrsdf
  2. boton de tramites y servicios
  3. boton de otros
*/
}

const renderPQRSDF = () => <ButtonsPqrsdf />;

const renderTramitesYServicios = (actionsTramitesYServicios: any[]) => (
  <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', top: 0, left: 0 }}
      icon={<MultipleStopIcon />}
      direction="right"
    >
      {actionsTramitesYServicios.map((action: any) =>
        action.disabled ? null : (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              //  console.log('')(action);
            }}
          />
        )
      )}
    </SpeedDial>
  </Box>
);

const renderOtros = () => <ButtonsOtros/>

const renderComplementoPQRSDF = () => <ButtonsComplementos />;

const renderOPAS = () => <ButtonsOpas />;

export const ButtonsPanelVentanilla = (): JSX.Element => {
  //* navigate declaration

  const actionsTramitesYServicios = useAppSelector(
    (state) => state.PanelVentanillaSlice.actionsTramitesYServicios
  );
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  return (
    <>
      {(() => {
        const tipo =
          currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ||
          currentElementPqrsdComplementoTramitesYotros?.tipo;

        switch (tipo) {
          case 'PQRSDF':
            return renderPQRSDF();
          case 'Tramites y Servicios':
            return renderTramitesYServicios(
              actionsTramitesYServicios /*|| actionsComplementos*/
            );
          case 'OTROS':
            return renderOtros();
          case 'Complemento de PQRSDF':
          case 'Complemento de PQRSDF - Respuesta a solicitud':
          case 'Complemento de PQRSDF - Respuesta a requerimiento':
            return renderComplementoPQRSDF();

          case 'OPA':
            return renderOPAS();

          default:
            return null;
        }
      })()}
    </>
  );
};
