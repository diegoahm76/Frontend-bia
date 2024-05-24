/* eslint-disable @typescript-eslint/naming-convention */
import {
  Grid,
  Button,
  Stack,
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  TextField,
  Alert,
  Tooltip,
  IconButton,
  Avatar,
  FormHelperText,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CloudUpload } from '@mui/icons-material';
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../hooks';
import {
  cargar_anexos_opas,
  cargar_anexos_opas_metadatos,
} from '../thunks/TramitesOServicios';
import { ModalMetadatosTramite } from '../../TramitesServicios/components/MetadatosTramite/ModalMetadatosTramite';
import { FormContextMetadatos } from '../../TramitesServicios/context/MetadatosContext';
import { AuthSlice } from '../../../auth/interfaces/authModels';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';
import Swal from 'sweetalert2';
import { control_success } from '../../../../helpers';
import { useFiles } from '../../../../hooks/useFiles/useFiles';
const class_css = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  mb: '20px',
  boxShadow: '0px 3px 6px #042F4A26',
};
interface IProps {
  usuario: any;
  cargar_anexos: any;
  set_cargar_anexos: any;
  response_paso_1: any;
  set_anexar_error: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocumentosAnexos: React.FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { controlar_tamagno_archivos } = useFiles();
  const [descripcion, set_descripcion] = useState<string | any>('');
  const [error_descripcion, set_error_descripcion] = useState<string | any>('');
  const [error_file_name, set_error_file_name] = useState<string | any>('');
  const [tamaño, set_tamaño] = useState<string | any>('');
  const [file, set_file] = useState<File | null>(null);
  const [file_name, set_file_name] = useState<string | any>('');

