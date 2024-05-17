/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CleanIcon from '@mui/icons-material/CleaningServices';
import Swal from 'sweetalert2';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { delete_tipo_accion, get_tipo_acciones } from '../services/services';
import { AgregarTipoAccion } from '../components/AgregarTipoAccionCorrectiva';
import { ActualizarAccion } from '../components/EditarTipoAccionCorrectiva';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const GestionAccionesCorrectivas: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre_tipo_accion',
      headerName: 'Nombre Acción Correctiva',
      sortable: true,
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      sortable: true,
      minWidth: 500,
      flex: 2,
    },
    {
      field: 'ACCIONES',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              handle_open_editar();
              set_acciones(params.row);
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
                titleAccess="Editar Acción Correctiva"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
            <IconButton
              onClick={() => {
                confirmar_eliminar_accion(params.row.id_tipo_accion as number);
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
                <DeleteIcon
                  titleAccess="Eliminar Acción Correctiva"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
        </>
      ),
    },
  ];
  const [rows, set_rows] = useState<any[]>([]);
  const [acciones, set_acciones] = useState<any>();
  const [is_crear, set_is_crear] = useState<boolean>(false);
  const [is_editar, set_is_editar] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handle_open_crear = (): void => {
    set_is_crear(true);
  };
  const handle_open_editar = (): void => {
    set_is_editar(true);
  };

  const filterRows = (rows: any[], searchTerm: string) => {
    return rows.filter((row) =>
      row.nombre_tipo_accion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const get_traer_acciones = async (): Promise<void> => {
    try {
      setSearchTerm('');
      const response = await get_tipo_acciones();
      set_rows(filterRows(response, ''));
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const confirmar_eliminar_accion = (id_tipo_accion: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro que deseas eliminar esta acción correctiva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await delete_tipo_accion(id_tipo_accion);
          void get_traer_acciones();
          control_success('La acción correctiva se eliminó correctamente');
        } catch (error: any) {
          control_error(
            error.response.data.detail || 'Algo paso, intente de nuevo'
          );
        }
      }
    });
  };

  const clean_search = (): void => {
    setSearchTerm('');
  }

  useEffect(() => {
    void get_traer_acciones();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '20px 0 20px 0',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Configuraciones básicas acciones" />
        </Grid>
        <Grid item xs={12} sx={{my: 2}}>
          <Button
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR ACCIÓN CORRECTIVA
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '10px' }}>
            <Grid style={{display: 'flex', gap: '1rem'}}>
              <TextField
                label="Buscar acción correctiva"
                size="small"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<CleanIcon />}
                sx={{display: 'flex', justifyContent: 'end'}}
                onClick={clean_search}
              >
              </Button>
            </Grid>
            <ButtonGroup
              style={{
                margin: 7,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {download_xls({ nurseries: rows, columns })}
              {download_pdf({
                nurseries: rows,
                columns,
                title: 'CREAR ACCIÓN',
              })}
            </ButtonGroup>
          </Grid>
          <DataGrid
            // density="compact"
            getRowHeight={() => 'auto'}
            autoHeight
            rows={filterRows(rows, searchTerm)}
            columns={columns}
            getRowId={(row) => row.id_tipo_accion}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            justifyContent="flex-end"
            sx={{ m: '10px 0 20px 0' }}
            direction="row"
            spacing={1}
          ></Stack>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
        justifyContent="flex-end"
      >
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>

      <AgregarTipoAccion
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer_acciones}
      />
      <ActualizarAccion
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer_acciones}
        data_acciones={acciones}
      />
    </>
  );
};
