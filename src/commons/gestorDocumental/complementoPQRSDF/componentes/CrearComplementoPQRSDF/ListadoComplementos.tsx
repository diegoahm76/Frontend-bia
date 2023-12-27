import { useEffect, useState } from 'react';

import { api } from '../../../../../api/axios';
import { type Persona } from '../../../../../interfaces/globalModels';
import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { v4 as uuid } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import {
  set_type_applicant,
  set_on_behalf_of,
  initial_state_person,
  initial_state_company,
  set_attorney,
  set_person,
  set_company,
  set_grantor,
  set_pqrs,
  set_pqr_status,
  set_complement_pqr,
  initial_state_complemento,
  reset_state,
  set_exhibits,
} from '../../store/slice/complementoPqrsdfSlice';
import FormButton from '../../../../../components/partials/form/FormButton';
import { IObjComplementPqr } from '../../interfaces/complemento_pqrsdf';
import { delete_complemento_pqrsdf_service } from '../../store/thunks/complementoPqrsdfThunks';
interface IProps {
  delete_function: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoComplementos = ({ delete_function }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    presentation_types,
    pqr_types,
    media_types,
    destination_offices,
    type_applicant,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const { complement_pqrs, complement_pqr, pqr } = useAppSelector(
    (state) => state.complemento_pqrsdf_slice
  );
  const [selected_row, set_selected_row] = useState([]);

  const columns_complemento: GridColDef[] = [
    {
      field: 'tipo_tramite',
      headerName: 'Tipo de tramite',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ?? 'Complemento PQRSDF'}
        </div>
      ),
    },
    {
      field: 'fecha_radicado',
      headerName: 'Fecha de radicado',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_radicado_complemento',
      headerName: 'Número de radicado',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ?? 'Sin radicar'}
        </div>
      ),
    },

    {
      field: 'modo_solicitud_complemento',
      headerName: 'Modo de solicitud',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 90,
      renderCell: (params) => (
        <>
          {params.row.id_radicado === null ? (
            <>
              <Tooltip title="Editar">
                <IconButton
                  onClick={() => {
                    edit_complement(params.row);
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
                    <EditIcon
                      sx={{
                        color: 'primary.main',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  view_complement(params.row);
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  // useEffect(() => {
  //   reset(pqr);
  // }, []);
  // useEffect(() => {
  //   reset(pqr);
  // }, [pqr]);
  const add_complement = (): void => {
    dispatch(set_complement_pqr(initial_state_complemento));
    dispatch(set_exhibits([]));
  };
  const edit_complement = (item: IObjComplementPqr): void => {
    dispatch(set_complement_pqr(item));
  };
  const view_complement = (item: IObjComplementPqr): void => {
    dispatch(set_complement_pqr(item));
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <DataGrid
          density="compact"
          autoHeight
          rows={complement_pqrs}
          columns={columns_complemento}
          pageSize={10}
          rowsPerPageOptions={[10]}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={(row) =>
            row['idComplementoUsu_PQR' ?? uuid()] === null
              ? uuid()
              : row['idComplementoUsu_PQR' ?? uuid()]
          }
        />
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={add_complement}
              icon_class={null}
              disabled={false}
              label={'Crear complemento'}
              type_button="button"
              color_button="warning"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoComplementos;
