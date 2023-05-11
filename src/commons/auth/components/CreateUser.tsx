import { Grid, TextField } from '@mui/material';
import type { PropsRegister } from '../../../interfaces/globalModels';
import { Title } from '../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CreateUser: React.FC<PropsRegister> = ({
  register,
  handleSubmit,
}: PropsRegister) => {
  const on_submit = handleSubmit((e) => {
    console.log('Enviando datos al server');
  });
  return (
    <form
      onSubmit={(e) => {
        void on_submit(e);
      }}
    >
      <Grid container spacing={2} px={2}>
        <Grid item xs={12}>
          <Title title="Datos persona natural" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Primer nombre"
            disabled
            {...register('primer_nombre')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Segundo nombre"
            disabled
            {...register('segundo_nombre')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Primer apellido"
            disabled
            {...register('primer_apellido')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Segundo apellido"
            disabled
            {...register('segundo_apellido')}
          />
        </Grid>
        <Grid item xs={12}>
          <Title title="Datos de acceso" />
        </Grid>
      </Grid>
    </form>
  );
};
