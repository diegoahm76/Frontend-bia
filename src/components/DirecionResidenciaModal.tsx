import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { type IGeneric } from '../interfaces/globalModels';
import { get_direcciones } from '../request/getRequest';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const valores1 = [
  { label: 'Urbano', value: 'urb' },
  { label: 'Rural', value: 'rur' },
];

const letras_options = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' },
  { label: 'I', value: 'I' },
  { label: 'J', value: 'J' },
  { label: 'K', value: 'K' },
  { label: 'L', value: 'L' },
  { label: 'M', value: 'M' },
  { label: 'N', value: 'N' },
  { label: 'O', value: 'O' },
  { label: 'P', value: 'P' },
  { label: 'Q', value: 'Q' },
  { label: 'R', value: 'R' },
  { label: 'S', value: 'S' },
  { label: 'T', value: 'T' },
  { label: 'U', value: 'U' },
  { label: 'V', value: 'V' },
  { label: 'W', value: 'W' },
  { label: 'X', value: 'X' },
  { label: 'Y', value: 'Y' },
  { label: 'Z', value: 'Z' },
];

const default_values = {
  ubicacion: '',
  residencia: '',
  nombreUbicacion: '',
  numeroResidencia: '',
  complementoRural: '',

  principal: '',
  numero: '',
  letra1: '',
  bis: '',
  orientacion: '',
  numero2: '',
  letra2: '',
  numeroSecundario: '',
  orientacion2: '',
  complemento: '',
  adicional: '',
};
const generic_initial: IGeneric[] = [
  {
    label: '',
    value: '',
  },
];

type key_array =
  | 'ubicacion'
  | 'nombreUbicacion'
  | 'residencia'
  | 'numeroResidencia'
  | 'complementoRural'
  | 'principal'
  | 'numero'
  | 'letra1'
  | 'bis'
  | 'orientacion'
  | 'numero2'
  | 'letra2'
  | 'numeroSecundario'
  | 'orientacion2'
  | 'complemento'
  | 'adicional';

