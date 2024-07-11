/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { Grid, Box, Checkbox, TextField, Stack, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obligaciones_seleccionadas } from '../slices/ObligacionesSlice';
import { get_datos_deudor } from '../slices/DeudoresSlice';
import { get_datos_contacto_solicitud } from '../slices/SolicitudSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { type Obligacion, type ObligacionesUsuario } from '../interfaces/interfaces';
import { DialogoInformativo } from './DialogoInformativo';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Divider, Dialog, } from '@mui/material';
import { Title } from '../../../../components';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PaidIcon from '@mui/icons-material/Paid';
import { EtapaProcesoConext } from '../../components/GestionCartera/Context/EtapaProcesoContext';

interface RootState {
  obligaciones: {
    obligaciones: ObligacionesUsuario;
  }
}
interface BuscarProps {
  is_modal_active: any;
  set_is_modal_active: any;
  set_position_tab: any;
  set_cobro_persuasivo_active: any;
  selectedIds: any;
  set_selectedIds: any;
  set_lista_obligaciones: any;
  lista_obligaciones: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention

export const TablaObligacionesUsuarioConsulta: React.FC<BuscarProps> = ({
  set_selectedIds,
  selectedIds,
  set_position_tab,
  set_cobro_persuasivo_active,
  is_modal_active,
  set_is_modal_active,
  set_lista_obligaciones,
  lista_obligaciones
}) => {
  const [selected, set_selected] = useState<readonly string[]>([]);
  const [seledexpediente, set_seledexpediente] = useState<readonly string[]>([]);

  const [capital, set_capital] = useState(0);
  const [intereses, set_intereses] = useState(0);
  const [total, set_total] = useState(0);
  const [modal, set_modal] = useState(false);
  const [modal_opcion, set_modal_opcion] = useState(0);
  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);

  const [obligaciones_gestor, set_obligaciones_gestor] = useState(Array<Obligacion>)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const { set_obligaciones_from_liquidacion, set_is_from_liquidacion, set_id_deudor } = useContext(
    EtapaProcesoConext
  );

  const handle_open = (opcion: number): void => {
    set_modal(true)
    set_modal_opcion(opcion)
  };
  const handle_close = (): void => { set_modal(false) };

  const handle_submit = async (): Promise<void> => {
    const arr_registro = [];
    const idSet = new Set(); // Utilizamos un Set para almacenar IDs únicos

    // Verificar si lista_obligaciones y selected son arrays válidos
    if (!lista_obligaciones || !Array.isArray(lista_obligaciones) || !selected || !Array.isArray(selected)) {
      console.error('lista_obligaciones o selected no son arrays válidos:', lista_obligaciones, selected);
      return; // O manejar el error de otra manera apropiada
    }

    for (let i = 0; i < lista_obligaciones.length; i++) {
      for (let j = 0; j < selected.length; j++) {
        // Verificar si lista_obligaciones[i] es un objeto válido y tiene propiedades nombre e id
        if (lista_obligaciones[i]?.nombre === selected[j] && !idSet.has(lista_obligaciones[i].id)) {
          arr_registro.push(lista_obligaciones[i]);
          idSet.add(lista_obligaciones[i].id); // Agregamos el ID al Set para evitar duplicados
        }
      }
    }

    console.log("lista_obligaciones", lista_obligaciones);
    try {
      console.log('arr_registro:', arr_registro);
      // Verificar si obligaciones está definido y tiene la propiedad id_deudor antes de llamar a dispatch
      if (obligaciones && obligaciones.id_deudor) {
        dispatch(obligaciones_seleccionadas(arr_registro));
        console.log('dispatching obligaciones_seleccionadas');
        void dispatch(get_datos_deudor(obligaciones.id_deudor));
        console.log('dispatching get_datos_deudor');
        void dispatch(get_datos_contacto_solicitud(obligaciones.id_deudor));
        console.log('dispatching get_datos_contacto_solicitud');
      } else {
        console.error('Obligaciones o id_deudor es undefined:', obligaciones);
      }
    } catch (error: any) {
      console.error('Error en handle_submit:', error);
      // throw new Error(error);
    }
  };


  // const [selectedIds, set_selectedIds] = useState<readonly string[]>([]);

