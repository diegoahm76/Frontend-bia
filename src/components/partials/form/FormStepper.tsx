/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Grid from '@mui/material/Grid';
import { Box, Chip, Stack } from '@mui/material';
import FormInputController from './FormInputController';
import FormInputNoController from './FormInputNoController';
import FormSelectController from './FormSelectController';
import FormButton from './FormButton';
import { Title } from '../../Title';
import FormInputFileController from './FormInputFileController';
import FormDatePickerController from './FormDatePickerController';
import ImageUploader from './ImageUploader';
import FormDateTimePickerController from './FormDateTimePickerController';
import FormDateRangePickerController from './FormDateRangePickerController';

import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IObjStepConfiguration } from '../../../commons/gestorDocumental/PQRSDF/interfaces/pqrsdf';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { type SubmitHandler } from 'react-hook-form';
import { validate } from 'uuid';
interface IProps {
  configuration_steps: IObjStepConfiguration[];
  message_success?: string | null;
  handle_submit?: any | null;
  validate?: any | null;
  set_success: any;
  step?: number | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormStepper = ({
  configuration_steps,
  message_success,
  set_success,
  step,
}: IProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  React.useEffect(() => {
    setActiveStep(step ?? 0);
  }, [step]);
  React.useEffect(() => {
    if (activeStep === configuration_steps.length) {
      set_success(true);
    }
  }, [activeStep]);

  const isStepOptional = (step: number) => {
    return configuration_steps[step].optional ?? false;
  };

  const isStepSkipped = (step: number) => {
    return configuration_steps[step].skipped ?? false;
  };

  const handleNext = (data: any): void => {
    configuration_steps[activeStep].validate(data, activeStep);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("No se puede saltar un paso que no es opcional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box component="form" sx={{ width: '100%' }} margin={2}>
      <Stepper activeStep={activeStep}>
        {configuration_steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Opcional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.step_title} {...stepProps}>
              <StepLabel {...labelProps}>{step.step_title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === configuration_steps.length ? (
        <React.Fragment>
          <Stack direction="row" spacing={1} alignItems={'center'}>
            <Chip
              icon={<PlaylistAddCheckCircleIcon />}
              label={message_success ?? 'Diligenciado con exito!!'}
              color="success"
            />
          </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button variant="contained" onClick={handleReset}>
              Reiniciar
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {configuration_steps[activeStep].body ?? null}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              variant="contained"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button
                variant="contained"
                color="inherit"
                onClick={handleSkip}
                sx={{ mr: 1 }}
              >
                Saltar
              </Button>
            )}
            <Button
              variant="contained"
              onClick={configuration_steps[activeStep].handle_submit(
                handleNext
              )}
            >
              {activeStep === configuration_steps.length - 1
                ? 'Finalizar'
                : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormStepper;
