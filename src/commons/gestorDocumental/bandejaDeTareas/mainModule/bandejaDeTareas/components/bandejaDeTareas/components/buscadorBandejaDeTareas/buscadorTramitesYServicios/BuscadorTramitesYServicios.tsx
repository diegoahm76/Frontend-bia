/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';


export const BuscadorTramitesYservicios = (props: any): JSX.Element => {
  const { controlBusquedaBandejaTareas } = props;

  // ? useState Necesario
  // const [requestStatuses, setRequestStatuses] = useState<any[]>([]);

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
  /* useEffect(() => {
    void getRequestStates().then((res: any) => {
      //  console.log('')(res);
      setRequestStatuses(res);
    });
  }, []);*/

  // ?

  return (
    <>

      <Grid item xs={12} sm={4}>
        <Controller
          name="expediente"
          control={controlBusquedaBandejaTareas}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Expediente"
              size="small"
              variant="outlined"
              value={value}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              inputProps={{ maxLength: 50 }}
            />
          )}
        />
      </Grid>
    </>
  );
};
