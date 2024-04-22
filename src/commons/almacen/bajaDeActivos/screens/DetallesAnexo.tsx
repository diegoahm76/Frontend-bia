/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField,  } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TablaBienesBaja from '../tables/TablaBienesBaja';
import ModalBuscarBien from './ModalBuscarBien';
import { interface_anexo_opcional, interface_busqueda_avanzada_bienes } from '../interfaces/types';
import { Title } from '../../../../components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import TablaOtrosAnexosOpcionales from '../tables/TablaOtrosAnexosOpcionales';


interface props {
  accion: string;
  fecha_anexo_obligatorio: Dayjs | null;
  set_fecha_anexo_obligatorio: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  numero_folios: number;
  set_numero_folios: React.Dispatch<React.SetStateAction<number>>;
  descripcion_anexo_obligatorio: string;
  set_descripcion_anexo_obligatorio: React.Dispatch<React.SetStateAction<string>>;
  bienes_seleccionados: interface_busqueda_avanzada_bienes[];
  set_bienes_seleccionados: React.Dispatch<React.SetStateAction<interface_busqueda_avanzada_bienes[]>>;
  data_anexo_obligatorio: any;
  set_data_anexo_obligatorio: React.Dispatch<React.SetStateAction<any>>;
  set_hay_anexo_seleccionado: React.Dispatch<React.SetStateAction<boolean>>;
  hay_anexo_seleccionado: boolean;
}

const DetallesAnexo: React.FC<props> = ({
  fecha_anexo_obligatorio,
  set_fecha_anexo_obligatorio,
  numero_folios,
  set_numero_folios,
  descripcion_anexo_obligatorio,
  set_descripcion_anexo_obligatorio,
  bienes_seleccionados,
  set_bienes_seleccionados,
  data_anexo_obligatorio,
  set_data_anexo_obligatorio,
  set_hay_anexo_seleccionado,
  hay_anexo_seleccionado,
  accion,}) => {


  const [mostrar_buscar_bienes, set_mostrar_buscar_bienes] = useState<boolean>(false);

  const cambio_fecha_anexo_obligatorio = (date: Dayjs | null) => {
    if (date !== null){
      set_fecha_anexo_obligatorio(date);
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      set_data_anexo_obligatorio(selectedFile);
      set_hay_anexo_seleccionado(true);
    } else {
      set_hay_anexo_seleccionado(false);
      set_data_anexo_obligatorio({} as any);
    }
  };


  const agregar_anexo_opcional = () => {
    //ACCION PARA AGREGAR ANEXOS OPCIONALES
  }
    

  return (
    <>
      <Grid container item xs={12} rowSpacing={4} columnSpacing={2}>
        <Grid container item xs={12}>
          <Grid container item xs={12} lg={2}>
            <Button
              fullWidth
              type='button'
              variant='contained'
              color='primary'
              startIcon={<SearchIcon />}
              onClick={() => {set_mostrar_buscar_bienes(true)}}
            >
              Buscar bien
            </Button>
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <ModalBuscarBien
            set_bienes_seleccionados={set_bienes_seleccionados}
            set_mostrar_buscar_bienes={set_mostrar_buscar_bienes}
            mostrar_buscar_bienes={mostrar_buscar_bienes}
          />
          <TablaBienesBaja 
            accion={accion}
            bienes_seleccionados={bienes_seleccionados}
            set_bienes_seleccionados={set_bienes_seleccionados}
          />
        </Grid>

        <Grid container item xs={12} rowSpacing={4} columnSpacing={2} sx={{
          position: "relative",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "40px",
          my: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
          }}>
          <Title title="Anexo obligatorio" />

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
              value={hay_anexo_seleccionado ? 'Resolución Aprobada por el Comité' : 'No hay archivo seleccionado'}
              variant="outlined"
              disabled
            />
          </Grid>

          <Grid item xs={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label='Fecha creación del anexo: '
                value={hay_anexo_seleccionado ? fecha_anexo_obligatorio : null}
                onChange={(newValue) => {
                  cambio_fecha_anexo_obligatorio(newValue);
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
              value={numero_folios === 0 ? '' : numero_folios}
              variant="outlined"
              type="number"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                set_numero_folios(parseInt(event.target.value));
              }}
            />
          </Grid>

          <Grid container item xs={12}>
            <TextField
              fullWidth
              label='Descripción del anexo:'
              rows={3}
              multiline
              size='small'
              value={descripcion_anexo_obligatorio}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                set_descripcion_anexo_obligatorio(event.target.value);
              }}
            />
          </Grid>
        </Grid>

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default DetallesAnexo;