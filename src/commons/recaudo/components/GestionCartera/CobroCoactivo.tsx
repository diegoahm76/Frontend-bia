import { Box, Button, Grid, Stack, TextField } from "@mui/material"
import { DataGrid, type GridValueFormatterParams, type GridColDef } from "@mui/x-data-grid"
import { Title } from "../../../../components"
import type { AtributoEtapa } from "../../interfaces/proceso";
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface IProps {
  rows_atributos: AtributoEtapa[];
  handle_input_change: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  handle_file_change: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  handle_post_valores_proceso: () => void;
}

// const rows_detalle = [
//   {
//     id: 1,
//     atributo: 'Acto administrativo',
//     a: '',
//     b: 'File_00002284741132.pdd'
//   },
//   {
//     id: 2,
//     atributo: 'Fecha de ejecutoriado',
//     a: '',
//     b: '21-11-2022'
//   },
//   {
//     id: 3,
//     atributo: 'Resolución',
//     a: '',
//     b: 'Resolucion_482104112022'
//   },
//   {
//     id: 4,
//     atributo: 'Observaciones',
//     a: 'No se evidencia voluntad de pago',
//   },
//   {
//     id: 5,
//     atributo: 'Estudio de credito',
//     a: 'Si',
//   },
// ]

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const CobroCoactivo: React.FC<IProps> = ({ 
  rows_atributos, 
  handle_input_change,
  handle_file_change,
  handle_post_valores_proceso 
}: IProps) => {
  // const [input_values, set_input_values] = useState<Record<string, string | File | null | number>>({});

  // const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>, name: string): void => {
  //   const { value } = event.target;
  //   set_input_values((prevInputValues) => ({
  //     ...prevInputValues,
  //     [name]: value,
  //   }));
  // };

  // const handle_files_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   if (event.target.files) {
  //     set_input_values((prevState) => ({
  //       ...prevState,
  //       [event.target.name]: event.target.files[0],
  //     }));
  //   }
  // };

  // useEffect(() => {
  //   console.log(input_values);
  // }, [input_values]);

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
              style={{display: 'none'}}
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
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <DataGrid
              autoHeight
              rows={rows_atributos}
              columns={column_detalle}
              getRowId={(row) => row.id}
            />
            <Stack
              direction="row"
              justifyContent="center"
              sx={{
                pt: '20px'
              }}
            >
              <Button
                color="info"
                variant="contained"
                onClick={handle_post_valores_proceso}
              >
                Guardar
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