  // const handle_click = (event: React.MouseEvent<unknown>, name: string): void => {
  const handle_click = (event: React.MouseEvent<unknown>, name: string, id: string): void => {

    const selected_index = selected.indexOf(name);
    const selectedIdIndex = selectedIds.indexOf(id);

    let new_selected: readonly string[] = [];
    let newSelectedIds: readonly string[] = [];

    if (selected_index === -1) {
      new_selected = new_selected.concat(selected, name);
      newSelectedIds = newSelectedIds.concat(selectedIds, id);

    } else if (selected_index === 0) {
      new_selected = new_selected.concat(selected.slice(1));
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));

    } else if (selected_index === selected.length - 1) {
      new_selected = new_selected.concat(selected.slice(0, -1));
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));

    } else if (selected_index > 0) {
      new_selected = new_selected.concat(
        selected.slice(0, selected_index),
        selected.slice(selected_index + 1),
      );
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selected_index),
        selectedIds.slice(selected_index + 1),
      );
    }

    // if (selectedIdIndex === -1) {
    //   newSelectedIds = newSelectedIds.concat(selectedIds, id);
    // } else {
    //   newSelectedIds = newSelectedIds.concat(
    //     selectedIds.slice(0, selectedIdIndex),
    //     selectedIds.slice(selectedIdIndex + 1)
    //   );
    // }
    set_selectedIds(newSelectedIds);

    set_selected(new_selected);
  };

  const handle_gestor_cartera = (obligacion: Obligacion): void => {
    const selected_index = obligaciones_gestor.findIndex(ob => ob.id === obligacion.id);
    let new_selected: any[] = [];

    if (selected_index === -1) {
      const new_obligacion = {
        ...obligacion,
        id_deudor: obligaciones.id_deudor,
        nombre_completo: obligaciones.nombre_completo,
        numero_identificacion: obligaciones.numero_identificacion,
        email: obligaciones.email,
      };
      new_selected = [...obligaciones_gestor, new_obligacion];
    } else {
      new_selected = [
        ...obligaciones_gestor.slice(0, selected_index),
        ...obligaciones_gestor.slice(selected_index + 1),
      ];
    }

    set_obligaciones_gestor(new_selected);
  }

  const handle_generate_proceso_persuasivo = (): void => {
    set_obligaciones_from_liquidacion(obligaciones_gestor);
    set_is_from_liquidacion(true);
    set_id_deudor(obligaciones.id_deudor);
    set_cobro_persuasivo_active(true);
    set_position_tab('3');
    // navigate('/app/recaudo/gestion_cartera');
  }

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  const intereses_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(intereses)

  const capital_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(capital)

  useEffect(() => {
    set_lista_obligaciones(obligaciones.obligaciones)
  }, [obligaciones.obligaciones])


  useEffect(() => {
    if (!lista_obligaciones || !selected) {
      return; // Salir temprano si los datos no están listos
    }

    let sub_capital = 0;
    let sub_intereses = 0;

    for (let i = 0; i < lista_obligaciones.length; i++) {
      for (let j = 0; j < selected.length; j++) {
        if (lista_obligaciones[i].nombre === selected[j]) {
          sub_capital += parseFloat(lista_obligaciones[i].monto_inicial);
          sub_intereses += parseFloat(lista_obligaciones[i].valor_intereses);
        }
      }
    }

    // Actualizar estados de manera segura
    set_capital(sub_capital);
    set_intereses(sub_intereses);

    // Actualizar total después de asegurar que capital e intereses están actualizados
    set_total(sub_capital + sub_intereses);

  }, [lista_obligaciones, selected]); // Dependencias correctas para el useEffect


  // useEffect(() => {
  //   let sub_capital = 0
  //   let sub_intereses = 0
  //   for (let i = 0; i < lista_obligaciones.length; i++) {
  //     for (let j = 0; j < selected.length; j++) {
  //       if (lista_obligaciones[i].nombre === selected[j]) {
  //         sub_capital = sub_capital + parseFloat(lista_obligaciones[i].monto_inicial)
  //         sub_intereses = sub_intereses + parseFloat(lista_obligaciones[i].valor_intereses)
  //         set_capital(sub_capital)
  //         set_intereses(sub_intereses)
  //       }
  //     }
  //   }
  //   if (selected.length === 0) {
  //     set_capital(0)
  //     set_intereses(0)
  //   }
  //   set_total(capital + intereses)
  // }, [selected, capital, intereses])


  const handleSelectAllClick = (): void => {
    if (selected.length === lista_obligaciones.length) {
      set_selected([]);
      set_selectedIds([]);
    } else {
      const newSelected = lista_obligaciones.map((obligacion: any) => obligacion.nombre);
      set_selected(newSelected);

      const newSelectedd = lista_obligaciones.map((obligacion: any) => obligacion.id);
      set_selectedIds(newSelectedd);
    }

    if (obligaciones_gestor.length === lista_obligaciones.length) {
      set_obligaciones_gestor([]);
    } else {
      const newObligaciones = lista_obligaciones.map((obligacion: any) => ({
        ...obligacion,
        id_deudor: obligaciones.id_deudor,
        nombre_completo: obligaciones.nombre_completo,
        numero_identificacion: obligaciones.numero_identificacion,
        email: obligaciones.email,
      }));
      set_obligaciones_gestor(newObligaciones);
    }

  };


  const columns: GridColDef[] = [
    {
      field: 'checkbox',
      headerName: 'Seleccionar',
      width: 120,
      renderCell: (params) => {
        return (
          <Checkbox
            // checked={selected.indexOf(params.row.nombre) !== -1 }
            checked={selected.indexOf(params.row.nombre) !== -1 && selectedIds.indexOf(params.row.id) !== -1}

            onClick={(event) => {
              handle_click(event, params.row.nombre, params.row.id)
              handle_gestor_cartera(params.row)
            }}

          // onClick={(event) => {
          //   handle_click(event, params.row.nombre);


          //  }}
          />
        );
      },

    },
    {
      field: 'tipo_renta',
      headerName: 'Tipo de renta',
      width: 220,
    },
    {
      field: 'tipo_cobro',
      headerName: 'Tipo de cobro',
      width: 220,
    },
    {
      field: 'periodo',
      headerName: 'Periodo',
      width: 150,
      renderCell: (params) => (
        dayjs(params.row.fecha_facturacion).month() + 1 <= 6 ? '1er Semestre' : '2do Semestre'
      )
    },
    {
      field: 'fecha_facturacion',
      headerName: 'Fecha Facturacion',
      width: 150,
      valueFormatter: (params) => dayjs(params.value).isValid() ? dayjs(params.value).format('DD/MM/YYYY') : '',
    },
    {
      field: 'inicio',
      headerName: 'Fecha Inicio',
      width: 150,
    },
    {
      field: 'expediente',
      headerName: 'Expediente',
      width: 150,
    },
    {
      field: 'num_resolucion',
      headerName: 'Nro Resolución',
      width: 200,
    },
    {
      field: 'monto_inicial',
      headerName: 'Valor Capital',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
    {
      field: 'valor_intereses',
      headerName: 'Valor Intereses',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
    {
      field: 'dias_mora',
      headerName: 'Días Mora',
      width: 100,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'calculo_interes_mora',
      headerName: 'Interés por Mora',
      width: 180,
      renderCell: (params) => {
        const interes = params.row.valor_intereses * 0.0007; // 0.07% de valor_intereses
        const interesMora = interes * params.row.dias_mora;
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "COP",
            }).format(interesMora)}
          </div>
        );
      },
    },
  ];
  const handle_closee = (): void => {
    set_is_modal_active(false);
    set_lista_obligaciones([]);
  };
  const handleClick = () => {
    console.log(selectedIds);
    console.log("2222222");
  };
  return (
    <>
      <Dialog open={is_modal_active} onClose={handle_closee} maxWidth="xl"
      >


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
          <Title title='Listado de pagos pendientes' />
          {/* <Button color='success'
          variant='contained'
          onClick={handleClick}>CONSOLE </Button> */}
          {
            lista_obligaciones && lista_obligaciones.length !== 0 ? (
            <Grid item xs={12}>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <p>
                    {`Las obligaciones pendientes por pago para el usuario ${obligaciones.nombre_completo} con identificación ${obligaciones.numero_identificacion} son las siguientes:`}
                  </p>
                  <Grid item >
                    <Button onClick={handleSelectAllClick} variant="contained" color="primary">
                      Seleccionar  todo
                    </Button>
                  </Grid>

                  <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    rows={lista_obligaciones}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => faker.database.mongodbObjectId()}
                  />
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
                    label={<strong>Gran Total a Deber</strong>}
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
                marginTop={2}
                sx={{ mb: '20px' }}

              >

                <Button
                  color='primary'
                  variant='contained'
                  sx={{ marginTop: '30px' }}
                  startIcon={<PaidIcon />}
                  disabled={selectedIds.length === 0}
                  onClick={() => void handle_generate_proceso_persuasivo()}
                >
                  Generar Proceso Persuasivo
                </Button>
                <Button
                  color='primary'
                  variant='contained'
                  sx={{ marginTop: '30px' }}
                  startIcon={<RequestQuoteIcon />}
                  disabled={selectedIds.length === 0}
                  onClick={() => {
                    // navigate('../facilidades_pago/registro');
                    // void handle_submit();
                    set_position_tab('2');
                  }}
                >
                  Liquidar
                </Button>
                <Button
                  color='primary'
                  variant='contained'
                  disabled={selected.length === 0}

                  startIcon={<Add />}
                  sx={{ marginTop: '30px' }}
                  onClick={() => {
                    if (obligaciones.tiene_facilidad) {
                      handle_open(1);
                      console.log("1")
                    } else if (selected.length === 0) {
                      handle_open(2);
                      console.log("2")

                    } else {
                      // navigate('../registro');
                      navigate('../facilidades_pago/registro');
                      console.log("3")

                      void handle_submit();
                    }
                  }}
                >
                  Crear Facilidad de Pago
                </Button>
              </Stack>
            </Grid>
            ) : (
              <p>
                {`El usuario ${obligaciones.nombre_completo} con identificación ${obligaciones.numero_identificacion} no tiene obligaciones pendiente por pago.`}
              </p>
            )
          }
        </Grid>
        <DialogoInformativo
          tipo_notificacion={modal_opcion === 1 ? 'error' : 'warn'}
          mensaje_notificacion={
            modal_opcion === 1 ? `El usuario ${obligaciones.nombre_completo} ya cuenta con una Facilidad de Pago` :
              'Para continuar a la página de registro seleccione al menos una de las obligaciones'
          }
          abrir_modal={modal}
          abrir_dialog={handle_close}
        />

      </Dialog>
    </>
  );
}
