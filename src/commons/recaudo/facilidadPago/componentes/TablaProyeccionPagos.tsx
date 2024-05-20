/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Grid, Box, TextField, Stack, Button } from '@mui/material';
import { FileDownloadOutlined, Visibility, Save } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { DialogoRegistro } from '../componentes/DialogoRegistro';
import {
  type TablasAmortizacion,
  type ProyeccionPago,
  type AmortizacionDatosDeudor,
  type FacilidadPagoSolicitud,
  type PlanPagoValidacion,
} from '../interfaces/interfaces';
import { get_facilidad_solicitud } from '../slices/SolicitudSlice';
import { get_seguimiento_fac } from '../slices/FacilidadesSlice';
import { get_validacion_plan_pagos } from '../slices/PlanPagosSlice';
import { get_validacion_resolucion } from '../slices/ResolucionSlice';
import { post_plan_pagos } from '../requests/requests';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';

interface RootState {
  plan_pagos: {
    plan_pagos: TablasAmortizacion;
  };
}

interface RootStateDeudor {
  deudores: {
    deudores: AmortizacionDatosDeudor;
  };
}

interface RootStateFacilidad {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  };
}

interface RootStateGenerarPlanPagos {
  facilidades: {
    facilidades: {
      tasa_diaria_aplicada: number;
      porcentaje_abono: number;
      fecha_pago_abono: string;
      cuotas: number;
      periodicidad: number;
    };
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaProyeccionPagos: React.FC = () => {
  const [capital, set_capital] = useState(0);
  const [intereses, set_intereses] = useState(0);
  const [total, set_total] = useState(0);
  const [lista, set_lista] = useState(Array<ProyeccionPago>);
  const [modal, set_modal] = useState(false);
  const [respuesta_registro, set_respuesta_registro] =
    useState<PlanPagoValidacion>();
  const { plan_pagos } = useSelector((state: RootState) => state.plan_pagos);
  const { solicitud_facilidad } = useSelector(
    (state: RootStateFacilidad) => state.solicitud_facilidad
  );
  const { deudores } = useSelector((state: RootStateDeudor) => state.deudores);
  const { facilidades } = useSelector(
    (state: RootStateGenerarPlanPagos) => state.facilidades
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const handle_close = (): void => {
    set_modal(false);
  };

  const total_cop = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'COP',
  }).format(total);

  const capital_cop = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'COP',
  }).format(capital);

  const intereses_cop = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'COP',
  }).format(intereses);

  useEffect(() => {
    set_lista(plan_pagos.proyeccion_plan);
  }, [plan_pagos]);

  useEffect(() => {
    if (respuesta_registro !== undefined) {
      set_modal(true);
    }
  }, [respuesta_registro]);

  const columns: GridColDef[] = [
    {
      field: 'num_cuota',
      headerName: 'No Cuota',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_pago',
      headerName: 'Fechas de Pago',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {dayjs(params.value).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      field: 'capital',
      headerName: 'Capital',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'COP',
        }).format(params.value);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        );
      },
    },
    {
      field: 'interes',
      headerName: 'Intereses',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'COP',
        }).format(params.value);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        );
      },
    },
    {
      field: 'cuota',
      headerName: 'Cuota',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'COP',
        }).format(params.value);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        );
      },
    },
  ];

  const handle_export_excel = async (): Promise<void> => {
    try {
      const xlsx = await import('xlsx');
      const worksheet = xlsx.utils.json_to_sheet(lista);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excel_buffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      save_as_excel_file(excel_buffer, 'Proyección de Pagos');
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const save_as_excel_file = (buffer: Buffer, fileName: string): void => {
    import('file-saver')
      .then((module) => {
        const save_as_fn = module.default.saveAs;
        const excel_type =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const excel_extension = '.xlsx';
        const data = new Blob([buffer], {
          type: excel_type,
        });
        save_as_fn(data, fileName + excel_extension);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    let sub_capital = 0;
    let sub_intereses = 0;
    for (let i = 0; i < lista.length; i++) {
      sub_capital += lista[i].capital;
      sub_intereses += lista[i].interes;
      set_capital(sub_capital);
      set_intereses(sub_intereses);
    }
    set_total(capital + intereses);
  }, [lista, capital, intereses]);

  const handleClick = () => {
    console.log(plan_pagos);
    console.log('2222222');
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
          <Grid item>
            <Box sx={{ width: '100%' }}>
              {/* <h3>Proyección de Pagos</h3> */}
              <Button color="success" variant="contained" onClick={handleClick}>
                CONSOLE{' '}
              </Button>
              <RenderDataGrid
                title="Proyección de Pagos"
                rows={lista}
                columns={columns}
              />
              {/* <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    rows={lista}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => faker.database.mongodbObjectId()}
                  /> */}
            </Box>
          </Grid>
          <Stack
            direction="row"
            justifyContent="right"
            spacing={2}
            sx={{ mt: '30px' }}
          >
            <Grid item xs={12} sm={2.5}>
              <TextField
                label="Total Capital"
                size="small"
                fullWidth
                value={capital_cop}
              />
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <TextField
                label="Total Intereses"
                size="small"
                fullWidth
                value={intereses_cop}
              />
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <TextField
                label="Total Cuotas"
                size="small"
                fullWidth
                value={total_cop}
              />
            </Grid>
          </Stack>
          <Stack
            direction="row"
            justifyContent="right"
            spacing={2}
            sx={{ mb: '20px', mt: '40px' }}
          >
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<Visibility />}
                onClick={() => {
                  try {
                    void dispatch(
                      get_seguimiento_fac(solicitud_facilidad.facilidad_pago.id)
                    );
                    void dispatch(
                      get_facilidad_solicitud(
                        solicitud_facilidad.facilidad_pago.id
                      )
                    );
                    void dispatch(
                      get_validacion_plan_pagos(
                        solicitud_facilidad.facilidad_pago.id
                      )
                    );
                    void dispatch(
                      get_validacion_resolucion(
                        solicitud_facilidad.facilidad_pago.id
                      )
                    );
                    navigate('../seguimiento');
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                Ver como Usuario Externo
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<FileDownloadOutlined />}
                onClick={handle_export_excel}
              >
                Exportar Proyección de Pagos
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<Save />}
                onClick={() => {
                  const post_registro = async (): Promise<void> => {
                    try {
                      const {
                        data: { data: res_registro },
                      } = await post_plan_pagos({
                        id_facilidad_pago:
                        solicitud_facilidad.facilidad_pago.id,
                        id_tasa_interes: 1,
                        tasa_diaria_aplicada: facilidades.tasa_diaria_aplicada,
                        abono_aplicado: parseFloat(deudores.valor_abonado),
                        porcentaje_abono: facilidades.porcentaje_abono,
                        fecha_pago_abono: facilidades.fecha_pago_abono,
                        nro_cuotas: facilidades.cuotas,
                        periodicidad: facilidades.periodicidad,
                        saldo_total: plan_pagos.resumen_facilidad.saldo_total,
                        intreses_mora:
                          plan_pagos.resumen_facilidad.intreses_mora,
                      });
                      set_respuesta_registro(res_registro ?? {});
                    } catch (error: any) {
                      throw new Error(error);
                    }
                  };
                  void post_registro();
                }}
              >
                Guardar Plan de Pagos
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <DialogoRegistro
        titulo_notificacion="El Plan de Pagos fue Registrado con Éxito"
        tipo=""
        numero_registro={undefined}
        abrir_modal={modal}
        abrir_dialog={handle_close}
      />
    </>
  );
};
