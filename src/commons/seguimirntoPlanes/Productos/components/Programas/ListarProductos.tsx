/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Button, Grid } from '@mui/material';
import { useAppDispatch } from '../../../../../hooks';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarProductos: React.FC = () => {
  //  console.log('')('id_proyecto', id_proyecto);

  const dispatch = useAppDispatch();

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
        justifyContent="flex-end"
      >
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            disabled={false}
            onClick={() => {
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: true,
                  editar: false,
                })
              );
            }}
          >
            Agregar producto
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