interface Props {
  is_modal_active: any;
  setIsModalActive: any;
  completeAddress: any;
  setCompleteAddress: any;
  reset: any;
  keyReset: any;
  watch: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '580px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DirecionResidenciaModal: React.FC<Props> = ({
  is_modal_active,
  setIsModalActive,
  completeAddress,
  setCompleteAddress,
  reset,
  keyReset,
  watch,
}: Props) => {
  const [principal_rural_options, set_principal_rural_options_options] =
    useState(generic_initial);
  const [complemento_rural_options, set_complemento_rural_options] =
    useState(generic_initial);
  const [principal_urbano_options, set_principal_urbano_options] =
    useState(generic_initial);
  const [complemento_urbano_options, set_complemento_urbano_options] =
    useState(generic_initial);
  const [orientacion_urbano_options, set_orientacion_urbano_options] =
    useState(generic_initial);
  const [selec_direccion, set_selec_direccion] = useState({ value: '' });
  const [form_values, set_form_values] = useState({
    ubicacion: '',
    nombreUbicacion: '',
    residencia: '',
    numeroResidencia: '',
    complementoRural: '',
    principal: '',
    numero: '',
    letra1: '',
    bis: '',
    orientacion: '',
    numero2: '',
    letra2: '',
    numeroSecundario: '',
    orientacion2: '',
    complemento: '',
    adicional: '',
  });

  const order_rural = [
    'ubicacion',
    'nombreUbicacion',
    'residencia',
    'numeroResidencia',
    'complementoRural',
  ];

  const order_urbano = [
    'principal',
    'numero',
    'letra1',
    'bis',
    'orientacion',
    'numero2',
    'letra2',
    'numeroSecundario',
    'orientacion2',
    'complemento',
    'adicional',
  ];

  const {
    control,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    register,
    reset: reset_direction,
    watch: watch_direction,
    formState: { errors },
  } = useForm();

  const on_submit = (e: any): void => {
    const complete_address_without_white_spaces = completeAddress
      .trim()
      .split('')
      .filter((letter: any, index: number, arrFilter: []) => {
        if (index > 0) {
          if (arrFilter[index] === ' ' && arrFilter[index - 1] === ' ') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      })
      .join('');
    const data_reset = {
      ...watch(),
      [keyReset]: complete_address_without_white_spaces,
    };

    reset(data_reset);
    setIsModalActive(false);
    reset_direction({
      direccion: '',
      ubicacion: '',
      nombre: '',
      residencia: '',
    });
    set_selec_direccion({ value: '' });
  };

  const handle_change_type_location = (e: any): void => {
    set_selec_direccion(e);
    reset_direction({ ...watch_direction(), direccion: e });
  };

  const get_data_direcciones = async (): Promise<void> => {
    const { data } = await get_direcciones();
    set_principal_rural_options_options(
      data['Principal rural'].map((item: any) => ({
        label: item.label,
        value: item.id,
      }))
    );
    set_complemento_rural_options(
      data['Complemento rural'].map((item: any) => ({
        label: item.label,
        value: item.id,
      }))
    );
    set_principal_urbano_options(
      data['Principal urbano'].map((item: any) => ({
        label: item.label,
        value: item.id,
      }))
    );
    set_complemento_urbano_options(
      data['Complemento urbano'].map((item: any) => ({
        label: item.label,
        value: item.id,
      }))
    );
    set_orientacion_urbano_options(
      data['Orientacion urbano'].map((item: any) => ({
        label: item.label,
        value: item.id,
      }))
    );
  };

  useEffect(() => {
    void get_data_direcciones();
  }, []);

  useEffect(() => {
    let full_address = '';
    if (selec_direccion.value === 'urb') {
      order_urbano.forEach((field: string) => {
        const temp_field = field as key_array;
        const data_field = form_values[temp_field];
        const data_field_trim = data_field.trim();
        if (field === 'letra1' || field === 'letra2') {
          full_address = full_address + data_field_trim;
        } else if (field === 'numeroSecundario' && data_field_trim !== '') {
          full_address = full_address + ' No. ' + data_field_trim;
        } else {
          full_address = full_address + ' ' + data_field_trim;
        }
      });
      // setCompleteAddress(full_address);
      setCompleteAddress('direccionNotificacion', full_address);
    } else if (selec_direccion.value === 'rur') {
      order_rural.forEach((field: string) => {
        const temp_field = field as key_array;
        const data_field = form_values[temp_field];
        const data_field_trim = data_field?.trim() ?? '';
        if (data_field_trim !== '') {
          full_address = full_address + ' ' + data_field_trim;
        }
      });
      setCompleteAddress('direccionNotificacion', full_address);
    }
  }, [form_values]);

  useEffect(() => {
    set_form_values(default_values);
  }, [selec_direccion]);

  return (
    <Modal open={is_modal_active}>
      <Box sx={style}>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(on_submit)}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography>Dirección de residencia</Typography>
            </Grid>

            <Grid item xs={12}>
              <label className="text-terciary form-control ms-0">
                Ubicación: <span className="text-danger">*</span>
              </label>
              <Controller
                name="direccion"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={handle_change_type_location}
                    options={valores1}
                    placeholder="Seleccione"
                  />
                )}
              />
            </Grid>

            {selec_direccion.value === 'rur' ? (
              <>
                <Grid item xs={12}>
                  <Typography>Datos de la dirección rural</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">
                    Principal: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="ubicacion"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={principal_rural_options}
                        onChange={(e) => {
                          set_form_values({
                            ...form_values,
                            ubicacion: e.value,
                          });
                          reset_direction({
                            ...watch_direction(),
                            ubicacion: e,
                          });
                        }}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors.ubicacion != null && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div>
                    <label className="text-terciary">
                      Nombre: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register('nombre', { required: true })}
                      onChange={(e) => {
                        set_form_values({
                          ...form_values,
                          nombreUbicacion: e.target.value,
                        });
                        reset_direction({
                          ...watch_direction(),
                          nombre: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {errors.nombre != null && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Complemento:</label>
                  <Controller
                    name="residencia"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={complemento_rural_options}
                        onChange={(e) => {
                          set_form_values({
                            ...form_values,
                            residencia: e.value,
                          });
                        }}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Número:</label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    onChange={(e) => {
                      set_form_values({
                        ...form_values,
                        numeroResidencia: e.target.value,
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Complemento</label>
                  <textarea
                    className="form-control border rounded-pill px-5 border-terciary"
                    rows={3}
                    onChange={(e) => {
                      set_form_values({
                        ...form_values,
                        complementoRural: e.target.value,
                      });
                    }}
                  />
                </Grid>
              </>
            ) : (
              ''
            )}

            {selec_direccion.value === 'urb' && (
              <>
                <Typography>Datos de la dirección urbano</Typography>

                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">
                    Principal: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="principal"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={principal_urbano_options}
                        onChange={(e) => {
                          set_form_values({
                            ...form_values,
                            principal: e.value,
                          });
                          reset_direction({
                            ...watch_direction(),
                            principal: e,
                          });
                        }}
                        placeholder="Selecciona"
                      />
                    )}
                  />
                  {errors.principal != null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div>
                    <label className="text-terciary">
                      Número: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register('numero', { required: true })}
                      onChange={(e) => {
                        set_form_values({
                          ...form_values,
                          numero: e.target.value,
                        });
                        reset_direction({
                          ...watch_direction(),
                          numero: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {errors.numero != null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Letra :</label>
                  <Controller
                    name="letra1"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={letras_options}
                        onChange={(e) => {
                          set_form_values({
                            ...form_values,
                            letra1: e.value,
                          });
                        }}
                        placeholder="Selecciona"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="form-check">
                    <label
                      className="form-check-label mx-2"
                      htmlFor="flexCheckDefault"
                    >
                      Bis
                    </label>
                    <input
                      className="form-check-input mx-2"
                      type="checkbox"
                      onChange={(e) => {
                        console.log(e.target.checked);
                        if (e.target.checked) {
                          set_form_values({
                            ...form_values,
                            bis: 'BIS',
                          });
                        } else {
                          set_form_values({
                            ...form_values,
                            bis: '',
                          });
                        }
                      }}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label mx-2"
                      htmlFor="flexCheckDefault"
                    ></label>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Orientacion :</label>
                  <Controller
                    name="orientacion"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={orientacion_urbano_options}
                        onChange={(e) => {
                          set_form_values({
                            ...form_values,
                            orientacion: e.value,
                          });
                        }}
                        placeholder="Selecciona"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Número:</label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    onChange={(e) => {
                      set_form_values({
                        ...form_values,
                        numero2: e.target.value,
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Letra :</label>
                  <Controller
                    name="letra2"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={letras_options}
                        placeholder="Selecciona"
                        onChange={(e) => {
                          set_form_values({
                            ...form_values,
                            letra2: e.value,
                          });
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Número Secundario:</label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    onChange={(e) => {
                      set_form_values({
                        ...form_values,
                        numeroSecundario: e.target.value,
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Orientacion :</label>
                  <Controller
                    name="orientacion2"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={orientacion_urbano_options}
                        placeholder="Selecciona"
                        onChange={(e) => {
                          set_form_values({
                            ...form_values,
                            orientacion2: e.value,
                          });
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Complemento:</label>
                  <Controller
                    name="complemento"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={complemento_urbano_options}
                        placeholder="Selecciona"
                        onChange={(e) => {
                          set_form_values({
                            ...form_values,
                            complemento: e.value,
                          });
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label className="text-terciary">Adicional</label>
                  <textarea
                    className="form-control border rounded-pill px-5 border-terciary"
                    onChange={(e) => {
                      set_form_values({
                        ...form_values,
                        adicional: e.target.value,
                      });
                    }}
                    rows={3}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <label className="text-terciary">Dirección estandarizada:</label>
              <input
                type="text"
                className="form-control border border-terciary rounded-pill px-3"
                disabled
                value={completeAddress}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={() => {
                  setIsModalActive(false);
                  reset_direction({
                    direccion: '',
                    ubicacion: '',
                    nombre: '',
                    residencia: '',
                  });
                  set_selec_direccion({ value: '' });
                }}
                variant="outlined"
                startIcon={<CancelIcon />}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="outlined" startIcon={<SaveIcon />}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
