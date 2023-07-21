/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';
import { use_register_laboratorio_hook } from './hook/useRegisterLaboratorioHook';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { columns_result_lab } from './utils/colums/comlums';
import {
  parametro,
  tipo_parametro_choices,
  unidad_medida_choices,
} from './utils/choices/choices';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
import { useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { tipo_agua } from '../RegistroInstrumentos/choices/choices';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarLaboratorio: React.FC = () => {
  const colums_resultado: GridColDef[] = [
    ...columns_result_lab,
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          {/* <IconButton
                  onClick={() => {
                    set_id_seccion(params.row.id_seccion);
                    set_info_seccion(params.row);
                  }}
                >
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      background: '#fff',
                      border: '2px solid',
                    }}
                    variant="rounded"
                  >
                    <ChecklistIcon
                      titleAccess="Seleccionar Sección"
                      sx={{
                        color: 'primary.main',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                  </Avatar>
                </IconButton> */}
        </>
      ),
    },
  ];

  const {
    // watch_instrumento,
    reset_instrumento,
    control,
  } = useRegisterInstrumentoHook();

  const { instrumentos } = useAppSelector((state) => state.instrumentos_slice);

  useEffect(() => {
    reset_instrumento({
      nombre: instrumentos.nombre,
      nombre_seccion: instrumentos.nombre_seccion,
      nombre_subseccion: instrumentos.nombre_subseccion,
      cod_tipo_agua: instrumentos.cod_tipo_agua,
    });
  }, [instrumentos]);

  const {
    tipo_parametro_value,
    unidad_medida_value,
    parametro_value,
    rows_laboratorio,
    fecha_toma_muestra,
    fecha_analisis,
    fecha_envio,
    fecha_resultado,
    metodo,
    resultado,
    set_metodo,
    set_resultado,
    handle_date_change,
    handle_change_inputs,
    handle_agregar,
  } = use_register_laboratorio_hook();

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
      >
        <Grid item xs={12}>
          <Title title=" REGISTRO DE LABORATORIO " />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Datos Generales
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sección"
            fullWidth
            size="small"
            margin="dense"
            value={instrumentos.nombre_seccion}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Subsección"
            fullWidth
            value={instrumentos.nombre_subseccion}
            size="small"
            margin="dense"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre"
            control={control}
            defaultValue=""
            // rules={{ required: false }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="dense"
                fullWidth
                label="Instrumento Asociado"
                size="small"
                variant="outlined"
                disabled={true}
                value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  onChange(e.target.value);
                  console.log(e.target.value);
                }}
                error={!!error}
                /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de toma de muestra"
              value={fecha_toma_muestra}
              onChange={(value) => {
                handle_date_change('fecha_toma_muestra', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Lugar de la muestra"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="cod_tipo_agua"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tipo de agua"
                select
                size="small"
                margin="dense"
                disabled={true}
                fullWidth
                required
              >
                {tipo_agua.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Enviado a laboratorio el día"
              value={fecha_envio}
              onChange={(value) => {
                handle_date_change('fecha_envio', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="resultados de laboratorio"
              value={fecha_resultado}
              onChange={(value) => {
                handle_date_change('fecha_resultado', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Coordenadas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Latitud"
            size="small"
            fullWidth
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Longitud"
            size="small"
            fullWidth
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción"
            fullWidth
            multiline
            size="small"
            margin="dense"
            disabled={false}
            rows={2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Cuenca / Pozo:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Cuenca / Pozo"
            size="small"
            margin="dense"
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="primary">
            Buscar
          </Button>
        </Grid>
      </Grid>
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
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Registro de medición
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Tipo parámetro "
            select
            fullWidth
            size="small"
            value={tipo_parametro_value}
            margin="dense"
            disabled={false}
            name="tipo_parametro"
            onChange={handle_change_inputs}
          >
            {tipo_parametro_choices.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Parámetro "
            select
            fullWidth
            size="small"
            value={parametro_value}
            margin="dense"
            disabled={false}
            name="parametro"
            onChange={handle_change_inputs}
          >
            {parametro.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="unidad de medida"
            select
            fullWidth
            size="small"
            margin="dense"
            value={unidad_medida_value}
            disabled={false}
            name="unidad_medida"
            onChange={handle_change_inputs}
          >
            {unidad_medida_choices.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Método de análisis"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
            value={metodo}
            onChange={(e) => {
              set_metodo(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de análisis"
              value={fecha_analisis}
              onChange={(value) => {
                handle_date_change('fecha_analisis', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Resultado"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
            value={resultado}
            onChange={(e) => {
              set_resultado(e.target.value);
            }}
          />
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: '10px' }}
          >
            <Button variant="outlined" color="primary" onClick={handle_agregar}>
              Agregar
            </Button>
          </Stack>
        </Box>
        {rows_laboratorio.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Datos Aforo:
              </Typography>
              <Divider />
              <DataGrid
                autoHeight
                rows={rows_laboratorio}
                columns={colums_resultado}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
        <AgregarArchivo multiple={false} />
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <ButtonSalir />
          </Grid>
          <Grid item>
            <LoadingButton variant="contained" color="success" type="submit">
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
