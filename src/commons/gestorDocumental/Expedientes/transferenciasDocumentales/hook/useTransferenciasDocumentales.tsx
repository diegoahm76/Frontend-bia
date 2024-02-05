/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line @typescript-eslint/naming-convention
import { useContext } from 'react';
import { TransferDocContext } from '../context/TransferDocContext';

export const useTransferenciasDocumentales  = (): any => {
  const { skipped, activeStep, setSkipped, setActiveStep } = useContext(
    TransferDocContext
  );

  const isStepSkipped = (step: number) => skipped.has(step);

  const createNewSet = (set: Set<number>) => new Set(set.values());

  const handleNext = () => {
    const newSkipped = createNewSet(skipped);
    if (isStepSkipped(activeStep)) {
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);

  const handleSkip = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    setSkipped((prevSkipped: Set<number>) => {
      const newSkipped = createNewSet(prevSkipped);
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => setActiveStep(0);

  return {
    isStepSkipped,
    handleNext,
    handleBack,
    handleSkip,
    handleReset,
  };
};
