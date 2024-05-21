/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Select from 'react-select';
import { Carousel } from 'react-responsive-carousel';
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { ModalMetadatos } from './../../modalMetadatos/ModalMetadatos';
import { TipologiaDocumental } from './types/FormParte3.types';
import CleanIcon from '@mui/icons-material/CleaningServices';
import Swal from 'sweetalert2';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { columnsThirdForm } from './columns/columnsTercerFormulario';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './style.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../../../hooks';
import { useStepperRequerimiento } from '../../../../../../../../../bandejaDeTareas/hook/useStepperRequerimiento';
import { useFiles } from '../../../../../../../../../../../hooks/useFiles/useFiles';
import { ModalAndLoadingContext } from '../../../../../../../../../../../context/GeneralContext';
import { useBandejaTareas } from '../../../../../../../../../bandejaDeTareas/hook/useBandejaTareas';
import { showAlert } from '../../../../../../../../../../../utils/showAlert/ShowAlert';
import { addAnexo, deleteAnexo, editAnexo, setCurrentAnexo, setMetadatos, setViewMode } from '../../../../../../../../respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';
import { control_success } from '../../../../../../../../../../../helpers';
import { AvatarStyles } from '../../../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { control_warning } from '../../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { RenderDataGrid } from '../../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

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
    (state: any) => state.ResRequerimientoOpaSlice
  );

  // ? stepper hook
  const { handleBack } = useStepperRequerimiento();
  const {controlar_tamagno_archivos} = useFiles()

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
  } = useBandejaTareas();

  useEffect(() => {
    if (currentAnexo) {
      //  console.log('')('currentAnexo', currentAnexo);
      setInfoReset({
        ...currentAnexo,
      });
    }
  }, [currentAnexo]);

  // ? funciones third form

  const handleAnexo = () => {
    // ? se debe hacer la validacion, si no hay arhivo, pero hay metadata, se debe permitir añadir, pero si no hay archivo ni metadata, no se debe permitir añadir

    if (watchFormulario.ruta_soporte === '' && !metadatos) {
      showAlert(
        'Advertencia',
        'Para crear un anexo: La carga de un archivo es requerida, aunque existen condiciones bajo las cuales no es obligatoria.\n\nEn caso de optar por no subir un archivo, es necesario agregar metadatos, seleccionar la opción de origen del archivo como físico y proporciona el nombre del archivo, así como el número de folios del archivo físico.',
        'warning'
      );
      return;
    }

    if (watchFormulario.ruta_soporte && !metadatos) {
      showAlert(
        'Advertencia',
        'Si se sube un archivo, es obligatorio agregar metadatos a un anexo',
        'warning'
      );
      return;
    }

    if (
      watchFormulario.ruta_soporte &&
      metadatos?.origenArchivoMetadatos?.value === 'F'
    ) {
      showAlert(
        'Advertencia',
        'No se puede subir un archivo, ya que el origen del archivo es físico',
        'warning'
      );
      return;
    }

    if (
      (!watchFormulario.ruta_soporte &&
        metadatos?.origenArchivoMetadatos?.value === 'E') ||
      (!watchFormulario.ruta_soporte &&
        metadatos?.origenArchivoMetadatos?.value === 'D')
    ) {
      showAlert(
        'Advertencia',
        'Es obligatorio subir un archivo para un anexo',
        'warning'
      );
      return;
    }

    if (
      // !watchFormulario.asunto ||
      !watchFormulario.descripcion_de_la_solicitud
      //|| !watchFormulario?.medio_de_solicitud?.value
    ) {
      showAlert(
        'Advertencia',
        'Es obligatorio llenar el campo de descripción de la respuesta de requerimiento',
        'warning'
      );
      return;
    }

    if (!watchFormulario.nombre_archivo || !watchFormulario.numero_folios || !watchFormulario.medio_almacenamiento) {
      showAlert(
        'Advertencia',
        'Es obligatorio llenar los campos de nombre del archivo, número de folios y medio de almacenamiento del archivo',
        'warning'
      );
      return;
    }

    const createAnexoData = (baseObject = {}) => ({
      ...baseObject,
      asunto: watchFormulario?.asunto ?? 'Sin asunto',
      descripcion_de_la_solicitud: watchFormulario?.descripcion_de_la_solicitud,
      fecha_de_solicitud: watchFormulario?.fecha_de_solicitud || new Date().toISOString().slice(0, 10),
      medio_de_solicitud: watchFormulario?.medio_de_solicitud ?? { value: 'Na', label: 'No aplica' },
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
    dispatch(setMetadatos(null as any));

    if (currentAnexo) {
      //* se debe quitar el as any y validar un par de cosas que pueden estar fallando al editar el anexo
      dispatch(editAnexo(dataEditAnexo as any));
    } else {
      dispatch(addAnexo(dataCreateAnexo));
    }
  };
  console.log(currentAnexo, 'aqui');
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
              render={({
                field: { onChange, value },
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
                    startIcon={<FilePresentIcon />}
                  >
                    {value === '' || value === null
                      ? 'Subir archivo'
                      : 'Archivo subido'}
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          controlar_tamagno_archivos(file, onChange)
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
                  helperText={error ? 'Es obligatorio poner un nombre para el archivo' : ''}
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
          
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              mb: '2rem',
            }}
          >
            <Controller
              name="medio_almacenamiento"
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
                  type="text"
                  name="medio_almacenamiento"
                  label="Medio de almacenamiento (USB - CD - OTRO - N/A, etc.)"
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
              startIcon={<AttachFileIcon />}
              onClick={() => {
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
              startIcon={currentAnexo ? <RestartAltIcon /> : <AddTaskIcon />}
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
            rows={
              [...anexosCreados]?.sort(
                (
                  a: { ruta_soporte?: string; nombre_archivo: string },
                  b: { ruta_soporte?: string; nombre_archivo: string }
                ) => {
                  if (a?.ruta_soporte && !b?.ruta_soporte) {
                    return -1;
                  }
                  if (!a?.ruta_soporte && b?.ruta_soporte) {
                    return 1;
                  }
                  if (a.ruta_soporte && b.ruta_soporte) {
                    return a.nombre_archivo.localeCompare(b.nombre_archivo);
                  }
                  return 0;
                }
              ) ?? []
            }
          />
        ) : (
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ textAlign: 'center', justifyContent: 'center', mt: '1.5rem' }}
          >
            Sin anexos creados para esta respuesta de requerimiento
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
              mt: '1rem',
            }}
          >
            VOLVER A : DESCRIPCION
          </Button>
          <Carousel
            className="carousel"
            showIndicators={false}
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <ArrowBackIosIcon
                  onClick={onClickHandler}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 15,
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                />
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <ArrowForwardIosIcon
                  onClick={onClickHandler}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 15,
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                />
              )
            }
            width={'75%'}
            autoPlay={true}
          >
            <div>
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
                Reiniciar formularios
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CleanIcon />}
                onClick={() => {
                  resetManejoMetadatosModalFunction();
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
                LIMPIAR CAMPOS METADATOS
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CleanIcon />}
                onClick={() => {
                  resetFormulario();
                  if (currentAnexo) {
                    dispatch(setCurrentAnexo(null as any));
                    dispatch(setViewMode(false as boolean));
                  }
                }}
                sx={{
                  width: '55%',
                  mt: '2rem',
                }}
              >
                LIMPIAR CAMPOS ARCHIVO
              </Button>
            </div>
          </Carousel>
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
    </>
  );
};
