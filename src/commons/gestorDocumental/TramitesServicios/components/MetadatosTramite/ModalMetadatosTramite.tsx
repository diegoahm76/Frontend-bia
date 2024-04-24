/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import FormKeywords from '../../../../../components/partials/form/FormKeywords';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close'; // Agregado: Importación de CloseIcon
import { api } from '../../../../../api/axios';
import { FormContextMetadatos } from '../../context/MetadatosContext';
import  CleanIcon  from '@mui/icons-material/CleaningServices';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

export const ModalMetadatosTramite = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const { form, setForm } = useContext(FormContextMetadatos);
  console.log(form);

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (field: string, value: any) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  // Función para limpiar el formulario
  const handleClearForm = () => {
    setForm({
      categoriaArchivo: '',
      asunto: '',
      tieneReplicaFisica: false,
      nro_folios_documento: 0,
      origenArchivo: '',
      tieneTipologiaRelacionada: false,
      tipologiaRelacionada: '',
      descripcion: '',
      tipologiaRelacionadaotra: '',
      CodCategoriaArchivo: '',
      keywords: '', // Nuevo campo para almacenar las palabras clave
    });
  };

  // Función para cerrar el modal y mostrar los datos del formulario en la consola
  const handleCloseModal = (): void => {
    console.log(form); // Imprimir datos del formulario en la consola
    set_is_modal_active(false);
  };

  const [origenArchivoChoices, setOrigenArchivoChoices] = useState([]);
  const [tipoArchivoChoices, setTipoArchivoChoices] = useState([]);
  const [tipologias, setTipologias] = useState<
    { id_tipologia_documental: number; nombre: string }[]
  >([]);

  const choise_origen_archivo = async (): Promise<void> => {
    try {
      const url = '/gestor/choices/origen-archivo/';
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const origen_archivo = res.data;
      setOrigenArchivoChoices(origen_archivo);
      //  control_success('Datos actualizados correctamente');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTipoArchivoChoices = async (): Promise<void> => {
    try {
      const url = '/gestor/choices/tipo-archivo/';
      const response = await api.get(url);
      const tipoArchivoChoicess = response.data;
      console.log(tipoArchivoChoicess);
      setTipoArchivoChoices(tipoArchivoChoicess);
      // Si necesitas hacer algo con las opciones de tipo de archivo, puedes hacerlo aquí
    } catch (error) {
      console.error(error);
    }
  };

  const listarTipologias = async (): Promise<void> => {
    try {
      const url = '/gestor/expedientes-archivos/expedientes/listar-tipologias/';
      const response = await api.get(url);
      const tipologias = response.data.data;
      setTipologias(tipologias);
      // Si necesitas hacer algo con la lista de tipologías, puedes hacerlo aquí
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listarTipologias();
    fetchTipoArchivoChoices();
    choise_origen_archivo();
  }, []);

  const handleKeywordsChange = (selectedKeywords: any) => {
    setForm({
      ...form,
      keywords: selectedKeywords, // Actualiza el estado del formulario con las palabras clave seleccionadas
    });
  };

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={is_modal_active}
        onClose={handleCloseModal}
        fullWidth
      >
        <DialogTitle>
          {' '}
          <Title title="Agregar Metadatos" />
        </DialogTitle>

        {/* Contenedor principal del formulario */}
        <Grid container spacing={2} style={{ margin: '1rem' }}>
          <Grid item xs={12} md={4}>
            {/* Campo: Tipo de archivo */}
            <FormControl fullWidth>
              <InputLabel id="tipoArchivo-label">Tipo de archivo</InputLabel>
              <Select
                style={{ width: '100%' }}
                labelId="tipoArchivo-label"
                id="CodCategoriaArchivo"
                size="small"
                value={form.CodCategoriaArchivo}
                onChange={(e) =>
                  handleInputChange(
                    'CodCategoriaArchivo',
                    e.target.value as string
                  )
                }
              >
                {/* Opciones del select generadas dinámicamente */}
                {tipoArchivoChoices.map((option, index) => (
                  <MenuItem key={index} value={option[0]}>
                    {option[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            {/* Campo: Tiene réplica física */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.tieneReplicaFisica}
                  onChange={(e) =>
                    handleInputChange('tieneReplicaFisica', e.target.checked)
                  }
                  name="tieneReplicaFisica"
                  color="primary"
                />
              }
              label="¿Tiene réplica física?"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Campo: Origen del archivo */}
            <FormControl fullWidth>
              <InputLabel id="origenArchivo-label">
                Origen del archivo
              </InputLabel>
              <Select
                size="small"
                style={{ width: '100%' }}
                labelId="origenArchivo-label"
                id="origenArchivo"
                value={form.origenArchivo}
                onChange={(e) =>
                  handleInputChange('origenArchivo', e.target.value as string)
                }
              >
                {/* Opciones del select generadas dinámicamente */}
                {origenArchivoChoices.map((option, index) => (
                  <MenuItem key={index} value={option[0]}>
                    {option[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            {/* Campo: Asunto */}
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={form.nro_folios_documento}
              label="Numero folios"
              onChange={(e) =>
                handleInputChange('nro_folios_documento', e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            {/* Campo: ¿Tiene tipología relacionada? */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.tieneTipologiaRelacionada}
                  onChange={(e) =>
                    handleInputChange(
                      'tieneTipologiaRelacionada',
                      e.target.checked
                    )
                  }
                  name="tieneTipologiaRelacionada"
                  color="primary"
                />
              }
              label="Tipología actual relacionada"
            />
          </Grid>

          {/* Campo condicional: ¿Cual? */}
          {/*{!form.tieneTipologiaRelacionada && (
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={form.tipologiaRelacionadaotra}
                            label="Nombre de la tipología no encontrada"
                            onChange={(e) => handleInputChange('tipologiaRelacionadaotra', e.target.value)}
                        />
                    </Grid>
                )}*/}

          <Grid item xs={12} md={6}>
            {/* Campo condicional: Tipología */}
            {form.tieneTipologiaRelacionada && (
              <FormControl fullWidth>
                <InputLabel id="tipologiaRelacionada-label">
                  Tipología
                </InputLabel>
                <Select
                  size="small"
                  style={{ width: '100%' }}
                  labelId="tipologiaRelacionada-label"
                  id="tipologiaRelacionada"
                  value={form.tipologiaRelacionada}
                  onChange={(e) =>
                    handleInputChange(
                      'tipologiaRelacionada',
                      e.target.value as string
                    )
                  }
                >
                  {/* Opciones del select generadas dinámicamente */}
                  {tipologias.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option.id_tipologia_documental}
                    >
                      {option.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>

          <Grid item xs={11}>
            {/* Campo: Asunto */}
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={form.asunto}
              label="Asunto"
              onChange={(e) => handleInputChange('asunto', e.target.value)}
            />
          </Grid>

          <Grid item xs={11}>
            {/* Campo: Descripción */}
            <TextField
              fullWidth
              multiline
              rows={3} // Ajusta el número de filas para una altura mayor
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={form.descripcion}
              label="Descripción"
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={11}>
          {/* Agrega el componente FormKeywords aquí */}
          <FormKeywords
            hidden_text={false} // Puedes ajustar este valor según tus necesidades
            initial_values={[]} // Pasa las palabras clave almacenadas en el estado del formulario como valores iniciales
            character_separator="," // Puedes ajustar este separador según tus necesidades
            set_form={handleKeywordsChange} // P
            keywords="keywords" // Puedes ajustar el nombre de los keywords según tus necesidades
            disabled={false} // Puedes ajustar este valor según tus necesidades
          />
        </Grid>

        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              color="primary"
              startIcon={<CleanIcon />}
              onClick={handleClearForm}
              variant="outlined"
            >
              Limpiar campos
            </Button>
            <Button
              startIcon={<CloseIcon />}
              color="error"
              onClick={handleCloseModal}
              variant="contained"
            >
              cerrar modal
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
