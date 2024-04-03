import { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  create_permiso_rol,
  create_rol,
  get_permisos_by_modulos,
  get_rol_by_id,
  update_permiso_rol,
  update_rol,
} from '../request/seguridadRequest';
import { control_error, control_success } from '../../../helpers';
import type {
  Acciones,
  Modulo,
  PermisosRol,
  PermisosRolEdit,
  Rol,
  Roles,
} from '../interfaces';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { AxiosError } from 'axios';
import type { ResponseServer } from '../../../interfaces/globalModels';
import { VisaulTexto } from '../../gestorDocumental/actividadesPreviasCambioCCD/modules/asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import Swal from 'sweetalert2';

interface Props {
  on_create: () => void;
  rol_edit?: Rol;
}

type key_obj =
  | 'crear'
  | 'actualizar'
  | 'consultar'
  | 'borrar'
  | 'anular'
  | 'ejecutar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FormAdminRoles = ({ on_create, rol_edit }: Props): JSX.Element => {
  const {
    register,
    handleSubmit: handle_submit,
    formState: { errors },
    setValue: set_value,
  } = useForm();
  const [is_loading, set_is_loading] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [permisos, set_permisos] = useState<Roles[]>([]);
  const [permisos_rol, set_permisos_rol] = useState<PermisosRol[]>([]);

  const get_roles_permisos = async (): Promise<void> => {
    set_is_loading(true);
    try {
      const {
        data: { data },
      } = await get_permisos_by_modulos();

      // Obtiene permisos asignados al Rol al editar
      if (rol_edit?.id_rol !== 0) {
        //  console.log('')('first');
        await get_permisos_rol(data);
      } else {
        data.map((e) => {
          e.checked = false;
          e.modulos.map((i) => {
            i.checked = false;
            return i;
          });
          return e;
        });
        set_permisos(data);
      }
    } catch (error) {
      control_error(error);
    } finally {
      set_is_loading(false);
    }
  };

  const on_submit = handle_submit(async (data_form) => {
    set_is_saving(true);
    try {
      const temp_permisos: PermisosRolEdit[] = permisos_rol.map((e) => {
        return { id_permisos_modulo: e.id_permiso_modulo };
      });
      // //  console.log('')('temp_permisos', permisos_rol);

      // Validación de permisos
      const permisos_ids = permisos_rol.map((e) => e.id_permiso_modulo);
      if (permisos_ids.includes(100) && permisos_ids.includes(95)) {
        await Swal.fire({
          title: 'Error',
          text: 'No pueden enviar permisos de trámites y servicios y manipulación de trámites y servicios al mismo tiempo',
          icon: 'error',
        });
        return;
      }

      /* //  console.log('')('dataform modified', {
        nombre_rol:
          permisos_ids.includes(100) || permisos_ids.includes(95)
            ? `zCamunda - ${data_form.nombre_rol}`
            : data_form.nombre_rol,
        descripcion_rol: data_form.descripcion_rol,
      } as Rol);*/

      if (rol_edit?.id_rol === 0) {
        const { data } = await create_rol({
          nombre_rol:
            permisos_ids.includes(100) || permisos_ids.includes(95)
              ? `zCamunda - ${data_form.nombre_rol}`
              : data_form.nombre_rol,
          descripcion_rol: data_form.descripcion_rol,
        } as Rol);
        permisos_rol.forEach((e) => {
          e.id_rol = data.id_rol;
        });

        await create_permiso_rol(permisos_rol);

        control_success('Rol creado');
      } else {
        const { data: res_rol } = await update_rol(
          {
            nombre_rol:
              !permisos_ids.includes(100) && !permisos_ids.includes(95)
                ? data_form.nombre_rol.replace('zCamunda - ', '')
                : data_form.nombre_rol.includes('zCamunda')
                ? data_form.nombre_rol
                : `zCamunda - ${data_form.nombre_rol}`,
            descripcion_rol: data_form.descripcion_rol,
          } as Rol,
          rol_edit?.id_rol ?? 0
        );

        const temp_permisos: PermisosRolEdit[] = permisos_rol.map((e) => {
          return { id_permisos_modulo: e.id_permiso_modulo };
        });
        const { data } = await update_permiso_rol(
          temp_permisos,
          rol_edit?.id_rol ?? 0
        );

        control_success(res_rol.detail);
        control_success(data.detail);
      }

      on_create();
    } catch (error) {
      const { response } = error as AxiosError<ResponseServer<any>>;
      control_error(response?.data.detail);
    } finally {
      set_is_saving(false);
    }
  });

  const checked_modulo = (rol: Roles, index: number): void => {
    const temp_permisos = [...permisos];
    temp_permisos[index] = { ...rol, checked: !rol.checked };
    set_permisos(temp_permisos);
  };

  const checked_item = (obj: Modulo, key: number, key_modulo: number): void => {
    const temp_permisos = [...permisos];
    const modulos = [...temp_permisos[key_modulo].modulos];
    modulos[key] = { ...obj, checked: !obj.checked };
    temp_permisos[key_modulo].modulos = [...modulos];
    set_permisos(temp_permisos);
  };

  const select_permisos = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      //  console.log('')(event.target.value);
      set_permisos_rol([
        ...permisos_rol,
        {
          id_permiso_modulo: +event.target.value,
          id_rol: 0,
        },
      ]);
    } else {
      const new_array = permisos_rol.filter(
        (e) => e.id_permiso_modulo !== +event.target.value
      );
      set_permisos_rol([...new_array]);
    }
  };

  const render_actions = (actions: Acciones, modulo: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    for (const index in actions) {
      const key = index as key_obj;
      // Renderiza cuando esta editando
      if (rol_edit?.id_rol !== 0) {
        elements.push(
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                defaultChecked={actions[key]?.value}
                onChange={select_permisos}
              />
            }
            label={key}
            value={actions[key]?.id}
          />
        );
      } else {
        // Renderiza cuando esta creando
        elements.push(
          <FormControlLabel
            key={key}
            control={<Checkbox onChange={select_permisos} />}
            label={key}
            value={actions[key]?.id}
          />
        );
      }
    }
    return elements;
  };

  const get_permisos_rol = async (permisos: Roles[]): Promise<void> => {
    set_is_loading(true);
    try {
      const temp_permisos: PermisosRol[] = [];
      set_permisos_rol([]);
      const {
        data: { data },
      } = await get_rol_by_id(rol_edit?.id_rol ?? 0);

      type keys =
        | 'crear'
        | 'actualizar'
        | 'borrar'
        | 'consultar'
        | 'anular'
        | 'ejecutar';

      permisos.forEach((e) => {
        e.checked = false;
        e.modulos.map((i) => {
          i.checked = false;
          return i;
        });
        const temp = data.find((i) => i.subsistema === e.subsistema);
        if (temp !== undefined) {
          e.checked = true;
          e.modulos.forEach((m) => {
            // Buscamos que permisos tiene asignados
            const module = temp.modulos.find(
              (i) => i.id_modulo === m.id_modulo
            );
            // Si tien algun permiso asignado, asigamos las acciones que tiene
            if (module !== undefined) {
              for (const key in module.permisos) {
                const k = key as key_obj;
                const element = module.permisos[k];
                // enviamos los permisos asignados al array que se envia al server
                if (element?.id !== undefined) {
                  temp_permisos.push({
                    id_permiso_modulo: element?.id,
                    id_rol: 0,
                  });
                }
              }
              m.checked = true;

              // Variable que almacena temporalmente las acciones, de cada accion con su propiedad value en false
              const permisos = {};

              // Recorremos los permisos
              for (const key in m.permisos) {
                const element = m.permisos[key as keys];
                const has_key = module.permisos[key as keys] !== undefined;
                const properties = {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value: has_key
                    ? module.permisos[key as keys]
                    : {
                        ...element,
                        value: false,
                      },
                };
                // Enviamos a la variable permisos, los nuevos valores
                Object.defineProperty(permisos, key, properties);
              }
              m.permisos = permisos;
            } else {
              // Si no tien permiso asignado, asignamos por defecto en false

              // Variable que almacena temporalmente las acciones, de cada accion con su propiedad value en false
              const permisos = {};

              // Recorremos los permisos
              for (const key in m.permisos) {
                const element = m.permisos[key as keys];

                // Enviamos a la variable permisos, los nuevos valores
                Object.defineProperty(permisos, key, {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value: {
                    ...element,
                    value: false,
                  },
                });
              }

              // Reescribimos los permisos, con los nuevos valores
              m.permisos = permisos;
            }
          });
        }
      });
      set_permisos_rol(temp_permisos);
      set_permisos(permisos);
    } catch (error) {
      control_error(error);
    } finally {
      set_is_loading(false);
    }
  };

  useEffect(() => {
    void get_roles_permisos();
  }, []);

  useEffect(() => {
    set_value('nombre_rol', rol_edit?.nombre_rol);
    set_value('descripcion_rol', rol_edit?.descripcion_rol);
  }, [rol_edit]);

  return (
    <>
      <form
        onSubmit={(e) => {
          void on_submit(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Nombre del rol"
              size="small"
              fullWidth
              {...register('nombre_rol', { required: true })}
              error={errors.nombre_rol?.type === 'required'}
              helperText={
                errors.nombre_rol?.type === 'required' ? 'Campo requerido' : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              label="Descripción"
              size="small"
              fullWidth
              {...register('descripcion_rol', {
                required: true,
              })}
              error={errors.descripcion_rol?.type === 'required'}
              helperText={
                errors.descripcion_rol?.type === 'required'
                  ? 'Campo requerido'
                  : ''
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            container
            direction="column"
            justifyContent="center"
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={is_saving || permisos_rol.length === 0}
              endIcon={<SaveIcon />}
            >
              GUARDAR
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent={is_loading ? 'center' : 'start'}
            spacing={2}
          >
            {is_loading ? (
              <CircularProgress
                sx={{
                  color: 'primary.main',
                  mt: '30px',
                }}
              />
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      mt: '20px',
                    }}
                    paragraph
                  >
                    LISTA DE PERMISOS
                  </Typography>
                </Grid>
                {permisos.map((subsistema, index) => {
                  return (
                    <Grid item xs={12} key={index}>
                      <Accordion expanded={subsistema.checked}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id={subsistema.desc_subsistema}
                          onClick={() => {
                            checked_modulo(subsistema, index);
                          }}
                        >
                          <Typography>{subsistema.desc_subsistema}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                          <Grid container px={3} spacing={2}>
                            {subsistema.modulos.map((modulo, i) => {
                              return (
                                <Grid item xs={12} sm={6} key={i}>
                                  <Accordion expanded={modulo.checked}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id={modulo.nombre_modulo}
                                      onClick={() => {
                                        checked_item(modulo, i, index);
                                      }}
                                    >
                                      <Typography>
                                        {modulo.nombre_modulo}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div>
                                        <Typography variant="caption">
                                          Acciones para el usuario
                                        </Typography>
                                      </div>
                                      <div>
                                        {render_actions(
                                          modulo.permisos,
                                          modulo.nombre_modulo
                                        )}
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};
