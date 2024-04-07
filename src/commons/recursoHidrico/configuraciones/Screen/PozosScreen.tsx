/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Avatar, Button, ButtonGroup, Chip, Grid, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { eliminar_pozo, get_pozo } from '../Request/request';
import type { Pozo } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { AgregarPozo } from '../Components/AgregarPozo';
import { ActualizarPozo } from '../Components/ActualizarPozo';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { v4 as uuidv4 } from 'uuid';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const PozosScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'cod_pozo',
      headerName: 'CODIGO',
      sortable: true,
      width: 100,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE POZO',
      sortable: true,
      width: 200,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
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
              set_pozo(params.row);
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
                titleAccess="Editar Pozo"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {params.row.activo === false && (
            <>
              <IconButton
                onClick={() => {
                  confirmar_eliminar_pozo(params.row.id_pozo as number);
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
                    titleAccess="Eliminar Pozo"
                    sx={{
                      color: 'red',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </>
          )}
        </>
      ),
    },
  ];
  const [rows, set_rows] = useState<Pozo[]>([]);
  const [pozo, set_pozo] = useState<Pozo>();
  const [is_crear, set_is_crear] = useState<boolean>(false);
  const [is_editar, set_is_editar] = useState<boolean>(false);

  const handle_open_crear = (): void => {
    set_is_crear(true);
  };
  const handle_open_editar = (): void => {
    set_is_editar(true);
  };

  const get_traer_pozo = async (): Promise<void> => {
    try {
      const response = await get_pozo();
      const datos_pozo = response.map((datos: Pozo) => ({
        id_pozo: datos.id_pozo,
        cod_pozo: datos.cod_pozo,
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        precargado: datos.precargado,
        activo: datos.activo,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows(datos_pozo);
      //  console.log('')(datos_pozo, 'datos_pozo');
    } catch (error: any) {
      control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };
  const confirmar_eliminar_pozo = (id_pozo: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro que deseas eliminar este pozo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminar_pozo(id_pozo);
        void get_traer_pozo();
        control_success('El pozo se eliminó correctamente');
      }
    });
  };

  useEffect(() => {
    void get_traer_pozo();
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
          <Title title="Configuraciones básicas pozos" />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ mb: '20px' }}
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR POZO
          </Button>
        </Grid>
        <Grid item xs={12}>
          {rows.length > 0 && (
            <>
              <ButtonGroup
                style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
              >
                {download_xls({ nurseries: rows, columns })}
                {download_pdf({ nurseries: rows, columns, title: ' CREAR POZO' })}
              </ButtonGroup> 
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                getRowId={(row) => uuidv4()}
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
      </Grid>
      <AgregarPozo
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer_pozo}
      />
      <ActualizarPozo
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer_pozo}
        data={pozo}
      />
    </>
  );
};
