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
import { eliminar_tipos, get_tipos } from '../Request/request';
import type { ITipos } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { AgregarTipos } from '../Components/Tipos/AgregarTipos';
import { ActualizarTipos } from '../Components/Tipos/ActualizarTipos';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const TiposScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre_tipo',
      headerName: 'NOMBRE TIPO',
      sortable: true,
      width: 300,
    },
    {
      field: 'activo',
      headerName: 'ESTADO',
      sortable: true,
      width: 120,
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
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              handle_open_editar();
              set_tipos(params.row);
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
                titleAccess="Editar tipo"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {params.row.activo === false && (
            <IconButton
              onClick={() => {
                confirmar_eliminar_tipos(params.row.id_tipo as number);
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
                  titleAccess="Eliminar tipo"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      ),
    },
  ];
  const [rows, set_rows] = useState<ITipos[]>([]);
  const [tipos, set_tipos] = useState<ITipos>();
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
    console.log('rows', rows);
    console.log('searchTerm', searchTerm);
    return rows.filter((row) =>
      row.nombre_tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const limpiar = async (): Promise<void> => {
    setSearchTerm('');
  };

  const get_traer_tipos = async (): Promise<void> => {
    try {
      await limpiar();
      const response = await get_tipos();
      const datos_tipos = response.map((datos: ITipos) => ({
        id_tipo: datos.id_tipo,
        nombre_tipo: datos.nombre_tipo,
        activo: datos.activo,
        registro_precargado: datos.registro_precargado,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows(filterRows(datos_tipos, ''));
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const confirmar_eliminar_tipos = (id_tipo: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro que deseas eliminar este tipo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminar_tipos(id_tipo);
          void get_traer_tipos();
          control_success('El tipo se eliminó correctamente');
        } catch (error: any) {
          control_error(
            error.response.data.detail || 'Algo paso, intente de nuevo'
          );
        }
      }
    });
  };

  useEffect(() => {
    void get_traer_tipos();
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
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Configuraciones básicas tipos" />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ mb: '20px' }}
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR TIPOS
          </Button>
        </Grid>
        <Grid item xs={12}>
          {rows.length > 0 && (
            <>
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
                  title: 'CREAR TIPOS',
                })}
              </ButtonGroup>
              <TextField
                label="Buscar tipo"
                size="small"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <DataGrid
                autoHeight
                rows={filterRows(rows, searchTerm)}
                columns={columns}
                getRowId={(row) => row.id_tipo}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack
            justifyContent="flex-end"
            sx={{ m: '10px 0 20px 0' }}
            direction="row"
            spacing={1}
          ></Stack>
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
      </Grid>
      <AgregarTipos
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer_tipos}
      />
      <ActualizarTipos
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer_tipos}
        data={tipos}
      />
    </>
  );
};
