/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Parte2Screen } from '../parte2/screen/Parte2Screen';
import { Parte3Screen } from '../parte3/screen/Parte3Screen';
import { steps } from './constants/constants';

export const StepperAsignacionUsuario = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
/*    if ('hola'.length > 0) {
      alert('no se puede avanzar');
      return;
    }
*/
    {
      /* dentro de ésta función se deben poner condicionales para que dependiendo si los campos de uno de los pasos está vacío no permite avanzar al próximo paso */
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => setActiveStep(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          mt: 5,
        }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: '1rem',
                },
              }}
              key={label}
              {...stepProps}
            >
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    fontSize: '1rem',
                  },
                }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
          {(() => {
            switch (activeStep) {
              case 0:
                {
                  /*parte 1*/
                }
                return <Parte2Screen />;
              case 1:
                return <Parte2Screen />;
              case 2:
                return <Parte3Screen />;
              default:
                return null;
            }
          })()}
        </>
      )}
    </Box>
  );
};
