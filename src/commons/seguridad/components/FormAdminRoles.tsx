import { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  create_permiso_rol,
  create_rol,
  get_permisos_by_modulos,
  get_rol_by_id,
} from '../request/seguridadRequest';
import { control_error, control_success } from '../../../helpers';
import type { Acciones, Modulo, PermisosRol, Rol, Roles } from '../interfaces';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { AxiosError } from 'axios';
import type { ResponseServer } from '../../../interfaces/globalModels';

interface Props {
  on_create: () => void;
  rol_edit?: Rol;
}

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

      if (rol_edit?.id_rol !== 0) {
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
      const { data } = await create_rol(data_form as Rol);
      permisos_rol.forEach((e) => {
        e.id_rol = data.id_rol;
      });

      await create_permiso_rol(permisos_rol);

      control_success('Rol creado');

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

  const render_actions = (actions: Acciones): JSX.Element[] => {
    type key_obj =
      | 'crear'
      | 'actualizar'
      | 'consultar'
      | 'borrar'
      | 'anular'
      | 'ejecutar';
    const elements: JSX.Element[] = [];
    for (const index in actions) {
      const key = index as key_obj;
      if (rol_edit?.id_rol !== 0 && actions[key]?.id !== undefined) {
        elements.push(
          <FormControlLabel
            key={key}
            control={<Checkbox checked={true} onChange={select_permisos} />}
            label={key}
            value={actions[key]?.id}
          />
        );
      } else {
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
      const {
        data: { data },
      } = await get_rol_by_id(rol_edit?.id_rol ?? 0);
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
            const module = temp.modulos.find(
              (i) => i.id_modulo === m.id_modulo
            );
            if (module !== undefined) {
              m.checked = true;
              m.permisos = {
                crear: module.permisos.crear,
                actualizar: module.permisos.actualizar,
                // anular: module.permisos.anular,
                borrar: module.permisos.borrar,
                consultar: module.permisos.consultar,
                // ejecutar: module.permisos.ejecutar,
              };
            }
          });
        }
      });
      console.log('first');
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
          <Grid item xs={12} sm={3}>
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
              color="primary"
              disabled={is_saving}
              startIcon={<SaveIcon />}
            >
              GUARDAR
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            container={is_loading}
            justifyContent={is_loading ? 'center' : 'start'}
          >
            {is_loading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h5">lista de permisos</Typography>
                <FormGroup>
                  {permisos.map((e, k) => {
                    return (
                      <div key={k}>
                        <FormControlLabel
                          control={<Checkbox checked={e.checked} />}
                          label={e.desc_subsistema}
                          onChange={() => {
                            checked_modulo(e, k);
                          }}
                        />
                        {e.checked && (
                          <Grid container px={3} spacing={2}>
                            {e.modulos.map((m, i) => {
                              return (
                                <Grid item xs={12} sm={6} key={i}>
                                  <Accordion expanded={m.checked}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id={m.nombre_modulo}
                                      onClick={() => {
                                        checked_item(m, i, k);
                                      }}
                                    >
                                      <Typography>{m.nombre_modulo}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div>
                                        <Typography variant="caption">
                                          Acciones para el usuario
                                        </Typography>
                                      </div>
                                      <div>{render_actions(m.permisos)}</div>
                                    </AccordionDetails>
                                  </Accordion>
                                </Grid>
                              );
                            })}
                          </Grid>
                        )}
                      </div>
                    );
                  })}
                </FormGroup>
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};
