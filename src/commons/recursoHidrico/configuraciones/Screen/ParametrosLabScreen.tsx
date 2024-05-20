/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Avatar, Button, ButtonGroup, Chip, Grid, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { eliminar_parametros, get_parametros } from '../Request/request';
import type { Parametros } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { AgregarParametro } from '../Components/AgregarParametro';
import { ActualizarParametro } from '../Components/ActualizarParametro';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { v4 as uuidv4 } from 'uuid';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const ParametrosLabScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'cod_tipo_parametro',
      headerName: 'TIPO PARAMETRO',
      sortable: true,
      width: 150,
      renderCell: (params) => {
        const cod_tipo_parametro = params.value;
        return cod_tipo_parametro === 'FQ' ? (
          <span>Fisicoquímico</span>
        ) : cod_tipo_parametro === 'MB' ? (
          <span>Microbiológico</span>
        ) : (
          <span>{cod_tipo_parametro}</span>
        );
      },
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE PARAMETRO',
      sortable: true,
      width: 200,
    },
    {
      field: 'unidad_de_medida',
      headerName: 'UNIDAD DE MEDIDA',
      sortable: true,
      width: 200,
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
              set_parametros(params.row);
              //  console.log('')(params.row);
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
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {params.row.activo === false && (
            <>
              <IconButton
                onClick={() => {
                  confirmar_eliminar_parametro(
                    params.row.id_parametro as number
                  );
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

  const initial_state: Parametros = {
    id_parametro: 0,
    cod_tipo_parametro: '',
    unidad_de_medida: '',
    nombre: '',
    activo: true,
    precargado: false,
    item_ya_usado: false,
  };

  const [rows, set_rows] = useState<Parametros[]>([]);
  const [parametros, set_parametros] = useState(initial_state);
  const [is_crear, set_is_crear] = useState<boolean>(false);
  const [is_editar, set_is_editar] = useState<boolean>(false);

  const handle_open_crear = (): void => {
    set_is_crear(true);
  };
  const handle_open_editar = (): void => {
    set_is_editar(true);
  };

  const get_traer_parametros = async (): Promise<void> => {
    try {
      const response = await get_parametros();
      const datos_parametros = response.map((datos: Parametros) => ({
        id_parametro: datos.id_parametro,
        cod_tipo_parametro: datos.cod_tipo_parametro,
        unidad_de_medida: datos.unidad_de_medida,
        nombre: datos.nombre,
        precargado: datos.precargado,
        activo: datos.activo,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows(datos_parametros);
    } catch (error: any) {
      control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };
  const confirmar_eliminar_parametro = (id_parametro: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro que deseas eliminar este parametro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminar_parametros(id_parametro);
        void get_traer_parametros();
        control_success('El paramatro se eliminó correctamente');
      }
    });
  };

  useEffect(() => {
    void get_traer_parametros();
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
          <Title title="Configuraciones básicas parámetros" />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ mb: '20px' }}
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR PARÁMETRO
          </Button>
        </Grid>
        <Grid item xs={12}>
          {rows.length > 0 && (
            <>
              <ButtonGroup
                style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
              >
                {download_xls({ nurseries: rows, columns })}
                {download_pdf({ nurseries: rows, columns, title: 'Resultados de la búsqueda' })}
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
      <AgregarParametro
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer_parametros}
      />
      <ActualizarParametro
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer_parametros}
        data={
          parametros /* ?? {
            id_parametro: 0,
            cod_tipo_parametro: '',
            nombre: '',
            unidad_de_medida: '',
            precargado: false,
            activo: false,
            item_ya_usado: false,
          } */
        }
      />
    </>
  );
};
