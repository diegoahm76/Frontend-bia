/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Grid, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useEffect, useState, type FC } from 'react';
import { Title } from '../../../../components';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import { api, baseURL } from '../../../../api/axios';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  Departamento,
  DepartamentoResponse,
  Municipios,
  MunicipiosResponse,
  Paises,
  PaisesResponse,
  SucursalDireccionesProps,
} from './utils/interfac';
import Swal from 'sweetalert2';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalDirecciones: FC<SucursalDireccionesProps> = ({
  setsame_address,
  same_address,
  form_values,
  handleinput_change,
}) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [link, set_link] = useState('');
  const [, setselected_municipio] = useState('');
  const [paises, setpaises] = useState<Paises[]>([]);
  const [, setselected_municipionoti] = useState('');
  const [selected_pais, setselected_pais] = useState('');
  const [pais_retur, set_pais_retur] = useState<Paises[]>([]);
  const [municipios, setmunicipios] = useState<Municipios[]>([]);
  const [selected_departamento, setselected_departamento] = useState('');
  const [departamentos, set_departamentos] = useState<Departamento[]>([]);
  const [municipios_noti, set_municipios_noti] = useState<Municipios[]>([]);
  const [opengeneradordirecciones, setopengeneradordirecciones] = useState(false);


  const [selected_departamento_noti, setselected_departamento_noti] =
    useState('');
  const [departamentos_noti, set_departamentos_noti] = useState<Departamento[]>(
    []
  );
  const [opengeneradordireccioness, setopengeneradordireccioness] = useState(false);
  const [departamentos_retur, set_departamentos_retur] = useState<
    Departamento[]
  >([]);
  const [departamentos_noti_retur, set_departamentos_noti_retur] = useState<
    Departamento[]
  >([]);

  useEffect(() => {
    const fetch_data = async (): Promise<any> => {
      try {
        const response = await fetch(`${baseURL}listas/paises/`);
        const data: PaisesResponse = await response.json();
        if (data.success) {
          setpaises(data.data);
        } else {
          //  console.log('')(data.detail);
        }
      } catch (error) {
        //  console.log('')('Error fetching paises:', error);
      }
    };
    void fetch_data();
  }, []);

  useEffect(() => {
    if (form_values.municipio === null) {
      set_pais_retur([]); // Establece el estado como vacío si municipio es null
      return; // Sale de la función para evitar el fetch
    }
    /*const fetch_data = async (): Promise<any> => {
            try {
                if (form_values.municipio === null || form_values.municipio === undefined) {
                    //  console.log('')('municipio is null or undefined');
                    return;
                }
                const response = await fetch(`https://back-end-bia-beta.up.railway.app/api/listas/paises/?cod_municipio=${form_values.municipio}`);
                const data: DepartamentoResponse = await response.json();
                if (data.success) {
                    set_pais_retur(data.data);
                } else {
                    //  console.log('')(data.detail);
                }
            } catch (error) {
                //  console.log('')('Error fetching departamentos de notificación:', error);
            }
        };*/

    const fetch_data = async (): Promise<any> => {
      try {
        if (
          form_values.municipio === null ||
          form_values.municipio === undefined
        ) {
          //  console.log('')('municipio is null or undefined');
          return;
        }
        const response = await api.get(
          `listas/paises/?cod_municipio=${form_values.municipio}`
        );
        const data: DepartamentoResponse = response.data;
        if (data.success) {
          set_pais_retur(data.data);
        } else {
          //  console.log('')(data.detail);
        }
      } catch (error) {
        //  console.log('')('Error fetching departamentos de notificación:', error);
      }
    };
    void fetch_data();
  }, [form_values.municipio]);

  useEffect(() => {
    set_link(`${baseURL}listas/departamentos/?pais=${selected_pais}`);
  }, [selected_pais]);

  useEffect(() => {
    if (form_values.municipio === null) {
      set_departamentos_retur([]);
      // Establece el estado como vacío si municipio es null
      return; // Sale de la función para evitar el fetch
    }
    /*const fetch_data = async (): Promise<any> => {
            try {
                if (form_values.municipio !== null) {
                    const response = await fetch(`https://back-end-bia-beta.up.railway.app/api/listas/departamentos/?pais=${selected_pais}&municipio=${form_values.municipio}`);
                    const data: DepartamentoResponse = await response.json();
                    if (data.success) {
                        set_departamentos_retur(data.data);
                    } else {
                        //  console.log('')(data.detail);
                    }
                } else {
                    //  console.log('')('form_values.municipio es null.');
                }
            } catch (error) {
                //  console.log('')('Error fetching departamentos de notificación:', error);
            }
        };*/

    const fetch_data = async (): Promise<any> => {
      try {
        if (form_values.municipio !== null) {
          const response = await api.get(
            `listas/departamentos/?pais=${selected_pais}&municipio=${form_values.municipio}`
          );
          const data: DepartamentoResponse = response.data;
          if (data.success) {
            set_departamentos_retur(data.data);
          } else {
            //  console.log('')(data.detail);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.detail,
            });
          }
        } else {
          //  console.log('')('form_values.municipio es null.');
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'form_values.municipio es null.',
          });
        }
      } catch (error) {
        //  console.log('')('Error fetching departamentos de notificación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching departamentos de notificación:',
          footer: `<p>${error}</p>`,
        });
      }
    };
    void fetch_data();
  }, [form_values.municipio]);

  useEffect(() => {
    const fetch_data = async (): Promise<any> => {
      try {
        const response = await fetch(link);
        const data: DepartamentoResponse = await response.json();
        if (data.success) {
          set_departamentos(data.data);
        } else {
          //  console.log('')(data.detail);
        }
      } catch (error) {
        //  console.log('')('Error fetching departamentos:', error);
      }
    };
    void fetch_data();
  }, [link]);

  useEffect(() => {
    const fetch_data = async (): Promise<any> => {
      try {
        const response = await fetch(
          `${baseURL}listas/municipios/?cod_departamento=${selected_departamento}`
        );
        const data: MunicipiosResponse = await response.json();
        if (data.success) {
          setmunicipios(data.data);
        } else {
          //  console.log('')(data.detail);
        }
      } catch (error) {
        //  console.log('')('Error fetching municipios:', error);
      }
    };
    void fetch_data();
  }, [selected_departamento]);
  useEffect(() => {
    /* const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(`https://back-end-bia-beta.up.railway.app/api/listas/departamentos/?pais=`);
                const data: DepartamentoResponse = await response.json();
                if (data.success) {
                    set_departamentos_noti(data.data);
                } else {
                    //  console.log('')(data.detail);
                }
            } catch (error) {
                //  console.log('')('Error fetching departamentos de notificación:', error);
            }
        };*/
    const fetch_data = async (): Promise<any> => {
      try {
        const response = await api.get(`listas/departamentos/?pais=`);
        const data: DepartamentoResponse = response.data;
        if (data.success) {
          set_departamentos_noti(data.data);
        } else {
          //  console.log('')(data.detail);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.detail,
          });
        }
      } catch (error) {
        //  console.log('')('Error fetching departamentos de notificación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching departamentos de notificación:',
          footer: `<p>${error}</p>`,
        });
      }
    };

    void fetch_data();
  }, [selected_pais]);
  useEffect(() => {
    if (form_values.municipio_notificacion === null) {
      set_departamentos_noti_retur([]); // Establece el estado como vacío si municipio es null
      return; // Sale de la función para evitar el fetch
    }
    /*  const fetch_data = async (): Promise<any> => {
            try {
                if (form_values.municipio_notificacion === null || form_values.municipio_notificacion === undefined) {
                    //  console.log('')('municipio_notificacion is null or undefined');
                    return;
                }
                const response = await fetch(`https://back-end-bia-beta.up.railway.app/api/listas/departamentos/?pais=CO&municipio=${form_values.municipio_notificacion}`);
                const data: DepartamentoResponse = await response.json();

                if (data.success) {
                    set_departamentos_noti_retur(data.data);
                } else {
                    //  console.log('')(data.detail);
                }
            } catch (error) {
                //  console.log('')('Error fetching departamentos de notificación:', error);
            }
        };*/

    const fetch_data = async (): Promise<any> => {
      try {
        if (
          form_values.municipio_notificacion === null ||
          form_values.municipio_notificacion === undefined
        ) {
          //  console.log('')('municipio_notificacion is null or undefined');
          return;
        }
        const response = await api.get(
          `listas/departamentos/?pais=CO&municipio=${form_values.municipio_notificacion}`
        );
        const data: DepartamentoResponse = response.data;

        if (data.success) {
          set_departamentos_noti_retur(data.data);
        } else {
          //  console.log('')(data.detail);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.detail,
          });
        }
      } catch (error) {
        //  console.log('')('Error fetching departamentos de notificación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching departamentos de notificación:',
          footer: `<p>${error}</p>`,
        });
      }
    };

    void fetch_data();
  }, [form_values.municipio_notificacion]);
  // Nuevo useEffect para obtener municipios de notificación del departamento seleccionado
  useEffect(() => {
    /*  const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(`https://back-end-bia-beta.up.railway.app/api/listas/municipios/?cod_departamento=${selected_departamento_noti}`);
                const data: MunicipiosResponse = await response.json();
                if (data.success) {
                    set_municipios_noti(data.data);
                } else {
                    //  console.log('')(data.detail);
                }
            } catch (error) {
                //  console.log('')('Error fetching municipios de notificación:', error);
            }
        };*/
    const fetch_data = async (): Promise<any> => {
      try {
        const response = await api.get(
          `listas/municipios/?cod_departamento=${selected_departamento_noti}`
        );
        const data: MunicipiosResponse = response.data;
        if (data.success) {
          set_municipios_noti(data.data);
        } else {
          //  console.log('')(data.detail);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.detail,
          });
        }
      } catch (error) {
        //  console.log('')('Error fetching municipios de notificación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching municipios de notificación:',
          footer: `<p>${error}</p>`,
        });
      }
    };
    void fetch_data();
  }, [selected_departamento_noti]);

  const [error] = useState<any>('');
  const is_error = error !== '';
  const [  type_direction, // set_type_direction
  ] = useState('');
  //  console.log('')(is_error);
  const [type_directionn,
    // set_type_direction
  ] = useState('');
  //  console.log('')(is_error);

  // const [same_address, setsame_address] = useState(false);

  const handle_checkbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setsame_address(event.target.checked);
    setselected_departamento_noti('');
    if (event.target.checked) {
      handleinput_change({
        target: {
          name: 'direccion_notificacion_referencia',
          value: form_values.direccion_sucursal_georeferenciada,
        },
      });
      handleinput_change({
        target: {
          name: 'direccion_notificacion',
          value: form_values.direccion,
        },
      });
      handleinput_change({
        target: {
          name: 'municipio_notificacion',
          value: form_values.municipio,
        },
      });
      handleinput_change({
        target: {
          name: 'municipio_notificacion',
          value: form_values.municipio,
        },
      });
    }
  };
  const [, setdireccion_generada,] = useState('');

  const [, set_direccion_generada_activa,] = useState(false);

  const mostrardireccion_generada = (direccion: any): void => {
    setdireccion_generada(direccion);
    set_direccion_generada_activa(true);
    handleinput_change({
      target: {
        name: 'direccion',
        value: direccion, // Actualiza form_values.direccion con la dirección generada
      },
    });
  };
  const [
    ,
    // direccion_generada
    setdireccion_generadaa,
  ] = useState('');

  const [
    ,
    // direccionGeneradaActiva
    set_direccion_generada_activaa,
  ] = useState(false);

  const set_value_direction = (direccion_notificacion: any): void => {
    setdireccion_generadaa(direccion_notificacion);
    set_direccion_generada_activaa(true);
    handleinput_change({
      target: {
        name: 'direccion_notificacion',
        value: direccion_notificacion, // Actualiza form_values.direccion con la dirección generada
      },
    });
  };
  useEffect(() => {
    if (
      form_values.pais_sucursal_exterior === null &&
      form_values.municipio === null
    ) {
      setselected_departamento_noti(''); // Asigna una cadena no nula en lugar de null
    }
  }, [form_values.pais_sucursal_exterior, form_values.municipio]);

  useEffect(() => {
    if (
      form_values.pais_sucursal_exterior === null &&
      form_values.municipio === null
    ) {
      setselected_departamento(''); // Asigna una cadena no nula en lugar de null
    }
  }, [form_values.pais_sucursal_exterior, form_values.municipio]);

  return (
    <>
      <DialogGeneradorDeDirecciones
        open={opengeneradordireccioness}
        openDialog={setopengeneradordireccioness}
        onChange={set_value_direction}
        type={type_directionn}
      />

      <DialogGeneradorDeDirecciones
        open={opengeneradordirecciones}
        openDialog={setopengeneradordirecciones}
        onChange={mostrardireccion_generada} // Pasa la función para mostrar la dirección generada
        type={type_direction}
      />
      <Grid
        container
        spacing={2}
        direction="row"
        border={1}
        padding={2}
        borderColor="lightgray"
        borderRadius={2}
        sx={{ marginTop: '10px', marginLeft: '7px' }}
      >
        <Grid item xs={12} sx={{ marginTop: '-20px' }}>
          <Title title="Dirección física" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel shrink={true}>País</InputLabel>
            <Select
              label="país"
              name="pais_sucursal_exterior"
              /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
              value={form_values.pais_sucursal_exterior ?? 'dd'}
              onChange={(event) => {
                setselected_pais(event.target.value);
                handleinput_change(event);
              }}
            >
              {pais_retur.length === 1 && (
                <MenuItem value="dd">
                  {pais_retur.map((Paises) => (
                    <span key={Paises.value}>{Paises.label}</span>
                  ))}
                </MenuItem>
              )}
              {paises.map((Paises) => (
                <MenuItem key={Paises.value} value={Paises.value}>
                  {Paises.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel shrink={true}>Departamento</InputLabel>
            <Select
              label="Departamento"
              value={
                form_values.pais_sucursal_exterior === null
                  ? 'departametoo'
                  : selected_departamento
              }
              onChange={(event) => {
                setselected_departamento(event.target.value);
              }}
              disabled={
                form_values.pais_sucursal_exterior === null &&
                departamentos_retur.length !== 1
              }
            >
              {departamentos_retur.length === 1 && (
                <MenuItem value="departametoo">
                  {departamentos_retur.map((departamento) => (
                    <span key={departamento.value}>{departamento.label}</span>
                  ))}
                </MenuItem>
              )}

              {departamentos.map((departamento) => (
                <MenuItem key={departamento.value} value={departamento.value}>
                  {departamento.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel shrink={true}>Municipio</InputLabel>
            <Select
              label="Municipio"
              name="municipio"
              value={form_values.municipio}
              // onChange={handleinput_change}
              onChange={(event) => {
                const new_valor =
                  event.target.value !== null ? event.target.value : '';
                setselected_municipio(new_valor);
                handleinput_change(event);
              }}
              inputProps={{ shrink: true }}
              /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
              disabled={
                !selected_departamento && departamentos_retur.length !== 1
              }
            >
              {municipios.map((municipio) => (
                <MenuItem key={municipio.value} value={municipio.value}>
                  {municipio.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            size="small"
            label="Dirección  "
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            name="direccion"
            value={form_values.direccion}
            onChange={handleinput_change}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            size="small"
            label="Dirección sucursal georeferenciada lat  "
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            name="direccion_sucursal_georeferenciada_lat"
            value={form_values.direccion_sucursal_georeferenciada_lat}
            onChange={handleinput_change}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            size="small"
            label="Dirección sucursal georeferenciada lon  "
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            name="direccion_sucursal_georeferenciada_lon"
            value={form_values.direccion_sucursal_georeferenciada_lon}
            onChange={handleinput_change}
          />
        </Grid>

        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              setopengeneradordirecciones(true);
            }}
          >
            {' '}
            Generar dirección
          </Button>
        </Grid>


      </Grid>
      <Grid
        container
        spacing={2}
        direction="row"
        border={1}
        padding={2}
        borderColor="lightgray"
        borderRadius={2}
        sx={{ marginTop: '10px', marginLeft: '7px' }}
      >
        <Grid item xs={12} sx={{ marginTop: '-20px' }}>
          <Title title="Dirección de notificación nacional" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel shrink={true}>Departamento</InputLabel>
            <Select
              label="Departamento"
              /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
              value={selected_departamento_noti || 'departameto'}
              // value={form_values.pais_sucursal_exterior === null ? "departameto" : selected_departamento_noti}
              onChange={(event) => {
                setselected_departamento_noti(event.target.value);
              }}
              disabled={
                form_values.pais_sucursal_exterior === null &&
                departamentos_retur.length !== 1
              }
            >
              {departamentos_noti_retur.length === 1 && (
                <MenuItem value="departameto">
                  {departamentos_noti_retur.map((departamento) => (
                    <span key={departamento.value}>{departamento.label}</span>
                  ))}
                </MenuItem>
              )}
              {departamentos_noti.map((departamento) => (
                <MenuItem key={departamento.value} value={departamento.value}>
                  {departamento.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel shrink={true}>Municipio</InputLabel>
            <Select
              label="Municipio"
              name="municipio_notificacion"
              value={
                same_address
                  ? form_values.municipio
                  : form_values.municipio_notificacion
              }
              onChange={(event) => {
                const new_value =
                  event.target.value !== null ? event.target.value : '';
                setselected_municipionoti(new_value);
                handleinput_change(event);
              }}
              /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
              disabled={
                !selected_departamento_noti &&
                departamentos_noti_retur.length !== 1
              }
            >
              {municipios_noti.map((municipio) => (
                <MenuItem key={municipio.value} value={municipio.value}>
                  {municipio.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox checked={same_address} onChange={handle_checkbox} />
            }
            label="Misma dirección física"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            size="small"
            label="Dirección notificación  "
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            name="direccion_notificacion"
            // value={form_values.direccion_notificacion}
            value={
              same_address
                ? form_values.direccion
                : form_values.direccion_notificacion
            }
            onChange={handleinput_change}
          />
        </Grid>
        {/* <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="dirección notificación geográfica"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion_notificacion_referencia"
                        value={same_address ? form_values.direccion_sucursal_georeferenciada : form_values.direccion_notificacion_referencia}

                        // value={form_values.direccion_notificacion_referencia}
                        onChange={handleinput_change}
                    />
                </Grid> */}
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              setopengeneradordireccioness(true);
            }}
          >
            Generar dirección
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
