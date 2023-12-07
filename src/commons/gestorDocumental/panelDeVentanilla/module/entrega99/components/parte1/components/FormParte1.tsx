/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useSstepperFn } from '../../stepper/functions/useSstepperFn';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { SolicitudAlUsuarioContext } from '../../../context/SolicitudUsarioContext';
import { formatDate } from '../../../../../../../../utils/functions/formatDate';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { columnsGridHistorico } from '../utils/columnsGridHistorico';
import { rowsGridHistorico } from '../utils/rowsEjemplo';

export const FormParte1 = (): JSX.Element => {
  // ? stepper hook
  const { handleNext } = useSstepperFn();

  //* context declaration
  const { infoInicialUsuario } = useContext(SolicitudAlUsuarioContext);
  const { secondLoading } = useContext(ModalAndLoadingContext);



  if (secondLoading) {
    return (
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '2rem',
          mt: '1.2rem',
          mb: '1.2rem',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Loader altura={280} />
      </Grid>
    );
  }

  return (
    <form
      style={{
        marginTop: '3rem',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          mb: '2rem',
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            size="small"
            label="Tipo de PQRSDF"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              maxLength: 50,
            }}
            value={infoInicialUsuario?.detallePQRSDF?.data?.tipo ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            size="small"
            label="Estado"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              maxLength: 10,
            }}
            value={
              infoInicialUsuario?.detallePQRSDF?.data?.estado_actual ?? 'N/A'
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Número de radicado de entrada"
            disabled
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={infoInicialUsuario?.detallePQRSDF?.data?.radicado ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Fecha de radicado de entrada"
            variant="outlined"
            disabled
            InputLabelProps={{ shrink: true }}
            value={
              formatDate(
                infoInicialUsuario?.detallePQRSDF?.data?.fecha_radicado_entrada
              ) ?? 'N/A'
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            multiline
            sx={{
              textAlign: 'center',
            }}
            rows={2}
            size="small"
            label="Asunto de la PQRSDF"
            variant="outlined"
            disabled
            InputLabelProps={{ shrink: true }}
            value={infoInicialUsuario?.detallePQRSDF?.data?.asunto ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            multiline
            sx={{
              textAlign: 'center',
              mt: '1.5rem',
              mb: '1.5rem',
            }}
            rows={5}
            size="small"
            label="Descripción de la PQRSDF"
            variant="outlined"
            disabled
            InputLabelProps={{ shrink: true }}
            value={
              infoInicialUsuario?.detallePQRSDF?.data?.descripcion ?? 'N/A'
            }
          />
        </Grid>

        {/* tabla de elementos a mostrar */}

        {/* estos datos a mostrar van a ser los históricos de las solicitudes y requerimientos que se han realizado */}
        <RenderDataGrid
          title="Tabla de elementos a mostrar"
          columns={columnsGridHistorico ?? []}
          rows={rowsGridHistorico ?? []}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        sx={{
          width: '100%',
          maxWidth: '100%',
          mt: '2rem',
          textAlign: 'center',
          paddingBottom: '2rem',
        }}
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveAsIcon />}
          onClick={() => {
            //* hacer validaciones previas antes de permitir el next, para el paso 2

            handleNext();
          }}
          sx={{
            width: '60%',
          }}
        >
          Crear solicitud
        </Button>
      </Grid>
    </form>
  );
};
