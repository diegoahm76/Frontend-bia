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
import { eliminar_cuenca, get_cuencas } from '../Request/request';
import type { Cuenca } from '../interfaces/interfaces';
import { AgregarCuenca } from '../Components/Cuencas/AgregarCuenca';
import Swal from 'sweetalert2';
import { ActualizarCuenca } from '../Components/Cuencas/EditarCuenca';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const CuencaScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre Cuenca',
      sortable: true,
      minWidth: 300,
      flex: 3,
    },
    {
      field: 'activo',
      headerName: 'Estado',
      sortable: true,
      minWidth: 100,
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
      headerName: 'Acciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              handle_open_editar();
              set_cuencas(params.row);
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
                titleAccess="Editar cuenca"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {params.row.activo === false && (
            <IconButton
              onClick={() => {
                confirmar_eliminar_cuenca(params.row.id_cuenca as number);
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
                  titleAccess="Eliminar cuenca"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      ),
    },
  ];
  const [rows, set_rows] = useState<Cuenca[]>([]);
  const [cuencas, set_cuencas] = useState<Cuenca>();
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
      row.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const get_traer_cuencas = async (): Promise<void> => {
    try {
      setSearchTerm('');
      const response = await get_cuencas();
      const datos_cuenca = response.map((datos: Cuenca) => ({
        id_cuenca: datos.id_cuenca,
        nombre: datos.nombre,
        activo: datos.activo,
        precargado: datos.precargado,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows(filterRows(datos_cuenca, ''));
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const confirmar_eliminar_cuenca = (id_cuenca: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro que deseas eliminar esta cuenca?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminar_cuenca(id_cuenca);
          void get_traer_cuencas();
          control_success('La cuenca se eliminó correctamente');
        } catch (error: any) {
          control_error(
            error.response.data.detail || 'Algo paso, intente de nuevo'
          );
        }
      }
    });
  };

  useEffect(() => {
    void get_traer_cuencas();
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
          <Title title="Configuraciones básicas cuencas" />
        </Grid>
        <Grid item xs={12} sx={{my: 2}}>
          <Button
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR CUENCA
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '10px' }}>
            <TextField
              label="Buscar cuenca"
              size="small"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                title: 'CREAR CUENCA',
              })}
            </ButtonGroup>
          </Grid>
          <DataGrid
            // density="compact"
            autoHeight
            rows={filterRows(rows, searchTerm)}
            columns={columns}
            getRowId={(row) => row.id_cuenca}
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

      <AgregarCuenca
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer_cuencas}
      />
      <ActualizarCuenca
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer_cuencas}
        data_cuencas={cuencas}
      />
    </>
  );
};
