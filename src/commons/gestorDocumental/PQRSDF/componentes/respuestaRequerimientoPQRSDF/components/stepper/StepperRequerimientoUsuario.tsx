/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Parte2Screen } from '../parte2/screen/Parte2Screen';
import { Parte3Screen } from '../parte3/screen/Parte3Screen';
import { steps } from './constants/constants';
import { Parte1Screen } from '../parte1/screen/Parte1Screen';
import { BandejaTareasContext } from '../../../../../bandejaDeTareas/mainModule/context/BandejaTareasContext';
import { useStepperRequerimiento } from '../../../../../bandejaDeTareas/hook/useStepperRequerimiento';


export const StepperRequerimientoAlUsuario = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
  resetFormularioFunction,
  setInfoReset,
}: any): JSX.Element => {
  const { activeStep } =
    useContext(BandejaTareasContext);

  // ? stepper hook
  const { isStepSkipped } =
    useStepperRequerimiento();

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

      {/*
      
        este stepper se va a tener que separar, haciendo las validaciones correpondientes
      */}

      {activeStep === steps.length ? (
        <></>
      ) : (
        <>
          {(() => {
            switch (activeStep) {
              case 0:
                return (
                  <Parte1Screen
                    controlFormulario={controlFormulario}
                    handleSubmitFormulario={handleSubmitFormulario}
                    errorsFormulario={errorsFormulario}
                    resetFormulario={resetFormulario}
                    watchFormulario={watchFormulario}
                    setInfoReset={setInfoReset}
                  />
                );
              case 1:
                return (
                  <Parte2Screen
                    controlFormulario={controlFormulario}
                    handleSubmitFormulario={handleSubmitFormulario}
                    errorsFormulario={errorsFormulario}
                    resetFormulario={resetFormulario}
                    watchFormulario={watchFormulario}
                    setInfoReset={setInfoReset}
                  />
                );
              case 2:
                return (
                  <Parte3Screen
                    controlFormulario={controlFormulario}
                    handleSubmitFormulario={handleSubmitFormulario}
                    errorsFormulario={errorsFormulario}
                    resetFormulario={resetFormulario}
                    watchFormulario={watchFormulario}
                    resetFormularioFunction={resetFormularioFunction}
                    setInfoReset={setInfoReset}
                  />
                );
              default:
                return null;
            }
          })()}
        </>
      )}
    </Box>
  );
};
