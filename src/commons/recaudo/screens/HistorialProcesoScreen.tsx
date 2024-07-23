/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Avatar, Button, Grid, TextField, Tooltip } from '@mui/material';
import { Title } from '../../../components/Title';
// import { TablaIncumplimiento } from '../components/HistorialProceso/TablaIncumplimiento';
import { Encabezado } from '../components/HistorialProceso/Encabezado';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { Proceso, ValoresProceso } from '../interfaces/proceso';
import { api } from '../../../api/axios';
import { CollapsibleButton } from '../components/CollapsibleButton';
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';
import TuneIcon from '@mui/icons-material/Tune';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import { NotificationModal } from '../components/NotificationModal';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistorialProceso: React.FC = () => {
  const [rows_valores_proceso, set_rows_valores_proceso] = useState<ValoresProceso[][]>([]);
  const [input_values, set_input_values] = useState<Record<string, string>>({});
  const [input_files, set_input_files] = useState<Record<string, File>>({});
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { editar: number, proceso: Proceso };

  useEffect(() => {
    if (state) {
      api.get(`recaudo/procesos/valores-proceso/${state?.proceso?.id}`)
        .then((response) => {
          set_values(response.data.data);
          group_valores_proceso(response.data.data);
        })
        .catch((error) => {
          //  console.log('')(error);
        });
    } else {
      navigate('../visor_procesos');
    }
  }, []);

  const group_valores_proceso = (valores_proceso: ValoresProceso[]): void => {
    const categorias_agrupadas: Record<string, ValoresProceso[]> = {};

    valores_proceso.forEach(objeto => {
      const categoria = objeto.id_atributo.id_categoria.categoria;
      if (categorias_agrupadas[categoria]) {
        categorias_agrupadas[categoria].push(objeto);
      } else {
        categorias_agrupadas[categoria] = [objeto];
      }
    });

    const nuevo_arreglo = Object.values(categorias_agrupadas);
    set_rows_valores_proceso(nuevo_arreglo);
  };

  const get_atributo_icon = (tipo_atributo: string): JSX.Element => {
    const icon_styles = {
      color: 'primary.main',
      width: '18px',
      height: '18px'
    };
    switch (tipo_atributo) {
      case 'Documento':
        return <InsertDriveFileOutlinedIcon sx={icon_styles} />;
      case 'Fecha':
        return <CalendarMonthIcon sx={icon_styles} />;
      case 'Texto':
        return <ArticleIcon sx={icon_styles} />;
      case 'Opciones':
        return <TuneIcon sx={icon_styles} />;
      default:
        return <></>;
    }
  };

  const get_span_link = (valor_proceso: ValoresProceso): JSX.Element => {
    if (valor_proceso.id_atributo.id_tipo.tipo === 'Documento') {
      const nombre_documento: string = valor_proceso?.documento?.split('/')[2] ?? '';
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return <Link to={`http://bia-backend-beta-dev.up.railway.app${valor_proceso?.documento}`}>{nombre_documento}</Link>
    }
    return <span>{valor_proceso?.valor}</span>;
  };

  const get_input = (tipo_atributo: string, id: number): JSX.Element => {
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

  const set_values = (valores_proceso: ValoresProceso[]): void => {
    const new_input_values: Record<string, string> = {};
    const new_input_files: Record<string, File> = {};

    valores_proceso.forEach(objeto => {
      if (objeto.id_atributo.id_tipo.tipo === 'Documento') {
        const key: string = `${objeto.id_atributo.id}-${objeto.id_atributo.id_tipo.tipo}`;
        new_input_files[key] = new File([''], '');
      } else {
        const key: string = `${objeto.id_atributo.id}-${objeto.id_atributo.id_tipo.tipo}`;
        new_input_values[key] = '';
      }
    });

    set_input_files(new_input_files);
    set_input_values(new_input_values);
  };

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>, name: string): void => {
    const { value } = event.target;
    set_input_values((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handle_file_change = (event: React.ChangeEvent<HTMLInputElement>, name: string): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      set_input_files((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
  };

  const handle_put_valores_sin_archivo = (id_valor_proceso: number, value: string): void => {
    api.put(`recaudo/procesos/valores-proceso/${id_valor_proceso}/`, {
      valor: value,
    })
      .then((response) => {
        set_notification_info({ type: 'success', message: `Se ha actualizado correctamente el valor "${value}".` });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: `Hubo un error.` });
        set_open_notification_modal(true);
      });
  };

  const handle_put_valores_con_archivo = (id_valor_proceso: number, value: File): void => {
    api.putForm(`recaudo/procesos/valores-proceso/${id_valor_proceso}/`, {
      documento: value,
    })
      .then((response) => {
        set_notification_info({ type: 'success', message: `Se ha actualizado correctamente el archivo "${value.name}".` });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: `Hubo un error.` });
        set_open_notification_modal(true);
      });
  };

  const columns_valores_proceso: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID Valor',
      minWidth: 90
    },
    {
      field: 'id_atributo',
      headerName: 'Tipo de Atributo',
      minWidth: 130,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Tooltip title={params.value.id_tipo.tipo}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              {get_atributo_icon(params.value.id_tipo.tipo)}
            </Avatar>
          </Tooltip>
        );
      }
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 200,
      flex: 0.7,
      valueGetter: (params) => {
        return params.row.id_atributo.descripcion;
      }
    },
    {
      field: 'datos',
      headerName: 'Datos',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const valor_proceso = rows_valores_proceso.flat().find(valor => valor.id_atributo.id === params.row.id_atributo.id);
        if (valor_proceso) {
          return state?.editar ?
            get_input(valor_proceso?.id_atributo.id_tipo.tipo, valor_proceso?.id_atributo.id) :
            get_span_link(valor_proceso);
        }
        return <></>;
      }
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 200,
      flex: 0.5,
      renderCell: (params) => {
        if (state?.editar) {
          if (params.row.id_atributo.id_tipo.tipo === 'Documento') {
            return (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
                fullWidth
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                disabled={input_files[`${params.row.id_atributo.id}-${params.row.id_atributo.id_tipo.tipo}`]?.name === ''}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  handle_put_valores_con_archivo(params.row.id, input_files[`${params.row.id_atributo.id}-${params.row.id_atributo.id_tipo.tipo}`]);
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
              disabled={input_values[`${params.row.id_atributo.id}-${params.row.id_atributo.id_tipo.tipo}`] === ''}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                handle_put_valores_sin_archivo(params.row.id, input_values[`${params.row.id_atributo.id}-${params.row.id_atributo.id_tipo.tipo}`]);
              }}
            >
              Guardar
            </Button>
          );
        }
      }
    },
  ];

  return (
    <>
      <Encabezado proceso={state?.proceso} />
      <Title title='Historial del Proceso' />
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <CollapsibleButton texto_boton={state?.proceso?.id_etapa?.etapa}>
          {rows_valores_proceso.map((arreglo_objetos, index) => (
            <CollapsibleButton key={index} texto_boton={arreglo_objetos[0].id_atributo.id_categoria.categoria}>
              <DataGrid
                density={state?.editar ? 'standard' : 'compact'}
                autoHeight
                rows={arreglo_objetos}
                columns={columns_valores_proceso}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id}
                components={{ Toolbar: GridToolbar }}
              />
            </CollapsibleButton>
          ))}
        </CollapsibleButton>
      </Grid>

      <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />
    </>
  )
}
