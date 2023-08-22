/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Grid, ButtonGroup, Button, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { Title } from '../../../../../components/Title';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { ModalConfirmacionArchivar } from '../components/modalConfirmacio/ModalConfirmacion';
import { ModalInfoAlerta } from '../components/modalInformacionAlenta/InfoAlerta';
import { SuspenderAlerta } from '../components/SuspenderAlerta/SuspenderAlerta';
import { useSelector } from 'react-redux';
import type { AuthSlice } from '../../../../auth/interfaces/authModels';
import { v4 as uuidv4 } from 'uuid';
import type { AlertaBandejaAlertaPersona } from '../interfaces/interfacesAlertas';
import { ModificadorFormatoFecha } from '../utils/ModificaforFecha';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import { AlertasContext } from '../context/AlertasContext';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const PantallaPrincipalAlertas: React.FC = () => {

  const { setNumeroDeAlertas} = useContext(AlertasContext);

  const navigate = useNavigate();

  const { userinfo: { id_persona } } = useSelector((state: AuthSlice) => state.auth);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [id_alertas, set_id_alertas] = useState<number | null>(null);
  const [mostrar_leidos, set_mostrar_leidos] = useState<any>(false);
  const [bandeja_alerta, set_bandeja_alerta] = useState<AlertaBandejaAlertaPersona[]>([]);


  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/transversal/alertas/bandeja_alerta_persona/get-bandeja-by-persona/${id_persona}/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      if (numero_consulta.length > 0) {
        const id = numero_consulta[0].id_bandeja_alerta;

        set_id_alertas(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const buscar_bandeja_alerta = async (): Promise<void> => {
    try {
      if (id_alertas == null) throw new Error('No se encontro el id de la bandeja');
      const url = `/transversal/alertas/alertas_bandeja_Alerta_persona/get-alerta_bandeja-by-bandeja/${id_alertas}/`;
      const { data } = await api.get(url);
      const AlertasNoLeidas = data.data.filter((el: any) => el.leido === false);
      setNumeroDeAlertas(AlertasNoLeidas.length)
      set_bandeja_alerta(data.data);

      return data.data;
    } catch (error) {
      // console.error(error);
    }
  };


  const columns = [
    {
      field: 'nivel_prioridad',
      headerName: 'Nivel',
      width: 55,
      renderCell: (params: any) => {
        let icon_color = '';
        if (params.value === 1) {
          icon_color = '#4CAF50'; // Color verde
        } else if (params.value === 2) {
          icon_color = '#FFC107'; // Color amarillo
        } else if (params.value === 3) {
          icon_color = '#F44336'; // Color rojo
        }

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PriorityHighRoundedIcon fontSize="small" style={{ color: icon_color, marginRight: 4 }} />

          </div>
        );
      },
    },
    {
      field: 'tipo_alerta',
      headerName: 'Tipo alerta',
      width: 150,
    },
    {
      field: 'fecha_hora',
      headerName: 'Fecha/Hora',
      width: 120,
      valueGetter: (params: any) => ModificadorFormatoFecha(params.row.fecha_hora),
    }, 
    {
      field: 'nombre_clase_alerta',
      headerName: 'Nombre Clase Alerta',
      width: 250,
    },
    {
      field: 'responsable_directo',
      headerName: 'Responsable directo',
      headerAlign: 'center',
      minWidth: 120,
      maxWidth: 180,
      valueGetter: (params: any) => (params.row.responsable_directo === true ? "Sí" : "No"),
    },
    {
      field: 'fecha_envio_email',
      headerName: 'Fecha envio email',
      width: 200,
      valueGetter: (params: any) => ModificadorFormatoFecha(params.row.fecha_envio_email),
    },
    {
      field: 'nombre_modulo',
      headerName: 'Nombre Módulo',
      width: 200,
      valueGetter: (params: any) => {
        const ruta = params.value.split('/#/app/')[1]; // Obtener parte después de "/#/app/"
        const modulo = ruta.split('/')[0]; // Obtener la palabra después de "recurso_hidrico/"
        return modulo;
      },
    },









    {
      field: 'archivado',
      headerName: 'Archivado',
      width: 50,
      valueGetter: (params: any) => (params.row.archivado === true ? "Sí" : "No"),
    },
    {
      field: 'leido',
      headerName: 'Leído',
      width: 50,
      renderCell: (params: any) => (params.row.leido === true ? "Sí" : "No"),
    },
    {
      field: 'repeticiones_suspendidas',
      headerName: 'Repeticiones Suspendidas',
      width: 50,
      renderCell: (params: any) => (params.row.repeticiones_suspendidas === true ? "Sí" : "No"),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params: any) => (
        <>
          <ButtonGroup variant="text">

            <SuspenderAlerta
              dat={params.row.id_alerta_bandeja_alerta_persona}
              marcador={params.row.leido}
              activate_suspender_alerta={buscar_bandeja_alerta}
            />


            <ModalConfirmacionArchivar
              dat={params.row.id_alerta_bandeja_alerta_persona}
              marcador={params.row.archivado}
              activate_suspender_alerta={buscar_bandeja_alerta} />


            <ModalInfoAlerta columnnns={params.row} 
            dat={params.row.id_alerta_bandeja_alerta_persona}
              marcador={params.row.leido}
              activate_suspender_alerta={buscar_bandeja_alerta} />




            <Tooltip title="Redirigir al origen de la alerta" placement="right">
              <Button onClick={() => {
                const ruta = params.row.nombre_modulo.replace('/#', ''); // Eliminar "/#/app/"
                navigate(ruta);
              }}><ReplyIcon /></Button>
            </Tooltip>

          </ButtonGroup>
        </>
      ),
    },
  ];

  useEffect(() => {
    buscar_bandeja_alerta().catch((error) => {
      console.error(error);
    });
  }, [id_alertas]);


  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);





  const f_leidos = (): void => {
    set_mostrar_leidos(true);
    // activate_suspender_alerta();
  };

  const f_no_leidos = (): void => {
    set_mostrar_leidos(false);
    // activate_suspender_alerta();
  };

  const f_todos = (): void => {
    set_mostrar_leidos(null); // Usamos null para indicar que se deben mostrar todos los datos
    // activate_suspender_alerta();
  };



  // Filtra las filas basadas en el valor de 'leido' y 'mostrar_leidos_alertas'
  const filtered_rows = mostrar_leidos === true
    ? bandeja_alerta.filter((row) => row.leido)
    : mostrar_leidos === false
      ? bandeja_alerta.filter((row) => !row.leido)
      : bandeja_alerta;




  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });

  }, [mostrar_leidos]);


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
              {download_xls({ nurseries: filtered_rows, columns })}
            </ButtonGroup>
          </div>
          <Box component="form" sx={{ mt: '20px', width: '100%' }} noValidate autoComplete="off">
            <DataGrid
              density="compact"
              autoHeight
              columns={columns as any}
              rows={filtered_rows}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => uuidv4()}
            />

          </Box>

        </Grid>



      </Grid>


      <Grid
        container
        sx={{
          top: 10,
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          width: '20%',
        }}
      >


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'rigth' }}>
          <div style={{ color: '#4CAF50', marginBottom: '8px' }}>
            <PriorityHighRoundedIcon fontSize="small" style={{ color: '#4CAF50', marginRight: 4 }} />
            Baja
          </div>
          <div style={{ color: '#FFC107', marginBottom: '8px' }}>
            <PriorityHighRoundedIcon fontSize="small" style={{ color: '#FFC107', marginRight: 4 }} />
            Media
          </div>
          <div style={{ color: '#F44336' }}>
            <PriorityHighRoundedIcon fontSize="small" style={{ color: '#F44336', marginRight: 4 }} />
            Alta
          </div>
        </div>
      </Grid>

    </>


  );
};
