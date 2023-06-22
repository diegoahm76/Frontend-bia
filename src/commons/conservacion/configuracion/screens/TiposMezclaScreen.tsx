/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// Componentes de Material UI
import {
  Grid,
  Box,
  IconButton,
  Avatar,
  Chip,
  Tooltip,
  // Stack,3
  Button,
  TextField,
  Divider,

} from '@mui/material';
// Icons de Material UI
// import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
// Componentes personalizados
import { Title } from '../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks
import { get_mixtures_service, delete_mixture_service, activate_deactivate_mixture_service } from '../store/thunks/configuracionThunks';
import AddMixtureDialogForm from '../componentes/AddMixtureDialogForm';
// // Slices
import { current_mixture } from '../store/slice/configuracionSlice';
import ButtonGroup from '@mui/material/ButtonGroup';
import 'jspdf-autotable';
import JsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const initial_state_current_mixture = {
  id_mezcla: null,
  unidad_medida: "",
  nombre: "",
  item_activo: true,
  item_ya_usado: false,
  id_unidad_medida: null
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function TiposMezclaScreen(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [action, set_action] = useState<string>("create");
  const { mixtures } = useAppSelector((state) => state.configuracion);
  const [add_mixture_is_active, set_add_mixture_is_active] =
    useState<boolean>(false);
  const [searchtext, setsearchtext] = useState('');
  const [filterednurseries, setfilterednurseries] = useState<any[]>(mixtures);

  const columns: GridColDef[] = [
    { field: 'id_mezcla', headerName: 'ID', width: 20 },
    { field: 'id_unidad_medida', headerName: 'ID', width: 20 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'unidad_medida',
      headerName: 'Unidad medida',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === null ? "Sin definir" : params.value}
        </div>
      ),

    },
    {
      field: 'item_activo',
      headerName: '¿Activo?',
      width: 100,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return (params.row.item_activo) ?
          (
            <Chip size="small" label="ACTIVO" color="success" variant="outlined" />
          )
          :
          (
            <Chip size="small" label="INACTIVO" color="error" variant="outlined" />
          )

      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <>
          <Tooltip title="Detalle">
            <IconButton
              onClick={() => {
                dispatch(current_mixture(params.row));
                set_action("detail")
                set_add_mixture_is_active(true)
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
                <ArticleIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />

              </Avatar>
            </IconButton>
          </Tooltip>
          {params.row.item_ya_usado ? null :
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  dispatch(current_mixture(params.row));
                  set_action("edit")
                  set_add_mixture_is_active(true)
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
            </Tooltip>
          }
          <Tooltip title={params.row.item_activo ? "Desactivar" : "Activar"}>
            <IconButton
              onClick={() => {
                dispatch(activate_deactivate_mixture_service(params.row, params.row.id_mezcla));
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
                {params.row.item_activo ?
                  <BlockIcon // icon desactivar
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  /> :
                  <DoneOutlineIcon // icon activar
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />
                }

              </Avatar>
            </IconButton>
          </Tooltip>
          {params.row.item_ya_usado ? null :
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => {
                  dispatch(delete_mixture_service(params.row.id_mezcla));
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
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />

                </Avatar>
              </IconButton>
            </Tooltip>
          }
        </>
      ),
    },
  ];

  // useEffect(() => {
  //   void dispatch(get_mixtures_service());
  // }, []);
  useEffect(() => {
    void dispatch(get_mixtures_service()).then((response: any) => {
      console.log(response);
      setfilterednurseries(response.data);
    }
    );
  }, [dispatch]);

  const button_style = {
    color: 'white',
    backgroundColor: '#335B1E',
    border: '3px solid black',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  };

  const export_to_excel = (): void => {
    const rows = document.querySelectorAll('.MuiDataGrid-row');
    const header_cells = document.querySelectorAll('.MuiDataGrid-cell--header');
    const data: any[][] = [];

    const headers = Array.from(header_cells).map((cell) => cell.textContent);

    rows.forEach((row) => {
      const row_data: any[] = [];
      const cells = row.querySelectorAll('.MuiDataGrid-cell');

      cells.forEach((cell) => {
        row_data.push(cell.textContent);
      });

      data.push(row_data);
    });

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    const file_id = Math.random(); // Reemplaza con la variable que contenga el ID
    const file_name = `Tipos de mezcla_${file_id}.xlsx`; // Nombre del archivo con el ID concatenado

    XLSX.writeFile(workbook, file_name);
  };

  const export_pdf = (): void => {
    const doc = new JsPDF();

    const data: any[][] = [];
    const headers: any[] = [];

    // Obtener los nombres de las columnas de la cuadrícula
    columns.forEach((column) => {
      headers.push(column.headerName);
    });

    // Obtener los datos de las filas de la cuadrícula
    mixtures.forEach((row) => {
      const row_data: any[] = [];

      columns.forEach((column) => {
        const cell_data = row[column.field as keyof typeof row];
        row_data.push(cell_data);
      });

      data.push(row_data);
    });

    (doc as any).autoTable({
      head: [headers],
      body: data,
    });

    const file_id = Math.random(); // Reemplaza con la variable que contenga el ID
    const file_name = `Tipos de mezcla_${file_id}.pdf`; // Nombre del archivo con el ID concatenado

    doc.save(file_name);
  };
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} spacing={2}>
              <Title title="Tipos de mezcla"></Title>
            </Grid>

            <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => {
                  dispatch(current_mixture(initial_state_current_mixture));
                  set_action("create")
                  set_add_mixture_is_active(true);
                }}
              >
                Crear mezcla
              </Button>
              <Divider 
              // style={{ marginTop: '10px' }}
               />
            </Grid>
            <Divider style={{ width: '98%', marginTop: '8px', marginBottom: '8px',marginLeft: 'auto' }} />

            <Grid item xs={10}>
              
              <TextField
                label="Buscar"
                value={searchtext}
                onChange={(e) => {
                  setsearchtext(e.target.value)
                }}
                variant="outlined"
                size="small"
                style={{ marginBottom: '10px' }}
              />
              <Button
                variant="contained"
                style={{ marginLeft: '4px', top: '2px' }}
                onClick={() => {
                  const filterednurseries = mixtures.filter((mixtures) =>
                    mixtures.nombre.toLowerCase().includes(searchtext.toLowerCase())
                  );
                  setfilterednurseries(filterednurseries);
                }}

              >
                <SearchIcon />
              </Button>
            </Grid>
            <Grid item xs={2}>
              <ButtonGroup style={{ margin: 7 }}  >
                <Button style={button_style} onClick={export_to_excel}>
                  <i className="pi pi-file-excel"></i>
                </Button>
                <Button style={button_style} onClick={export_pdf}>
                  <i className="pi pi-file-pdf"></i>
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Divider />
          <Grid item sx={{ marginTop: '20px', }}>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={filterednurseries}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_mezcla}
              />
            </Box>
          </Grid>
          <AddMixtureDialogForm
            is_modal_active={add_mixture_is_active}
            set_is_modal_active={set_add_mixture_is_active}
            action={action}
          />
        </Grid>
      </Grid>
    </>
  );
}

