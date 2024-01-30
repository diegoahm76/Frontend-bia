/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import { TransferDocContext } from '../../context/TransferDocContext';
import { useTransferenciasDocumentales } from '../../hook/useTransferenciasDocumentales';
import { Parte1Screen } from '../parte1/screen/Parte1Screen';

export const steps = ['Historial de transferencias', 'Expediente'];
export const StepperTranferDocs = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: any): JSX.Element => {
  const { skipped, activeStep, setSkipped, setActiveStep } =
    useContext(TransferDocContext);

  // ? stepper hook
  const { isStepSkipped, handleNext, handleBack, handleReset } =
    useTransferenciasDocumentales();

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          mt: 5,
        }}
      >
        {steps.map((label: string, index: number) => {
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
                  <>
                    <>Hola soy la parte 1 del stepper</>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Ir a la parte 2
                    </Button>
                    <Parte1Screen
                      controlHistorialTransferencias={
                        controlHistorialTransferencias
                      }
                      resetHistorialTransferencias={
                        resetHistorialTransferencias
                      }
                      watchHistorialTransferenciasExe={
                        watchHistorialTransferenciasExe
                      }
                    />
                  </>
                  /* <Parte1Screen
                    controlFormulario={controlFormulario}
                    handleSubmitFormulario={handleSubmitFormulario}
                    errorsFormulario={errorsFormulario}
                    resetFormulario={resetFormulario}
                    watchFormulario={watchFormulario}
                    setInfoReset={setInfoReset}
                  />*/
                );
              case 1:
                return (
                  <>
                    <>2, soy el 2 siuu</>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBack}
                    >
                      Volver
                    </Button>
                  </>
                  /* <Parte2Screen
                    controlFormulario={controlFormulario}
                    handleSubmitFormulario={handleSubmitFormulario}
                    errorsFormulario={errorsFormulario}
                    resetFormulario={resetFormulario}
                    watchFormulario={watchFormulario}
                    setInfoReset={setInfoReset}
                  />*/
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
