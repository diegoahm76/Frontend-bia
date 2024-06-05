/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { Grid, Switch, TextField } from '@mui/material';
import { InputAdornment } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Componente CapitalPagado
export const CapitalPagado = () => {
  // Estados para los valores de capital pagado y valor del avalúo, y para controlar la visibilidad de los campos de texto
  const [inputs, setInputs] = useState({
    capitalPagado: 0,
    valorAvaluo: 0
  });
  const [showTextField1, setShowTextField1] = useState(false);
  const [showTextField2, setShowTextField2] = useState(false);

  // Función para cambiar la visibilidad del primer campo de texto
  const handleSwitch1Change = () => {
    setShowTextField1(!showTextField1);
  };

  // Función para cambiar la visibilidad del segundo campo de texto
  const handleSwitch2Change = () => {
    setShowTextField2(!showTextField2);
  };

  // Función para manejar los cambios en los campos de texto de capital pagado y valor del avalúo
  const handleInputChangeCapitalValor = (event:any) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value === '' ? 0 : parseFloat(value)
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Switch y TextField para el campo de capital pagado */}
          <Grid item xs={1}>
            <Switch
              checked={showTextField1}
              onChange={handleSwitch1Change}
              color="primary"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label={showTextField1 ? 'Capital pagado' : ' Ingresar capital pagado'}
              name="capitalPagado"
              value={showTextField1 ? inputs.capitalPagado : ''}
              style={{width:"95%"}}
              size="small"
              fullWidth
              disabled={!showTextField1}
              onChange={handleInputChangeCapitalValor}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          {/* Switch y TextField para el campo de valor del avalúo */}
          <Grid item xs={1}>
            <Switch
              checked={showTextField2}
              onChange={handleSwitch2Change}
              color="primary"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label={showTextField2 ? 'Valor avalúo' : 'Ingresar valor avalúo'}
              name="valorAvaluo"
              value={showTextField2 ? inputs.valorAvaluo : ''}
              size="small"
              style={{width:"95%"}}
              fullWidth
              disabled={!showTextField2}
              onChange={handleInputChangeCapitalValor}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
