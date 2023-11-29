/* eslint-disable @typescript-eslint/naming-convention */
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import { useNavigate } from 'react-router-dom';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import Swal from 'sweetalert2';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';
import { useAppSelector } from '../../../../../../../../../hooks';
import { withValidation } from './functions/validationAction';
import { ButtonsPqrsdf } from './buttonsPqrsdf/ButtonsPqrsdf';
import { ButtonsComplementos } from './buttonsPqrsdf/buttonsComplementos/ButtonsComplementos';

//* este array de acciones debe asignarsele a un elemento en redux para que se pueda actualizar el estado interno de los elementos según condicionales(ARRAY DE ACTIONS YA HACE PARTE DEL SLICE DE PANEL DE VENTANILLA)

{
  /* se van a tener que añadir las condiciones, ya que el panel de Ventanilla va a terminar teniendo 3 bloques de botones
  1. botones de pqrsdf
  2. boton de tramites y servicios
  3. boton de otros
*/
}

export const ButtonsPanelVentanilla = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();

  const actionsTramitesYServicios = useAppSelector(
    (state) => state.PanelVentanillaSlice.actionsTramitesYServicios
  );
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  const actionsComplementos = useAppSelector(
    (state) => state.PanelVentanillaSlice.actionsComplementos
  );

  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------
  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------
  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------

  const handleDigitalizacion = withValidation(async () => {
    await Swal.fire({
      title: '¿Desea enviar la solicitud de digitalización?',
      text: 'Se enviará la solicitud de digitalización al módulo de central de digitalización.',
      showDenyButton: true,
      confirmButtonText: `Si, digitalizar`,
      denyButtonText: `No, cancelar`,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        showAlert(
          'Solicitud enviada',
          'Diríjase al módulo de central de digitalización.',
          'success'
        );
        //* se debe añadir la lógica del envío de la solicitud con una función extra
      } else if (result.isDenied) {
        showAlert(
          'Opps...',
          'Haz decidido no enviar la solicitud de digitalización.',
          'info'
        );
      }
    });
  });

  const handleAsignacionPersonal = withValidation(() =>
    console.log('Enviar solicitud al usuario')
  );

  const handleAsignacionGrupo = withValidation(() =>
    console.log('Asignar al grupo')
  );

  const handleContinuarAsignacionAGrupo = withValidation(() =>
    console.log('Continuar con asignación de grupo')
  );

  const handleClickActionsGeneral = (action: any) => {
    //* por cada nombre se ejecutaran acciones diferentes, se debe analizar por si vienen cambios desde el backend que se plantee
    switch (action.id) {
      case 'Dig':
        handleDigitalizacion(action, navigate);
        break;
      case 'AsigPer':
        handleAsignacionPersonal(action, navigate);
        break;
      case 'AsigGrup':
        handleAsignacionGrupo(action, navigate);
        break;
      case 'ContinuarAsigGrup':
        handleContinuarAsignacionAGrupo(action, navigate);
        break;
      default:
        break;
    }
  };

  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------
  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------
  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------

  // ! MANEJO DE ACCIONES PARA TRÁMITES Y SERVICIOS ----------------------
  // ! MANEJO DE ACCIONES PARA TRÁMITES Y SERVICIOS ----------------------
  // ! MANEJO DE ACCIONES PARA TRÁMITES Y SERVICIOS ----------------------
  //*
  // ! MANEJO DE ACCIONES PARA TRÁMITES Y SERVICIOS ----------------------
  // ! MANEJO DE ACCIONES PARA TRÁMITES Y SERVICIOS ----------------------
  // ! MANEJO DE ACCIONES PARA TRÁMITES Y SERVICIOS ----------------------

  // ! MANEJO DE ACCIONES PARA OTROS ----------------------
  // ! MANEJO DE ACCIONES PARA OTROS ----------------------
  // ! MANEJO DE ACCIONES PARA OTROS ----------------------
  //*
  // ! MANEJO DE ACCIONES PARA OTROS ----------------------
  // ! MANEJO DE ACCIONES PARA OTROS ----------------------
  // ! MANEJO DE ACCIONES PARA OTROS ----------------------

  return (
    <>
      {/* se debe revisar ya que no si no hay un elemento seleccionado (pqrsdf, tramites y servicios, otros) es inncesario mostrar este elemento dial  */}
      {(() => {
        switch (
          currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ||
          currentElementPqrsdComplementoTramitesYotros?.tipo
        ) {
          case 'PQRSDF':
            return <ButtonsPqrsdf />;
          case 'Tramites y Servicios':
            // Caso para 'Tramites y Servicios'
            return (
              <Box
                sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}
              >
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{ position: 'absolute', top: 0, left: 0 }}
                  icon={<MultipleStopIcon />}
                  direction="right"
                >
                  {actionsTramitesYServicios.map(
                    (action: {
                      id: string;
                      icon: any;
                      name: string;
                      path: string;
                      disabled: boolean;
                    }) =>
                      action.disabled ? null : (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          onClick={() => {
                            console.log(action);
                          }}
                        />
                      )
                  )}
                </SpeedDial>
              </Box>
            );
          case 'Otros':
            // Caso para 'Otros'
            return (
              <Box
                sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}
              >
                <>Botones de Otros </>
              </Box>
            );

          case 'Complemento de PQRSDF':
            return (
             <ButtonsComplementos/>
            );
          default:
            // Caso para null o cualquier otro valor
            return <></>;
        }
      })()}
    </>
  );
};
