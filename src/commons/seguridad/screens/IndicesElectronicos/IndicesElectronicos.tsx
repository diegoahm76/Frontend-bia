/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState } from 'react';
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
  TextField,
  Typography
} from '@mui/material';
import { AvatarStyles } from '../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { Controller, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../components';

import { xmlFromJson } from './utils/xmlFromJson';

import { saveAs } from 'file-saver';
import { control_error, control_success } from '../../../../helpers';
import { columns } from './utils/colums';

export const IndicesElectronicos: FC = (): JSX.Element => {
  // ! use this state to show the xml in the DataGrid
  const [data, setData] = useState<any[]>([]);
  // ! use this state to set the json to xml
  const [xmlToJsonisTrue, setXmlToJsonisTrue] = useState<any>();

  // ? this is the form to search the expedient
  const {
    control: control_electronic_index,
    reset: reset_electronic_index,
    watch: watch_electronic_index
  } = useForm({
    defaultValues: {
      id_ccd: ''
    }
  });

  // ? this is the watch to search the expedient
  const data_electronic_index_watch = watch_electronic_index();

  // ? this is the form to search the expedient
  const onSubmit_electronic_index: any = async (): Promise<any> => {
    try {
      const url = `gestor/ccd/get-terminados/`;
      const response = await api.get(url, {
        params: {
          limit: 1000,
          offset: 0
        }
      });
      console.log('response', response);
      const newData = response?.data?.map((item: any) => {
        // const { id_ccd } = item;
        return {
          ...item,
          fecha_puesta_produccion: 'SIN_FECHA',
          fecha_retiro_produccion: 'SIN_FECHA',
          justificacion: 'SIN_FECHA',
          ruta_soporte: 'RUTA_SOPORTE',
          searchIndex: uuidv4().slice(0, 8),
          adicionalData: [
            {
              value: 'FECHA_PUESTA_PRODUCCION',
              key: 'fecha_puesta_produccion'
            },
            {
              value: 'FECHA_RETIRO_PRODUCCION',
              key: 'fecha_retiro_produccion'
            },
            { value: 'JUSTIFICACION', key: 'justificacion' }
          ]
        };
      });

      const firstObject = newData.find(
        ({ id_ccd }: any) =>
          id_ccd === Number(data_electronic_index_watch.id_ccd)
      );
      setData([firstObject ?? []]);

      firstObject
        ? control_success('Se ha encontrado el siguiente expediente')
        : control_error('No se ha encontrado un expediente que coincida');

      // console.log('data_electronic_index_watch', firstObject);
    } catch (error) {
      console.error(error);
      control_error('No se ha encontrado un expediente que coincida');
    }
  };

  // ? colums for the DataGrid
  const columns_indices_electronicos: GridColDef[] = [
    ...columns,
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 180,
      maxWidth: 200,
      flex: 1,
      renderCell: (params: any) =>
        params.row.searchIndex && (
          <>
            <IconButton
              onClick={() => {
                // console.log('params electronic index', params.row);
                reset_electronic_index({
                  id_ccd: params.row.id_ccd
                });
                setXmlToJsonisTrue(params.row);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <NoteAddIcon
                  titleAccess="Crear XML de índice electrónico"
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          </>
        )
    }
  ];

  // ? this is the return of the component
  return (
    <>
      <Grid
        sx={{
          margin: '10vh auto',
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
            marginBottom: '20px'
          }}
        >
          <Title title="Generación de índices electrónicos" />
        </div>

        <Divider />
        <Grid container>
          <Grid item xs={12} sm={12}>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                // ! review this way to exe function, execute function in the same line into another function
                // handleSubmit_electronic_index(onSubmit_electronic_index)();
                void onSubmit_electronic_index();
              }}
            >
              <Controller
                name="id_ccd" // ! se reemplazará por el índice electronico que debe ser
                control={control_electronic_index}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                   // margin="dense"
                    fullWidth
                    size="small"
                    label="Ingrese número de expediente"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
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
                  type="submit"
                  disabled={data_electronic_index_watch.id_ccd === ''}
                >
                  BUSCAR EXPEDIENTE
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CleanIcon />}
                  onClick={() => {
                    // console.log('Limpiando campos de índices electrónicos');
                    reset_electronic_index({
                      id_ccd: ''
                    });
                    setData([]);
                    setXmlToJsonisTrue({});
                  }}
                >
                  LIMPIAR CAMPOS
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            margin: '0 auto',
            width: '100%'
          }}
        >
          <Title title="Table índices electrónicos" />
          <Divider sx={{ mt: '20px' }} />
          <DataGrid
            density="compact"
            autoHeight
            columns={columns_indices_electronicos}
            rows={data}
            getRowId={(row) => (row.id_ccd ? row.id_ccd : uuidv4())}
            pageSize={5}
            rowsPerPageOptions={[10]}
          />
        </Grid>
        <Grid>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ mt: '20px' }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: '10px'
              }}
            >
              {Object.keys(xmlToJsonisTrue ?? {}).length > 0 ? (
                <>
                  Descarga XML{/* de índice electrónico */} y visualizalo en{' '}
                  <a
                    href="https://xmlgrid.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    xmlgrid.net
                  </a>
                </>
              ) : (
                'No hay datos para descargar'
              )}
            </Typography>
            <br />
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadForOfflineIcon />}
              // eslint-disable-next-line eqeqeq, @typescript-eslint/strict-boolean-expressions
              disabled={Object.keys(xmlToJsonisTrue ?? {}).length == 0}
              onClick={() => {
                const xml = xmlFromJson(xmlToJsonisTrue);
                // console.log('res', xml);

                const blob = new Blob([xml], {
                  type: 'text/xml;charset=utf-8'
                });
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                saveAs(blob, `archivo_${uuidv4().slice(0, 8)}.xml`);
              }}
            >
              Descargar XML
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
