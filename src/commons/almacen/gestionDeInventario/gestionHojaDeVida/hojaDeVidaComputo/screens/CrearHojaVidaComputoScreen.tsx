/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, Box, Stack, Button, DialogTitle, DialogActions, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { create_cv_computers_service, get_marca_service, } from '../store/thunks/cvComputoThunks';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { type ICvcomputers as FormValues } from '../interfaces/CvComputo';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import SeleccionarComputer from '../components/BuscarElementos';
import Especificaciones from '../components/EspecificacionesFisc';
import EspecificacionesTec from '../components/EspecificacionesTec';
import Caracteristicas from '../components/Caracteristicas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaComputoScreen(): JSX.Element {
  const [action,] = useState<string>("create");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { current_cv_computer } = useAppSelector(
    (state) => state.cv
  );

  const { control: control_cv_computo, handleSubmit: handle_submit, reset: reset_cv_computer, getValues: get_values } = useForm<FormValues>();

  useEffect(() => {
    void dispatch(get_marca_service());
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const on_submit = (data: FormValues): void => {
    const form_data: any = new FormData();
    form_data.append('sistema_operativo', data.sistema_operativo);
    form_data.append('suite_ofimatica', data.suite_ofimatica);
    form_data.append('antivirus', data.antivirus);
    form_data.append('color', data.color);
    form_data.append('tipo_de_equipo', data.tipo_de_equipo);
    form_data.append('tipo_almacenamiento', data.tipo_almacenamiento);
    form_data.append('capacidad_almacenamiento', data.capacidad_almacenamiento);
    form_data.append('procesador', data.procesador);
    form_data.append('memoria_ram', data.memoria_ram);
    form_data.append('estado', data.estado);
    form_data.append('doc_identificador_nro', data.doc_identificador_nro);
    form_data.append(
      'observaciones_adicionales',
      data.observaciones_adicionales
    );
    form_data.append('otras_aplicaciones', data.otras_aplicaciones);
    form_data.append('id_marca', data.id_marca ?? null);
    form_data.append('id_articulo', (data.id_articulo ?? "").toString());
    // form_data.append('ruta_imagen_foto', file === null ? '' : file);

    void dispatch(create_cv_computers_service(form_data, navigate));


  };

  useEffect(() => {
    reset_cv_computer(current_cv_computer);
    console.log(current_cv_computer)
  }, [current_cv_computer]);

  return (

    <>

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >



        <Box
          component="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={
            action === 'create'
              ? handle_submit(on_submit)
              : handle_submit(on_submit)
          }
        >
          <DialogTitle>
            {action === 'create'
              ? ''
              : action === 'detail'
                ? 'Detalle  Hoja de vida'
                : 'Editar hoja de '}
          </DialogTitle>

          <SeleccionarComputer />


          <Especificaciones
            control_computo={control_cv_computo}
            get_values={get_values}
            title="ESPECIFICACIONES FÍSICAS" />
          <EspecificacionesTec
            control_computo={control_cv_computo}
            get_values={get_values}
            title="ESPECIFICACIONES TËCNICAS" />
          <Caracteristicas
            control_computo={control_cv_computo}
            get_values={get_values}
            title="CARACTERISTÍCAS" />



          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="outlined"
                //   onClick={handle_close_cv_com_is_active}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
              {action === 'create' ? (
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  GUARDAR
                </Button>
              ) : action === 'edit' ? (
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  EDITAR
                </Button>
              ) : null}
            </Stack>
          </DialogActions>
        </Box>






      </Grid>

    </>
  );
}


