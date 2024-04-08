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
import { MostrrModalArchivado } from '../components/modalArchivados/ModalArchivado';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import { BotonConAlerta } from '../utils/MarcadorDeAlertasBoton';
import { obtenerHoraDeFecha } from '../utils/ModificadorHora';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const PantallaPrincipalAlertas: React.FC = () => {
  const { setNumeroDeAlertas } = useContext(AlertasContext);

  const navigate = useNavigate();

  const {
    userinfo: { id_persona },
  } = useSelector((state: AuthSlice) => state.auth);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [id_alertas, set_id_alertas] = useState<number | null>(null);
  const [mostrar_leidos, set_mostrar_leidos] = useState<any>(false);
  const [bandeja_alerta, set_bandeja_alerta] = useState<AlertaBandejaAlertaPersona[]>([]);
  const [alertas_leidas_icono, set_alertas_leidas_icono] = useState<number>(0);
  const [alertas_no_leidas_icono, set_alertas_no_leidas_icono] =
    useState<number>(0);
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
      if (id_alertas == null)
        throw new Error('No se encontro el id de la bandeja');
      const url = `/transversal/alertas/alertas_bandeja_Alerta_persona/get-alerta_bandeja-by-bandeja/${id_alertas}/`;
      const { data } = await api.get(url);
      const AlertasNoLeidas = data.data.filter(
        (el: any) => el.leido === false && el.archivado === false
      );
      const AlertasLeidas = data.data.filter(
        (el: any) => el.leido === true && el.archivado === false
      );
      set_alertas_no_leidas_icono(AlertasNoLeidas.length);
      set_alertas_leidas_icono(AlertasLeidas.length);
      setNumeroDeAlertas(AlertasNoLeidas.length);
      set_bandeja_alerta(data.data);
      console.log("mostrat data a rechard", data)
      return data.data;
    } catch (error) {
      // console.error(error);
    }
  };

  const columns = [
    {
      field: 'nivel_prioridad',
      headerName: 'Nivel de prioridad',
      minWidth: 80,
      renderCell: (params: any) => {
        let icon_color = '';
        if (params.value === '1') {
          icon_color = '#4CAF50'; // Color verde
        } else if (params.value === '2') {
          icon_color = '#FFC107'; // Color amarillo
        } else if (params.value === '3') {
          icon_color = '#F44336'; // Color rojo
        }

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={`Nivel de prioridad: ${params.value}`}>
              <PriorityHighRoundedIcon
                fontSize="small"
                style={{ color: icon_color, marginRight: 4 }}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: 'tipo_alerta',
      headerName: 'Tipo Alerta',
      minWidth: 200,
    },
    {
      field: 'fecha_hora',
      headerName: 'Fecha',
      minWidth: 200,
      valueGetter: (params: any) =>
        params.row.fecha_hora
          ? ModificadorFormatoFecha(params.row.fecha_hora)
          : 'Sin fecha',
    },
    {
      field: 'fecha_horaa',
      headerName: 'Hora',
      width: 80,
      valueGetter: (params: any) =>
        params.row.fecha_hora
          ? obtenerHoraDeFecha(params.row.fecha_hora)
          : 'Sin hora',
    },
    {
      field: 'nombre_clase_alerta',
      headerName: 'Nombre Clase Alerta',
      minWidth: 400,
    },

    //     {
    //       field: 'ruta_archivo',
    //       headerName: 'Archivo',
    //       width: 200,
    //       flex: 1,

    //         },
    {
      field: 'responsable_directo',
      headerName: 'Responsable Directo',
      // headerAlign: 'center',
      minWidth: 200,
      maxWidth: 250,
      valueGetter: (params: any) =>
        params.row.responsable_directo === true ? 'Sí' : 'No',
    },
    {
      field: 'fecha_envio_email',
      headerName: 'Fecha Envio Email',
      width: 150,
      valueGetter: (params: any) =>
        ModificadorFormatoFecha(params.row.fecha_envio_email),
    },
    {
      field: 'nombre_modulo',
      headerName: 'Nombre Módulo',
      minWidth: 300,
      valueGetter: (params: any) => {
        const ruta = (params.value || '').replace('/#/app/', ''); // Eliminar "/#/app/" si existe
        const firstPart = ruta.split('/')[0]; // Obtener la primera palabra después de eliminar '/#/app/'
        const valorModificado = firstPart.replace(/_/g, ' '); // Reemplazar las barras bajas (_) por espacios
        return valorModificado;
      },
    },
    {
      field: 'mensaje',
      headerName: 'Mensaje',
      width: 250,
    },
    {
      field: 'documento',
      headerName: 'Documento',
      width: 110,
      renderCell: (params: any) => (
        params.value ? (
          <DownloadButton
            condition={false}
            fileUrl={params.value}
            fileName={params.mensaje}
          />
        ) : null
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params: any) => (
        <>
          <ButtonGroup variant="text">
            <Tooltip title="Suspender alerta" placement="right">
              <SuspenderAlerta
                dat={params.row.id_alerta_bandeja_alerta_persona}
                marcador={params.row.repeticiones_suspendidas}
                activate_suspender_alerta={buscar_bandeja_alerta}
              />
            </Tooltip>

            <ModalConfirmacionArchivar
              dat={params.row.id_alerta_bandeja_alerta_persona}
              marcador={params.row.archivado}
              activate_suspender_alerta={buscar_bandeja_alerta}
            />

            <ModalInfoAlerta
              columnnns={params.row}
              dat={params.row.id_alerta_bandeja_alerta_persona}
              marcador={params.row.leido}
              activate_suspender_alerta={buscar_bandeja_alerta}
            />

            <Tooltip title="Redirigir al origen de la alerta" placement="right">
              {params.row.nombre_modulo &&
                params.row.nombre_modulo.trim() !== '' ? (
                <Button
                  onClick={() => {
                    const ruta = (params.row.nombre_modulo || '').replace(
                      '/#',
                      ''
                    ); // Eliminar "/#/app/"
                    navigate(ruta);
                  }}
                >
                  <ReplyIcon />
                </Button>
              ) : (
                <> {/* Fragmento vacío */}</>
              )}
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

  const filtered_rows =
    mostrar_leidos === true
      ? bandeja_alerta.filter((row) => row.leido && !row.archivado)
      : mostrar_leidos === false
        ? bandeja_alerta.filter((row) => !row.leido && !row.archivado)
        : bandeja_alerta.filter((row) => !row.archivado);

  const Variablex = bandeja_alerta.filter((row) => row.archivado);

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, [mostrar_leidos]);

  const numeroDeAlertasLeidos = alertas_leidas_icono;
  const numeroDeAlertasNoLeidos = alertas_no_leidas_icono;
  const numeroDeAlertasTodos = numeroDeAlertasLeidos + numeroDeAlertasNoLeidos;
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
              <BotonConAlerta
                label="Leídos"
                icono={<MarkEmailReadIcon />}
                onClick={f_leidos}
                numeroDeAlertas={numeroDeAlertasLeidos}
              />
              <BotonConAlerta
                label="No Leídos"
                icono={<MarkEmailUnreadIcon />}
                onClick={f_no_leidos}
                numeroDeAlertas={numeroDeAlertasNoLeidos}
              />
              <BotonConAlerta
                label="Todos"
                icono={<MarkunreadMailboxIcon />}
                onClick={f_todos}
                numeroDeAlertas={numeroDeAlertasTodos}
              />

              <MostrrModalArchivado data={Variablex} />
            </ButtonGroup>

            <ButtonGroup style={{ margin: 7 }}>
              {download_xls({ nurseries: filtered_rows, columns })}
              {download_pdf({
                nurseries: filtered_rows,
                columns,
                title: 'Mis alertas',
              })}
            </ButtonGroup>
          </div>
          <Box
            component="form"
            sx={{ mt: '20px', width: '100%' }}
            noValidate
            autoComplete="off"
          >
            <DataGrid
              density="compact"
              autoHeight
              columns={columns as any}
              rows={filtered_rows || ""}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(_row) => uuidv4()}
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'rigth',
          }}
        >
          <div style={{ color: '#	#000000', marginBottom: '8px' }}>
            Tipos de alertas:
          </div>
          <div style={{ color: '#4CAF50', marginBottom: '8px' }}>
            <PriorityHighRoundedIcon
              fontSize="small"
              style={{ color: '#4CAF50', marginRight: 4 }}
            />
            Baja
          </div>
          <div style={{ color: '#FFC107', marginBottom: '8px' }}>
            <PriorityHighRoundedIcon
              fontSize="small"
              style={{ color: '#FFC107', marginRight: 4 }}
            />
            Media
          </div>
          <div style={{ color: '#F44336' }}>
            <PriorityHighRoundedIcon
              fontSize="small"
              style={{ color: '#F44336', marginRight: 4 }}
            />
            Alta
          </div>
        </div>
      </Grid>
    </>
  );
};
