import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { interface_busqueda_bodegas, interface_busqueda_operario, interface_busqueda_responsable, interface_inputs_buscar_bodega, interface_inputs_funcionarios, interface_tipos_documentos, response_tipos_documentos } from '../interfeces/types';
import { useDispatch } from 'react-redux';
import { get_obtener_departamentos, get_obtener_municipios, get_obtener_tipos_documentos } from '../thunks/despacho_solicitudes';
import { control_error } from '../../../../helpers';
import FuncionarioResponsable from '../components/FuncionarioResponsable';
import FuncionarioOperario from '../components/FuncionarioOperario';
import ModalBusquedaFuncionarios from '../manners/ModalBusquedaFuncionarios';
import TitleDivider from '../components/TitleDivider';
import ModalBusquedaBodega from '../manners/ModalBusquedaBodega';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


interface props {
  accion: string;
  inputs_funcionarios: interface_inputs_funcionarios;
  set_inputs_funcionarios: Dispatch<SetStateAction<interface_inputs_funcionarios>>;
  set_funcionario_responsable_seleccionado: Dispatch<SetStateAction<interface_busqueda_responsable>>;
  set_funcionario_operario_seleccionado: Dispatch<SetStateAction<interface_busqueda_operario>>;
  set_bodega_seleccionada: Dispatch<SetStateAction<interface_busqueda_bodegas>>;
  inputs_buscar_bodega: interface_inputs_buscar_bodega;
  set_inputs_buscar_bodega: Dispatch<SetStateAction<interface_inputs_buscar_bodega>>;
  observacion: string;
  set_observacion: Dispatch<SetStateAction<string>>;
  data_anexo_obligatorio: any;
  set_data_anexo_obligatorio: Dispatch<any>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaFuncionarios: FC<props> = ({
  accion,
  inputs_funcionarios,
  set_inputs_funcionarios,
  set_funcionario_responsable_seleccionado,
  set_funcionario_operario_seleccionado,
  set_bodega_seleccionada,
  inputs_buscar_bodega,
  set_inputs_buscar_bodega,
  observacion,
  set_observacion,
  data_anexo_obligatorio,
  set_data_anexo_obligatorio,
}) => {
  const dispatch = useDispatch();

  // Definimos que que tipo de funcionario se va a buscar
  const [tipo_funcionario, set_tipo_funcionario] = useState<string>(''); // [responsable, operario]

  const [mostrar_modal_busqueda_funcionarios, set_mostrar_modal_busqueda_funcionarios] = useState<boolean>(false);
  const [mostrar_modal_buscar_bodega, set_mostrar_modal_buscar_bodega] = useState<boolean>(false);

  // Departamentos
  const [departamentos, set_departamentos] = useState<any>();
  // Municipios
  const [municipios, set_municipios] = useState<any>();

  // Tipos de documentos
  const [tipos_documentos, set_tipos_documentos] = useState<interface_tipos_documentos[]>([]);


  const cambio_departamento: (e: SelectChangeEvent<string>) => void = (e) => {
    if (accion === 'crear') {
      set_inputs_buscar_bodega({ ...inputs_buscar_bodega, departamento: e.target.value });
    } else if (accion === 'ver') {
      set_inputs_buscar_bodega({ ...inputs_buscar_bodega, departamento: e.target.value });
    }
  }

  /**
   * Obtiene el departamento seleccionado en base al código del departamento a editar.
   */
  const departamento_seleccionado = departamentos && departamentos.find(
    ([codigoDepartamento]: string) => inputs_buscar_bodega.departamento?.startsWith(codigoDepartamento)
  );

  /**
   * Filtra los municipios basándose en el departamento seleccionado.
   */
  const municipios_filtrados = municipios && municipios?.filter(
    ([codigoMunicipio, nombre]: [string, string]) => codigoMunicipio.startsWith(departamento_seleccionado && departamento_seleccionado[0])
  );

  const get_obtener_tipos_documentos_fc = () => {
    dispatch(get_obtener_tipos_documentos())
      .then((response: response_tipos_documentos) => {
        if (Object.keys(response).length !== 0) {
          if (response.data.length !== 0) {
            set_tipos_documentos(response.data);
          } else {
            set_tipos_documentos([]);
            control_error('No se encontraron tipos de documentos');
          }
        } else {
          control_error('Error en el servidor al obtener tipos de documentos');
        }
      });
  }

  const get_obtener_departamentos_fc = () => {
    dispatch(get_obtener_departamentos())
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          set_departamentos(response);
        } else {
          set_departamentos('');
          control_error('Error en el servidor al obtener departamentos');
        }
      });
  }

  // obtener_municipios_fc
  const get_obtener_municipios_fc = () => {
    dispatch(get_obtener_municipios())
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          set_municipios(response);
        } else {
          set_municipios('');
          control_error('Error en el servidor al obtener municipios');
        }
      });
  }

  const ejecutar_servicios = useRef(false);
  useEffect(() => {
    if (!ejecutar_servicios.current) {
      get_obtener_tipos_documentos_fc();
      get_obtener_departamentos_fc();
      get_obtener_municipios_fc();
      ejecutar_servicios.current = true;
    }
  }, [])


  const handle_file_upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selected_file = files[0];

      set_data_anexo_obligatorio(selected_file);
    } else {
      set_data_anexo_obligatorio({} as any);
    }
  };

  
  return (
    <>
      {/* Modales de busqueda de funcionarios */}
      <ModalBusquedaFuncionarios
        tipo_funcionario={tipo_funcionario}
        mostrar_modal_busqueda_funcionarios={mostrar_modal_busqueda_funcionarios}
        set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
        set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
        set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
      />
      {/* Modal de busqueda de bodegas */}
      <ModalBusquedaBodega
        departamentos={departamentos}
        municipios={municipios}
        set_mostrar_modal_buscar_bodega={set_mostrar_modal_buscar_bodega}
        mostrar_modal_buscar_bodega={mostrar_modal_buscar_bodega}
        set_bodega_seleccionada={set_bodega_seleccionada}
      />
      {/* Componente de inputs de busqueda de funcionarios responsables */}
      <FuncionarioResponsable
        inputs_funcionarios={inputs_funcionarios}
        set_inputs_funcionarios={set_inputs_funcionarios}
        tipos_documentos={tipos_documentos}
        set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
        set_tipo_funcionario={set_tipo_funcionario}
        set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
      />
      {/* Componente de inputs de busqueda de funcionarios operarios */}
      <FuncionarioOperario
        inputs_funcionarios={inputs_funcionarios}
        set_inputs_funcionarios={set_inputs_funcionarios}
        tipos_documentos={tipos_documentos}
        set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
        set_tipo_funcionario={set_tipo_funcionario}
        set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
      />

      <Grid container spacing={2} item xs={12}>
        <TitleDivider title="BODEGA PREDETERMINADA" />

        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Departamento: </InputLabel>
            <Select
              label='Departamento: '
              value={accion === 'crear' ? inputs_buscar_bodega.departamento ?? '' : ''}
              onChange={cambio_departamento}
            >
              {departamentos &&
                departamentos.map((dept: any) => {
                  return <MenuItem key={dept[0]} value={dept[0]}>{dept[1]}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Municipio: </InputLabel>
            <Select
              label='Municipio: '
              value={accion === 'crear' ? inputs_buscar_bodega.municipio ?? '' : ''}
              onChange={(e) => set_inputs_buscar_bodega({ ...inputs_buscar_bodega, municipio: e.target.value })}
            >
              {accion === 'crear' ? inputs_buscar_bodega.departamento ? municipios &&
                municipios?.filter(([codigoMunicipio]: [string]) => {
                  return codigoMunicipio.startsWith(inputs_buscar_bodega.departamento ?? '');
                })
                  .map(([codigoMunicipio, nombre]: [string, string]) => (
                    <MenuItem key={codigoMunicipio} value={codigoMunicipio}>
                      {nombre}
                    </MenuItem>
                  ))
                :
                <MenuItem value=''>
                  Seleccione un departamento
                </MenuItem>
                : accion === 'ver' &&
                municipios_filtrados && municipios_filtrados.map(([codigoMunicipio, nombre]: [string, string]) => (
                  <MenuItem key={codigoMunicipio} value={codigoMunicipio}>
                    {nombre}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => { }}
          >
            Buscar
          </Button>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => {
              set_mostrar_modal_buscar_bodega(true);
            }}
          >
            Búsqueda avanzada
          </Button>
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            label='Nombre:'
            value={inputs_buscar_bodega.nombre_bodega ?? ''}
            onChange={(e) => set_inputs_buscar_bodega({ ...inputs_buscar_bodega, nombre_bodega: e.target.value })}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            disabled
            label='Dirección:'
            value={inputs_buscar_bodega.direccion ?? ''}
            onChange={(e) => set_inputs_buscar_bodega({ ...inputs_buscar_bodega, direccion: e.target.value })}
            size='small'
          />
        </Grid>
      </Grid>

      <Grid item xs={12} lg={9}>
        <TextField
          fullWidth
          label='Observación:'
          value={observacion ?? ''}
          onChange={(e) => set_observacion(e.target.value)}
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <Button
          fullWidth
          component="label"
          role={undefined}
          variant={('name' in data_anexo_obligatorio) ? 'contained' : 'outlined'}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {!('name' in data_anexo_obligatorio) ? 'Subir anexo' : 'Actualizar anexo'}
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handle_file_upload}
            accept=".pdf, .doc, .docx" // Puedes ajustar las extensiones permitidas según tus necesidades
          />
        </Button>
      </Grid>

    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default BusquedaFuncionarios;