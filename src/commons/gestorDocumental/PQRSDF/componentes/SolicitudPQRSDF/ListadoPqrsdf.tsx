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
import Grid from '@mui/material/Grid';
import FormButton from '../../../../../components/partials/form/FormButton';
import {
  initial_state_pqr,
  initial_state_pqr_request,
  set_pqr,
  set_pqr_request,
} from '../../store/slice/pqrsdfSlice';
import { IObjPqr, IObjPqrRequest } from '../../interfaces/pqrsdf';
import PqrDetailDialog from './PqrDetailDialog';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoPqrsdf = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { pqrs } = useAppSelector((state) => state.pqrsdf_slice);
  const [detail_is_active, set_detail_is_active] = useState<boolean>(false);

  const [selectedPqr, setSelectedPqr] = useState<any>();
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
    // if ('id' in selectedPqr) {
    // cambiar por id_pqr
    // setear pqr seleccionado en pqr variable
    // dispatch(
    //   set_pqr(
    //     pqrs.find(
    //       (objeto: IObjPqr) => objeto.id_pqr === selectedPqr.id_pqr
    //     ) ?? initial_state_pqr
    //   )
    // );
    // dispatch(set_pqr_request(initial_state_pqr_request));

    // validar if esta radicado el pqr
    set_button_option('component');
    // si no lo esta
    //set_button_option('restart')
    // }
    // if ('id_pqr_request' in selectedPqr) {
    //   set_button_option('request');
    //   const pqr = pqrs.find(
    //     (objeto: IObjPqr) =>
    //       objeto.id_pqr === selectedPqr.id_pqr_request.split('-')[0]
    //   );
    //   dispatch(set_pqr(pqr ?? initial_state_pqr));
    //   dispatch(
    //     set_pqr_request(
    //       pqr.pqr_request.find(
    //         (objeto: IObjPqrRequest) =>
    //           objeto.id_pqr_request === selectedPqr.id_pqr_request
    //       ) ?? initial_state_pqr_request
    //     )
    //   );
    // }
  }, [selectedPqr]);

  const get_product_severity = (pqr: IObjPqr) => {
    switch (pqr.pqr_status) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const columns_pqrs: ColumnProps[] = [
    {
      field: 'pqr_type',
      header: 'Tipo de tramite',
      sortable: true,
    },
    {
      field: 'created_at',
      header: 'Fecha de creación',
      sortable: true,
    },
    {
      field: 'filling_at',
      header: 'Fecha de radicado',
      sortable: true,
    },
    {
      field: 'filling_number',
      header: 'Número de radicado',
      sortable: true,
    },

    {
      field: 'pqr_status',
      header: 'Estado',
      sortable: true,
      body: (rowData) => (
        <Tag
          value={rowData.pqr_status}
          severity={get_product_severity(rowData)}
        ></Tag>
      ),
    },
    {
      headerStyle: { width: '4rem' },
      body: (rowData) => (
        <Button
          icon="pi pi-view"
          onClick={() => {
            set_detail_is_active(true);
            setSelectedPqr(rowData);
          }}
        />
      ),
    },
  ];
  const columns_solicitud: ColumnProps[] = [
    { field: 'request_type', header: 'Tipo de solicitud', sortable: true },
    {
      field: 'request_at',
      header: 'Fecha de radicado de salida',
      sortable: true,
    },
    {
      field: 'request_number',
      header: 'Número de radicado de salida',
      sortable: true,
    },

    {
      field: 'notification_at',
      header: 'Fecha de notificación',
      sortable: true,
    },

    {
      field: 'organizational_unit',
      header: 'Unidad organizacional solicitante',
      sortable: true,
    },

    {
      headerStyle: { width: '4rem' },
      body: (rowData) => (
        <Button
          icon="pi pi-view"
          onClick={() => {
            set_detail_is_active(true);
            setSelectedPqr(rowData);
          }}
        />
      ),
    },
  ];
  const definition_levels = [
    {
      column_id: 'id_pqr',
      level: 0,
      columns: columns_pqrs,
      table_name: 'PQRSDF',
      property_name: '',
    },
    {
      column_id: 'id_pqr_request',
      level: 1,
      columns: columns_solicitud,
      table_name: 'Solicitudes de PQRSDF',
      property_name: 'orders',
    },
  ];

  return (
    <div className="card">
      <TableRowExpansion
        products={pqrs}
        definition_levels={definition_levels}
        selectedItem={selectedPqr}
        setSelectedItem={setSelectedPqr}
        expandedRows={expandedRows}
        setExpandedRows={setExpandedRows}
      />
      <Grid container direction="row" padding={2} spacing={2}>
        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={null}
            icon_class={null}
            disabled={!(button_option === 'complement')}
            label="Crear complemento"
            type_button="button"
            color_button={'primary'}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={null}
            icon_class={null}
            disabled={!(button_option === 'restart')}
            label="Reaunar PQRSDF"
            type_button="button"
            color_button={'secondary'}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={null}
            icon_class={null}
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
