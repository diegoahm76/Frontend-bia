/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { PreciosContext } from "../../context/PersonalContext";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import SaveIcon from '@mui/icons-material/Save';
import { Title } from "../../../../../components/Title";
import { api } from "../../../../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { OpcionLiquidacion, TipologiaDocumental } from "../../interfaces/InterfacesLiquidacion";
import CalculateIcon from '@mui/icons-material/Calculate';
import { InputAdornment } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { formatNumber, formatNumberTable } from "../../utils/NumerosPuntosMiles";
import { Chip } from "@mui/material";



export const DetalleLiquidacion = () => {

  const { precios, setPrecios, logs } = useContext(PreciosContext);
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');
  const [data_choise, set_data_choise] = useState<TipologiaDocumental[]>([]);
  const [opciones_liquidacion, set_opciones_liquidacion] = useState<OpcionLiquidacion[]>([]);
  const [id_opcion_liquidacion, set_id_opcion_liquidacion] = useState("70");
  const [variableValues, setVariableValues] = useState<{ [key: string]: string }>({});
  const [valor_total, set_valor_total] = useState();

  console.log("precios", precios)

  const sumaValores = precios.reduce((total, item) => {
    // Convierte el valor a número antes de sumarlo
    const valor_dias = parseInt(item.valorfuncionario_mes || "0") / 30;
    const total_dias_funcianrio = parseInt(item.dias || "0") * valor_dias;
    const valorNumerico = parseInt(item.resultado || "0");
    return total + total_dias_funcianrio;
  }, 0);

  const total_defecto = parseInt(logs.total_valor_veiculos) ? parseInt(logs.total_valor_veiculos) : 0;
  const total_actual = total_defecto + sumaValores;
  const Porcentaje = total_actual * 0.25;



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
          valor: valor.toString(),
          nombre: selectedItem.nombre,
          nivel: selectedItem.nivel,
          valorfuncionario_mes: valor,
          resultado: valor_total !== null ? valor_total : 'xx', // Asigna el valor de valor_total al campo 'resultado'
          ...variableValues // Incluir campos adicionales de variableValues
        };
        setPrecios([...precios, nuevoPrecio]);
        setDescripcion('');
        setValor('');
        setVariableValues({}); // Restablecer variableValues después de agregarlos
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
    // { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'descripcion', headerName: 'Funcionario', flex: 1 },
    // { field: 'valor', headerName: 'Valor', flex: 1, valueFormatter: (params: any) => formatNumber(params.value) },
    { field: 'nivel', headerName: 'Nivel', flex: 1, renderCell: (params: any) => (<Chip label={params.value} />) },
    { field: 'valorfuncionario_mes', headerName: 'Valor Funcionario Mes', flex: 1, valueFormatter: (params: any) => formatNumber(params.value) },
    { field: 'dias', headerName: 'Días', flex: 1 },
    { field: 'resultado', headerName: 'Dias Por Valor', flex: 1, valueFormatter: (params: any) => formatNumberTable(params.value) }, // Aplicar la función de formato
    {
      field: 'Acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params: any) => (
        <IconButton color="error" onClick={() => handleRemovePrice(params.row.id - 1)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];


  const rows = precios.map((precio, index) => ({
    id: index + 1,
    descripcion: precio.descripcion,
    valor: precio.valor,
    nivel: precio.nivel,
    valorfuncionario_mes: precio.valorfuncionario_mes || '', // Maneja el caso cuando el atributo no está presente o es undefined
    dias: precio.dias || '', // Maneja el caso cuando el atributo no está presente o es undefined
    resultado: precio.resultado || '', // Añade el campo 'resultado'

  }));


  const opcionSeleccionada = opciones_liquidacion.find(opcion => opcion.id === parseInt(id_opcion_liquidacion));



  const calcularResultado = () => {
    try {
      // Parsear la función matemática
      const funcionParseada = opcionSeleccionada?.funcion || '';

      // Sustituir las variables en la función con sus valores
      const funcionConValores = funcionParseada.replace(/(\w+)/g, (match, p1) => {
        return variableValues[p1] !== undefined ? variableValues[p1] : match;
      });

      // Evaluar la función con los valores de las variables
      const resultado = eval(funcionConValores);
      return resultado;
    } catch (error) {
      console.error('Error al calcular el resultado:', error);
      return null;
    }
  };


  // Calcular el resultado
  const resultadoo = calcularResultado();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVariableValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handle_select_change: (event: any) => void = (event: any) => {
    set_id_opcion_liquidacion(event.target.value);
  }

  useEffect(() => {
    fetch_datos_choises();
  }, [])

  const valueeee = [{
    "id": 70,
    "usada": false,
    "nombre": "LiquidacionInicioTramite",
    "estado": 1,
    "version": 1,
    "funcion": "(valorfuncionario / 30 ) * dias;",
    "variables": {
      "dias": "",
      "valorfuncionario": ""
    },
    "bloques": "",
    "tipo_renta": "True",
    "tipo_cobro": "True"
  }]

  useEffect(() => {
    set_opciones_liquidacion(valueeee);
  }, []);



  const Enviar_Valor = () => {
    set_valor_total(resultadoo)
  }

  useEffect(() => {
    setVariableValues(prevState => ({
      ...prevState,
      valorfuncionario: valor // Establecer el valor fijo
    }));
  }, [valor]); // Se ejecutará solo una vez después de la inicialización del componente


  useEffect(() => {
    set_valor_total(resultadoo)
  }, [valor]); // Se ejecutará solo una vez después de la inicialización del componente



  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12}>


          <Grid item xs={12}>
            <Title title="Detalle Liquidacion" />
          </Grid>




          <Grid container alignItems="center" justifyContent="center">



            <Grid item xs={12} sm={6} style={{ marginTop: 15 }}>

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




            <Grid item xs={12} sm={6} style={{ marginTop: 15 }} >
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


            {Object.keys(opcionSeleccionada?.variables || {}).map((key) => (
              <Grid key={key} item xs={6} >
                <TextField
                  style={{ width: '95%', marginTop: 10 }}
                  variant="outlined"
                  size="small"
                  label={key}
                  fullWidth
                  name={key}
                  value={variableValues[key] || ''}
                  onChange={handleChange}
                  disabled={key === 'valorfuncionario'} // Solo deshabilitar si la clave es 'valorfuncionario'
                />
              </Grid>
            ))}

          </Grid>





          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={4}>
              <Button
                onClick={Enviar_Valor}
                variant="contained"
                style={{ marginTop: 15, width: "95%" }}
                color="primary"
                startIcon={<CalculateIcon />}

              >
                Calcualar Total
              </Button>
            </Grid>


            <Grid item xs={4}>
              <TextField
                style={{ width: '95%', marginTop: 10 }}
                variant="outlined"
                label="Total"
                fullWidth
                size="small"
                value={valor_total || ''}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>



            <Grid item xs={5}>
              <Button
                variant="contained"
                style={{ marginTop: 15, width: "95%" }}
                color="success"
                onClick={handleAddPrice}
                startIcon={<SaveIcon />}
                disabled={!descripcion || !valor || !valor_total}

              >
                Agregar
              </Button>
            </Grid>


          </Grid>
          <div style={{ height: 300, width: '100%', marginTop: 15 }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />

          </div>
        </Grid>



        <Grid item xs={12} sm={3}>
          <TextField
            label="Sub Total"
            style={{ marginTop: 15, width: "95%" }}
            name="valor"
            type="text" // Cambiado de 'number' a 'text'
            size="medium"
            disabled
            fullWidth
            value={total_actual ? formatNumber(total_actual) : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="% Gastos Administrativos"
            style={{ marginTop: 15, width: "95%" }}
            name="valor"
            type="text" // Cambiado de 'number' a 'text'
            size="medium"
            disabled
            fullWidth
            value={Porcentaje ? formatNumber(Porcentaje) : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Total"
            style={{ marginTop: 15, width: "95%" }}
            name="valor"
            type="text" // Cambiado de 'number' a 'text'
            size="medium"
            disabled
            fullWidth
            value={Porcentaje|total_actual?formatNumber(Porcentaje+total_actual ): ""}
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


    </>
  );
};
