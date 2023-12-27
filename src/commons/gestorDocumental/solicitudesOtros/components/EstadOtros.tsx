import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

import {
  set_pqr_status,
  set_others,
} from '../../PQRSDF/store/slice/pqrsdfSlice';
// SERVICIO PARA RECUPPERAR OTROS
import { get_others_service } from '../../PQRSDF/store/thunks/pqrsdfThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AuthSlice } from '../../../auth/interfaces';
import PrimaryForm from '../../../../components/partials/form/PrimaryForm';
import { Title } from '../../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EstadOtros = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { control: control_estado, reset } = useForm<any>();
  const {
    list_pqr_status,
    pqr_status,
    company,
    person,
    grantor,
    on_behalf_of,
    otros,
  } = useAppSelector((state) => state.pqrsdf_slice);

  const columns: GridColDef[] = [
    {
      field: 'numero_radicado_entrada',
      headerName: 'Numero radicacion Entrada',
      width: 100,
      flex: 1,
      cellClassName: 'truncate-cell',
    },
    {
      field: 'nombre_estado_solicitud',
      headerName: 'Estado',
      width: 250,
      flex: 1,
      cellClassName: 'truncate-cell',
    },

    {
      field: 'ACCIÓN',
      headerName: 'ACCIÓN',
      width: 100,
      flex: 1,
      renderCell: (params) => (
        <Button
        //  onClick={() => handle_edit_click(params.row)}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    if (grantor.id_persona !== null && grantor.id_persona !== undefined) {
      void dispatch(get_others_service(grantor.id_persona));
    } else {
      if (person.id_persona !== null && person.id_persona !== undefined) {
        void dispatch(get_others_service(person.id_persona));
      }
    }
  }, [person.id_persona, grantor.id_persona]);

  return (
    <>
      <Box
        sx={{ width: '80%', alignItems: 'center', justifyContent: 'center' ,margin: 'auto',}}
      >
        {otros && Array.isArray(otros) && otros.length > 0 ? (
        <Title title="Solicitudes Otros Realizadas" />
        ) : (
          <p></p>
        )}
        {otros && Array.isArray(otros) && otros.length > 0 ? (
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_otros}
            rows={otros}
          />
        ) : (
          <p></p>
        )}
      </Box>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default EstadOtros;
