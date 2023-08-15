import { Box, Grid, ButtonGroup, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { Title } from '../../../../../components/Title';
// import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { ModalConfirmacionArchivar } from '../components/modalConfirmacio/ModalConfirmacion';
import { ModalInfoAlerta } from '../components/modalInformacionAlenta/InfoAlerta';
import { SuspenderAlerta } from '../components/SuspenderAlerta/SuspenderAlerta';
import { useSelector } from 'react-redux';
import type { AuthSlice } from '../../../../auth/interfaces/authModels'; 
import { v4 as uuidv4 } from 'uuid';
import type { AlertaBandejaAlertaPersona } from '../interfaces/interfacesAlertas';
import { ModificadorFormatoFecha } from '../utils/ModificaforFecha';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PantallaPrincipalAlertas: React.FC = () => {
 


  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const id_persona_ingresa = userinfo.id_persona;
 console.log(id_persona_ingresa);
 // eslint-disable-next-line @typescript-eslint/naming-convention
  const [id_alertas, set_id_alertas] = useState<number | null>(null);
 

  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/transversal/alertas/bandeja_alerta_persona/get-bandeja-by-persona/${id_persona_ingresa}/`;
      const res:any = await api.get(url);
      const numero_consulta: any = res.data.data;
      if (numero_consulta.length > 0) {
        const id = numero_consulta[0].id_bandeja_alerta;

        set_id_alertas(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);

  const alertaa_inicio: AlertaBandejaAlertaPersona[] = [];

  const [bandeja_alerta,set_bandeja_alerta] = useState<AlertaBandejaAlertaPersona[]>(alertaa_inicio);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const buscar_bandeja_alerta  = async (): Promise<void> => {
    try {
      if (id_alertas === null) {
        return;
      }
      const url = `/transversal/alertas/alertas_bandeja_Alerta_persona/get-alerta_bandeja-by-bandeja/${id_alertas}/`;
      const res = await api.get(url);
      const bandeja = res.data.data;
      set_bandeja_alerta(bandeja);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    buscar_bandeja_alerta().catch((error) => {
      console.error(error);
    });
  }, [id_alertas]);


  const columns = [
    {
      field: 'fecha_hora',
      headerName: 'Fecha/Hora',
      width: 100,
      valueGetter: (params:any) => ModificadorFormatoFecha(params.row.fecha_hora),
    },
    {
      field: 'nombre_clase_alerta',
      headerName: 'Nombre Clase Alerta',
      width: 200,
    },
    {
      field: 'id_modulo',
      headerName: 'ID Módulo',
      width: 50,
    },
    {
      field: 'nombre_modulo',
      headerName: 'Nombre Módulo',
      width: 200,
    },
    {
      field: 'ultima_repeticion',
      headerName: 'Última Repetición',
      width: 60,
    },
    {
      field: 'leido',
      headerName: 'Leído',
      width: 60
    },
    {
      field: 'repeticiones_suspendidas',
      headerName: 'Repeticiones Suspendidas',
      width: 60,
    },
    
    {
      field: 'responsable_directo',
      headerName: 'Responsable Directo',
      width: 60,
    },
    {
      field: 'id_bandeja_alerta_persona',
      headerName: 'ID Bandeja Alerta Persona',
      width: 60,
    },
    {
      field: 'id_alerta_generada',
      headerName: 'ID Alerta Generada',
      width: 60,
    },
    {
      field: 'opciones',
      headerName: 'Opciones',
      width: 200,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <ButtonGroup variant="text">
           
            <SuspenderAlerta />
        
           
              <ModalConfirmacionArchivar />
           
          
              <ModalInfoAlerta />
            
          </ButtonGroup>
        </>
      ),
    },
  ];



  
  const [mostrar_leidos, set_mostrar_leidos] = useState<boolean>(false);
  const f_leidos = (): void => {
    set_mostrar_leidos(true);
  };
  const f_no_leidos = (): void => {
    set_mostrar_leidos(false);
  };
  
  const f_todos = (): void => {
console.log("todos");
  };

  // Filtra las filas basadas en el valor de 'leido' y 'mostrar_leidos_alertas'
  const filtered_rows = mostrar_leidos
    ? bandeja_alerta.filter((row) => row.leido)
    : bandeja_alerta.filter((row) => !row.leido);


  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, [mostrar_leidos]);

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
      <Grid item xs={12}>
        <Title title="Mis alertas" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ButtonGroup style={{ margin: 7 }}>


            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={f_leidos} >leidos</Button>
              <Button onClick={f_no_leidos}>no leidos</Button>
              <Button onClick={f_todos}>todos</Button>
            </ButtonGroup>

          </ButtonGroup>
          <ButtonGroup style={{ margin: 7 }}>
            {/* {download_xls({ nurseries: alertas, columns })} */}
          </ButtonGroup>
        </div>
        <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={filtered_rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => uuidv4()}
          />

        </Box>
      </Grid>
    </Grid>
  );
};
