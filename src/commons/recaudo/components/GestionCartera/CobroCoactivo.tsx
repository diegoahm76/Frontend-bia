/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Button, Grid, TextField } from "@mui/material"
import { DataGrid, type GridValueFormatterParams, type GridColDef, GridToolbar } from "@mui/x-data-grid"
import { Title } from "../../../../components"
import type { AtributoEtapa } from "../../interfaces/proceso";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import { CollapsibleButton } from "../CollapsibleButton";

interface IProps {
  rows_atributos: AtributoEtapa[][];
  input_values: Record<string, string>;
  input_files: Record<string, File>;
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
  handle_input_change,
  handle_file_change,
  handle_post_valores_sin_archivo,
  handle_post_valores_con_archivo
}: IProps) => {
  const column_detalle: GridColDef[] = [
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
          <Title title="Nuevo estado de Cartera: Cobro Coactivo"></Title>
          <Box
            sx={{ mt: '20px' }}
          >
            {/* <DataGrid
              autoHeight
              rows={rows_atributos}
              columns={column_detalle}
              getRowId={(row) => row.id}
            /> */}
            {rows_atributos.map((arreglo_objetos, index) => (
              <CollapsibleButton key={index} categoria={arreglo_objetos[0].id_categoria.categoria}>
                <DataGrid
                  density="standard"
                  autoHeight
                  rows={arreglo_objetos}
                  columns={column_detalle}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id}
                  components={{ Toolbar: GridToolbar }}
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
