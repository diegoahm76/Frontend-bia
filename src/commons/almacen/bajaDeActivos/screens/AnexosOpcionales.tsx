/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef, useState } from 'react';
import { Button, CircularProgress, Grid, TextField,  } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TablaBienesBaja from '../tables/TablaBienesBaja';
import ModalBuscarBien from './ModalBuscarBien';
import { interface_anexo_opcional, interface_busqueda_avanzada_bienes, response_anexo_opcional } from '../interfaces/types';
import { Title } from '../../../../components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import TablaOtrosAnexosOpcionales from '../tables/TablaOtrosAnexosOpcionales';
import { control_error, control_success } from '../../../../helpers';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { get_obtener_anexos_opcionales, post_enviar_anexos_opcionales, put_editar_anexo_opcional } from '../thunks/baja_activos';


interface props {
  id_baja_activo: number | null;
}

const AnexosOpcionales: React.FC<props> = ({id_baja_activo}) => {
  const dispatch = useDispatch();

  const [accion, set_accion] = useState<string>('crear');
  
  const [loadding, set_loadding] = useState<boolean>(false);
  const [data_anexos_opcionales, set_data_anexos_opcionales] = useState<interface_anexo_opcional[]>([]);

  const [data_anexo_editar, set_data_anexo_editar] = useState<interface_anexo_opcional>(Object);


  const [nombre_anexo_opcional, set_nombre_anexo_opcional] = useState<string>('');
  const [fecha_anexo_opcional, set_fecha_anexo_opcional] = useState<Dayjs | null>(dayjs());
  const [numero_folios_opcional, set_numero_folios_opcional] = useState<number>(0);
  const [descripcion_opcinal, set_descripcion_opcinal] = useState<string>('');
  const [data_anexo_opcional, set_data_anexo_opcional] = useState<any>(Object);
  const [refrescar_tabla, set_refrescar_tabla] = useState<boolean>(false)

  const form_data = new FormData();


  useEffect(() => {
    if(accion === 'editar' && Object.keys(data_anexo_editar).length !== 0){
      set_nombre_anexo_opcional(data_anexo_editar.nombre_anexo);
      set_fecha_anexo_opcional(dayjs(data_anexo_editar.fecha_creacion_anexo));
      set_numero_folios_opcional(data_anexo_editar.nro_folios);
      set_descripcion_opcinal(data_anexo_editar.descripcion_anexo);
    }
  }, [data_anexo_editar, accion]);


  const get_obtener_anexos_opcionales_fc = async() => {
    dispatch(get_obtener_anexos_opcionales(id_baja_activo?.toString()))
      .then((response: response_anexo_opcional) => {
        if(Object.keys(response).length !== 0) {
          set_data_anexos_opcionales(response.data);
        }
      }
    )
  }

  const anexos_optenidos = useRef(false);
  useEffect(() => {
    if(id_baja_activo !== null && !anexos_optenidos.current){
      console.log('entro a obtener anexos')
      get_obtener_anexos_opcionales_fc();
      anexos_optenidos.current = true;
    }
  }, [id_baja_activo, refrescar_tabla]);


  const cambio_fecha_anexo_opcional = (date: Dayjs | null) => {
    if (date !== null){
      set_fecha_anexo_opcional(date);
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      set_data_anexo_opcional(selectedFile);
    } else {
      set_data_anexo_opcional({} as any);
    }
  };

  const limpiar_formulario = () => {
    set_nombre_anexo_opcional('');
    set_fecha_anexo_opcional(dayjs());
    set_numero_folios_opcional(0);
    set_descripcion_opcinal('');
    set_data_anexo_opcional({} as any);
  }

  const validar_formulario: () => Promise<boolean> = async() => {
    const quitar_acentos_tiltes = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 

    if (nombre_anexo_opcional === '') {
      control_error('El nombre del anexo es requerido');
      return false
    } else if (fecha_anexo_opcional === null) {
      control_error('La fecha del anexo es requerida');
      return false
    } else if (numero_folios_opcional === 0) {
      control_error('El número de folios es requerido');
      return false
    } else if (descripcion_opcinal === '') {
      control_error('La descripción del anexo es requerida');
      return false
    } else if(quitar_acentos_tiltes(nombre_anexo_opcional).toLowerCase().trim().replace(/\s/g, "") === 'resolucionaprobadaporelcomite'){
      control_error('El nombre del anexo no puede ser "Resolución aprobada por el comité"');
      return false
    }

    return true;
  }

  const handle_submit = async() => {
    const form_valido = await validar_formulario();

    form_data.append('nombre_anexo', nombre_anexo_opcional);
    form_data.append('nro_folios', numero_folios_opcional.toString());
    form_data.append('descripcion_anexo', descripcion_opcinal);

    if(accion === 'crear'){
      form_data.append('anexo_opcional', data_anexo_opcional);
    } else if(accion === 'editar'){
      form_data.append('id_anexo_doc_alma', data_anexo_editar?.id_anexo_doc_alma.toString());
      if('name' in data_anexo_opcional){
        form_data.append('anexo_opcional', data_anexo_opcional);
      }
    }


    if(form_valido){
      if(accion === 'crear'){
        agregar_anexo_opcional();
      } else if(accion === 'editar'){
        editar_anexo_opcional();
      }
    }
  }


  const agregar_anexo_opcional = async() => {
    Swal.fire({
      title: '¿Está seguro que desea guardar este anexo opcional al registro de baja de activos?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then( async(result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        set_loadding(true);

        await dispatch(post_enviar_anexos_opcionales(id_baja_activo?.toString() ,form_data))
          .then((response: any) => {
            if(Object.keys(response).length !== 0 && response.success) {
              set_refrescar_tabla(!refrescar_tabla);
              anexos_optenidos.current = false;

              set_loadding(false);
              control_success('Se guardo el anexo opcional correctamente');
              limpiar_formulario();
            } else {
              set_loadding(false);
              control_error('No se pudo guardar el anexo opcional');
            }
          }
          );
        return true;
      } else if(result.isDenied){
        set_loadding(false);
        return false;
      }
    });
  }
  
  const editar_anexo_opcional = async() => {
    Swal.fire({
      title: '¿Está seguro que desea editar este anexo opcional al registro de baja de activos?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then( async(result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        set_loadding(true);

        await dispatch(put_editar_anexo_opcional(id_baja_activo?.toString() ,form_data))
          .then((response: any) => {
            if(Object.keys(response).length !== 0 && response.success) {
              set_refrescar_tabla(!refrescar_tabla);
              anexos_optenidos.current = false;

              set_loadding(false);
              control_success('Se editó el anexo opcional correctamente');
              limpiar_formulario();
            } else {
              set_loadding(false);
              control_error('No se pudo editar el anexo opcional');
            }
          }
          );
        return true;
      } else if(result.isDenied){
        set_loadding(false);
        return false;
      }
    });
  }

  return (
    <>
      <Grid container item xs={12} rowSpacing={4} columnSpacing={1} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        my: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
        }}>
        <Title title="Otros anexos opcionales" />

        <Grid item xs={12} lg={2}>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Subir anexo
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              accept=".pdf, .doc, .docx" // Puedes ajustar las extensiones permitidas según tus necesidades
            />
          </Button>
        </Grid>

        <Grid item xs={12} lg={5}>
          <TextField
            fullWidth
            size="small"
            label="Nombre del anexo"
            value={nombre_anexo_opcional}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              set_nombre_anexo_opcional(event.target.value);
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label='Fecha creación del anexo: '
              value={fecha_anexo_opcional}
              onChange={(newValue) => {
                cambio_fecha_anexo_opcional(newValue);
              }}
              renderInput={(params) => (
                <TextField disabled required fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} lg={2}>
          <TextField
            fullWidth
            size='small'
            label="Número de folios"
            value={numero_folios_opcional}
            variant="outlined"
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              set_numero_folios_opcional(parseInt(event.target.value));
            }}
          />
        </Grid>

        <Grid container item xs={12}>
          <TextField
            fullWidth
            required
            label='Descripción del anexo:'
            rows={3}
            multiline
            size='small'
            value={descripcion_opcinal}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              set_descripcion_opcinal(event.target.value);
            }}
          />
        </Grid>

        <Grid container item xs={12} sx={{
          display: "flex",
          justifyContent: "end",
          }}>
          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              type='button'
              variant='contained'
              color='success'
              disabled={loadding}
              startIcon={loadding ? <CircularProgress size={25} /> :<AddIcon />}
              onClick={()=>{handle_submit()}}
            >
              {!loadding ? accion === 'crear' ? "Agregar y guardar" : 'Actualizar y guardar' : ''}
            </Button>
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <TablaOtrosAnexosOpcionales
            set_accion={set_accion}
            anexos_optenidos={anexos_optenidos}
            refrescar_tabla={refrescar_tabla}
            set_refrescar_tabla={set_refrescar_tabla}
            data_anexos_opcionales={data_anexos_opcionales}
            set_data_anexo_editar={set_data_anexo_editar}
          />
        </Grid>

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default AnexosOpcionales;