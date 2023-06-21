import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Tooltip,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  Grid,
  Divider,
  Button,
  Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { get_busqueda_avanzada_user_organigrama } from '../../store/thunks/organigramThunks';
import { type UserDelegacionOrganigrama } from '../../interfaces/organigrama';
import type { FormValues, IProps } from './types/types';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogBusquedaAvanzadaUserOrganigrama = ({
  is_modal_active,
  set_is_modal_active,
  search_result
}: IProps) => {
  const dispatch = useDispatch();
  const {
    // handleSubmit: handle_submit_search_user,
    // setValue: set_value_search_user,
    // register: register_search_user,
    watch
  } = useForm<FormValues>({
    defaultValues: {
      nombre_usuario: ''
    }
  });
  const [data_search_result, set_data_search_result] = useState<
    UserDelegacionOrganigrama[]
  >([]);

  const advanced_user_search_data_form = watch();

  const handle_close_busqueda_avanzada_usuario = (): void => {
    set_is_modal_active(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'tipo_documento',
      headerName: 'Tipo de documento',
      width: 200,
      editable: true
    },
    {
      field: 'numero_documento',
      headerName: 'Número documento',
      width: 200,
      editable: true
    },
    { field: 'nombre_completo', headerName: 'Nombre completo', width: 350 },
    {
      field: 'acciones',
      headerName: 'Seleccionar',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Tooltip title="Seleccionar usuario">
          <IconButton
            onClick={() => {
              search_result(params.row);
              handle_close_busqueda_avanzada_usuario();
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid'
              }}
              variant="rounded"
            >
              <PersonAddIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      )
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const on_submit = async (): Promise<any> => {
    try {
      const response = await dispatch(
        get_busqueda_avanzada_user_organigrama(
          advanced_user_search_data_form.nombre_usuario
        )
      );
      console.log(response.data)
      set_data_search_result(response.data);
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
      // Optionally, you can set a default value for set_data_search_result or handle the error in another way
    }
  };

  // Establece los valores del formulario
  /*  const set_value_form = (name: string, value: string): void => {
    console.log(`${name} : `, value);
    set_value_search_user(name as keys_object, value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  }; */

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={handle_close_busqueda_avanzada_usuario}
    >
      <DialogTitle>
        Busqueda avanzada de usuario
        <IconButton
          aria-label="close"
          onClick={() => {
            set_is_modal_active(false);
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form
          onSubmit={()=> {
            console.log('submit')
          }}
          style = {{
            padding: '2',
            border: '1px dashed grey'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Nombre usuario"
                size="small"
                disabled={false}
                // {...register_search_user('nombre_usuario')}
                // onChange={handle_change}
                value={advanced_user_search_data_form.nombre_usuario}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Stack>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ height: '100% !important' }}
                  startIcon={<SearchIcon />}
                ></Button>
              </Stack>
            </Grid>
          </Grid>
        </form>

        <DataGrid
          density="compact"
          autoHeight
          rows={data_search_result}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.id_persona}
        />
      </DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="outlined"
            onClick={handle_close_busqueda_avanzada_usuario}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogBusquedaAvanzadaUserOrganigrama;
