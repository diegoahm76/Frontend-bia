/* eslint-disable @typescript-eslint/naming-convention */
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';

import DevicesIcon from '@mui/icons-material/Devices';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import { useNavigate } from 'react-router-dom';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import Swal from 'sweetalert2';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';
import { ModalAtomInfoElement } from '../../../../Atom/ModalAtomInfoElement';

//* este array de acciones debe asignarsele a un elemento en redux para que se pueda actualizar el estado interno de los elementos según condicionales
const actions = [
  {
    id: 'Dig',
    icon: <DevicesIcon />,
    name: 'Enviar solicitud de digitalización',
    path: '',
    disabled: false,
  },
  {
    id: 'AsigPer',
    icon: <PersonAddIcon />,
    name: 'Enviar solicitud al usuario',
    path: '/app/gestor_documental/panel_ventanilla/asignar_a_usario',
    disabled: true,
  },
  {
    id: 'AsigGrup',
    icon: <GroupsIcon />,
    name: 'Asignar al grupo',
    path: '/app/gestor_documental/panel_ventanilla/asignar_a_grupo',
    disabled: true,
  },
  {
    id: 'ContinuarAsigGrup',
    icon: <ReduceCapacityIcon />,
    name: 'Continuar con asignación de grupo',
    // path:'/app/gestor_documental/panel_ventanilla/asignar_a_grupo',
    disabled: true,
  },
];
export const ButtonsPanelVentanilla = () => {
  //* navigate declaration
  const navigate = useNavigate();
  //* context declaration

  const withValidation =
    (fn: Function) => (action: { disabled: boolean; path: string }) => {
      if (action.disabled) {
        control_warning('Esta acción no está disponible');
      } else {
        navigate(action.path);
        fn();
      }
    };

  const handleDigitalizacion = withValidation(async () => {
    await Swal.fire({
      // showCancelButton: true,
      //cancelButtonColor: '#d33',
      //cancelButtonText: `Cancelar`,
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
        handleDigitalizacion(action);
        break;
      case 'AsigPer':
        handleAsignacionPersonal(action);
        break;
      case 'AsigGrup':
        handleAsignacionGrupo(action);
        break;
      case 'ContinuarAsigGrup':
        handleContinuarAsignacionAGrupo(action);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', top: 0, left: 0 }}
          icon={<MultipleStopIcon />}
          direction="right"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleClickActionsGeneral(action)}
            />
          ))}
        </SpeedDial>
      </Box>

      {/* modal de prueba para elementos de información */}
      <ModalAtomInfoElement infoTitle="Información del elemento (pqrsdf) - (complemento)" />
    </>
  );
};
