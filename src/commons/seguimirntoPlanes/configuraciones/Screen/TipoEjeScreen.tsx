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
import { eliminar_tipos_eje, get_tipos_eje } from '../Request/request';
import type { TiposEjes } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { ActualizarTipoEje } from '../Components/TiposEje/ActualizarTipoEje';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { v4 as uuidv4 } from 'uuid';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { AgregarTipoEje } from '../Components/ODS/AgregarTipoEje';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const TipoEjeScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre_tipo_eje',
      headerName: 'NOMBRE EJE ESTRATÉGICO',
      sortable: true,
      minWidth: 300,
      flex: 3,
    },
    {
      field: 'activo',
      headerName: 'ESTADO',
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
      headerName: 'ACCIONES',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              handle_open_editar();
              set_tipo_eje(params.row);
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
                titleAccess="Editar eje"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {params.row.activo === false && (
            <>
              <IconButton
                onClick={() => {
                  confirmar_eliminar_tipo_eje(params.row.id_tipo_eje as number);
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
                    titleAccess="Eliminar eje"
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

  const initial_state: TiposEjes = {
    id_tipo_eje: 0,
    nombre_tipo_eje: '',
    activo: true,
    registro_precargado: false,
    item_ya_usado: false,
  };

  const [rows, set_rows] = useState<TiposEjes[]>([]);
  const [tipo_eje, set_tipo_eje] = useState(initial_state);
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
      row.nombre_tipo_eje.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const get_traer_tipo_eje = async (): Promise<void> => {
    try {
      setSearchTerm('')
      const response = await get_tipos_eje();
      const datos_tipo_eje = response.map((datos: TiposEjes) => ({
        id_tipo_eje: datos.id_tipo_eje,
        nombre_tipo_eje: datos.nombre_tipo_eje,
        registro_precargado: datos.registro_precargado,
        activo: datos.activo,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows(filterRows(datos_tipo_eje, ''));
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const confirmar_eliminar_tipo_eje = (id_tipo_eje: number): void => {
    void Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro que deseas eliminar este tipo de eje estrategico ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminar_tipos_eje(id_tipo_eje);
        void get_traer_tipo_eje();
        control_success('El tipo de eje estrategico se eliminó correctamente');
      }
    });
  };

  useEffect(() => {
    void get_traer_tipo_eje();
  }, []);

  const clean_search = (): void => {
    setSearchTerm('');
  }


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
          <Title title="Configuraciones básicas tipos de eje estrategico" />
        </Grid>
        <Grid item xs={12} sx={{my: 2}}>
          <Button
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR EJE
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '10px' }}>
            <section style={{display: 'flex', gap: '1rem'}}>
              <TextField
                label="Buscar tipo de eje estrategico"
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
            </section>
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
                title: 'Resultados de la búsqueda',
              })}
            </ButtonGroup>
          </Grid>
          <DataGrid
            getRowHeight={() => 'auto'}
            autoHeight
            rows={filterRows(rows, searchTerm)}
            columns={columns}
            getRowId={(row) => row.id_tipo_eje}
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

      <AgregarTipoEje
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer_tipo_eje}
      />
      <ActualizarTipoEje
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer_tipo_eje}
        data={tipo_eje}
      />
    </>
  );
};
