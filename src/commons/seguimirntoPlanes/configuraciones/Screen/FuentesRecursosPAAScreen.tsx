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
import {
  eliminar_fuente_recurso_paa,
  get_fuente_recurso_paa,
} from '../Request/request';
import type { IFuenteRecursoPAA } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { ActualizarFuentesRecursosPAA } from '../Components/FuentesRecursosPaa/ActualizarFuentesRecursosPAA';
import { AgregarFuentesRecursosPAA } from '../Components/FuentesRecursosPaa/AgregarFuentesRecursosPAA';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const FuentesRecursosPAAScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre_fuente',
      headerName: 'NOMBRE FUENTE',
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
              set_fuente(params.row);
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
                titleAccess="Editar fuente de recursos PAA"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {params.row.activo === false && (
            <IconButton
              onClick={() => {
                confirmar_eliminar_fuente(params.row.id_fuente as number);
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
                  titleAccess="Eliminar fuente de recursos PAA"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      ),
    },
  ];
  const [rows, set_rows] = useState<IFuenteRecursoPAA[]>([]);
  const [fuente, set_fuente] = useState<IFuenteRecursoPAA>();
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
  }

  const filterRows = (rows: any[], searchTerm: string) => {
    return rows.filter((row) =>
      row.nombre_fuente.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const get_traer = async (): Promise<void> => {
    try {
      setSearchTerm('')
      const response = await get_fuente_recurso_paa();
      const datos = response.map((datos: IFuenteRecursoPAA) => ({
        id_fuente: datos.id_fuente,
        nombre_fuente: datos.nombre_fuente,
        activo: datos.activo,
        registro_precargado: datos.registro_precargado,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows(filterRows(datos, ''));
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const confirmar_eliminar_fuente = (id_fuente: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminar_fuente_recurso_paa(id_fuente);
          void get_traer();
          control_success('se eliminó correctamente el registro');
        } catch (error: any) {
          control_error(
            error.response.data.detail || 'Algo paso, intente de nuevo'
          );
        }
      }
    });
  };

  useEffect(() => {
    void get_traer();
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
          <Title title="Configuraciones básicas fuentes de recursos PAA" />
        </Grid>
        <Grid item xs={12} sx={{my: 2}}>
          <Button
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR FUENTE
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '10px' }}>
            <Grid style={{display: 'flex', gap: '1rem'}}>
              <TextField
                label="Buscar fuente"
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
                title: 'CREAR FUENTE',
              })}
            </ButtonGroup>
          </Grid>
          <DataGrid
            autoHeight
            rows={filterRows(rows, searchTerm)}
            columns={columns ?? []}
            getRowId={(row) => row.id_fuente}
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
      <AgregarFuentesRecursosPAA
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer}
      />
      <ActualizarFuentesRecursosPAA
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer}
        data={fuente}
      />
    </>
  );
};
