/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';

export const FormularioGenerador: React.FC<any> = ({variablesPlantilla, showVariables, exCallback} : {variablesPlantilla: any[], showVariables: boolean, exCallback: (data: any) => void}) => {
  const [formValues, setFormValues] = useState<any>({});

  const handleInputChange = (event: any, variable: string) => {
    setFormValues({
      ...formValues,
      [variable]: event.target.value,
    });
  };

  exCallback(formValues);

  const capitalizeAndSeparate = (name: string): string => {
    const words = name.split(/(?=[A-Z])/);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  };

  return (
    <>
      {showVariables && variablesPlantilla.length > 0  && <Grid item xs={12}>
        <Typography variant="h6" sx={{ mt: 2 }}>Campos editables de la plantilla</Typography>
      </Grid>}
      {showVariables && variablesPlantilla.length > 0 && variablesPlantilla.map((variable, i) => (
        <Grid item xs={12} lg={4} key={i}>
        <TextField
          fullWidth
          size="small"
          label={capitalizeAndSeparate(variable)}
          variant="outlined"
          value={formValues[variable] || ''}
          onChange={(event) => handleInputChange(event, variable)}
        />
        </Grid>
      ))}
    </>
  );
};
