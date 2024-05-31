/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';

export const FormularioGenerador: React.FC<any> = (
  {variablesPlantilla, showVariables, isNewData, exCallback, setIsNewData, cleanFields, setCleanFields} :
  {variablesPlantilla: any[], showVariables: boolean, isNewData: boolean, exCallback: (data: any) => void, setIsNewData: (bool: boolean) => void, cleanFields: boolean, setCleanFields: (bool: boolean) => void}
) => {
  const [formValues, setFormValues] = useState<any>({});

  const handleInputChange = (event: any, variable: string) => {
    setFormValues({
      ...formValues,
      [variable]: event.target.value,
    });
  };

  useEffect(() => {
    if (isNewData) {
      exCallback(formValues);
      setIsNewData(false);
    }
  }, [isNewData]);

  useEffect(() => {
    if (cleanFields) {
      cleanForm();
      setCleanFields(false);
    }
  }, [cleanFields])

  const capitalizeAndSeparate = (name: string): string => {
    const words = name.split(/(?=[A-Z])|_|-/);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  };

  const cleanForm = () => {
    const camposVacios: any = {};
    variablesPlantilla.forEach(variable => {
        camposVacios[variable] = '';
    });
    setFormValues(camposVacios);
  }

  return (
    <>
      {showVariables && variablesPlantilla.length > 0  && <Grid item xs={12}>
        <Typography variant="h6" sx={{ mt: 2 }}>Campos editables de la plantilla</Typography>
      </Grid>}
      {showVariables && variablesPlantilla.length > 0 && variablesPlantilla.map((variable, i) => (
        <Grid item xs={12} lg={4} key={i}>
        <TextField
          multiline
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
