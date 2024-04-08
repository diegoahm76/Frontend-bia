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
  cargarAsignaciones,
  fetchTipoSolicitud,
} from '../services/PQRSDF/consultainternoPqrsd.service';
import { COLUMS_PQRSDF } from '../utils/columnsPqrsdf';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { LoadingButton } from '@mui/lab';
import { useConsultaEstadoSol } from '../hooks/useConsultaEstadoSol';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { BuscadorPqrsdf } from '../components/buscadoresSolicitudes/BuscadorPqrsdf';
import { control_success } from '../../../../helpers';
import { BuscadorOtros } from '../components/buscadoresSolicitudes/BuscadorOtros';
import { cargarAsignacionesOtros } from '../services/otros/consultaInternoOtros.service';
import { columnsOtros } from '../utils/columnsOtros';
import { BuscadorTramites } from '../components/buscadoresSolicitudes/BuscadorTramites';
import { getTramitesConsulta } from '../services/consultaTramites/getConsultaTramites.service';
import { columnsTramites } from '../utils/columnsTramites';
import { BuscadorOpas } from '../components/buscadoresSolicitudes/BuscadorOpas';
import { getOpasConsulta } from '../services/opas/getRequestElementsOpas.service';
import { columnsConsultaOpas } from '../utils/columnsOpas';

