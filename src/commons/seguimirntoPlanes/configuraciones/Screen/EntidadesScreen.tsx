/* eslint-disable @typescript-eslint/naming-convention */
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
import { eliminar_entidades, get_entidades } from '../Request/request';
import type { IEntidades } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { ActualizarEntidad } from '../Components/Entidades/ActualizarEntidad';
import { AgregarEntidad } from '../Components/Entidades/AgregarEntidad';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const EntidadesScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre_entidad',
      headerName: 'NOMBRE ENTIDAD',
      sortable: true,
      minWidth: 300,
      flex: 1
    },
    {
      field: 'activo',
      headerName: 'ESTADO',
      sortable: true,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return params.row.activo === true ? (
          <Chip
            size="small"
            label="Activo"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="Inactivo"
            color="error"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              handle_open_editar();
              set_entidad(params.row);
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
                titleAccess="Editar entidad"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {params.row.activo === false && (
            <IconButton
              onClick={() => {
                confirmar_eliminar_entidad(params.row.id_entidad as number);
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
                  titleAccess="Eliminar entidad"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      ),
    },
  ];
  const [rows, set_rows] = useState<IEntidades[]>([]);
  const [entidad, set_entidad] = useState<IEntidades>();
  const [is_crear, set_is_crear] = useState<boolean>(false);
  const [is_editar, set_is_editar] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handle_open_crear = (): void => {
    set_is_crear(true);
  };
  const handle_open_editar = (): void => {
    set_is_editar(true);
  };

  const clean_search = () => {
    setSearchTerm('');
  };

  const get_traer_entidad = async () => {
    try {
      setSearchTerm('');
      const response = await get_entidades();
      const datos_entidad = response.map((datos: IEntidades) => ({
        id_entidad: datos.id_entidad,
        nombre_entidad: datos.nombre_entidad,
        activo: datos.activo,
        registro_precargado: datos.registro_precargado,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows(filterRows(datos_entidad, ''));
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const confirmar_eliminar_entidad = (id_entidad: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro que deseas eliminar esta entidad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminar_entidades(id_entidad);
          void get_traer_entidad();
          control_success('La entidad se eliminó correctamente');
        } catch (error: any) {
          control_error(
            error.response.data.detail || 'Algo paso, intente de nuevo'
          );
        }
      }
    });
  };

  useEffect(() => {
    void get_traer_entidad();
  }, []);

  const filterRows = (rows: any[], searchTerm: string) => {
    return rows.filter((row) =>
      row.nombre_entidad.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Configuraciones básicas entidad" />
        </Grid>
        <Grid item xs={12} sx={{my: 2}}>
          <Button
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR ENTIDAD
          </Button>
        </Grid>
        <Grid item xs={12}>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '10px' }}>
            <Grid style={{display: 'flex', gap: '1rem'}}>
              <TextField
                label="Buscar entidad"
                variant="outlined"
                size='small'
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
                title: 'CREAR ENTIDAD',
              })}
            </ButtonGroup>
          </Grid>
          <DataGrid
            autoHeight
            rows={filterRows(rows, searchTerm)}
            columns={columns}
            getRowId={(row) => row.id_entidad}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowHeight={() => 'auto'}
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

      <AgregarEntidad
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer_entidad}
      />
      <ActualizarEntidad
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer_entidad}
        data={entidad}
      />
    </>
  );
};
