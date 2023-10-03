/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Button, Grid, Link, TextField } from "@mui/material"
import { DataGrid, type GridValueFormatterParams, type GridColDef, GridToolbar } from "@mui/x-data-grid"
import { Title } from "../../../../components"
import type { AtributoEtapa, ValoresProceso } from "../../interfaces/proceso";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import { CollapsibleButton } from "../CollapsibleButton";

interface IProps {
  rows_atributos: AtributoEtapa[][];
  input_values: Record<string, string>;
  input_files: Record<string, File>;
  valores_proceso: ValoresProceso[][];
  etapa_actual: string;
  handle_input_change: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  handle_file_change: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  handle_post_valores_sin_archivo: (id_atributo: string, value: string) => void;
  handle_post_valores_con_archivo: (id_atributo: string, value: File) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const CobroCoactivo: React.FC<IProps> = ({
  rows_atributos,
  input_values,
  input_files,
  valores_proceso,
  etapa_actual,
  handle_input_change,
  handle_file_change,
  handle_post_valores_sin_archivo,
  handle_post_valores_con_archivo
}: IProps) => {
  const column_atributos: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID atributo',
      width: 90,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      width: 200,
    },
    {
      field: 'obligatorio',
      headerName: 'Obligatorio',
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        return params.value ? 'Si' : 'No';
      }
    },
    {
      field: 'id_tipo',
      headerName: 'Tipo',
      width: 200,
      valueGetter: (params) => {
        return params.value.tipo;
      }
    },
    {
      field: 'input',
      headerName: 'Input',
      width: 400,
      renderCell: (params) => {
        return (
          <>
            {get_input(params.row.id_tipo.tipo, params.row.id)}
          </>
        );
      }
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => {
        if (params.row.id_tipo.tipo === 'Documento') {
          return (
            <Button
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              fullWidth
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              disabled={input_files[`${params.row.id}-${params.row.id_tipo.tipo}`].name === ''}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                handle_post_valores_con_archivo(params.row.id, input_files[`${params.row.id}-${params.row.id_tipo.tipo}`]);
              }}
            >
              Guardar
            </Button>
          );
        }
        return (
          <Button
            type="submit"
            color="primary"
            variant="contained"
            startIcon={<SaveIcon />}
            fullWidth
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            disabled={input_values[`${params.row.id}-${params.row.id_tipo.tipo}`] === ''}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              handle_post_valores_sin_archivo(params.row.id, input_values[`${params.row.id}-${params.row.id_tipo.tipo}`]);
            }}
          >
            Guardar
          </Button>
        );
      }
    }
  ];

  const column_valores_proceso: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID Valor',
      width: 90
    },
    {
      field: 'id_atributo',
      headerName: 'Atributo',
      width: 200,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return params.value.descripcion;
      }
    },
    {
      field: 'obligatorio',
      headerName: 'Obligatorio',
      width: 200,
      valueGetter: (params) => {
        return params.row.id_atributo.obligatorio || '';
      }
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 200,
      valueGetter: (params) => {
        return params.row.id_atributo.id_tipo.tipo || '';
      }
    },
    {
      field: 'valor',
      headerName: 'Valores',
      width: 200,
    },
    {
      field: 'documento',
      headerName: 'Documento',
      width: 200,
    },
    {
      field: 'valor_guardado',
      headerName: 'Valor',
      minWidth: 400,
      renderCell: (params) => {
        return params.row.valor ?
          <span>{params.row.valor || ''}</span> :
          <Link
            href={`https://back-end-bia-beta.up.railway.app/static${params.row.documento as string || ''}`}
          >
            {(params.row.documento as string).slice(7)}
          </Link>;
      }
    }
  ];

  const get_input = (tipo_atributo: string, id: string): JSX.Element => {
    switch (tipo_atributo) {
      case 'Documento':
        return <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<FileUploadIcon />}
            fullWidth
            component='label'
          >
            Subir archivo
            <input
              type="file"
              name={`${id}-${tipo_atributo}`}
              style={{ display: 'none' }}
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                handle_file_change(event, `${id}-${tipo_atributo}`);
              }}
            />
          </Button>
        </Grid>;
      case 'Fecha':
        return <>
          <TextField
            type="date"
            size="small"
            fullWidth
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              handle_input_change(event, `${id}-${tipo_atributo}`);
            }}
          />
        </>;
      case 'Texto':
        return <>
          <TextField
            size="small"
            fullWidth
            onKeyDown={(event) => {
              event.stopPropagation();
            }}
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              handle_input_change(event, `${id}-${tipo_atributo}`);
            }}
          />
        </>;
      case 'Opciones':
        return <>
          <TextField
            size="small"
            fullWidth
            onKeyDown={(event) => {
              event.stopPropagation();
            }}
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              handle_input_change(event, `${id}-${tipo_atributo}`);
            }}
          />
        </>;
      default:
        return <>
          <span>Not input file</span>
        </>;
    }
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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title={`Nuevo estado de Cartera: ${etapa_actual}`}></Title>
          <Box
            sx={{ mt: '20px' }}
          >
            {rows_atributos.length > 0 && rows_atributos.map((arreglo_atributos, index) => (
              <CollapsibleButton key={index} texto_boton={arreglo_atributos[0].id_categoria.categoria}>
                <DataGrid
                  density="standard"
                  autoHeight
                  rows={arreglo_atributos}
                  columns={column_atributos}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id}
                  components={{ Toolbar: GridToolbar }}
                />
              </CollapsibleButton>
            ))}
            {valores_proceso.length > 0 && valores_proceso.map((arreglo_valores, index) => (
              <CollapsibleButton key={index} texto_boton={arreglo_valores[0].id_atributo.id_categoria.categoria}>
                <DataGrid
                  density="standard"
                  autoHeight
                  rows={arreglo_valores}
                  columns={column_valores_proceso}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id}
                  components={{ Toolbar: GridToolbar }}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        valor: false,
                        documento: false,
                      }
                    }
                  }}
                />
              </CollapsibleButton>
            ))}
            {/* <Stack
              direction="row"
              justifyContent="center"
              sx={{
                pt: '20px'
              }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Guardar valores del proceso
              </Button>
            </Stack> */}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
