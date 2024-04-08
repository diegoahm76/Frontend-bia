/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Box,
  ButtonGroup,
  Chip,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { DataContextConsularPlanes } from '../../context/context';

// ACORDEON
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Controller, useForm } from 'react-hook-form';
import React from 'react';
import { containerStyles } from '../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Loader } from '../../../../../utils/Loader/Loader';
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
import { Objetivo, EjesEstractegico, Programa } from '../../types/types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPlanes: React.FC = () => {
  const columns_planes: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'sigla_plan',
      headerName: 'SIGLA PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'tipo_plan',
      headerName: 'TIPO DE PLAN',
      sortable: true,
      width: 200,
    },
    {
      field: 'agno_inicio',
      headerName: 'AÑO INICIO',
      sortable: true,
      width: 150,
    },
    {
      field: 'agno_fin',
      headerName: 'AÑO FIN',
      sortable: true,
      width: 150,
    },

    {
      field: 'activo',
      headerName: 'VIGENCIA',
      sortable: true,
      width: 200,
      renderCell: (params) => {
        return params.row.estado_vigencia === true ? (
          <Chip
            size="small"
            label="vigente"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="No vigente"
            color="error"
            variant="outlined"
          />
        );
      },
    },
  ];

  const columns_obejtivos: GridColDef[] = [
    {
      field: 'nombre_objetivo',
      headerName: 'NOMBRE OBJETIVO',
      sortable: true,
      width: 400,
    },
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 400,
    },
  ];

  const colums_ejes: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_tipo_eje',
      headerName: 'NOMBRE TIPO EJE',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE EJE',
      sortable: true,
      width: 350,
    },
  ];

  const colums_programas: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      width: 350,
    },
    {
      field: 'porcentaje_1',
      headerName: 'AÑO 1',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_2',
      headerName: 'AÑO 2',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_3',
      headerName: 'AÑO 3',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_4',
      headerName: 'AÑO 4',
      sortable: true,
      width: 100,
    },
  ];

  const columns_proyectos: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE PROYECTO',
      sortable: true,
      width: 350,
    },
    {
      field: 'pondera_1',
      headerName: 'AÑO 1',
      sortable: true,
      width: 100,
    },
    {
      field: 'pondera_2',
      headerName: 'AÑO 2',
      sortable: true,
      width: 100,
    },
    {
      field: 'pondera_3',
      headerName: 'AÑO 3',
      sortable: true,
      width: 100,
    },
    {
      field: 'pondera_4',
      headerName: 'AÑO 4',
      sortable: true,
      width: 100,
    },
  ];

  const colums_actividades: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE PROYECTO',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_producto',
      headerName: 'NOMBRE PRODUCTO',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_actividad',
      headerName: 'NOMBRE ACTIVIDAD',
      sortable: true,
      width: 350,
    },
    {
      field: 'numero_actividad',
      headerName: 'NUMERO ACTIVIDAD',
      sortable: true,
      width: 100,
    },
  ];

  const columns_productos: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE PROYECTO',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_producto',
      headerName: 'NOMBRE PRODUCTO',
      sortable: true,
      width: 350,
    },
    {
      field: 'numero_producto',
      headerName: 'NUMERO PRODUCTO',
      sortable: true,
      width: 100,
    },
  ];

  const colums_indicadores: GridColDef[] = [
    // {
    //   field: 'nombre_plan',
    //   headerName: 'NOMBRE PLAN',
    //   sortable: true,
    //   width: 350,
    // },
    // {
    //   field: 'nombre_programa',
    //   headerName: 'NOMBRE PROGRAMA',
    //   sortable: true,
    //   width: 350,
    // },
    // {
    //   field: 'nombre_proyecto',
    //   headerName: 'NOMBRE PROYECTO',
    //   sortable: true,
    //   width: 350,
    // },
    // {
    //   field: 'nombre_producto',
    //   headerName: 'NOMBRE PRODUCTO',
    //   sortable: true,
    //   width: 350,
    // },
    // {
    //   field: 'nombre_actividad',
    //   headerName: 'NOMBRE ACTIVIDAD',
    //   sortable: true,
    //   width: 350,
    // },
    {
      field: 'nombre_indicador',
      headerName: 'NUMERO INDICADOR',
      sortable: true,
      width: 350,
    },
    {
      field: 'linea_base',
      headerName: 'LINEA BASE',
      sortable: true,
      width: 100,
    },
    {
      field: 'medida',
      headerName: 'MEDIDA',
      sortable: true,
      width: 100,
    },
    {
      field: 'tipo_indicador',
      headerName: 'TIPO INDICADOR',
      sortable: true,
      width: 100,
    },
    {
      field: 'nombre_tipo',
      headerName: 'NOMBRE TIPO',
      sortable: true,
      width: 100,
    },
    {
      field: 'nombre_medicion',
      headerName: 'NOMBRE MEDICION',
      sortable: true,
      width: 100,
    },
    // {
    //   field: 'metas',
    //   headerName: 'METAS',
    //   sortable: true,
    //   width: 100,
    // },
  ];

  const columns_metas: GridColDef[] = [
    {
      field: 'nombre_indicador',
      headerName: 'NOMBRE INDICADOR',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_meta',
      headerName: 'NOMBRE META',
      sortable: true,
      width: 350,
    },
    {
      field: 'porcentaje_meta',
      headerName: 'PORCENTAJE META',
      sortable: true,
      width: 100,
    },
    {
      field: 'valor_meta',
      headerName: 'VALOR META',
      sortable: true,
      width: 200,
    },
    {
      field: 'agno_1',
      headerName: 'AÑO 1',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_2',
      headerName: 'AÑO 2',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_3',
      headerName: 'AÑO 3',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_4',
      headerName: 'AÑO 4',
      sortable: true,
      width: 100,
    },
    {
      field: 'valor_ejecutado_compromiso',
      headerName: 'VALOR EJECUTADO COMPROMISO',
      sortable: true,
      width: 200,
    },
    {
      field: 'valor_ejecutado_obligado',
      headerName: 'VALOR EJECUTADO OBLIGADO',
      sortable: true,
      width: 200,
    },
    {
      field: 'avance_fisico',
      headerName: 'AVANCE FISICO',
      sortable: true,
      width: 200,
    },
    {
      field: 'cumplio',
      headerName: 'CUMPLIO',
      sortable: true,
      width: 200,
      renderCell: (params) => {
        return params.row.cumplio === true ? (
          <Chip size="small" label="Si" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
  ];

  const colums_all: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'sigla_plan',
      headerName: 'SIGLA PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'tipo_plan',
      headerName: 'TIPO DE PLAN',
      sortable: true,
      width: 200,
    },
    {
      field: 'agno_inicio',
      headerName: 'AÑO INICIO',
      sortable: true,
      width: 150,
    },
    {
      field: 'agno_fin',
      headerName: 'AÑO FIN',
      sortable: true,
      width: 150,
    },
    {
      field: 'activo',
      headerName: 'VIGENCIA',
      sortable: true,
      width: 200,
      renderCell: (params) => {
        return params.row.estado_vigencia === true ? (
          <Chip
            size="small"
            label="vigente"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="No vigente"
            color="error"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'nombre_objetivo',
      headerName: 'NOMBRE OBJETIVO',
      sortable: true,
      width: 400,
    },
    {
      field: 'nombre_tipo_eje',
      headerName: 'NOMBRE TIPO EJE',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE EJE',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      width: 350,
    },
    {
      field: 'porcentaje_1',
      headerName: 'AÑO 1',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_2',
      headerName: 'AÑO 2',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_3',
      headerName: 'AÑO 3',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_4',
      headerName: 'AÑO 4',
      sortable: true,
      width: 100,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE PROYECTO',
      sortable: true,
      width: 350,
    },
    {
      field: 'pondera_1',
      headerName: 'AÑO 1',
      sortable: true,
      width: 100,
    },
    {
      field: 'pondera_2',
      headerName: 'AÑO 2',
      sortable: true,
      width: 100,
    },
    {
      field: 'pondera_3',
      headerName: 'AÑO 3',
      sortable: true,
      width: 100,
    },
    {
      field: 'pondera_4',
      headerName: 'AÑO 4',
      sortable: true,
      width: 100,
    },
    {
      field: 'nombre_producto',
      headerName: 'NOMBRE PRODUCTO',
      sortable: true,
      width: 350,
    },
    {
      field: 'numero_producto',
      headerName: 'NUMERO PRODUCTO',
      sortable: true,
      width: 100,
    },
    {
      field: 'nombre_actividad',
      headerName: 'NOMBRE ACTIVIDAD',
      sortable: true,
      width: 350,
    },
    {
      field: 'numero_actividad',
      headerName: 'NUMERO ACTIVIDAD',
      sortable: true,
      width: 100,
    },
    // indicadores
    {
      field: 'nombre_indicador',
      headerName: 'NUMERO INDICADOR',
      sortable: true,
      width: 350,
    },
    {
      field: 'linea_base',
      headerName: 'LINEA BASE',
      sortable: true,
      width: 100,
    },
    {
      field: 'medida',
      headerName: 'MEDIDA',
      sortable: true,
      width: 100,
    },
    {
      field: 'tipo_indicador',
      headerName: 'TIPO INDICADOR',
      sortable: true,
      width: 100,
    },
    {
      field: 'nombre_tipo',
      headerName: 'NOMBRE TIPO',
      sortable: true,
      width: 100,
    },
    {
      field: 'nombre_medicion',
      headerName: 'NOMBRE MEDICION',
      sortable: true,
      width: 100,
    },
    // {
    //   field: 'metas',
    //   headerName: 'METAS',
    //   sortable: true,
    //   width: 100,
    // },
    // metas
    {
      field: 'nombre_meta',
      headerName: 'NOMBRE META',
      sortable: true,
      width: 350,
    },
    {
      field: 'porcentaje_meta',
      headerName: 'PORCENTAJE META',
      sortable: true,
      width: 100,
    },
    {
      field: 'valor_meta',
      headerName: 'VALOR META',
      sortable: true,
      width: 200,
    },
    {
      field: 'agno_1',
      headerName: 'AÑO 1',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_2',
      headerName: 'AÑO 2',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_3',
      headerName: 'AÑO 3',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_4',
      headerName: 'AÑO 4',
      sortable: true,
      width: 100,
    },
    {
      field: 'valor_ejecutado_compromiso',
      headerName: 'VALOR EJECUTADO COMPROMISO',
      sortable: true,
      width: 200,
    },
    {
      field: 'valor_ejecutado_obligado',
      headerName: 'VALOR EJECUTADO OBLIGADO',
      sortable: true,
      width: 200,
    },
    {
      field: 'avance_fisico',
      headerName: 'AVANCE FISICO',
      sortable: true,
      width: 200,
    },
    {
      field: 'cumplio',
      headerName: 'CUMPLIO',
      sortable: true,
      width: 200,
      renderCell: (params) => {
        return params.row.cumplio === true ? (
          <Chip size="small" label="Si" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
  ];

  // use form
  const {
    control: control_consulta,
    formState: { errors: errors_consulta },
  } = useForm<any>({
    defaultValues: {
      id_plan: '',
    },
  });

  const {
    id_plan,
    planes_selected,
    rows_planes,
    set_id_plan,
    fetch_data_planes,
    fetch_data_planes_selected,
  } = useContext(DataContextConsularPlanes);

  useEffect(() => {
    console.log('useEffect');
    void fetch_data_planes_selected();
  }, []);

  useEffect(() => {
    console.log('useEffect');
    if (id_plan) {
      void fetch_data_planes();
    }
  }, [id_plan]);

  // rows para colums all

  let rows_all: {
    id_plan: number | null;
    objetivos: Objetivo[];
    ejes_estractegicos: EjesEstractegico[];
    programas: Programa[];
    nombre_plan: string;
    sigla_plan: string;
    tipo_plan: string;
    agno_inicio: number | null;
    agno_fin: number | null;
    estado_vigencia: boolean;
  }[] = []; // Inicializa rows_all como un array vacío

  rows_all = rows_planes.flatMap((plan) => {
    const rows = [];

    // Rows for columns_planes
    rows.push({
      ...plan,
      // Add any additional properties based on columns_planes
    });

    // Rows for columns_obejtivos
    if (plan.objetivos) {
      plan.objetivos.forEach((objetivo) => {
        rows.push({
          ...objetivo,
          // nombre_plan: plan.nombre_plan,
          // Add any additional properties based on columns_obejtivos
        });
      });
    }

    // Rows for colums_ejes
    if (plan.ejes_estractegicos) {
      plan.ejes_estractegicos.forEach((eje) => {
        rows.push({
          ...eje,
          // nombre_plan: plan.nombre_plan,

          // Add any additional properties based on colums_ejes
        });
      });
    }

    // Rows for colums_programas
    if (plan.programas) {
      plan.programas.forEach((programa) => {
        rows.push({
          ...programa,
          // nombre_plan: plan.nombre_plan,
          // Add any additional properties based on colums_programas
        });

        // Rows for columns_proyectos
        if (programa.proyectos) {
          programa.proyectos.forEach((proyecto) => {
            rows.push({
              ...proyecto,
              // nombre_programa: programa.nombre_programa,
              // nombre_plan: plan.nombre_plan,
              // Add any additional properties based on columns_proyectos
            });

            // Rows for columns_productos
            if (proyecto.productos) {
              proyecto.productos.forEach((producto) => {
                rows.push({
                  ...producto,
                  // nombre_proyecto: proyecto.nombre_proyecto,
                  // nombre_programa: programa.nombre_programa,
                  // nombre_plan: plan.nombre_plan,
                  // Add any additional properties based on columns_productos
                });

                // Rows for colums_actividades
                if (producto.actividades) {
                  producto.actividades.forEach((actividad) => {
                    rows.push({
                      ...actividad,
                      // nombre_producto: producto.nombre_producto,
                      // nombre_proyecto: proyecto.nombre_proyecto,
                      // nombre_programa: programa.nombre_programa,
                      // nombre_plan: plan.nombre_plan,
                      // Add any additional properties based on colums_actividades
                    });

                    // Rows for colums_indicadores
                    if (actividad.indicadores) {
                      actividad.indicadores.forEach((indicador) => {
                        rows.push({
                          ...indicador,
                          // nombre_actividad: actividad.nombre_actividad,
                          // nombre_producto: producto.nombre_producto,
                          // nombre_proyecto: proyecto.nombre_proyecto,
                          // nombre_programa: programa.nombre_programa,
                          // nombre_plan: plan.nombre_plan,
                          // Add any additional properties based on colums_indicadores
                        });

                        // Rows for colums_metas
                        if (indicador.metas) {
                          indicador.metas.forEach((meta) => {
                            rows.push({
                              ...meta,
                              // nombre_indicador: indicador.nombre_indicador,
                              // nombre_actividad: actividad.nombre_actividad,
                              // nombre_producto: producto.nombre_producto,
                              // nombre_proyecto: proyecto.nombre_proyecto,
                              // nombre_programa: programa.nombre_programa,
                              // nombre_plan: plan.nombre_plan,
                              // Add any additional properties based on colums_metas
                            });
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }

    console.log(rows_all, 'rows_all');

    return rows;
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          ...containerStyles,
          mt: '2.5rem',
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12}>
          <Title title="Consulta de planes " />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_programa"
            control={control_consulta}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione un plan"
                size="small"
                margin="dense"
                disabled={false}
                fullWidth
                required
                onChange={(event) => {
                  field.onChange(event);
                  set_id_plan(Number(event.target.value));
                }}
              >
                {planes_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>{' '}
        {rows_planes.length > 0 ? (
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <ButtonGroup
                style={{
                  margin: 7,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {download_xls({
                  nurseries: rows_all,
                  columns: colums_all,
                })}
                {download_pdf({
                  nurseries: rows_all,
                  columns: colums_all,
                  title: 'CREAR PLAN',
                })}
              </ButtonGroup>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_planes}
                columns={columns_planes}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => uuidv4()}
              />
              {rows_planes.map((plan) => (
                <>
                  <Accordion
                    key={plan.id_plan + 'objetivos'}
                    style={{ marginBottom: '1rem' }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownIcon
                          sx={{
                            color: 'primary.main',
                          }}
                        />
                      }
                    >
                      <Typography>
                        <b>Objetivos {plan.nombre_plan}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {plan.objetivos.map((objetivo) => (
                        <>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            key={objetivo.id_objetivo}
                          >
                            {objetivo.nombre_objetivo}
                          </Typography>
                        </>
                      ))}
                      <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows_planes.flatMap((plan) =>
                          plan.objetivos.map((objetivo) => ({
                            id_objetivo: objetivo.id_objetivo,
                            nombre_objetivo: objetivo.nombre_objetivo,
                            nombre_plan: plan.nombre_plan,
                          }))
                        ) ?? []}
                        columns={columns_obejtivos}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => uuidv4()}
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    key={plan.id_plan + 'ejes'}
                    style={{ marginBottom: '1rem' }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownIcon
                          sx={{
                            color: 'primary.main',
                          }}
                        />
                      }
                    >
                      <Typography>
                        <b>Ejes estratégicos {plan.nombre_plan}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {plan.ejes_estractegicos.map((eje) => (
                        <>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            key={eje.id_eje_estrategico}
                          >
                            {eje.nombre}
                          </Typography>
                        </>
                      ))}
                      <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows_planes.flatMap((plan) =>
                          plan.ejes_estractegicos.map((eje) => ({
                            id_eje_estrategico: eje.id_eje_estrategico,
                            nombre_plan: plan.nombre_plan,
                            nombre_tipo_eje: eje.nombre_tipo_eje,
                            nombre: eje.nombre,
                          }))
                        ) ?? []}
                        columns={colums_ejes}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => uuidv4()}
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    key={plan.id_plan + 'programas'}
                    style={{ marginBottom: '1rem' }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownIcon
                          sx={{
                            color: 'primary.main',
                          }}
                        />
                      }
                    >
                      <Typography>
                        <b>Programas {plan.nombre_plan}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {plan.programas.map((programa) => (
                        <>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            key={programa.id_programa}
                          >
                            {programa.nombre_programa}
                          </Typography>
                        </>
                      ))}
                      <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows_planes.flatMap((plan) =>
                          plan.programas.map((programa) => ({
                            id_programa: programa.id_programa,
                            nombre_programa: programa.nombre_programa,
                            nombre_plan: plan.nombre_plan,
                            porcentaje_1: programa.porcentaje_1,
                            porcentaje_2: programa.porcentaje_2,
                            porcentaje_3: programa.porcentaje_3,
                            porcentaje_4: programa.porcentaje_4,
                          }))
                        )}
                        columns={colums_programas}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => uuidv4()}
                      />
                      {plan.programas.map((programa) => (
                        <React.Fragment key={programa.id_programa}>
                          {/* <Typography>
                                {programa.nombre_programa}
                              </Typography> */}
                          <Accordion
                            key={programa.id_programa + 'proyectos'}
                            style={{ marginBottom: '1rem' }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandCircleDownIcon
                                  sx={{
                                    color: 'primary.main',
                                  }}
                                />
                              }
                            >
                              <Typography>
                                <b>Proyectos {programa.nombre_programa}</b>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {programa.proyectos.map((proyecto) => (
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  key={proyecto.id_proyecto}
                                >
                                  {proyecto.nombre_proyecto}
                                </Typography>
                              ))}
                              <DataGrid
                                density="compact"
                                autoHeight
                                rows={rows_planes.flatMap((plan) =>
                                  plan.programas.flatMap((programa) =>
                                    programa.proyectos.map((proyecto) => ({
                                      id_proyecto: proyecto.id_proyecto,
                                      nombre_proyecto: proyecto.nombre_proyecto,
                                      nombre_programa: programa.nombre_programa,
                                      nombre_plan: plan.nombre_plan,
                                      pondera_1: proyecto.pondera_1,
                                      pondera_2: proyecto.pondera_2,
                                      pondera_3: proyecto.pondera_3,
                                      pondera_4: proyecto.pondera_4,
                                    }))
                                  )
                                ) ?? []}
                                columns={columns_proyectos}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                getRowId={(row) => uuidv4()}
                              />
                              {/* productos proyecto */}
                              {programa.proyectos.map((proyecto) => (
                                <React.Fragment key={proyecto.id_proyecto}>
                                  {/* <Typography>
                                        {proyecto.nombre_proyecto}
                                      </Typography> */}
                                  <Accordion
                                    key={proyecto.id_proyecto + 'productos'}
                                    style={{ marginBottom: '1rem' }}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandCircleDownIcon
                                          sx={{
                                            color: 'primary.main',
                                          }}
                                        />
                                      }
                                    >
                                      <Typography>
                                        <b>
                                          Productos {proyecto.nombre_proyecto}
                                        </b>
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {proyecto.productos.map((producto) => (
                                        <Typography
                                          variant="subtitle1"
                                          fontWeight="bold"
                                          key={producto.id_producto}
                                        >
                                          {producto.nombre_producto}
                                        </Typography>
                                      ))}
                                      <DataGrid
                                        density="compact"
                                        autoHeight
                                        rows={rows_planes.flatMap((plan) =>
                                          plan.programas.flatMap((programa) =>
                                            programa.proyectos.flatMap(
                                              (proyecto) =>
                                                proyecto.productos.map(
                                                  (producto) => ({
                                                    id_producto:
                                                      producto.id_producto,
                                                    nombre_producto:
                                                      producto.nombre_producto,
                                                    nombre_proyecto:
                                                      proyecto.nombre_proyecto,
                                                    nombre_programa:
                                                      programa.nombre_programa,
                                                    nombre_plan:
                                                      plan.nombre_plan,
                                                    numero_producto:
                                                      producto.numero_producto,
                                                  })
                                                )
                                            )
                                          )
                                        ) ?? []}
                                        columns={columns_productos}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        getRowId={(row) => uuidv4()}
                                      />
                                      {/* actividades producto */}
                                      {proyecto.productos.map((producto) => (
                                        <React.Fragment
                                          key={producto.id_producto}
                                        >
                                          {/* <Typography>
                                                  {producto.nombre_producto}
                                                </Typography> */}
                                          <Accordion
                                            key={
                                              producto.id_producto +
                                              'actividades'
                                            }
                                            style={{
                                              marginBottom: '1rem',
                                            }}
                                          >
                                            <AccordionSummary
                                              expandIcon={
                                                <ExpandCircleDownIcon
                                                  sx={{
                                                    color: 'primary.main',
                                                  }}
                                                />
                                              }
                                            >
                                              <Typography>
                                                <b>
                                                  Actividades producto
                                                  {producto.nombre_producto}
                                                </b>
                                              </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                              {producto.actividades.map(
                                                (actividad) => (
                                                  <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    key={actividad.id_actividad}
                                                  >
                                                    {actividad.nombre_actividad}
                                                  </Typography>
                                                )
                                              )}
                                              <DataGrid
                                                density="compact"
                                                autoHeight
                                                rows={rows_planes.flatMap(
                                                  (plan) =>
                                                    plan.programas.flatMap(
                                                      (programa) =>
                                                        programa.proyectos.flatMap(
                                                          (proyecto) =>
                                                            proyecto.productos.flatMap(
                                                              (producto) =>
                                                                producto.actividades.map(
                                                                  (
                                                                    actividad
                                                                  ) => ({
                                                                    id_actividad:
                                                                      actividad.id_actividad,
                                                                    nombre_actividad:
                                                                      actividad.nombre_actividad,
                                                                    nombre_producto:
                                                                      producto.nombre_producto,
                                                                    nombre_proyecto:
                                                                      proyecto.nombre_proyecto,
                                                                    nombre_programa:
                                                                      programa.nombre_programa,
                                                                    nombre_plan:
                                                                      plan.nombre_plan,
                                                                    numero_actividad:
                                                                      actividad.numero_actividad,
                                                                  })
                                                                )
                                                            )
                                                        )
                                                    )
                                                ) ?? []}
                                                columns={colums_actividades}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                getRowId={(row) => uuidv4()}
                                              />
                                              {/* Indicadores por actividad, una actividad tiene varios indicadored*/}
                                              <Accordion
                                                key={
                                                  producto.id_producto +
                                                  'indicadores'
                                                }
                                                style={{
                                                  marginBottom: '1rem',
                                                }}
                                              >
                                                <AccordionSummary
                                                  expandIcon={
                                                    <ExpandCircleDownIcon
                                                      sx={{
                                                        color: 'primary.main',
                                                      }}
                                                    />
                                                  }
                                                >
                                                  <Typography>
                                                    <b>
                                                      Indicadores actividad
                                                      {producto.nombre_producto}
                                                    </b>
                                                  </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                  <DataGrid
                                                    density="compact"
                                                    autoHeight
                                                    rows={rows_planes?.flatMap(
                                                      (plan) =>
                                                        plan?.programas.flatMap(
                                                          (programa) =>
                                                            programa?.proyectos.flatMap(
                                                              (proyecto) =>
                                                                proyecto?.productos?.flatMap(
                                                                  (producto) =>
                                                                    producto.actividades.flatMap(
                                                                      (
                                                                        actividad
                                                                      ) =>
                                                                        actividad?.indicadores?.map(
                                                                          (
                                                                            indicador
                                                                          ) => ({
                                                                            nombre_indicador:
                                                                              indicador?.nombre_indicador,
                                                                            linea_base:
                                                                              indicador?.linea_base,
                                                                            medida:
                                                                              indicador?.medida,
                                                                            tipo_indicador:
                                                                              indicador?.tipo_indicador,
                                                                            nombre_tipo:
                                                                              indicador?.nombre_tipo,
                                                                            nombre_medicion:
                                                                              indicador?.nombre_medicion,
                                                                            metas:
                                                                              indicador?.metas,
                                                                          })
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    ) ?? []}
                                                    columns={colums_indicadores}
                                                    pageSize={10}
                                                    rowsPerPageOptions={[10]}
                                                    getRowId={(row) => uuidv4()}
                                                  />
                                                  {/* Metas por indicador */}
                                                  <Accordion
                                                    key={
                                                      producto.id_producto +
                                                      'metas'
                                                    }
                                                    style={{
                                                      marginBottom: '1rem',
                                                    }}
                                                  >
                                                    <AccordionSummary
                                                      expandIcon={
                                                        <ExpandCircleDownIcon
                                                          sx={{
                                                            color:
                                                              'primary.main',
                                                          }}
                                                        />
                                                      }
                                                    >
                                                      <Typography>
                                                        <b>
                                                          Metas indicador
                                                          {
                                                            producto.nombre_producto
                                                          }
                                                        </b>
                                                      </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                      <DataGrid
                                                        density="compact"
                                                        autoHeight
                                                        rows={rows_planes.flatMap(
                                                          (plan) =>
                                                            plan.programas.flatMap(
                                                              (programa) =>
                                                                programa.proyectos.flatMap(
                                                                  (proyecto) =>
                                                                    proyecto.productos.flatMap(
                                                                      (
                                                                        producto
                                                                      ) =>
                                                                        producto.actividades.flatMap(
                                                                          (
                                                                            actividad
                                                                          ) =>
                                                                            actividad.indicadores.flatMap(
                                                                              (
                                                                                indicador
                                                                              ) =>
                                                                                indicador.metas.map(
                                                                                  (
                                                                                    meta
                                                                                  ) => ({
                                                                                    nombre_indicador:
                                                                                      indicador.nombre_indicador,
                                                                                    nombre_meta:
                                                                                      meta.nombre_meta,
                                                                                    porcentaje_meta:
                                                                                      meta.porcentaje_meta,
                                                                                    valor_meta:
                                                                                      meta.valor_meta,
                                                                                    agno_1:
                                                                                      meta.agno_1,
                                                                                    agno_2:
                                                                                      meta.agno_2,
                                                                                    agno_3:
                                                                                      meta.agno_3,
                                                                                    agno_4:
                                                                                      meta.agno_4,
                                                                                    valor_ejecutado_compromiso:
                                                                                      meta.valor_ejecutado_compromiso,
                                                                                    valor_ejecutado_obligado:
                                                                                      meta.valor_ejecutado_obligado,
                                                                                    avance_fisico:
                                                                                      meta.avance_fisico,
                                                                                    cumplio:
                                                                                      meta.cumplio,
                                                                                  })
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )}
                                                        columns={columns_metas}
                                                        pageSize={10}
                                                        rowsPerPageOptions={[
                                                          10,
                                                        ]}
                                                        getRowId={(row) =>
                                                          uuidv4()
                                                        }
                                                      />
                                                    </AccordionDetails>
                                                  </Accordion>
                                                </AccordionDetails>
                                              </Accordion>
                                            </AccordionDetails>
                                          </Accordion>
                                        </React.Fragment>
                                      ))}
                                    </AccordionDetails>
                                  </Accordion>
                                </React.Fragment>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        </React.Fragment>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
            </Box>
          </Grid>
        ) : (
          // <Loader />
          <></>
        )}
      </Grid>
    </>
  );
};
