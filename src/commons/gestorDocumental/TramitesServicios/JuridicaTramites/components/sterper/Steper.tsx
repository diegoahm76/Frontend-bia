/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GavelIcon from '@mui/icons-material/Gavel';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { useContext } from 'react';
import { StepperContext } from '../../context/SteperContext';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

// Estilos personalizados para el conector entre los pasos
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(0,123,255) 0%,rgb(220,53,69) 50%,rgb(40,167,69) 100%)', // Cambia los valores RGB aquí
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(0,123,255) 0%,rgb(220,53,69) 50%,rgb(40,167,69) 100%)', // Cambia los valores RGB aquí
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

// Estilos personalizados para el ícono del paso
const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

// Función para el componente de ícono del paso
function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <ContentPasteSearchIcon />,
    2: <PendingActionsIcon />,
    3: <GavelIcon />,
    4: <ReceiptLongIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

// Arreglo de pasos
const steps = [
  'Buscar trámite para revisión jurídica',
  'Trámites en proceso',
  'Documentos proporcionados para revisión',
  'Creación de oficio jurídico',
];

export const CustomizedSteppers = (): JSX.Element => {

  const { set_id, activeStep, id, setActiveStep } = useContext(StepperContext);

  return (
    <>
      <Stack sx={{ width: '100%', marginTop: 7 }} spacing={1}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </>
  );
};
