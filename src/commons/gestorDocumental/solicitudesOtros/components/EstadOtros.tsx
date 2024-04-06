/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

import {
  set_pqr_status,
  set_others,
} from '../../PQRSDF/store/slice/pqrsdfSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
// SERVICIO PARA RECUPPERAR OTROS
import {
  control_error,
  get_others_service,
} from '../../PQRSDF/store/thunks/pqrsdfThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AuthSlice } from '../../../auth/interfaces';
import PrimaryForm from '../../../../components/partials/form/PrimaryForm';
import { Title } from '../../../../components/Title';
import OtroDialog from './OtrosDetail';
import { formatDate } from '../../../../utils/functions/formatDate';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';

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
  const [data_loaded, set_data_loaded] = useState(false);
  const [selected_otro, set_selected_otro] = useState<any>(null);
  const [detail_is_active, set_detail_is_active] = useState<boolean>(false);

  const handleSelectionModelChange = (selectionModel: string | any[]) => {
    if (selectionModel.length > 0) {
      // Suponiendo que tus IDs de fila son únicos y puedes encontrar la fila seleccionada en el array 'otros'
      const selectedRow = otros.find(
        (row) => row.id_otros === selectionModel[0]
      );
      set_selected_otro(selectedRow);
    } else {
      set_selected_otro(null);
    }
  };

  useEffect(() => {
    set_detail_is_active(false);
    set_selected_otro({});
  }, [otros]);

  const columns: GridColDef[] = [
    {
      field: 'fecha_registro',
      headerName: 'Fecha de Registro',
      width: 100,
      flex: 1,
      renderCell: (params) =>
        params?.value ? formatDate(params?.value) : 'No hay fecha de registro',
      cellClassName: 'truncate-cell',
    },
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
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.row.nombre_estado_solicitud}
          style={{
            backgroundColor: 'green',
            border: '1px solid #000',
            color: 'white',
          }}
        />
      ),
    },
    {
      field: 'nro_folios_totales',
      headerName: 'Número de folios ',
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
          onClick={() => {
            set_detail_is_active(true);
            handleSelectionModelChange([params.row.id_otros]);
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
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (grantor.id_persona !== null && grantor.id_persona !== undefined) {
        const result = await dispatch(get_others_service(grantor.id_persona));
        if (result.success) {
          set_data_loaded(true);
        } else {
          control_error('No se encontraron otros');
        }
      } else {
        if (person.id_persona !== null && person.id_persona !== undefined) {
          const result = await dispatch(get_others_service(person.id_persona));
          if (result.success) {
            set_data_loaded(true);
          } else {
            control_error('No se encontraron otros');
          }
        }
      }
    };

    fetchData();
  }, [person.id_persona, grantor.id_persona]);
  console.log('otros', otros);
  console.log('data_loaded', data_loaded);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        {data_loaded && (
          <Box
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto',
            }}
          >
            {otros && Array.isArray(otros) && otros.length > 0 ? (
              <>
                <RenderDataGrid
                  columns={columns}
                  rows={otros}
                  title="Solicitudes Otros Realizadas"
                />

                {/*<Title title="Solicitudes Otros Realizadas" />
                <DataGrid
                  density="compact"
                  autoHeight
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id_otros}
                  rows={otros}
                  onSelectionModelChange={handleSelectionModelChange}
                />*/}
              </>
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mt: 2 }}
              >
                No tiene solicitudes de otros
              </Typography>
            )}
          </Box>
        )}
      </Box>
      <OtroDialog
        is_modal_active={detail_is_active}
        set_is_modal_active={set_detail_is_active}
        selected_otro={selected_otro}
      />
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default EstadOtros;
