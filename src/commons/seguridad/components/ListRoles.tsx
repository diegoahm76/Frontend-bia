import { type Dispatch, type SetStateAction, useEffect } from 'react';
// Componentes de Material UI
import { Grid, Box, IconButton, Avatar } from '@mui/material';
// Icons de Material UI
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { get_roles } from '../store/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { type IRolesInfo } from '../interfaces';

interface IProps {
  set_position_tab_admin_roles: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListRoles({
  set_position_tab_admin_roles,
}: IProps): JSX.Element {
  const roles = useSelector((state: IRolesInfo) => state.roles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_roles());
    console.log(roles);
  }, []);

  const columns: GridColDef[] = [
    {
      headerName: 'ID',
      field: 'id_rol',
      minWidth: 150,
      // visible: true,
    },
    {
      headerName: 'Nombre',
      field: 'nombre_rol',
      minWidth: 300,
      // visible: true,
    },
    {
      headerName: 'Descripción',
      field: 'descripcion_rol',
      minWidth: 300,
      // visible: true,
    },
    {
      headerName: 'Estado',
      field: 'Rol_sistema',
      minWidth: 150,
      // visible: true,
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
          // onClick={() => {
          //   dispatch(get_ccd_current(params.data));
          //   set_is_modal_active(false);
          // }}
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
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions

            <DataGrid
              density="compact"
              autoHeight
              rows={roles}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.id_rol}
            />
          }
        </Box>
      </Grid>
    </>
  );
}
