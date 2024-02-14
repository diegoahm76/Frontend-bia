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
import { Parte2Screen } from '../parte2/screen/Parte2Screen';

export const steps = ['Historial de transferencias', 'Expediente'];
export const StepperTranferDocs = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: any): JSX.Element => {
  const { activeStep } =
    useContext(TransferDocContext);

  // ? stepper hook
  const { isStepSkipped } =
    useTransferenciasDocumentales();

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{
        my: '1.5rem',
      }}>
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
                );
              case 1:
                return (
                  <>
                    <Parte2Screen
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
