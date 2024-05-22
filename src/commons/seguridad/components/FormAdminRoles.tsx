/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState, useCallback } from 'react';
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
import { create_permiso_rol, create_rol, get_permisos_by_modulos, get_rol_by_id, update_permiso_rol, update_rol } from '../request/seguridadRequest';
import { control_error, control_success } from '../../../helpers';
import { VisaulTexto } from '../../gestorDocumental/actividadesPreviasCambioCCD/modules/asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import Swal from 'sweetalert2';
import  SaveIcon  from '@mui/icons-material/Save';
import  ExpandMoreIcon  from '@mui/icons-material/ExpandMore';

interface Props {
  on_create: () => void;
  rol_edit?: any;
}

type key_obj = 'crear' | 'actualizar' | 'consultar' | 'borrar' | 'anular' | 'ejecutar';

export const FormAdminRoles = ({ on_create, rol_edit }: Props): JSX.Element => {
  const {
    register,
    handleSubmit: handle_submit,
    formState: { errors },
    setValue: set_value,
  } = useForm();
  const [is_loading, set_is_loading] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [permisos, set_permisos] = useState<any[]>([]);
  const [permisos_rol, set_permisos_rol] = useState<any[]>([]);

  const get_roles_permisos = useCallback(async (): Promise<void> => {
    set_is_loading(true);
    try {
      const {
        data: { data },
      } = await get_permisos_by_modulos();

      if (rol_edit?.id_rol !== 0) {
        await get_permisos_rol(data);
      } else {
        data.forEach((e) => {
          e.checked = false;
          e.modulos.forEach((i) => {
            i.checked = false;
          });
        });
        set_permisos(data);
      }
    } catch (error) {
      control_error(error);
    } finally {
      set_is_loading(false);
    }
  }, [rol_edit]);

  const on_submit = useCallback(handle_submit(async (data_form) => {
    set_is_saving(true);
    try {
      const temp_permisos: any[] = permisos_rol.map((e) => {
        return { id_permisos_modulo: e.id_permiso_modulo };
      });

      const permisos_ids = permisos_rol.map((e) => e.id_permiso_modulo);
      if (permisos_ids.includes(100) && permisos_ids.includes(95)) {
        await Swal.fire({
          title: 'Error',
          text: 'No pueden enviar permisos de trámites y servicios y manipulación de trámites y servicios al mismo tiempo',
          icon: 'error',
        });
        return;
      }

      if (rol_edit?.id_rol === 0) {
        const { data } = await create_rol({
          nombre_rol: permisos_ids.includes(100) || permisos_ids.includes(95) ? `zCamunda - ${data_form.nombre_rol}` : data_form.nombre_rol,
          descripcion_rol: data_form.descripcion_rol,
        } as any);
        permisos_rol.forEach((e) => {
          e.id_rol = data.id_rol;
        });

        await create_permiso_rol(permisos_rol);

        control_success('Rol creado');
      } else {
        const { data: res_rol } = await update_rol(
          {
            nombre_rol: !permisos_ids.includes(100) && !permisos_ids.includes(95) ? data_form.nombre_rol.replace('zCamunda - ', '') : data_form.nombre_rol.includes('zCamunda') ? data_form.nombre_rol : `zCamunda - ${data_form.nombre_rol}`,
            descripcion_rol: data_form.descripcion_rol,
          } as any,
          rol_edit?.id_rol ?? 0
        );

        const temp_permisos: any[] = permisos_rol.map((e) => {
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
      const { response } = error as any;
      control_error(response?.data.detail);
    } finally {
      set_is_saving(false);
    }
  }), [permisos_rol, rol_edit, on_create]);

  const checked_modulo = useCallback((index: number): void => {
    const new_permisos = [...permisos];
    new_permisos[index] = {
      ...new_permisos[index],
      checked: !new_permisos[index].checked,
    };
    set_permisos(new_permisos);
  }, [permisos]);

  const checked_item = useCallback((key: number, key_modulo: number): void => {
    const new_permisos = [...permisos];
    new_permisos[key_modulo].modulos[key] = {
      ...new_permisos[key_modulo].modulos[key],
      checked: !new_permisos[key_modulo].modulos[key].checked,
    };
    set_permisos(new_permisos);
  }, [permisos]);

  const handleModuloClick = useCallback((index: number) => () => {
    checked_modulo(index);
  }, [checked_modulo]);

  const handleItemClick = useCallback((i: any, index: number) => () => {
    checked_item(i, index);
  }, [checked_item]);

  const select_permisos = useCallback((event: React.ChangeEvent<HTMLInputElement>): void =>
    {
      if (event.target.checked) {
        set_permisos_rol((prevPermisosRol) => [
          ...prevPermisosRol,
          {
            id_permiso_modulo: +event.target.value,
            id_rol: 0,
          },
        ]);
      } else {
        set_permisos_rol((prevPermisosRol) =>
          prevPermisosRol.filter(
            (e) => e.id_permiso_modulo !== +event.target.value
          )
        );
      }
    }, []);
  
    const render_actions = useCallback((actions: any, modulo: string): JSX.Element[] => {
      return Object.keys(actions).map((key) => {
        const action = actions[key as key_obj];
        const isEditing = rol_edit?.id_rol !== 0;
    
        return (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                defaultChecked={isEditing ? action?.value : undefined}
                onChange={select_permisos}
              />
            }
            label={key}
            value={action?.id}
          />
        );
      });
    }, [rol_edit, select_permisos]);
  
    const get_permisos_rol = useCallback(async (permisos: any[]): Promise<void> => {
      set_is_loading(true);
      try {
        const temp_permisos: any[] = [];
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
          e.modulos.forEach((i: any) => {
            i.checked = false;
          });
          const temp = data.find((i) => i.subsistema === e.subsistema);
          if (temp !== undefined) {
            e.checked = true;
            e.modulos.forEach((m: any) => {
              const module = temp.modulos.find(
                (i) => i.id_modulo === m.id_modulo
              );
              const permisos = {};
    
              for (const key in m.permisos) {
                const element = m.permisos[key as keys];
                const has_key = module?.permisos[key as keys] !== undefined;
                const properties = {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value: has_key
                    ? module?.permisos[key as keys]
                    : {
                        ...element,
                        value: false,
                      },
                };
                Object.defineProperty(permisos, key, properties);
              }
    
              m.permisos = permisos;
    
              if (module !== undefined) {
                for (const key in module.permisos) {
                  const k = key as key_obj;
                  const element = module.permisos[k];
                  if (element?.id !== undefined) {
                    temp_permisos.push({
                      id_permiso_modulo: element?.id,
                      id_rol: 0,
                    });
                  }
                }
                m.checked = true;
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
    }, [rol_edit]);
  
    useEffect(() => {
      void get_roles_permisos();
    }, [get_roles_permisos]);
  
    useEffect(() => {
      set_value('nombre_rol', rol_edit?.nombre_rol);
      set_value('descripcion_rol', rol_edit?.descripcion_rol);
    }, [rol_edit, set_value]);
  
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                  {permisos.map((subsistema: any, index: any) => (
                    <Grid item xs={12} key={index}>
                      <Accordion expanded={subsistema.checked}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id={subsistema.desc_subsistema}
                          onClick={handleModuloClick(index)}
                        >
                          <Typography>{subsistema.desc_subsistema}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                          <Grid container px={3} spacing={2}>
                            {subsistema.modulos.map((modulo: any, i: any) => (
                              <Grid item xs={12} sm={6} key={i}>
                                <Accordion expanded={modulo.checked}>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id={modulo.nombre_modulo}
                                    onClick={handleItemClick(i, index)}
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
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </form>
      </>
    );
  };
  