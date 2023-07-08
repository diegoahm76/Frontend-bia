/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Avatar,
  Button,
  Divider,
  /* Box */ Grid,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import { AvatarStyles } from '../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Controller, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../components';
import { xmlFromJson } from './utils/xmlFromJson';
export const IndicesElectronicos: FC = (): JSX.Element => {
  const [data, setData] = useState<any>([]);
  const [current_data, setCurrentData] = useState<any>({
    id_ccd: ''
  });

  const [xmlToJsonisTrue, setXmlToJsonisTrue] = useState({})

  const {
    control: control_electronic_index,
    handleSubmit: handleSubmit_electronic_index,
    formState: formState_electronic_index,
    reset: reset_electronic_index,
    watch: watch_electronic_index
  } = useForm({
    defaultValues: {
      id_ccd: ''
    }
  });

  const data_electronic_index_watch = watch_electronic_index();

  const columns_indices_electronicos: GridColDef[] = [
    {
      headerName: 'NOMBRE',
      field: 'nombre',
      minWidth: 230,
      maxWidth: 235,
      flex: 1
    },
    {
      headerName: 'IDENTIFICADOR',
      field: 'id_ccd',
      minWidth: 280,
      maxWidth: 300,
      flex: 1
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 200,
      maxWidth: 250,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              console.log('params electronic index', params.row);
              reset_electronic_index({
                id_ccd: params.row.id_ccd
              });
              setXmlToJsonisTrue(params.row);
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <VisibilityIcon
                titleAccess="Ver índice electrónico"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      )
    }
  ];

  useEffect(() => {
    const url = `gestor/ccd/get-terminados/`;
    void api.get(url).then((response) => {
      const newData = response.data.map((item: any) => ({
        ...item,
        searchIndex: uuidv4().slice(0, 8)
      }));
      console.log(newData);

      setData(newData);
    });
  }, []);

  return (
    <>
      <Grid
        sx={{
          margin: '0 auto',
          position: 'relative',
          width: '80%',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
        container
        spacing={2}
      >
        <div
          style={{
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <Title title="Generación de índices electrónicos" />
        </div>

        <Divider />
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Controller
              name="id_ccd" // se reemplazará por el índice electronico que debe ser
              control={control_electronic_index}
              defaultValue=""
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Ingrese número de expediente"
                  variant="outlined"
                  value={value ?? current_data.id_ccd}
                  onChange={(e: any) => {
                    onChange(e.target.value);
                    console.log('e.target.value', e.target.value);
                  }}
                  error={!(error == null)}
                  helperText={
                    error != null
                      ? 'Es obligatorio ingresar un número de expediente'
                      : 'Ingrese el número de expediente'
                  }
                />
              )}
            />

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: '20px' }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={() => {
                  xmlFromJson(xmlToJsonisTrue).then((res) => {
                    console.log('res', res);
                  });
                  console.log('Buscando expediente');
                }}
              >
                Buscar
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<CleanIcon />}
                onClick={() => {
                  console.log('Limpiando campo');
                  reset_electronic_index({
                    id_ccd: ''
                  });
                }}
              >
                Limpiar campo
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          sx={{
            margin: '0 auto',
            width: '100%'
          }}
        >
          <DataGrid
            density="compact"
            autoHeight
            columns={columns_indices_electronicos}
            rows={data}
            getRowId={(row) => row.id_ccd}
            pageSize={5}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </>
  );
};
