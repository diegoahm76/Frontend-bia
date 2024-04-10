/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { PreciosContext } from "../../context/PersonalContext";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import SaveIcon from '@mui/icons-material/Save';
import { Title } from "../../../../../components/Title";

export const DetalleLiquidacion = () => {

  const { precios, setPrecios } = useContext(PreciosContext);
  console.log(precios);






  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');

  // Función para manejar el cambio en el campo de descripción
  const handleDescripcionChange = (event: any) => {
    setDescripcion(event.target.value);
  };

  // Función para manejar el cambio en el campo de valor
  const handleValorChange = (event: any) => {
    setValor(event.target.value);
  };

  // Función para agregar un nuevo precio
  const handleAddPrice = () => {
    if (descripcion && valor) { // Verificar que la descripción y el valor no estén vacíos
      const nuevoPrecio = { descripcion: descripcion, valor: parseFloat(valor) };
      setPrecios([...precios, nuevoPrecio]); // Agregar el nuevo precio al estado de precios
      setDescripcion(''); // Limpiar el campo de descripción
      setValor(''); // Limpiar el campo de valor
    }
  };

  const handleRemovePrice = (indexToRemove: any) => {
    setPrecios(prevPrecios => prevPrecios.filter((_, index) => index !== indexToRemove));
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
    { field: 'valor', headerName: 'Valor', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <strong>
          <Button variant="contained" color="secondary" onClick={() => handleRemovePrice(params.row.id)}>
            Eliminar
          </Button>
        </strong>
      ),
    },
  ];

  const rows = precios.map((precio, index) => ({ id: index + 1, descripcion: precio.descripcion, valor: precio.valor }));


  return (
    <>
      <Grid item xs={12}>
          <Title title="Detalle Liquidacion"/>
      </Grid>

        
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Descripción del precio'
            value={descripcion}
            onChange={handleDescripcionChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Valor del precio'
            value={valor}
            onChange={handleValorChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPrice}
            startIcon={<SaveIcon />}

          >
            Agregar precio
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={8}>
          <div style={{ height: 300, width: '100%', marginTop: 15 }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />

          </div>
        </Grid>
      </Grid>


    </>
  );
};
