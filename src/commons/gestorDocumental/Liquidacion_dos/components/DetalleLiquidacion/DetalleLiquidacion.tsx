/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PreciosContext } from "../../context/PersonalContext";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import SaveIcon from '@mui/icons-material/Save';
import { Title } from "../../../../../components/Title";
import { api } from "../../../../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { TipologiaDocumental } from "../../interfaces/InterfacesLiquidacion";



export const DetalleLiquidacion = () => {

  const { precios, setPrecios } = useContext(PreciosContext);
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');
  const [data_choise, set_data_choise] = useState<TipologiaDocumental[]>([]);


  const fetch_datos_choises = async (): Promise<void> => {
    try {
      const url = '/recaudo/configuracion_baisca/administracionpersonal/get/';
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const data_consulta = res.data.data;
      set_data_choise(data_consulta);
      // control_success('Datos actualizados correctamente');
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cambio en el campo de descripción
  const handleDescripcionChange = (event: any) => {
    setDescripcion(event.target.value);
  };

  // Función para manejar el cambio en el campo de valor
  const handleValorChange = (event: any) => {
    setValor(event.target.value);
  };

  const handleAddPrice = () => {
    if (descripcion && valor) {
      const selectedItem = data_choise.find(item => item.nombre === descripcion);

      if (selectedItem) {
        const nuevoPrecio = {
          descripcion: selectedItem.descripcion,
          valor: valor.toString(), // Convertir a string
          nombre: selectedItem.nombre,
          nivel: selectedItem.nivel,
        };
        setPrecios([...precios, nuevoPrecio]);
        setDescripcion('');
        setValor('');
      } else {
        console.error('El elemento seleccionado no se encontró en data_choise');
      }
    }
  };

  const handleRemovePrice = (indexToRemove: any) => {
    setPrecios(prevPrecios => prevPrecios.filter((_, index) => index !== indexToRemove));
  };

  const uniqueDataChoise = data_choise.reduce((acc: TipologiaDocumental[], current: TipologiaDocumental) => {
    const x = acc.find(item => item.nombre === current.nombre);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);



    const columns = [
      { field: 'nivel', headerName: 'Nivel', flex: 1 },
      { field: 'descripcion', headerName: 'Descripción', flex: 1 },
      { field: 'valor', headerName: 'Valor', flex: 1 },
      {
        field: 'Acciones',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params: GridCellParams) => (
          <IconButton color="error" onClick={() => handleRemovePrice(params.row.id - 1)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
  
    const rows = precios.map((precio, index) => ({ id: index + 1, descripcion: precio.descripcion, valor: precio.valor, nivel: precio.nivel }));

    

  useEffect(() => {
    fetch_datos_choises();
  }, [])

  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12}>


          <Grid item xs={12}>
            <Title title="Detalle Liquidacion" />
          </Grid>


          <Grid container spacing={0}>
            <Grid item xs={12} sm={5} style={{ marginTop: 15 }}>

              <FormControl fullWidth >
                <InputLabel id="choise-label">Profesional</InputLabel>
                <Select
                  id="demo-simple-select-2"
                  size="small"
                  name="Profesional"
                  style={{ width: "95%" }}
                  label="Profesional"
                  value={descripcion || ""}
                  onChange={handleDescripcionChange}
                >
                  {uniqueDataChoise?.map((item: any, index: number) => (
                    <MenuItem key={index} value={item.nombre}>
                      {item.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>





            </Grid>

            <Grid item xs={12} sm={4} style={{ marginTop: 15 }} >
              <FormControl fullWidth>
                <InputLabel id="valor-label">Valor del precio</InputLabel>
                <Select
                  id="valor"
                  name="valor"
                  size="small"
                  label="Selecciona tipología documental"
                  value={valor || ""}
                  onChange={handleValorChange}
                  style={{ width: "95%" }}
                  fullWidth
                >
                  {data_choise
                    .filter(item => item.nombre === descripcion)
                    .map((item, index) => (
                      <MenuItem key={index} value={item.valor}>
                        {`Nivel: ${item.nivel} - Valor: ${item.valor}`}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                style={{ marginTop: 15, width: "95%" }}
                color="primary"
                onClick={handleAddPrice}
                startIcon={<SaveIcon />}

              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          <div style={{ height: 300, width: '100%', marginTop: 15 }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />

          </div>
        </Grid>
      </Grid>


    </>
  );
};
