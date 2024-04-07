/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';

import {
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
import { type ColumnProps } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import TableRowExpansion from '../../../../../components/partials/form/TableRowExpansion';
import FormButton from '../../../../../components/partials/form/FormButton';
import {
  initial_state_pqr,
  initial_state_pqr_request,
  set_pqr,
  set_pqr_request,
} from '../../store/slice/pqrsdfSlice';
import { IObjPqr, IObjPqrRequest } from '../../interfaces/pqrsdf';
import PqrDetailDialog from './PqrDetailDialog';
import { Avatar, Box, Grid, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { get_pqr_types_service } from '../../store/thunks/pqrsdfThunks';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import  AddBox  from '@mui/icons-material/AddBox';
import RestartAltIcon  from '@mui/icons-material/RestartAlt';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoPqrsdf = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { pqrs, pqr, pqr_types } = useAppSelector(
    (state) => state.pqrsdf_slice
  );
  const [detail_is_active, set_detail_is_active] = useState<boolean>(false);

  const [selectedPqr, setSelectedPqr] = useState<any>(null);
  const [button_option, set_button_option] = useState('');
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  useEffect(() => {
    setExpandedRows(undefined);
    set_button_option('');
    setSelectedPqr({});
    set_detail_is_active(false);
  }, [pqrs]);
  useEffect(() => {
    void dispatch(get_pqr_types_service());
  }, []);

  useEffect(() => {
    //  console.log('')(selectedPqr);
    if (selectedPqr !== null) {
      if ('id_PQRSDF' in selectedPqr) {
        dispatch(
          set_pqr(
            pqrs.find(
              (objeto: IObjPqr) => objeto.id_PQRSDF === selectedPqr.id_PQRSDF
            ) ?? initial_state_pqr
          )
        );
        dispatch(set_pqr_request(initial_state_pqr_request));

        // validar if esta radicado el pqr
        if (selectedPqr.fecha_radicado !== null) {
          set_button_option('complement');
        } else {
          set_button_option('restart');
        }
      }
      if ('id_solicitud_al_usuario_sobre_pqrsdf' in selectedPqr) {
        set_button_option('request');
        console.log(selectedPqr);
        const pqr = pqrs.find(
          (objeto: IObjPqr) => objeto.id_PQRSDF === selectedPqr.id_pqrsdf
        );
        dispatch(set_pqr(pqr ?? initial_state_pqr));
        dispatch(
          set_pqr_request(
            pqr?.solicitudes_pqr?.find(
              (objeto: IObjPqrRequest) =>
                objeto.id_solicitud_al_usuario_sobre_pqrsdf ===
                selectedPqr.id_solicitud_al_usuario_sobre_pqrsdf
            ) ?? initial_state_pqr_request
          )
        );
      }
    }
  }, [selectedPqr]);

  const get_product_severity: any = (pqr: IObjPqr) => {
    switch (pqr.id_estado_actual_solicitud?.toString()) {
      case '6' || '7' || '8':
        return 'success';
      case '1' || '2':
        return 'primary';

      case '4':
        return 'warning';

      case '3':
        return 'danger';

      default:
        return null;
    }
  };

  const columns_pqrs: ColumnProps[] = [
    {
      headerStyle: { width: '4rem' },
      field: 'cod_tipo_PQRSDF',
      header: 'Tipo de tramite',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {
            pqr_types.find((objeto) => objeto.key === rowData.cod_tipo_PQRSDF)
              ?.label
          }
        </div>
      ),
    },
    {
      headerStyle: { width: '4rem' },
      field: 'fecha_registro',
      header: 'Fecha de creación',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(rowData.fecha_registro).toDateString()}
        </div>
      ),
      style: { width: 150 },
    },
    {
      headerStyle: { width: '4rem' },
      field: 'fecha_radicado',
      header: 'Fecha de radicado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_radicado === null
            ? '-'
            : new Date(rowData.fecha_radicado).toDateString()}
        </div>
      ),
    },
    {
      headerStyle: { width: '4rem' },
      field: 'numero_radicado_entrada',
      header: 'Número de radicado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.numero_radicado_entrada ?? 'SIN RADICAR'}
        </div>
      ),
    },

    {
      field: 'nombre_estado_solicitud',
      headerStyle: { width: '4rem' },
      header: 'Estado',
      sortable: false,
      body: (rowData) => (
        <Tag
          value={rowData.nombre_estado_solicitud}
          severity={get_product_severity(rowData)}
        ></Tag>
      ),
    },
    {
      header: 'Acciones',
      headerStyle: { width: '4rem' },
      body: (rowData) => (
        <Tooltip title="Detalle">
          <IconButton
            onClick={() => {
              set_detail_is_active(true);
              setSelectedPqr(rowData);
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
              <VisibilityIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  const columns_solicitud: ColumnProps[] = [
    {
      field: 'nombre_tipo_oficio',
      header: 'Tipo de solicitud',
      sortable: false,
    },
    {
      field: 'fecha_radicado_salida',
      header: 'Fecha de radicado de salida',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_radicado_salida === null
            ? '-'
            : new Date(rowData.fecha_radicado).toDateString()}
        </div>
      ),
    },
    {
      field: 'numero_radicado_salida',
      header: 'Número de radicado de salida',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word',   color: rowData.numero_radicado_salida === '' ? 'red' : 'black', }}
        onClick={() => {
          if (rowData.numero_radicado_salida === '') {
           control_warning('No se ha radicado la solicitud de respuesta, por ende no se puede seleccionar')
          }}
        }
        >
          {rowData.numero_radicado_salida === ''
            ? 'SIN RADICAR'
            : rowData.numero_radicado_salida}
        </div>
      ),
    },

    {
      field: 'fecha_solicitud',
      header: 'Fecha de notificación',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(rowData.fecha_solicitud).toDateString()}
        </div>
      ),
    },

    {
      field: 'nombre_und_org_oficina_solicita',
      header: 'Unidad organizacional solicitante',
      sortable: false,
    },

    {
      header: 'Acciones',
      headerStyle: { width: '4rem' },
      body: (rowData) => (
        <Tooltip title="Detalle">
          <IconButton
            onClick={() => {
              set_detail_is_active(true);
              setSelectedPqr(rowData);
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
              <VisibilityIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  const definition_levels = [
    {
      column_id: 'id_PQRSDF',
      level: 0,
      columns: columns_pqrs,
      table_name: 'PQRSDF',
      property_name: '',
    },
    {
      column_id: 'id_solicitud_al_usuario_sobre_pqrsdf',
      level: 1,
      columns: columns_solicitud,
      table_name: 'Solicitudes de PQRSDF',
      property_name: 'solicitudes_pqr',
    },
  ];

  const get_x: any = (data: any) => {
    //  console.log('')(data);
  };

  return (
    <div className="card">
      <TableRowExpansion
        products={pqrs}
        definition_levels={definition_levels}
        selectedItem={selectedPqr}
        setSelectedItem={setSelectedPqr}
        expandedRows={expandedRows}
        setExpandedRows={setExpandedRows}
        onRowToggleFunction={get_x}
      />

      <Grid container direction="row" padding={2} spacing={2}>
        <Grid item xs={12} md={3}>
          <FormButton
            href={`/#/app/gestor_documental/pqrsdf/complementos/crear_complemento/${pqr.id_PQRSDF}`}
            variant_button="contained"
            on_click_function={null}
            icon_class={<AddBox/>}
            disabled={!(button_option === 'complement')}
            label="Crear complemento"
            type_button="button"
            color_button={'primary'}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormButton
            href={`/#/app/gestor_documental/pqrsdf/crear_pqrsdf/${pqr.id_PQRSDF}`}
            variant_button="contained"
            on_click_function={null}
            icon_class={<RestartAltIcon/>}
            disabled={!(button_option === 'restart')}
            label="Reanudar PQRSDF"
            type_button="button"
            color_button={'secondary'}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormButton
            href={`/#/app/gestor_documental/pqrsdf/responder_solicitud/${pqr.id_PQRSDF}`}
            variant_button="contained"
            on_click_function={null}
            icon_class={<AddBox/>}
            disabled={!(button_option === 'request')}
            label="Responder solicitud"
            type_button="button"
            color_button={'warning'}
          />
        </Grid>
      </Grid>
      <PqrDetailDialog
        is_modal_active={detail_is_active}
        set_is_modal_active={set_detail_is_active}
        action={button_option}
      />
    </div>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoPqrsdf;