  const [limpiar, set_limpiar] = useState<boolean>(false);
  const { form, archivos, set_archivos } = useContext(FormContextMetadatos);
  // console.log(form)
  const columns: GridColDef[] = [
    {
      field: 'nombre_archivo',
      headerName: 'Nombre del archivo',
      sortable: true,
      width: 420,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      sortable: true,
      width: 350,
    },
    {
      field: 'tamaño',
      headerName: 'Tamaño',
      width: 200,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => (
        <>
          {/* <Tooltip title="Selecionar documento">
            <IconButton
              onClick={() => {
                seleccionar_archivos(params.row);
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
                <PlaylistAddCheckIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>*/}
          <Tooltip title="Eliminar anexo">
            <IconButton
              onClick={async () => {
                eliminar_archivos(params.row);
                await Swal.fire({
                  title: 'Anexos',
                  text: 'Se eliminó el anexo correctamente',
                  icon: 'success',
                });
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
                <ClearOutlinedIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const handle_file_selected = (selected_file: File): void => {
    if (selected_file) {
      set_file(selected_file);
      set_file_name(selected_file.name);
      set_tamaño(selected_file.size.toString());
    }
  };
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  console.log(userinfo.tipo_usuario);

  const agregar_archivos = (): void => {
    if (isFormValid()) {
      const newFile = {
        id: uuidv4(),
        nombre_archivo: file_name,
        descripcion: descripcion,
        tamaño: tamaño,
        archivo: file,
        data_json: {
          id_anexo_tramite: null,
          descripcion: descripcion,
          nro_folios_documento: form.nro_folios_documento, // Valor predeterminado
          cod_categoria_archivo: form.CodCategoriaArchivo,
          cod_origen_archivo: form.origenArchivo,
          es_version_original: false, // Valor predeterminado
          tiene_replica_fisica: form.tieneReplicaFisica,
          id_tipologia_doc: form.tipologiaRelacionada, // Valor predeterminado
          tipologia_no_creada_TRD: form.tipologiaRelacionadaotra || null, // Valor predeterminado
          asunto: form.asunto,
          palabras_clave_doc: form.keywords,
        },
      };

      // No es necesario crear una nueva variable archivos_grid
      // Puedes añadir el nuevo archivo directamente al estado
      set_archivos((prevArchivos: any) => [...prevArchivos, newFile]);
      set_limpiar(true);
      set_descripcion('');
      set_error_descripcion('');
      set_file_name('');
      set_error_file_name('');
      set_tamaño('');
    }
  };

  const eliminar_archivos: any = (archivo: any) => {
    let archivos_grid: any[] = [...archivos];
    const index = archivos_grid.findIndex((a: any) => a.id === archivo.id);
    archivos_grid.splice(index, 1);
    set_archivos([...archivos_grid]);
  };

  const isFormValid = (): boolean => {
    const isDescriptionEmpty = descripcion === '';
    set_error_descripcion(isDescriptionEmpty);
    return !isDescriptionEmpty;
  };

  const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_descripcion(e.target.value);
  };

  useEffect(() => {
    if (props.cargar_anexos) {
      const cargar = archivos.length > 0;
      props.set_cargar_anexos(cargar);
      if (cargar) {
        const data_anexos: any[] = archivos.map((obj: any) => obj.data_json);
        const data_archivos: File[] = archivos.map((obj: any) => obj.archivo);
        const form_data = new FormData();
        form_data.append('data_anexos', JSON.stringify(data_anexos));
        // form_data.append('archivos', data_archivos[0]);
        data_archivos.forEach((archivo: File) => {
          form_data.append('archivos', archivo);
        });

        // console.log(userinfo.tipo_usuario);

        if (userinfo.tipo_usuario === 'I') {
          // Ejecutar la acción para el tipo de usuario 'i'
          dispatch(
            cargar_anexos_opas_metadatos(
              props.response_paso_1?.id_solicitud_tramite,
              form_data
            )
          ).then((response: any) => {
            if (response.success) {
              props.set_anexar_error(response.success);
            }
          });
        } else if (userinfo.tipo_usuario === 'E') {
          // Ejecutar la acción para el tipo de usuario 'o'
          dispatch(
            cargar_anexos_opas(
              props.response_paso_1?.id_solicitud_tramite,
              form_data
            )
          ).then((response: any) => {
            if (response.success) {
              props.set_anexar_error(response.success);
            }
          });
        }
      } else {
        props.set_anexar_error(true);
      }
    }
  }, [props.cargar_anexos]);

  useEffect(() => {
    if (limpiar) {
      set_descripcion('');
      set_error_descripcion('');
      set_file_name('');
      set_error_file_name('');
      set_tamaño('');
    }
  }, [limpiar]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: '1.8rem' }}>
        {/* <Grid item xs={12} sm={12}>
                    <Typography variant="inherit">Anexos</Typography>
                </Grid>*/}
        <Grid item xs={12} sm={4}>
          <Button
            variant={file_name === '' ? 'outlined' : 'contained'}
            fullWidth
            size="medium"
            component="label"
            startIcon={<CloudUpload />}
          >
            {file_name === ''
              ? 'Seleccionar archivo'
              : 'Archivo seleccionado / Cambiar archivo'}
            <input
              hidden
              type="file"
              accept="tipo_doc"
              required
              autoFocus
              style={{ opacity: 0 }}
              onChange={(e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files && files.length > 0) {
                  const file = files[0];
                  console.log('soy el archivo', file);
                  controlar_tamagno_archivos(file, handle_file_selected);
                }
              }}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            size="small"
            label={
              file_name === ''
                ? 'Ningún archivo seleccionado'
                : 'Archivo seleccionado'
            }
            type="text"
            variant="outlined"
            value={file_name ?? ''}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            margin="dense"
            fullWidth
            size="small"
            label="Descripción de archivo"
            type="text"
            variant="outlined"
            value={descripcion}
            onChange={cambio_descripcion}
            error={error_descripcion}
          />
          {error_descripcion && (
            <FormHelperText error id="desde-error">
              {'El campo es obligatorio.'}
            </FormHelperText>
          )}
        </Grid>

        {userinfo && userinfo.tipo_usuario === 'I' && (
          <>
            <Grid
              container
              justifyContent="center"
              sx={{
                mt: '2.5rem',
                mb: '2.5rem',
              }}
            >
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="warning"
                  size="medium"
                  onClick={handleOpenModal}
                  startIcon={<AddIcon />}
                >
                  AGREGAR METADATOS AL ANEXO
                </Button>
                <ModalMetadatosTramite
                  is_modal_active={isModalOpen}
                  set_is_modal_active={setIsModalOpen}
                />
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={12}>
          <Alert severity="info">
            Adjunte los documentos requeridos para la solicitud, puede agregar
            los que necesite, revise muy bien la información antes de agregarla.
          </Alert>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          textAlign={'start'}
          sx={{ mt: '.5rem', mb: '2.2rem' }}
        >
          <Button
            variant="contained"
            onClick={async () => {
              if (
                descripcion === '' ||
                file_name === '' ||
                // !form.tipologiaRelacionada ||
                // !form.CodCategoriaArchivo ||
                !form.origenArchivo ||
                !form.keywords
              ) {
                await Swal.fire({
                  title: 'Anexos',
                  text: 'Debe seleccionar un archivo, agregar una descripción, llenar los metadatos y seleccionar una tipología para crear el anexo',
                  icon: 'warning',
                });
                return;
              }

              await Swal.fire({
                title: 'Anexos',
                text: '¿Está seguro de agregar el anexo?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
              }).then(async (result: any) => {
                if (result.isConfirmed) {
                  agregar_archivos();
                  await Swal.fire({
                    title: 'Anexos',
                    text: 'Se agregó el anexo correctamente',
                    icon: 'success',
                  });
                } else {
                  await Swal.fire({
                    title: 'Anexos',
                    text: 'No se agregó el anexo, operación cancelada',
                    icon: 'info',
                  });
                }
              });
            }}
            startIcon={<AddCircleOutlinedIcon />}
          >
            Agregar nuevo anexo
          </Button>
        </Grid>

        {archivos?.length > 0 && (
          <RenderDataGrid
            title="Anexos del trámite"
            rows={archivos}
            columns={columns}
          />
        )}

        {/* <Grid item xs={12} sm={12}>
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rows={archivos}
                        getRowId={(row) => uuidv4()} />
                </Grid>*/}
      </Grid>
    </>
  );
};
