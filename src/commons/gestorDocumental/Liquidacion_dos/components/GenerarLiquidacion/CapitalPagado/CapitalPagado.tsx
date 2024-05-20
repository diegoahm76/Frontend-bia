/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { Grid, Switch, TextField } from '@mui/material';
import { InputAdornment } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export const CapitalPagado = () => {


  const [inputs, setInputs] = useState({
    capitalPagado: 0,
    valorAvaluo: 0
  });
  const [showTextField1, setShowTextField1] = useState(false);
  const [showTextField2, setShowTextField2] = useState(false);

  const handleSwitch1Change = () => {
    setShowTextField1(!showTextField1);
  };

  const handleSwitch2Change = () => {
    setShowTextField2(!showTextField2);
  };

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
