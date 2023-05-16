// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // Componentes de Material UI
// import {
//   Grid,
//   Box,
//   Stack,
//   Button,
//   IconButton,
//   Avatar,
//   Chip,
// } from '@mui/material';
// // Icons de Material UI
// import AddIcon from '@mui/icons-material/Add';
// // import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// // Componentes personalizados
// import { Title } from '../../../../components/Title';
// // Hooks
// import { useAppDispatch, useAppSelector } from '../../../../hooks';

import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


// eslint-disable-next-line @typescript-eslint/naming-convention
export function CierreSolicitudScreen(): JSX.Element {
  const { register, handleSubmit:handle_submit, formState: { errors }, watch, setValue: set_value } = useForm();
  const [selected_values, set_selected_values] = useState([]);
 

  const options = ['Opción 1', 'Opción 2', 'Opción 3'];

const handle_selection_change = (values: any): void => {
  console.log(values)
  set_selected_values(values);
};

const on_submit = (data:any): void => {
  console.log(data); // Aquí puedes hacer algo con los datos del formulario
};

useEffect(() => {
  // set_value("autocompleteField", selected_values)
  console.log(watch())
  
}, [watch("autocompleteField")]);


    return (

      <form 
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handle_submit(on_submit)}>
      <Autocomplete
        multiple
        options={options} 
        value={selected_values}
        
        {...register('autocompleteField', { required: 'Campo requerido' })}
        renderInput={(params) => (
          <TextField
            {...params }
            label="Autocomplete Field"
            error={!!errors.autocompleteField}
            />
        )}  
        onChange={(event, value) => handle_selection_change(value)}    />
      <button type="submit">Enviar</button>
    </form>
    );
  }
  