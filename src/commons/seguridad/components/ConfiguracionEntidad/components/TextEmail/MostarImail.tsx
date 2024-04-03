/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button } from '@mui/material';
import { api } from '../../../../../../api/axios';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { Title } from '../../../../../../components/Title';
import {
  control_error,
  control_success,
} from '../../../SucursalEntidad/utils/control_error_or_success';
import type { IconfiguracionEntidad } from '../../interfaces/interfacesConEntidad';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEmail: React.FC = () => {
  // Estado inicial de los datos de la sucursal de la empresa
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const initialState: IconfiguracionEntidad = {
    email_corporativo_sistema: '',
    fecha_inicio_dir_actual: '',
    fecha_inicio_coord_alm_actual: '',
    fecha_inicio_respon_trans_actual: '',
    fecha_inicio_coord_viv_actual: '',
    fecha_inicio_almacenista: '',
    id_persona_director_actual: 0,
    id_persona_coord_almacen_actual: 0,
    id_persona_respon_transporte_actual: 0,
    id_persona_coord_viveros_actual: 0,
    id_persona_almacenista: 0,
  };

  // Estado para almacenar los datos de la sucursal de la empresa
  const [dataEntidad, setDataEntidad] = useState<IconfiguracionEntidad>(initialState);

  // Estado para almacenar el valor del campo de email
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [emailValue, setEmailValue] = useState<string>('');

  // Estado para almacenar el valor del campo de confirmación de email
  const [confirmEmailValue, setConfirmEmailValue] = useState<string>('');

  // Estado para controlar si los correos coinciden o están vacíos
  const [emailMismatch, setEmailMismatch] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // Estado para habilitar/deshabilitar edición

  // Función para obtener los datos de la sucursal de la empresa mediante una solicitud a la API
  const fetchDataGet = async (): Promise<void> => {
    try {
      const url = '/transversal/configuracion/configuracionEntidad/3/';
      const res = await api.get(url);
  
      if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        const facilidad_pago_data = res.data.data;
        setDataEntidad(facilidad_pago_data[0]);
      } else {
        // Tratar el caso en el que los datos no son válidos o están vacíos
        // Por ejemplo, mostrar un mensaje de error o realizar otra acción apropiada.
        console.error('Los datos no son válidos o están vacíos.');
      }
    } catch (error:any) {
      control_error(error.detail);
    }
  };
  


  const handleChangeEmail = (): void => {
    // Expresión regular para validar el formato del correo electrónico
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      emailValue === confirmEmailValue &&
      emailValue !== '' &&
      emailRegex.test(emailValue)
    ) {
      // Los correos coinciden, no están vacíos y el formato es válido, se realiza el PUT
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const updatedDataEntidad: IconfiguracionEntidad = {
        ...dataEntidad,
        email_corporativo_sistema: emailValue,
      };

      const payload = {
        ...updatedDataEntidad,
      };

      api
        .put(
          'transversal/configuracion/configuracionEntidad/update/3/',
          payload
        )
        .then((response) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const updatedEmail = response.data.email_corporativo_sistema;
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const updatedDataEntidadWithUpdatedEmail: IconfiguracionEntidad = {
            ...updatedDataEntidad,
            email_corporativo_sistema: updatedEmail,
          };
          setDataEntidad(updatedDataEntidadWithUpdatedEmail);
          control_success('Email corporativo actualizado correctamente');
          setConfirmEmailValue('');
          setEmailValue('');
        })
        .catch((error: any) => {
          // console.error("Error al actualizar los datos:", error);
          control_error(error.response.data.detail);
        });
    } else {
      // Los correos no coinciden, están vacíos o el formato no es válido
      setEmailMismatch(true);
    }
    fetchDataGet();
  };

  const { email_corporativo_sistema } = dataEntidad;
  const emailactaul = email_corporativo_sistema;

  useEffect(() => {
    fetchDataGet().catch((error) => {
      console.error(error);
    });
  }, []);

 
  return (
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
      <Grid item md={12} xs={12}>
        <Title title="Editar Correo" />
        <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
          <Grid item container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                variant="outlined"
                size="small"
                label="Email Actual"
                fullWidth
                value={emailactaul}
                disabled
              />
            </Grid>
            {isEditMode && (
              <>
                <Grid item xs={12} sm={6} lg={3}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    fullWidth
                    value={emailValue}
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      setEmailMismatch(false);
                    }}
                    error={emailMismatch}
                    helperText={
                      emailMismatch
                        ? 'Los correos no coinciden o son inválidos'
                        : ''
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Confirmar Email"
                    fullWidth
                    value={confirmEmailValue}
                    onChange={(e) => {
                      setConfirmEmailValue(e.target.value);
                      setEmailMismatch(false);
                    }}
                    error={emailMismatch}
                    helperText={
                      emailMismatch
                        ? 'Los correos no coinciden o son inválidos'
                        : ''
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={2}>
                  <Button
                    style={{ margin: 3 }}
                    type="submit"
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                    onClick={
                      handleChangeEmail
                    }
                  >
                    Guardar
                  </Button>
                </Grid>
              </>
            )}
            {!isEditMode && (
              <Grid item xs={12} sm={6} lg={2}>
                <Button
                  style={{ margin: 3 }}
                  startIcon={<EditIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsEditMode(true);
                  }} // Habilitar el modo edición al presionar el botón
                >
                  Editar
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
