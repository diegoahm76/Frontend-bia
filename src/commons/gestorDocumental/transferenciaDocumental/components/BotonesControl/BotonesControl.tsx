/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from "react";
import { Grid, Button } from "@mui/material";
import { StepperContext } from "../../context/ContextControlSteper";

export const BotonesControlSteper = () => {
  const { activeStep, setActiveStep } = useContext(StepperContext);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ marginRight: '10px' }}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={activeStep === 1}
          onClick={handleNext}
        >
          Siguiente
        </Button>
      </Grid>
    </>
  );
};
