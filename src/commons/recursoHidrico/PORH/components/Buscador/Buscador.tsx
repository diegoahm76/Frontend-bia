/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { TextField, InputLabel } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from '../../context/contextData';

const styles = makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: '1rem',
      width: '25ch'
    }
  }
});

export const BuscadorAtomPORH = (props: any): JSX.Element => {

  const {label} = props;
  const classes = styles();

  /* if (!data) {
    return <></>;
  } */

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <InputLabel htmlFor={
            label
        }>{
          label
          }</InputLabel>
        <TextField
        name = {label}
         id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
    </div>
  );
};