export const ConsultaEstadoSolicitudesScreen: React.FC = () => {
  //* hook importations
  const {
    control_consulta_estado_sol,
    reset_consulta_estado_sol,
    EXE_CONSULTA_ESTADO_SOL,
  } = useConsultaEstadoSol();

  //* ESTADOS NECESARIOS PARA EL FUNCIONAMIENTO DEL COMPONENTE

  const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);
  const [tipoPQRSDF, setTipoPQRSDF] = useState<TipoPQRSDF[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchTipoSolicitud({ setTipoPQRSDF });
    })();
  }, []);

  //* columns for the data grid in pqrsdf

  const columns = [
    ...COLUMS_PQRSDF,
    {
      field: 'ruta_archivo',
      headerName: 'Archivo',
      minWidth: 200,
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

  const columnsTramitesServicios = [
    ...columnsTramites,
    {
      field: 'documento',
      headerName: 'Archivo',
      minWidth: 200,
      renderCell: (params: any) => (
        <Tooltip
          title={
            params.row.documento === null
              ? 'No hay documento disponible para descargar' // si no hay documento
              : 'Descargar documento' // si hay documento
          }
        >
          <DownloadButton
            condition={params.row.documento === null}
            fileUrl={params.row.documento}
            fileName={params?.value?.Id_PQRSDF}
          />
        </Tooltip>
      ),
    },
    {
      field: 'tiempo_respuesta',
      headerName: 'Tiempo de respuesta',
      minWidth: 270,
      renderCell: (params: any) =>
        params.value < 0
          ? 'Tiempo de respuesta vencido'
          : `${params.value} días`,
    },
  ];

  //* columns for the data grid in tramites

  //* columns for the datagrid in otros

  //* columns for the datagrid in OPAS

  const handleSubmit = async () => {
    switch (
      control_consulta_estado_sol?._formValues?.tipo_de_solicitud?.label
    ) {
      case 'PQRSDF':
        await cargarAsignaciones(setAsignaciones, setLoading, {
          pqrs:
            control_consulta_estado_sol?._formValues?.tipo_pqrsdf?.label?.[0]?.toUpperCase() ??
            '',
          radicado: control_consulta_estado_sol?._formValues?.radicado ?? '',
          fecha_inicio:
            control_consulta_estado_sol?._formValues?.fecha_inicio ?? '',
          fecha_fin: control_consulta_estado_sol?._formValues?.fecha_fin ?? '',
          estado: control_consulta_estado_sol?._formValues?.estado?.label ?? '',
        });
        break;
      case 'Tramites y servicios':
        await getTramitesConsulta(setAsignaciones, setLoading, {
          radicado: control_consulta_estado_sol?._formValues?.radicado ?? '',
          fecha_inicio:
            control_consulta_estado_sol?._formValues?.fecha_inicio ?? '',
          fecha_fin: control_consulta_estado_sol?._formValues?.fecha_fin ?? '',
          estado_actual_solicitud:
            control_consulta_estado_sol?._formValues?.estado?.label ?? '',
        });
        break;
      case 'Otros':
        await cargarAsignacionesOtros(setAsignaciones, setLoading, {
          radicado: control_consulta_estado_sol?._formValues?.radicado ?? '',
          fecha_inicio:
            control_consulta_estado_sol?._formValues?.fecha_inicio ?? '',
          fecha_fin: control_consulta_estado_sol?._formValues?.fecha_fin ?? '',
          estado: control_consulta_estado_sol?._formValues?.estado?.label ?? '',
        });
        break;
      case 'OPAS':
        await getOpasConsulta(setAsignaciones, setLoading, {
          radicado: control_consulta_estado_sol?._formValues?.radicado ?? '',
          fecha_inicio:
            control_consulta_estado_sol?._formValues?.fecha_inicio ?? '',
          fecha_fin: control_consulta_estado_sol?._formValues?.fecha_fin ?? '',
          estado: control_consulta_estado_sol?._formValues?.estado?.label ?? '',
        });
        break;
      default:
        console.log('No hay elemento');
        break;
    }
  };

  return (
    <>
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
        <Grid item xs={12}>
          <Title title="Consulta del estado de una solicitud - usuario interno" />
        </Grid>
      </Grid>

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
        <Grid item xs={12}>
          <Title title="Buscar elemento" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{
              marginTop: '2.2rem',
            }}
          >
            <Grid container spacing={2}>
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
                          onChange(selectedOption);
                          setAsignaciones([]);
                        }}
                        options={
                          tipoPQRSDF.length > 0
                            ? tipoPQRSDF.map((item) => {
                                return {
                                  value: item?.descripcion,
                                  label: item.descripcion,
                                };
                              })
                            : []
                        }
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
                      type="text"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={onChange}
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
                      onChange={onChange}
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
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              {control_consulta_estado_sol?._formValues?.tipo_de_solicitud
                ?.label === 'PQRSDF' ||
              !control_consulta_estado_sol?._formValues?.tipo_de_solicitud
                ?.label ? (
                <BuscadorPqrsdf
                  control_consulta_estado_sol={control_consulta_estado_sol}
                />
              ) : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
                  ?.label === 'Tramites y servicios' ? (
                <BuscadorTramites
                  control_consulta_estado_sol={control_consulta_estado_sol}
                />
              ) : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
                  ?.label === 'Otros' ? (
                <BuscadorOtros
                  control_consulta_estado_sol={control_consulta_estado_sol}
                />
              ) : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
                  ?.label === 'OPAS' ? (
                <BuscadorOpas
                  control_consulta_estado_sol={control_consulta_estado_sol}
                />
              ) : (
                <>No hay elemento</>
              )}
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={() => {
                    reset_consulta_estado_sol(
                      {
                        tipo_de_solicitud: '',
                        tipo_pqrsdf: '',
                        radicado: '',
                        fecha_inicio: '',
                        fecha_fin: '',
                        estado_pqrsdf: '',
                        estado: '',
                        estado_solicitud: '',
                        estado_actual_solicitud: '',
                      },
                      {
                        keepValues: false,
                        keepDefaultValues: false,
                      }
                    );
                    setAsignaciones([]);
                    control_success('Se han limpiado los campos');
                  }}
                >
                  LIMPIAR CAMPOS
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  loading={loading}
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
          </form>
        </Grid>
      </Grid>
      {asignaciones?.length > 0 && (
        <RenderDataGrid
          title="Resultado de la búsqueda"
          columns={
            control_consulta_estado_sol?._formValues?.tipo_de_solicitud
              ?.label === 'PQRSDF'
              ? columns
              : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
                  ?.label === 'Tramites y servicios'
              ? columnsTramitesServicios
              : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
                  ?.label === 'Otros'
              ? columnsOtros
              : control_consulta_estado_sol?._formValues?.tipo_de_solicitud
                  ?.label === 'OPAS'
              ? columnsConsultaOpas
              : []
          } // se debe realizar condicionales para las columnas, ya que por cada busqueda se llaman servicios diferentes
          rows={asignaciones ?? []}
        />
      )}
    </>
  );
};



