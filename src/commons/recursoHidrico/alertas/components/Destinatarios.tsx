/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import SaveIcon from '@mui/icons-material/Save';
import { useContext } from 'react';
import { DataContext } from '../context/contextData';
import { useAlertaHook } from '../utils/useAlertaHook';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { BuscarPersona } from './BuscarPersona';
import { LoadingButton } from '@mui/lab';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Destinatarios: React.FC = () => {
  const colums_persona_alerta: GridColDef[] = [
    {
      field: 'destinatario',
      headerName: 'DESTINATARIO',
      width: 250,
      valueGetter: (params) => params.row.datos_reordenados.destinatario,
    },
    {
      field: 'detalle',
      headerName: 'DETALLE',
      width: 250,
      valueGetter: (params) => params.row.datos_reordenados.detalle,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 250,
      valueGetter: (params) => params.row.datos_reordenados.nombre,
    },
    {
      field: 'principal',
      headerName: 'PRINCIPAL',
      width: 250,
      renderCell: (params) => {
        return params.row.es_responsable_directo === true ? (
          <Chip size="small" label="Si" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'Action',
      headerName: 'ACCIONES',
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                confirmar_eliminar_persona_alerta(
                  params.row.id_persona_alertar
                );
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const {
    // * use form destinatario
    control_destinatario,
    // errors_destinatario,

    // * persona
    on_result,

    // * selected
    perfiles_selected,

    // * unidad organizacional
    unidadesOrganizacionales,

    // watch_destinatario_alertas,
    // watch_destinatario_alertas,

    // limpiar
    limpiar_destinatario,

    confirmar_eliminar_persona_alerta,
    onSubmit_destinatario,
    is_loading_persona,
  } = useAlertaHook();

  const { rows_personas_alertas, is_persona, is_lider, is_perfil, set_mode } =
    useContext(DataContext);

  return (
    <form
      onSubmit={(data) => {
        void onSubmit_destinatario(data);
      }}
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
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
          <Title title="Destinatarios" />
        </Grid>

        <Grid
          container
          item
          // justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                set_mode('lider');
                limpiar_destinatario();
              }}
            >
              A lider de unidad
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                set_mode('perfil');
                limpiar_destinatario();
              }}
            >
              A perfil profesional
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                set_mode('persona');
                limpiar_destinatario();
              }}
            >
              A persona específica
            </Button>
          </Grid>
        </Grid>

        {is_persona ? (
          <>
            <Grid item xs={12}>
              <BuscarPersona
                onResult={(data) => {
                  void on_result(data);
                }}
              />
            </Grid>
          </>
        ) : null}
        {is_lider ? (
          <>
            <Grid item xs={12} sm={5} zIndex={3}>
              <Controller
                name="id_unidad_org_lider"
                control={control_destinatario}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
                    <Select
                      isDisabled={false}
                      value={value}
                      onChange={(selectedOption) => {
                        onChange(selectedOption);
                      }}
                      options={unidadesOrganizacionales}
                      placeholder="Seleccionar"
                    />
                    <label>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem',
                          marginTop: '0.25rem',
                          marginLeft: '0.25rem',
                        }}
                      >
                        Unidad Organizacional
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
          </>
        ) : null}
        {is_perfil ? (
          <>
            <Grid item xs={12} sm={5} zIndex={3}>
              <Controller
                name="perfil_sistema"
                control={control_destinatario}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
                    <Select
                      isDisabled={false}
                      value={value}
                      onChange={(selectedOption) => {
                        onChange(selectedOption);
                      }}
                      options={perfiles_selected as any}
                      placeholder="Seleccionar"
                    />
                    <label>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem',
                          marginTop: '0.25rem',
                          marginLeft: '0.25rem',
                        }}
                      >
                        Perfiles del sistemas
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
          </>
        ) : null}
        {is_lider || is_perfil || is_persona ? (
          <>
            <Grid item xs={12}>
              <Controller
                name="es_responsable_directo"
                control={control_destinatario}
                rules={{ required: false }}
                render={({ field: { onChange, value } }) => (
                  <FormControl component="fieldset" variant="standard">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value}
                          value={value}
                          onChange={onChange}
                        />
                      }
                      label="Responsable directo"
                    />
                  </FormControl>
                )}
              />
            </Grid>
          </>
        ) : null}
        {rows_personas_alertas.length > 0 && (
          <Grid item xs={12}>
            <DataGrid
              autoHeight
              rows={rows_personas_alertas}
              columns={colums_persona_alerta}
              getRowId={(row) => uuidv4()}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Grid>
        )}
        <Grid container item justifyContent="flex-end" spacing={2}>
          <Grid item>
            <LoadingButton
              variant="contained"
              color="success"
              fullWidth
              startIcon={<SaveIcon />}
              type="submit"
              disabled={is_loading_persona}
              loading={is_loading_persona}
            >
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
