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
import SearchIcon from '@mui/icons-material/Search';
import { eliminar_codigo_unspsc, get_codigo_unspsc, get_codigo_unspsc_pag } from '../Request/request';
import type { ICodigoUnspsc } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { AgregarCodigoUNSPSC } from '../Components/Codigos UNSPSC/AgregarCodigoUNSPSC';
import { ActualizarCodigoUNSPSC } from '../Components/Codigos UNSPSC/ActualizarCodigoUNSPSC';

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const CodigosUNSPSCScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'codigo_unsp',
      headerName: 'CÓDIGO UNSPSC',
      sortable: true,
      width: 300,
    },
    {
      field: 'nombre_producto_unsp',
      headerName: 'NOMBRE PRODUCTO UNSPSC',
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
              set_codigo(params.row);
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
                titleAccess="Editar código UNSPSC"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {params.row.activo === false && (
            <IconButton
              onClick={() => {
                confirmar_eliminar_codigo(params.row.id_codigo as number);
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
                  titleAccess="Eliminar código UNSPSC"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      ),
    },
  ];
  const [rows, set_rows] = useState<ICodigoUnspsc[]>([]);
  const [codigo, set_codigo] = useState<ICodigoUnspsc>();
  const [is_crear, set_is_crear] = useState<boolean>(false);
  const [is_editar, set_is_editar] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [codeSearch, setCodeSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');

  const handle_open_crear = (): void => {
    set_is_crear(true);
  };
  const handle_open_editar = (): void => {
    set_is_editar(true);
  };

  const get_traer = async () => {
    try {
      if(nameSearch || codeSearch) setPage(1);
      const response = await get_codigo_unspsc_pag(page, nameSearch, codeSearch);
      setCount(response.count);
      const datos = response.results.map((datos: ICodigoUnspsc) => ({
        id_codigo: datos.id_codigo,
        codigo_unsp: datos.codigo_unsp,
        nombre_producto_unsp: datos.nombre_producto_unsp,
        activo: datos.activo,
        registro_precargado: datos.registro_precargado,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows([...datos]);
      console.log(page)
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const confirmar_eliminar_codigo = (id_codigo: number): void => {
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
          await eliminar_codigo_unspsc(id_codigo);
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

  const filterRows = (rows: any[], searchTerm: string) => {
    return rows.filter(
      (row) =>
        row.nombre_producto_unsp
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        row.codigo_unsp.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    void get_traer();
  }, [page]);

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
          <Title title="Configuraciones básicas códigoS UNSPSC" />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ mb: '20px' }}
            variant="outlined"
            onClick={handle_open_crear}
            startIcon={<AddIcon />}
          >
            CREAR CÓDIGO UNSPSC
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
                  title: 'CREAR',
                })}
              </ButtonGroup>
              <TextField
                label="Buscar código UNSPSC"
                size="small"
                variant="outlined"
                value={codeSearch}
                onChange={(e) => setCodeSearch(e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Buscar nombre UNSPSC"
                size="small"
                variant="outlined"
                sx={{marginLeft: '20px'}}
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{marginLeft: '20px'}}
                startIcon={<SearchIcon />}
                onClick={() => {
                  get_traer();
                }}
              >
                Buscar
              </Button>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id_codigo}
                rowCount={count}
                pageSize={10}
                paginationMode="server"
                rowsPerPageOptions={[10]}
                onPageChange={async (newPage: number) => {
                  setPage(newPage + 1);
                }}
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
      <AgregarCodigoUNSPSC
        is_modal_active={is_crear}
        set_is_modal_active={set_is_crear}
        get_datos={get_traer}
      />
      <ActualizarCodigoUNSPSC
        is_modal_active={is_editar}
        set_is_modal_active={set_is_editar}
        get_data={get_traer}
        data={codigo}
      />
    </>
  );
};
