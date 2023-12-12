/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { FILEWEIGHT } from '../../../../../../../../fileWeight/fileWeight';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BuildIcon from '@mui/icons-material/Build';
import { ModalMetadatos } from './../../modalMetadatos/ModalMetadatos';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { useSstepperFn } from '../../../hook/useSstepperFn';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { TipologiaDocumental } from './types/FormParte3.types';
import CleanIcon from '@mui/icons-material/CleaningServices';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  addAnexo,
  deleteAnexo,
  editAnexo,
  setCurrentAnexo,
  setMetadatos,
  setViewMode,
} from '../../../toolkit/slice/AsignacionUsuarioSlice';
import { columnsThirdForm } from './columns/columnsTercerFormulario';
import EditIcon from '@mui/icons-material/Edit';
import { AvatarStyles } from '../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  control_error,
  control_success,
} from '../../../../../../../../helpers';
0;
import { origenArchivo } from './../../modalMetadatos/utils/choices';
import { vi } from 'date-fns/locale';
import { usePanelVentanilla } from '../../../../../hook/usePanelVentanilla';
import { ModalInfoMetadatosBlocked } from '../../modalMetadatos/components/ModalInfoMetadatosBlocked';

export const FormParte3 = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
  setInfoReset,
}: any): JSX.Element => {
  //* dispatch de redux
  const dispatch: any = useAppDispatch();

  //* redux states functions
  const { currentAnexo, anexosCreados, metadatos, viewMode } = useAppSelector(
    (state: any) => state.AsignacionUsuarioSlice
  );

  // ? stepper hook
  const { handleBack, handleReset } = useSstepperFn();

  //* context
  const { handleModalAgregarMetadatos } = useContext(ModalAndLoadingContext);

  const [tipologiasDocumentales, setTipologiasDocumentales] = useState<
    TipologiaDocumental[]
  >([]);

  const {
    resetManejoMetadatosModalFunction,
    controlManejoMetadatosModal,
    watchExeManejoModalMetadatos,
    resetManejoMetadatosModal,
  } = usePanelVentanilla();

  useEffect(() => {
    if (currentAnexo) {
      console.log('currentAnexo', currentAnexo);
      setInfoReset({
        ...currentAnexo,
      });
    }
  }, [currentAnexo]);

  // ? funciones third form
  const handleAnexo = () => {
    // ? se debe hacer la validacion, si no hay arhivo, pero hay metadata, se debe permitir añadir, pero si no hay archivo ni metadata, no se debe permitir añadir

    if (watchFormulario.ruta_soporte === '' && !metadatos) {
      control_warning(
        'Es obligatorio subir un archivo o agregar metadatos para poder crear un anexo'
      );
      return;
    }

    if (watchFormulario.ruta_soporte && !metadatos) {
      control_warning(
        'Si se sube un archivo, es obligatorio agregar metadatos para poder crear un anexo'
      );
      return;
    }

    if (
      watchFormulario.ruta_soporte &&
      metadatos?.origenArchivoMetadatos?.value === 'F'
    ) {
      control_warning(
        'Si se sube un archivo, el origen del archivo no puede ser físico'
      );
      return;
    }

    if (
      (!watchFormulario.ruta_soporte &&
        metadatos?.origenArchivoMetadatos?.value === 'E') ||
      (!watchFormulario.ruta_soporte &&
        metadatos?.origenArchivoMetadatos?.value === 'D')
    ) {
      control_warning(
        'Si el origen del archivo es electrónico o digital, es obligatorio subir un archivo'
      );
      return;
    }

    if (
      !watchFormulario.asunto ||
      !watchFormulario.descripcion_de_la_solicitud
    ) {
      control_warning(
        'Es obligatorio llenar los campos de asunto y descripción de la solicitud'
      );
      return;
    }

    const createAnexoData = (baseObject = {}) => ({
      ...baseObject,
      asunto: watchFormulario?.asunto,
      descripcion_de_la_solicitud: watchFormulario?.descripcion_de_la_solicitud,
      fecha_de_solicitud: watchFormulario?.fecha_de_solicitud,
      nombre_archivo: watchFormulario?.nombre_archivo,
      ruta_soporte: watchFormulario?.ruta_soporte,
      medio_almacenamiento: watchFormulario?.medio_almacenamiento,
      numero_folios: watchFormulario?.numero_folios,
      categoriaArchivoMetadatos: {
        value: metadatos?.categoriaArchivoMetadatos?.value,
        label: metadatos?.categoriaArchivoMetadatos?.label,
      },
      tieneReplicaFisicaMetadatos: {
        value: metadatos?.tieneReplicaFisicaMetadatos?.value,
        label: metadatos?.tieneReplicaFisicaMetadatos?.label,
      },
      origenArchivoMetadatos: {
        value: metadatos?.origenArchivoMetadatos?.value,
        label: metadatos?.origenArchivoMetadatos?.label,
      },
      tieneTipologiaRelacionadaMetadatos: {
        value: metadatos?.tieneTipologiaRelacionadaMetadatos?.value,
        label: metadatos?.tieneTipologiaRelacionadaMetadatos?.label,
      },
      tipologiasDocumentalesMetadatos: {
        value: metadatos?.tipologiasDocumentalesMetadatos?.value,
        label: metadatos?.tipologiasDocumentalesMetadatos?.label,
      },
      cualTipologiaDocumentalMetadatos:
        metadatos?.cualTipologiaDocumentalMetadatos,
      asuntoMetadatos: metadatos?.asuntoMetadatos,
      descripcionMetadatos: metadatos?.descripcionMetadatos,
      palabrasClavesMetadatos: metadatos?.palabrasClavesMetadatos,
    });

    const dataCreateAnexo = createAnexoData();
    const dataEditAnexo = createAnexoData(currentAnexo);
    // Reset functions that are common to both cases
    resetFormulario();
    resetManejoMetadatosModalFunction();

    if (currentAnexo) {
      //* se debe quitar el as any y validar un par de cosas que pueden estar fallando al editar el anexo
      dispatch(editAnexo(dataEditAnexo as any));
      control_success('Se ha editado el anexo');
      // Assuming editAnexoFunction is the function to edit an anexo
    } else {
      dispatch(addAnexo(dataCreateAnexo));
    }
  };

  const handleDeleteAnexo = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro de eliminar el anexo?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
    });

    if (result.isConfirmed) {
      dispatch(deleteAnexo(id));
    }
  };

  const handleSeleccionAnexoToEdit = (anexoSeleccionado: any) => {
    control_success('Se ha seleccionado el anexo para editar');
    //* volver al paso 2 ?
    // handleBack();
    console.log('anexoSeleccionado', anexoSeleccionado);

    //* seleccionar ese elemento como currentAnexo
    dispatch(setCurrentAnexo(anexoSeleccionado));

    if (anexoSeleccionado?.asuntoMetadatos) {
      dispatch(setMetadatos(anexoSeleccionado as any));
    }
  };

  //* columns
  const columns = [
    ...columnsThirdForm,
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <>
            {!viewMode && (
              <>
                <Tooltip title="Eliminar anexo">
                  <IconButton
                    onClick={() => {
                      handleDeleteAnexo(params.row.id);
                    }}
                  >
                    <Avatar sx={AvatarStyles} variant="rounded">
                      <DeleteIcon
                        titleAccess="Eliminar tipología documental"
                        sx={{
                          color: 'red',
                          width: '18px',
                          height: '18px',
                        }}
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar anexo">
                  <IconButton
                    onClick={() => {
                      handleSeleccionAnexoToEdit(params.row);
                    }}
                  >
                    <Avatar sx={AvatarStyles} variant="rounded">
                      <EditIcon
                        titleAccess="Editar asignación de líder"
                        sx={{
                          color: 'primary.main',
                          width: '18px',
                          height: '18px',
                        }}
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Tooltip title="Ver y seleccionar anexo">
              <IconButton
                onClick={() => {
                  console.log(params.row);
                  dispatch(setViewMode(true as boolean));
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <VisibilityIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            {/* debe estar la condicion, cuando ya se haya guardado una vez, no será posible realizar la eliminación de los anexos */}
          </>
        );
      },
    },
  ];

  return (
    <>
      <form
        style={{
          marginTop: '3rem',
        }}
        onSubmit={(e: any) => {
          e.preventDefault();
          handleAnexo();
          //* luego de la creación del anexo no se deben limpiar los campos del formualrio, ya que el usuario puede seguir creando sobre esa misma solicitud, solo el button limpiar campos puede hacer eso ya que se le advierte plenamente al usuario
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Controller
              name="ruta_soporte"
              control={controlFormulario}
              defaultValue=""
              // rules={{ required: false }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Button
                    variant={
                      value === '' || value === null ? 'outlined' : 'contained'
                    }
                    component="label"
                    style={{
                      marginTop: '.15rem',
                      width: '100%',
                    }}
                    startIcon={<CloudUploadIcon />}
                  >
                    {value === '' || value === null
                      ? 'Subir archivo'
                      : 'Archivo subido'}
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      accept="application/pdf"
                      // disabled={ccd_current?.actual}
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          if (file.type !== 'application/pdf') {
                            control_warning(
                              'Precaución: Solo es admitido archivos en formato pdf'
                            );
                          } else if (file.size > FILEWEIGHT.PDF) {
                            const MAX_FILE_SIZE_MB = (
                              FILEWEIGHT.PDF /
                              (1024 * 1024)
                            ).toFixed(1);
                            control_warning(
                              `Precaución: El archivo es demasiado grande. El tamaño máximo permitido es ${MAX_FILE_SIZE_MB} MB.`
                            );
                          } else {
                            onChange(file);
                          }
                        }
                      }}
                    />
                  </Button>
                  <label htmlFor="">
                    <small
                      style={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontWeight: 'thin',
                        fontSize: '0.75rem',
                      }}
                    >
                      Archivo
                      {controlFormulario._formValues.ruta_soporte
                        ? controlFormulario._formValues.ruta_soporte.name ??
                          controlFormulario._formValues.ruta_soporte.replace(
                            /https?:\/\/back-end-bia-beta\.up\.railway\.app\/media\//,
                            ''
                          )
                        : 'Seleccione archivo'}
                    </small>
                  </label>
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="nombre_archivo"
              control={controlFormulario}
              defaultValue=""
              // rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  // required
                  fullWidth
                  label="Nombre del archivo"
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                    e.target.value.length === 50 &&
                      control_warning('máximo 50 caracteres');
                  }}
                  inputProps={{ maxLength: 50 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="medio_alamacenamiento"
              control={controlFormulario}
              defaultValue=""
              // rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  // required
                  fullWidth
                  disabled
                  label="Medio de almacenamiento"
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  value={value || 'No aplica'}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          {/* Inicio de la segunda fila de elementos */}

          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              mb: '2rem',
            }}
          >
            <Controller
              name="numero_folios"
              control={controlFormulario}
              defaultValue=""
              // rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  // required
                  fullWidth
                  type="number"
                  // name="nombre"
                  label="Número de folios"
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    if (+e.target.value >= 255) {
                      control_warning('máximo 255 caracteres');
                      return;
                    }
                    onChange(e.target.value);
                  }}
                  inputProps={{ maxLength: 255 }}
                />
              )}
            />
          </Grid>

          {/*  modal de metadatos */}
          <Grid item xs={12} sm={4}>
            <Button
              sx={{
                width: '100%',
              }}
              variant="contained"
              color="primary"
              startIcon={<BuildIcon />}
              onClick={() => {
                console.log('click siuuu');
                console.log('abriendo modal de metadatos');
                handleModalAgregarMetadatos(true);
              }}
            >
              AGREGAR METADATOS
            </Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button
              sx={{
                width: '100%',
              }}
              disabled={viewMode}
              variant={currentAnexo ? 'outlined' : 'contained'}
              color="success"
              type="submit"
              startIcon={currentAnexo ? <RestartAltIcon /> : <AddIcon />}
            >
              {currentAnexo ? 'Actualizar' : 'Agregar'} anexo
            </Button>
          </Grid>
        </Grid>

        {/* RenderDataGrid para los anexos que se van a ir creando */}

        {anexosCreados.length > 0 ? (
          <RenderDataGrid
            title="Listado de Anexos"
            columns={columns ?? []}
            rows={anexosCreados ?? []}
          />
        ) : (
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ textAlign: 'center', justifyContent: 'center', mt: '1.5rem' }}
          >
            No hay anexos creados
          </Typography>
        )}

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            width: '100%',
            maxWidth: '100%',
            mt: '2rem',
            textAlign: 'center',
            paddingBottom: '2rem',
          }}
        >
          <Button
            variant="contained"
            color="warning"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              // ? se debe mirar si se debe hacer validaciones para permitir el regreso
              handleBack();
            }}
            sx={{
              width: '55%',
              mt: '2rem',
            }}
          >
            ATRÁS
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CleanIcon />}
            onClick={() => {
              resetFormulario();
              resetManejoMetadatosModalFunction();
              if (currentAnexo) {
                dispatch(setCurrentAnexo(null as any));
                dispatch(setViewMode(false as boolean));
              }
              if (metadatos) {
                dispatch(setMetadatos(null as any));
                dispatch(setViewMode(false as boolean));
              }
            }}
            sx={{
              width: '55%',
              mt: '2rem',
            }}
          >
            LIMPIAR CAMPOS (METADATOS Y ARCHIVO)
          </Button>
        </Grid>
      </form>

      {/* espacio para el modal de agregar metadatos */}
      <ModalMetadatos
        watchFormulario={watchFormulario}
        tipologiasDocumentales={tipologiasDocumentales}
        setTipologiasDocumentales={setTipologiasDocumentales}
        resetManejoMetadatosModalFunction={resetManejoMetadatosModalFunction}
        controlManejoMetadatosModal={controlManejoMetadatosModal}
        watchExeManejoModalMetadatos={watchExeManejoModalMetadatos}
        resetManejoMetadatosModal={resetManejoMetadatosModal}
      />
      {/* espacio para el modal de agregar metadatos */}

      {/* modal información de metadatos de manera bloqueda, solo cuando ya se han establecido los valores correspondientes */}
      <ModalInfoMetadatosBlocked />
      {/* modal información de metadatos de manera bloqueda, solo cuando ya se han establecido los valores correspondientes */}
    </>
  );
};
