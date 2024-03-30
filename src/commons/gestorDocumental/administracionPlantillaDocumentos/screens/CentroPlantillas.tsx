/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControl, Grid, IconButton, InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components/Title';
import { InformacionPlantillasPersonas } from '../components/informacionPlantillas/InformacionPlantillasPersonas';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';

export const MostrarCentroPlantillas: React.FC = () => {

  const [nombre_plantilla, set_nombre_plantilla] = useState<string>(''); // Nuevo estado para el filtro
  const [Descripccion, set_Descripccion] = useState<string>(''); // Nuevo estado para el filtro
  const [Extension, set_Extension] = useState<string>(''); // Nuevo estado para el filtro
  const [data_choise, set_data_choise] = useState<any>(null);
  const [choise_seleccionado_tipologia, set_choise_seleccionado_tipologia] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const [data_choise_disponivilidad, set_data_choise_disponivilidad] = useState<any>(null);
  const [choise_seleccionado_disponivilidad, set_choise_seleccionado_disponivilidad] = useState<string>('');
  const [data_busqueda_Avanazda, set_data_busqueda_Avanazda] = useState<any>([]);
  //  console.log('')("data_busqueda_Avanazda", data_busqueda_Avanazda);
  const [activador, set_activaador] = useState<boolean>(false);

  const [id_visualizar, set_id_visualizar] = useState(0);


  const columns: GridColDef[] = [

    {
      field: 'nombre',
      headerName: 'Nombre Plantilla',
      width: 200,
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'Descripcion',
      width: 200,
      flex: 1
    },
    {
      field: 'otras_tipologias',
      headerName: 'Tipologia',
      width: 200,
      flex: 1,
    },
    {
      field: 'cod_tipo_acceso',
      headerName: 'Disponibilidad',
      width: 200,
      flex: 1,
    },

    // {
    //   field: 'ruta',
    //   headerName: 'Ruta',
    //   width: 120,
    //   flex: 1,
    //   renderCell: (params: any) => (
    //     <DownloadButton
    //       fileUrl={params.row.archivos_digitales.ruta_archivo}
    //       fileName="nombre_archivo.pdf" // Puedes proporcionar un nombre de archivo deseado
    //       condition={false} // Establece la condición según tus necesidades
    //     />
    //   ),
    // },
    {
      field: 'extension',
      headerName: 'Extensión',
      width: 80,
      flex: 1,
      valueGetter: (params) => {
        // Accede a la propiedad 'ruta' en 'archivos_digitales'
        return params.row.archivos_digitales.formato;
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 80,
      flex: 1,
      renderCell: (params: any) => (
        <> <DownloadButton
          fileUrl={params.row.archivos_digitales.ruta_archivo}
          fileName="nombre_archivo.pdf" // Puedes proporcionar un nombre de archivo deseado
          condition={false} // Establece la condición según tus necesidades
        />
          <IconButton onClick={() => set_id_visualizar(params.row.id_plantilla_doc)}      >
            <InformacionPlantillasPersonas data={id_visualizar} />
          </IconButton>
        </>)
    },
  ];



  const limpiar = () => {
    set_nombre_plantilla("");
    set_Descripccion("");
    set_Extension("");
    set_choise_seleccionado_tipologia("");
    set_choise_seleccionado_disponivilidad("")

  };
  // const buscar_todos = true;
  const fetch_data_busqueda_avanzada = async (): Promise<void> => {
    try {
      const url = `/gestor/plantillas/plantilla_documento/get/busqueda_avanzada/`;

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
      //  console.log('')("queryURL", queryURL);
      const res: any = await api.get(queryURL);
      let numero_consulta: any = res.data.data;
      set_data_busqueda_Avanazda(numero_consulta);
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
      <Grid item xs={12} >
        <Title title="Descargar Plantillas" />
      </Grid>

      <Grid item xs={6}>
        <TextField
          style={{ width: '90%', marginTop: 20 }}
          label={`Buscar por Nombre de Plantilla`}
          variant="outlined"
          fullWidth
          value={nombre_plantilla}
          onChange={(e) => {
            set_nombre_plantilla(e.target.value);
          }}
        />

        <TextField
          style={{ width: '90%', marginTop: 7 }}
          label={`Buscar por Descripccion`}
          variant="outlined"
          fullWidth
          value={Descripccion}
          onChange={(e) => {
            set_Descripccion(e.target.value);
          }}
        />
        <TextField
          style={{ width: '90%', marginTop: 7 }}
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
        <FormControl fullWidth style={{ marginTop: 20 }}>
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
            Mostrar todas las plantillas
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

  );
};
