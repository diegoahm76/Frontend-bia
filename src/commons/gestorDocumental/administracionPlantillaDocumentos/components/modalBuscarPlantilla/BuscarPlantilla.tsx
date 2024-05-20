/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControl, Grid, IconButton, InputLabel, TextField, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Title } from '../../../../../components/Title';
import { api } from '../../../../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
import { Dialog } from 'primereact/dialog';
import { ModificadorFormatoFechaPlantillas } from '../../utils/ModificadorFecha';
import { confirmarAccion } from '../../../deposito/utils/function';
import DeleteIcon from '@mui/icons-material/Delete';
import { control_error, control_success } from '../../../alertasgestor/utils/control_error_or_success';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';

export const MostrarModalBuscarPlantilla: React.FC = () => {

  const { form, set_form } = useContext(FormCreacionContext);

  const [visible, setVisible] = useState<boolean>(false);
  const [nombre_plantilla, set_nombre_plantilla] = useState<string>(''); // Nuevo estado para el filtro
  const [Descripccion, set_Descripccion] = useState<string>(''); // Nuevo estado para el filtro
  const [Extension, set_Extension] = useState<string>(''); // Nuevo estado para el filtro
  const [data_choise, set_data_choise] = useState<any>(null);
  const [choise_seleccionado_tipologia, set_choise_seleccionado_tipologia] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const [data_choise_disponivilidad, set_data_choise_disponivilidad] = useState<any>(null);
  const [choise_seleccionado_disponivilidad, set_choise_seleccionado_disponivilidad] = useState<string>('');
  const [data_busqueda_Avanazda, set_data_busqueda_Avanazda] = useState<any>([]);
  // //  console.log('')(data_busqueda_Avanazda);
  const [activador, set_activaador] = useState<boolean>(false);


  const titulo = <Title title={`Busqueda`} />;

  const footerContent = (
    <div>
      <Button
        startIcon={<ClearIcon />}
        fullWidth

        style={{ margin: 3 }}
        variant="contained"
        color="error"
        onClick={() => {
          setVisible(false);
        }}
      >
        Salir
      </Button>
    </div>
  );

  // const buscar_todos = true;
  const fetch_data_busqueda_avanzada = async (): Promise<void> => {
    try {
      const url = `/gestor/plantillas/plantilla_documento/get/busqueda_avanzada_admin/`;

      // Construye dinámicamente la URL de consulta
      let queryURL = url;

      if (!checked) {
        if (nombre_plantilla || Extension || Descripccion || choise_seleccionado_tipologia || choise_seleccionado_disponivilidad) {
          queryURL += '?';

          if (nombre_plantilla) { queryURL += `nombre=${nombre_plantilla}&`; }

          if (Extension) { queryURL += `extension=${Extension}&`; }

          if (choise_seleccionado_tipologia) { queryURL += `tipologia=${choise_seleccionado_tipologia}&`; }

          if (choise_seleccionado_disponivilidad) { queryURL += `disponibilidad=${choise_seleccionado_disponivilidad}`; }

          if (Descripccion) {
            queryURL += `descripcion=${Descripccion}`;
          }
          // Elimina el último '&' si está presente
          if (queryURL.endsWith('&')) { queryURL = queryURL.slice(0, -1); }
        }
      }

      const res: any = await api.get(queryURL);
      let numero_consulta: any = res.data.data;
      set_data_busqueda_Avanazda(numero_consulta);
      // //  console.log('')(numero_consulta);

    } catch (error) {
      console.error(error);
    }
  };



  const fetch_choise_tipologia_documental = async (): Promise<void> => {
    try {
      const url = `/gestor/plantillas/tipos_tipologia/get/`;
      const res: any = await api.get(url);
      let numero_consulta: any = res.data.data;
      set_data_choise(numero_consulta);
      // //  console.log('')(numero_consulta); 
    } catch (error) {
      console.error(error);
    }
  };

  const fetch_choise_Disponivilidad = async (): Promise<void> => {
    try {
      const url = `/gestor/choices/tipo-acceso/`;
      const res: any = await api.get(url);
      let numero_consulta_Disponivilidad: any = res.data;
      set_data_choise_disponivilidad(numero_consulta_Disponivilidad);
      // //  console.log('')(numreo_consulta_Disponivilidad);
    } catch (error) {
      console.error(error);
    }
  };



  const fetch_delete_registro = async (idRegistro: number): Promise<void> => {
    try {
      // Define la URL del servidor junto con el ID del registro que deseas eliminar
      const url = `/gestor/plantillas/plantilla_documento/delete/${idRegistro}/`;

      // Realiza una solicitud HTTP DELETE al servidor
      const { data } = await api.delete(url);

      // Verifica si la eliminación se realizó con éxito
      control_success(data?.detail);

      // Realiza una nueva consulta para actualizar la tabla después de la eliminación
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };



  const handleDelClick = async (data: any): Promise<void> => {
    try {
      const url = `/gestor/plantillas/plantilla_documento/get_detalle_id/${data}/`;
      const res: any = await api.get(url);
      let numero_consulta: any = res.data.data;
      // //  console.log('')(numero_consulta);
      set_form({
        ...form,
        id_actualizar: numero_consulta.id_plantilla_doc,
        nombre: numero_consulta.nombre,
        descripcion: numero_consulta.descripcion,
        id_formato_tipo_medio: numero_consulta.id_formato_tipo_medio,
        // asociada_a_tipologia_doc_trd: numero_consulta.asociada_a_tipologia_doc_trd,
        cod_tipo_acceso: numero_consulta.cod_tipo_acceso,
        codigo_formato_calidad_asociado: numero_consulta.codigo_formato_calidad_asociado,
        version_formato_calidad_asociado: numero_consulta.version_formato_calidad_asociado,
        otras_tipologias: numero_consulta.otras_tipologias,
        acceso_unidades: numero_consulta.acceso_unidades.map((id: any) => ({ id_unidad_organizacional: id.id_unidad_organizacional })),
        id_tipologia_doc_trd: numero_consulta.id_tipologia_doc_trd,
        acceso_unidades_dos: numero_consulta.acceso_unidades,
        observacion: numero_consulta.observacion,
        activa: numero_consulta.activa,
        archivo: null,
      });


      setVisible(false);


    } catch (error: any) {
      control_error(error.detail);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'archivos_digitales.formato',
      headerName: 'Formato',
      minWidth: 80,
      flex: 1,
      valueGetter: (params) => params.row.archivos_digitales.formato,
    },
    {
      field: 'cod_tipo_acceso_display',
      headerName: 'Código de Acceso',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'otras_tipologias',
      headerName: 'Otra Tipologias',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'nombre_tipologia',
      headerName: 'Nombre Tipologia',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'fecha_creacion',
      headerName: 'Fecha de Creación',
      valueGetter: (params: any) =>
        ModificadorFormatoFechaPlantillas(params.row.fecha_creacion),
        minWidth: 200,
      flex: 1,
    },
    {
      field: 'activa',
      headerName: 'Activa',
      minWidth: 70,
      flex: 1,
      valueFormatter: (params: any) => (params.value ? 'Sí' : 'No'),
    },
    {
      field: 'ruta',
      headerName: 'Ruta',
      minWidth: 100,
      flex: 1,
      renderCell: (params: any) => (
        <DownloadButton
          fileUrl={params.row.archivos_digitales.ruta_archivo}
          fileName="nombre_archivo.pdf" // Puedes proporcionar un nombre de archivo deseado
          condition={false} // Establece la condición según tus necesidades
        />
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => {
        const idMedioSolicitud = params.row.id_plantilla_doc;


        const handleDeleteClick = () => {
          // Llama a la función de eliminación pasando el idMedioSolicitud como parámetro
          fetch_delete_registro(idMedioSolicitud).then(() => {
            fetch_data_busqueda_avanzada()


          })
        };


        return (
          <>
            <Tooltip title="Borrar registro" placement="right">
              <IconButton
                onClick={() => {
                  void confirmarAccion(
                    handleDeleteClick,
                    '¿Estás seguro de eliminar  este campo?'
                  );
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={() =>
                handleDelClick(params.row.id_plantilla_doc)
              }
            >
              <EditIcon />
            </IconButton>


          </>
        );
      },
    },
  ];



  const limpiar = () => {
    set_nombre_plantilla("");
    set_Descripccion("");
    set_Extension("");
    set_choise_seleccionado_tipologia("");
    set_choise_seleccionado_disponivilidad("")

  };




  useEffect(() => {
    fetch_choise_tipologia_documental().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    fetch_choise_Disponivilidad().catch((error) => {
      console.error(error);
    });
  }, []);


  useEffect(() => {
    fetch_data_busqueda_avanzada().catch((error) => {
      console.error(error);
    });
  }, [activador]);






  return (
    <div className="card flex justify-content-center">
      <Button
        startIcon={<SearchIcon />}
        fullWidth
        variant="contained"
        onClick={() => {
          setVisible(true);
        }}
      >
        buscar
      </Button>
      <Dialog
        header={titulo}
        visible={visible}
        
        style={{ width: '60%' }}
        closable={false}
        onHide={(): void => {
          setVisible(false);
        }}
        footer={footerContent}
      >
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

          <Grid item xs={6}>
            <TextField
              style={{ width: '95%' }}
              label={`Buscar por Nombre de Plantilla`}
              variant="outlined"
              fullWidth
              value={nombre_plantilla}
              onChange={(e) => {
                set_nombre_plantilla(e.target.value);
              }}
            />

            <TextField
              style={{ width: '95%', marginTop: 7 }}
              label={`Buscar por Descripccion`}
              variant="outlined"
              fullWidth
              value={Descripccion}
              onChange={(e) => {
                set_Descripccion(e.target.value);
              }}
            />
            <TextField
              style={{ width: '95%', marginTop: 7 }}
              label={`Buscar por Extension`}
              variant="outlined"
              fullWidth
              value={Extension}
              onChange={(e) => {
                set_Extension(e.target.value);
              }}
            />
         
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth >
              <InputLabel id="choise-label">Tipologia Documental</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="choise-seleccionado-tipologia"
                value={choise_seleccionado_tipologia}
                label="Tipologia Documental"
                onChange={(event): any => { set_choise_seleccionado_tipologia(event.target.value) }}
              >
                {data_choise?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.nombre}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth style={{ marginTop: 5 }}>
              <InputLabel id="choise-label">Disponibilidad</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={choise_seleccionado_disponivilidad}
                label="Disponibilidad"
                onChange={(event): any => {
                  set_choise_seleccionado_disponivilidad(event.target.value);
                }}
              >
                {data_choise_disponivilidad?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container style={{ marginTop: 10 }}>

          <Grid item xs={6}>
              <Checkbox
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
                checked={checked}
              ></Checkbox>
              <label htmlFor="ingredient4" className="ml-2">
                Mostrar Todas Las Plantillas
              </label>
            </Grid>

            <Grid item xs={3}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                style={{ width: '80%' }}
                onClick={() => { set_activaador(!activador) }}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="outlined"
                startIcon={<CleanIcon />}

                style={{ width: '80%' }} onClick={limpiar} >
                limpiar
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box
              component="form"
              sx={{ mt: '20px' }}
              noValidate
              autoComplete="off"
            >
              {data_busqueda_Avanazda.length === 0 ? (
                <p>No hay datos disponibles.</p>
              ) : (
                <DataGrid
                  density="compact"
                  autoHeight
                  columns={columns}
                  rows={data_busqueda_Avanazda}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};
