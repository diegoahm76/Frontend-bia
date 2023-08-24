/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { useState } from 'react';

// import { Divider, Grid,Box } from '@mui/material';

// import type { AxiosError } from 'axios';
// import type { DataPersonas, InfoPersona } from '../../../../interfaces/globalModels';
// import { use_register } from '../../../auth/hooks/registerHook';
// import { consultar_datos_persona } from '../../../seguridad/request/Request';
// import { control_error } from '../../../../helpers';
// import { Title } from '../../../../components/Title';
// import { BuscadorPersona } from '../registroPersonas/BuscadorPersonaV';
// import { BuscarPersonaNatural } from './BuscarPersonaNatural';
// import { CrearPersonaNatural } from '../CrearPersonaNatural/CrearPersonaNatural';
// import { BuscarPersonaJuridica } from './BuscarPersonaJuridica';
// import { CrearPersonaJuridica } from '../CrearPersonaJuridica/CrearPersonaJuridica';


// eslint-disable-next-line @typescript-eslint/naming-convention
// export const AdminVentanilla: React.FC = () => {
  // const [persona, set_persona] = useState<InfoPersona>();
  // const [datos_persona, set_datos_persona] = useState<DataPersonas>();
  // const [is_register, set_is_register] = useState(false);
  // const [is_update, set_is_update] = useState(false);
  // const {
  //   errors,
  //   is_valid,
  //   get_values,
  //   handle_submit,
  //   register,
  //   set_value,
  //   watch,
  //   reset,
  // } = use_register();


  // const on_result = async (info_persona: InfoPersona): Promise<void> => {
  //   try {
  //     set_persona(info_persona);
  //     set_is_update(false);
  //     set_is_register(true);
  
  //     const {
  //       data: { data },
  //     } = await consultar_datos_persona(info_persona.id_persona);
  //     if (data.id_persona !== 0) {
  //       set_datos_persona(data);
  //       set_is_update(true);
  //       set_is_register(false);
  //     }
  
  //   } catch (err) {
  //     const temp = err as AxiosError;
  //     if (temp.response?.status !== 404) {
  //       control_error(err);
  //     }
  //   }
  // };
  
  // return (
  //   <Box sx={{
  //     position: 'relative',
  //     background: '#FAFAFA',
  //     borderRadius: '15px',
  //     p: '20px',
  //     mb: '20px',
  //     boxShadow: '0px 3px 6px #042F4A26',
  //   }}>
  //     <Grid container>
  //       <Grid item xs={12}>
  //         <Title title="Crear personas desde ventanilla" />
  //       </Grid>
  //     </Grid>
  //     {/* <BuscadorPersona
  //       onResult={(data) => {
  //         void on_result(data);
  //       }}
  //     /> */}
  //     <Grid container  spacing={2}>
  //       <Grid item xs={12}>
  //         <Divider />
  //       </Grid>
  //       {is_update && (
  //         <>
  //           {datos_persona && datos_persona?.tipo_persona === 'N' && (
  //             <>
  //               {/* <BuscarPersonaNatural
  //                 id_persona={datos_persona.id_persona}
  //                 numero_documento={datos_persona.numero_documento}
  //                 data={datos_persona}
  //                 tipo_persona={datos_persona.tipo_persona}
  //                 tipo_documento={datos_persona.tipo_documento}
  //                 errors={errors}
  //                 handleSubmit={handle_submit}
  //                 isValid={is_valid}
  //                 register={register}
  //                 setValue={set_value}
  //                 getValues={get_values}
  //                 watch={watch}
  //                 reset={reset}
  //               /> */}
  //             </>
  //           )}
  //           {datos_persona !== undefined && datos_persona?.tipo_persona === 'J' && (
  //             <>
  //               {/* <BuscarPersonaJuridica
  //                 id_persona={datos_persona.id_persona}
  //                 data={datos_persona}
  //                 numero_documento={datos_persona?.numero_documento}
  //                 tipo_persona={datos_persona.tipo_persona}
  //                 tipo_documento={datos_persona.tipo_documento}
  //                 errors={errors}
  //                 handleSubmit={handle_submit}
  //                 isValid={is_valid}
  //                 register={register}
  //                 setValue={set_value}
  //                 getValues={get_values}
  //                 watch={watch}
  //                 reset={reset}
  //               /> */}
  //             </>
  //           )}
  //         </>
  //       )}
  //       {is_register && (
  //         <>
  //           {persona?.tipo_persona === 'N' && (
  //             <>
  //               {/* <CrearPersonaNatural
  //                 numero_documento={persona.numero_documento}
  //                 tipo_persona={persona.tipo_persona}
  //                 tipo_documento={persona.tipo_documento}
  //                 errors={errors}
  //                 handleSubmit={handle_submit}
  //                 isValid={is_valid}
  //                 register={register}
  //                 setValue={set_value}
  //                 getValues={get_values}
  //                 watch={watch}
  //                 reset={reset}
  //               /> */}
  //             </>
  //           )}
  //           {persona?.tipo_persona === 'J' && (
  //             <>
  //               {/* <CrearPersonaJuridica
  //                 numero_documento={persona?.numero_documento}
  //                 tipo_persona={persona.tipo_persona}
  //                 tipo_documento={persona.tipo_documento}
  //                 errors={errors}
  //                 handleSubmit={handle_submit}
  //                 isValid={is_valid}
  //                 register={register}
  //                 setValue={set_value}
  //                 getValues={get_values}
  //                 watch={watch}
  //                 reset={reset}
  //               /> */}
  //             </>
  //           )}
  //         </>
  //       )}
  //     </Grid>
  //   </Box>
  // );

// 