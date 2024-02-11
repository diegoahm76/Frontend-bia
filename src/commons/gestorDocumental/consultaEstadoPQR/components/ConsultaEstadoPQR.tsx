/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useState, useEffect } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { miEstilo } from '../../Encuesta/interfaces/types';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import {
  estado,
  Pqr,
  TipoPQRSDF,
  AsignacionEncuesta,
} from '../interface/types';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  // cargarAsignaciones,
  cargarestado,
  fetchSpqrs,
  fetchTipoSolicitud,
} from '../services/consultainternoPqrsd.service';
import { COLUMS_PQRSDF } from '../utils/columnsPqrsdf';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { LoadingButton } from '@mui/lab';
import { useConsultaEstadoSol } from '../hooks/useConsultaEstadoSol';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export const ConsultaEstadoPQR: React.FC = () => {
  /*  const {
    userinfo: { id_persona },
  } = useSelector((state: AuthSlice) => state.auth);*/

  //* hook importations
  const {
    control_consulta_estado_sol,
    reset_consulta_estado_sol,
    EXE_CONSULTA_ESTADO_SOL,
  } = useConsultaEstadoSol();

  //* ESTADOS NECESARIOS PARA EL FUNCIONAMIENTO DEL COMPONENTE

  const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);
  const [estado, setestado] = useState<estado[]>([]);
  const [tipoPQRSDF, setTipoPQRSDF] = useState<TipoPQRSDF[]>([]);

  // Efecto para cargar los datos del pqrs
  const [pqrss, setpqrs] = useState<Pqr[]>([]);
  useEffect(() => {
    (async () => {
      await fetchSpqrs({ setpqrs });
      await fetchTipoSolicitud({ setTipoPQRSDF });
      await cargarestado({ setestado });
    })();
  }, []);

  //* columns for the data grid in pqrsdf

  const columns = [
    ...COLUMS_PQRSDF,
    {
      field: 'ruta_archivo',
      headerName: 'Archivo',
      width: 200,
      flex: 1,
      renderCell: (params: any) => (
        <Tooltip
          title={
            params.row.URL_Documento === null
              ? 'No hay documento disponible para descargar' // si no hay documento
              : 'Descargar documento' // si hay documento
          }
        >
          <DownloadButton
            condition={params.row.URL_Documento === null}
            fileUrl={params.row.Archivo.ruta_archivo}
            fileName={params?.value?.Id_PQRSDF}
          />
        </Tooltip>
      ),
    },
  ];

  //* columns for the data grid in tramites

  //* columns for the datagrid in otros

  //* columns for the datagrid in OPAS

  return (
    <>
      <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        spacing={2}
        sx={miEstilo}
      >
        <Grid item xs={12} sm={12}>
          <Title title="Consultar estado de una solicitud - usuario interno" />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        spacing={2}
        sx={miEstilo}
      >
        <Grid item xs={12} sm={12}>
          <Title title="Filtro de búsqueda" />
        </Grid>

        {/* filtros para pqrsdf */}

        {/* espacio para los inputs de busqueda */}

        {/* filtros para pqrsdf */}

        {/* el tipo de solicitud va a seguir como una constante, no va a cambiar en ninguna de las vistas */}

        {/* constantes */}

        <form
          onSubmit={(w) => {
            w.preventDefault();
            // handleSubmit();
          }}
          style={{
            marginTop: '2.2rem',
          }}
        >
          {/*<Grid item xs={12} sm={3}>
            <FormControl size="small" fullWidth>
              <InputLabel>Tipos de solicitud</InputLabel>
              <Select
                onChange={(selectedOption) => handleInputChange(selectedOption)}
                value={tipoPQRSDF.find(
                  (option) => option.codigo === formData.tipo_solicitud
                )}
                options={tipoPQRSDF.map((tipo_solicitud) => ({
                  value: tipo_solicitud.codigo,
                  label: tipo_solicitud.descripcion,
                }))}
                name="tipo_solicitud"
              />
            </FormControl>
          </Grid>*/}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              zIndex: 20,
            }}
          >
            <Controller
              //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
              name="tipo_de_solicitud"
              control={control_consulta_estado_sol}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Select
                    required
                    value={value}
                    onChange={(selectedOption) => {
                      //  console.log('')(selectedOption);
                      onChange(selectedOption);
                    }}
                    options={[]}
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
                      Tipo de solicitud
                    </small>
                  </label>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="radicado"
              control={control_consulta_estado_sol}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label="Radicado"
                  type="date"
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="fecha_inicio"
              control={control_consulta_estado_sol}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label="Fecha inicio"
                  type="date"
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="fecha_fin"
              control={control_consulta_estado_sol}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label="Fecha final"
                  type="date"
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
              )}
            />
          </Grid>
          {/* constantes */}

          {/*definir los cuatro componentes para la busqueda (PQRSD), (OTROS), (OPAS) (TRAMITES)*/}

          {control_consulta_estado_sol?._formValues?.tipo_de_solicitud
            ?.label === 'PQRSDF' ||
          !control_consulta_estado_sol?._formValues?.tipo_de_solicitud
            ?.label ? (
            <>
              Opciones de búsqueda pqrsdf
              {/*<BuscadorPqrsdf
                    control_busqueda_panel_ventanilla={control_consulta_estado_sol}
                />*/}
            </>
          ) : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
              ?.label === 'Tramites y servicios' ? (
            <>
              Opciones de búsqueda tramites y servicios
              {/*<BuscadorTramitesYservicios
                    control_busqueda_panel_ventanilla={control_consulta_estado_sol}
                />*/}
            </>
          ) : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
              ?.label === 'Otros' ? (
            <>
              Opciones de búsqueda otros
              {/*<BuscadorOtros
                    control_busqueda_panel_ventanilla={control_consulta_estado_sol}
                />*/}
            </>
          ) : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
              ?.label === 'OPAS' ? (
            <>
              Opciones de búsqueda OPA
              {/*<BuscadorOpas
                    control_busqueda_panel_ventanilla={control_consulta_estado_sol}
                />*/}
            </>
          ) : (
            <>No hay elemento</>
          )}
          {/*<Grid item xs={12} sm={3}>
            <FormControl size="small" fullWidth>
              <InputLabel>PQRS</InputLabel>
              <Select
                onChange={handleInputChange}
                value={formData.pqrs}
                name="pqrs"
                label="PQRS"
              >
                {pqrss.map((pqrs) => (
                  <MenuItem key={pqrs.value} value={pqrs.value}>
                    {pqrs.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl size="small" fullWidth>
              <InputLabel>estado</InputLabel>
              <Select
                label="estado"
                onChange={handleInputChange}
                name="estado"
                value={formData.estado}
              >
                {estado.map((estado) => (
                  <MenuItem
                    key={estado.id_estado_solicitud}
                    value={estado.nombre}
                  >
                    {estado.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>*/}
        </form>

        {/* filtros para pqrsdf */}

        {/* botones de interacción con el usuario */}

        <Grid item>
          <Button
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={() => {
              console.log('limpiando campos');
              // handleResetForm();
            }}
          >
            LIMPIAR CAMPOS
          </Button>
        </Grid>
        <Grid item>
          <LoadingButton
            loading={false}
            type="submit"
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
          >
            BUSCAR ELEMENTO
          </LoadingButton>
        </Grid>
      </Grid>

      {/* listado de opciones, render de datos para cada busqueda */}

      <Grid item xs={12} sm={12}>
        <RenderDataGrid
          title="Resultado de la búsqueda"
          columns={[]} // se debe realizar condicionales para las columnas, ya que por cada busqueda se llaman servicios diferentes
          rows={[]} // en las rows se debe realizar condicionales para las columnas, ya que por cada busqueda se llaman servicios diferentes
        />
      </Grid>
    </>
  );
};
