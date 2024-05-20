/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TaskIcon from '@mui/icons-material/Task';
import PreviewIcon from '@mui/icons-material/Preview';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import {
  setCurrentElementPqrsdComplementoTramitesYotros,
  setListaElementosComplementosRequerimientosOtros,
} from '../../../../../../../toolkit/store/VitalStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { columnsTramites } from './columnsTramites/columnsTramites';

import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { getComplementosAsociadosTramite } from '../../../../../../../toolkit/thunks/TramitesyServiciosyRequerimientos/getComplementosTramites.service';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { api } from '../../../../../../../../../../api/axios';
import { downloadCSV } from '../../../utils/downloadCSV';
import { ModalInfoElementos } from '../../AtomVistaElementos/PQRSDF/ModalInfoPqrsdf';

export const ListaElementosTramites = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    handleThirdLoading,
    handleSixthLoading,
    handleSevenLoading,
    sevenLoading,
    sixthLoading,
  } = useContext(ModalAndLoadingContext);

  //* redux states
  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.VitalSlice
  );

  //* espacio para la definición de las columnas
  const columns = [
    ...columnsTramites,
    /*  {
      headerName: 'Requiere digitalización',
      field: 'requiere_digitalizacion',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={params.value ? 'Sí' : 'No'}
            color={params.value ? 'success' : 'error'}
          />
        );
      },
    },*/
    /*  {
      headerName: 'Pago',
      field: 'pago',
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={params.value ? 'Sí' : 'No'}
            color={params.value ? 'success' : 'error'}
          />
        );
      },
    },*/
    /*  {
      headerName: 'Solictud enviada',
      field: 'solicitud_enviada',
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={params.value ? 'Sí' : 'No'}
            color={params.value ? 'success' : 'error'}
          />
        );
      },
    },*/
    {
      headerName: 'Costo proyecto',
      field: 'costo_proyecto',
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`$${params.value?.toLocaleString()}`}
            color={params.value > 0 ? 'success' : 'warning'}
          />
        );
      },
    },
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip
              title={`Ver complementos asociados a trámite con radicado ${params?.row?.radicado}`}
            >
              <IconButton
                onClick={() => {
                  (async () => {
                    try {
                      const res = await getComplementosAsociadosTramite(
                        params.row.id_solicitud_tramite,
                        handleThirdLoading
                      );
                      dispatch(
                        setListaElementosComplementosRequerimientosOtros(res)
                      );
                    } catch (error) {
                      console.error(
                        'Error al obtener los complementos asociados al trámite:',
                        error
                      );
                    }
                  })();
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <KeyboardDoubleArrowDownIcon
                    sx={{
                      color: 'info.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Seleccionar trámite para procesos">
              <IconButton
                onClick={() => {
                  if (params?.row?.estado_asignacion_grupo === 'EN GESTION') {
                    control_warning(
                      'No se pueden seleccionar esta pqrsdf ya que ha sido asignada a un grupo'
                    );
                    return;
                  }
                  console.log(params.row);
                  dispatch(
                    setListaElementosComplementosRequerimientosOtros([])
                  );

                  //setActionsTramites(params?.row);
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <TaskIcon
                    sx={{
                      color: 'warning.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>*/}
            <Tooltip title="Exportar TRÁMITE en fomato CSV">
              <IconButton
                onClick={() => {
                  (async () => {
                    try {
                      const { data } = await api.get(
                        `tramites/general/get/?radicado=${params?.row?.radicado}`
                      );

                      if (data?.data) {
                        /*console.log('data de tramite', {
                          radicadoBia: data?.data.radicate_bia || 'No aplica',
                          nombrePredio: data?.data.Npredio || 'No aplica',
                          cuerpoEmail: data?.data.bodyEmail || 'No aplica',
                          fechaRadicado: data?.data.DateRadicate || 'No aplica',
                          departamentoPredio:
                            data?.data.DepPredio || 'No aplica',
                          certificadoExistencia:
                            data?.data.CertificadoExistencia || 'No aplica',
                          coordinador: data?.data.Coordinador || 'No aplica',
                          costoProyecto: data?.data.Costoproyeto || 'No aplica',
                          valorDepartamentoPredio:
                            data?.data.DepPredio_value || 'No aplica',
                          certificadoCatastral:
                            data?.data.CertCat || 'No aplica',
                          nombreProfesional:
                            data?.data.Nprofesional_value || 'No aplica',
                          municipio: data?.data.Municipio || 'No aplica',
                          tipoPersona: data?.data.Tpersona || 'No aplica',
                          zona: data?.data.Zon_value || 'No aplica',
                          cedulaRepresentanteLegal:
                            data?.data.CedulaRepresentanteLegal || 'No aplica',
                          valorCoordinador:
                            data?.data.Coordinador_value || 'No aplica',
                          correo: data?.data.Correo || 'No aplica',
                          municipioPredio: data?.data.MunPredio || 'No aplica',
                          rolAsignado: data?.data.Assigned_Role || 'No aplica',
                          cedulaApoderado:
                            data?.data.CedulaApoderado || 'No aplica',
                          latitudF: data?.data.LatitudF || 'No aplica',
                          valorTipoPersona:
                            data?.data.Tpersona_value || 'No aplica',
                          departamento: data?.data.Departamento || 'No aplica',
                          valorDepartamento:
                            data?.data.Departamento_value || 'No aplica',
                          valorMunicipioPredio:
                            data?.data.MunPredio_value || 'No aplica',
                          numeroExpediente: data?.data.NumExp || 'No aplica',
                          numeroAuto: data?.data.NumeroAuto || 'No aplica',
                          perteneceAguas:
                            data?.data.Pert_Aguas_value || 'No aplica',
                          profesionalJuridico:
                            data?.data.ProfesionalJur || 'No aplica',
                          valorProfesionalJuridico:
                            data?.data.ProfesionalJur_value || 'No aplica',
                          profesionalRevision:
                            data?.data.ProfesionalRev || 'No aplica',
                          urlLocalBackendCore:
                            data?.data.UrlLocalBackendCore || 'No aplica',
                          tipoProcedimiento:
                            data?.data.typeProcedure_value || 'No aplica',
                          profesionalVt2:
                            data?.data.ProfesionalVt2 || 'No aplica',
                          aguas: data?.data.Aguas || 'No aplica',
                          aprobacionRegistro: data?.data.AprReg || 'No aplica',
                          fechaAsignacion:
                            data?.data.FechaAsignacion || 'No aplica',
                          grupoFuncionalTramite:
                            data?.data.GrupoFunTramite || 'No aplica',
                          valorGrupoFuncionalTramite:
                            data?.data.GrupoFunTramite_value || 'No aplica',
                          profesionalVt1:
                            data?.data.ProfesionalVt1 || 'No aplica',
                          profesionalVt3:
                            data?.data.ProfesionalVt3 || 'No aplica',
                          profesionalVt4:
                            data?.data.ProfesionalVt4 || 'No aplica',
                          requiereVisita:
                            data?.data['Req-Visita'] || 'No aplica',
                          valorRequiereVisita:
                            data?.data['Req-Visita_value'] || 'No aplica',
                          resultadoProcedimiento:
                            data?.data.ResultProcedure || 'No aplica',
                          mensajeSMS: data?.data.SMS || 'No aplica',
                          sistemaAdaptacion:
                            data?.data.SisAdaptfff || 'No aplica',
                          tipoIdentificacion:
                            data?.data.TIdentificacion || 'No aplica',
                          valorTipoIdentificacion:
                            data?.data.TIdentificacion_value || 'No aplica',
                          tipoSolicitud: data?.data.typeRequest || 'No aplica',
                          cedulaSolicitante:
                            data?.data.CedulaSolicitante || 'No aplica',
                          juridico: data?.data.juri || 'No aplica',
                          profesional: data?.data.prof || 'No aplica',
                          numeroTelefono: data?.data.Ntelefono || 'No aplica',
                          direccion: data?.data.Direccion || 'No aplica',
                          direccionPredio: data?.data.Dpredio || 'No aplica',
                          revision: data?.data.rev || 'No aplica',
                          estadoProcedimiento:
                            data?.data.stateProcedure || 'No aplica',
                          asunto: data?.data.subject || 'No aplica',
                          matriculaInmobiliaria:
                            data?.data.MatriInmobi || 'No aplica',
                          relacionConTitular:
                            data?.data.RelacionConTitular || 'No aplica',
                          ipRemota: data?.data.remoteIp || 'No aplica',
                          valorMunicipio:
                            data?.data.Municipio_value || 'No aplica',
                          numeroRadicado: data?.data.NRadicado || 'No aplica',
                          nombre: data?.data.Nombre || 'No aplica',
                          catastro: data?.data.CCatas || 'No aplica',
                          nombreDivision: data?.data.Ndivision || 'No aplica',
                          numeroIdentificacion:
                            data?.data.NIdenticion || 'No aplica',
                          condicionPredio: data?.data.Cpredio || 'No aplica',
                          masPredios: data?.data.Mas_predios || 'No aplica',
                          soporteCalculoPredio:
                            data?.data.SopCalPred || 'No aplica',
                          radicadoCompleto:
                            data?.data.radicateComplete || 'No aplica',
                          nombreProyecto: data?.data.nameProject || 'No aplica',
                          fechaInicioAuto:
                            data?.data.dateAutoStart || 'No aplica',
                          fechaFinalAuto: data?.data.FNAuto || 'No aplica',
                          sistemaAdaptacion4:
                            data?.data.SisAdapt4 || 'No aplica',
                          valorCondicionPredio:
                            data?.data.Cpredio_value || 'No aplica',
                          ventanaRadicado:
                            data?.data.windowRadicate || 'No aplica',
                          pagoReal: data?.data.RealPag || 'No aplica',
                          claveSecreta: data?.data.secret_key || 'No aplica',
                          poderApoderado: data?.data.PodApod || 'No aplica',
                          numeroDeFax: data?.data.Nfax || 'No aplica',
                        });*/
                        downloadCSV(
                          {
                            radicadoBia: data?.data.radicate_bia || 'No aplica',
                            nombrePredio: data?.data.Npredio || 'No aplica',
                            cuerpoEmail: data?.data.bodyEmail || 'No aplica',
                            fechaRadicado:
                              data?.data.DateRadicate || 'No aplica',
                            departamentoPredio:
                              data?.data.DepPredio || 'No aplica',
                            certificadoExistencia:
                              data?.data.CertificadoExistencia || 'No aplica',
                            coordinador: data?.data.Coordinador || 'No aplica',
                            costoProyecto:
                              data?.data.Costoproyeto || 'No aplica',
                            valorDepartamentoPredio:
                              data?.data.DepPredio_value || 'No aplica',
                            certificadoCatastral:
                              data?.data.CertCat || 'No aplica',
                            nombreProfesional:
                              data?.data.Nprofesional_value || 'No aplica',
                            municipio: data?.data.Municipio || 'No aplica',
                            tipoPersona: data?.data.Tpersona || 'No aplica',
                            zona: data?.data.Zon_value || 'No aplica',
                            cedulaRepresentanteLegal:
                              data?.data.CedulaRepresentanteLegal ||
                              'No aplica',
                            valorCoordinador:
                              data?.data.Coordinador_value || 'No aplica',
                            correo: data?.data.Correo || 'No aplica',
                            municipioPredio:
                              data?.data.MunPredio || 'No aplica',
                            rolAsignado:
                              data?.data.Assigned_Role || 'No aplica',
                            cedulaApoderado:
                              data?.data.CedulaApoderado || 'No aplica',
                            latitudF: data?.data.LatitudF || 'No aplica',
                            valorTipoPersona:
                              data?.data.Tpersona_value || 'No aplica',
                            departamento:
                              data?.data.Departamento || 'No aplica',
                            valorDepartamento:
                              data?.data.Departamento_value || 'No aplica',
                            valorMunicipioPredio:
                              data?.data.MunPredio_value || 'No aplica',
                            numeroExpediente: data?.data.NumExp || 'No aplica',
                            numeroAuto: data?.data.NumeroAuto || 'No aplica',
                            perteneceAguas:
                              data?.data.Pert_Aguas_value || 'No aplica',
                            profesionalJuridico:
                              data?.data.ProfesionalJur || 'No aplica',
                            valorProfesionalJuridico:
                              data?.data.ProfesionalJur_value || 'No aplica',
                            profesionalRevision:
                              data?.data.ProfesionalRev || 'No aplica',
                            urlLocalBackendCore:
                              data?.data.UrlLocalBackendCore || 'No aplica',
                            tipoProcedimiento:
                              data?.data.typeProcedure_value || 'No aplica',
                            profesionalVt2:
                              data?.data.ProfesionalVt2 || 'No aplica',
                            aguas: data?.data.Aguas || 'No aplica',
                            aprobacionRegistro:
                              data?.data.AprReg || 'No aplica',
                            fechaAsignacion:
                              data?.data.FechaAsignacion || 'No aplica',
                            grupoFuncionalTramite:
                              data?.data.GrupoFunTramite || 'No aplica',
                            valorGrupoFuncionalTramite:
                              data?.data.GrupoFunTramite_value || 'No aplica',
                            profesionalVt1:
                              data?.data.ProfesionalVt1 || 'No aplica',
                            profesionalVt3:
                              data?.data.ProfesionalVt3 || 'No aplica',
                            profesionalVt4:
                              data?.data.ProfesionalVt4 || 'No aplica',
                            requiereVisita:
                              data?.data['Req-Visita'] || 'No aplica',
                            valorRequiereVisita:
                              data?.data['Req-Visita_value'] || 'No aplica',
                            resultadoProcedimiento:
                              data?.data.ResultProcedure || 'No aplica',
                            mensajeSMS: data?.data.SMS || 'No aplica',
                            sistemaAdaptacion:
                              data?.data.SisAdaptfff || 'No aplica',
                            tipoIdentificacion:
                              data?.data.TIdentificacion || 'No aplica',
                            valorTipoIdentificacion:
                              data?.data.TIdentificacion_value || 'No aplica',
                            tipoSolicitud:
                              data?.data.typeRequest || 'No aplica',
                            cedulaSolicitante:
                              data?.data.CedulaSolicitante || 'No aplica',
                            juridico: data?.data.juri || 'No aplica',
                            profesional: data?.data.prof || 'No aplica',
                            numeroTelefono: data?.data.Ntelefono || 'No aplica',
                            direccion: data?.data.Direccion || 'No aplica',
                            direccionPredio: data?.data.Dpredio || 'No aplica',
                            revision: data?.data.rev || 'No aplica',
                            estadoProcedimiento:
                              data?.data.stateProcedure || 'No aplica',
                            asunto: data?.data.subject || 'No aplica',
                            matriculaInmobiliaria:
                              data?.data.MatriInmobi || 'No aplica',
                            relacionConTitular:
                              data?.data.RelacionConTitular || 'No aplica',
                            ipRemota: data?.data.remoteIp || 'No aplica',
                            valorMunicipio:
                              data?.data.Municipio_value || 'No aplica',
                            numeroRadicado: data?.data.NRadicado || 'No aplica',
                            nombre: data?.data.Nombre || 'No aplica',
                            catastro: data?.data.CCatas || 'No aplica',
                            nombreDivision: data?.data.Ndivision || 'No aplica',
                            numeroIdentificacion:
                              data?.data.NIdenticion || 'No aplica',
                            condicionPredio: data?.data.Cpredio || 'No aplica',
                            masPredios: data?.data.Mas_predios || 'No aplica',
                            soporteCalculoPredio:
                              data?.data.SopCalPred || 'No aplica',
                            radicadoCompleto:
                              data?.data.radicateComplete || 'No aplica',
                            nombreProyecto:
                              data?.data.nameProject || 'No aplica',
                            fechaInicioAuto:
                              data?.data.dateAutoStart || 'No aplica',
                            fechaFinalAuto: data?.data.FNAuto || 'No aplica',
                            sistemaAdaptacion4:
                              data?.data.SisAdapt4 || 'No aplica',
                            valorCondicionPredio:
                              data?.data.Cpredio_value || 'No aplica',
                            ventanaRadicado:
                              data?.data.windowRadicate || 'No aplica',
                            pagoReal: data?.data.RealPag || 'No aplica',
                            claveSecreta: data?.data.secret_key || 'No aplica',
                            poderApoderado: data?.data.PodApod || 'No aplica',
                            numeroDeFax: data?.data.Nfax || 'No aplica',
                          },
                          `tramite_vital${params?.row?.radicado}.csv`
                        );
                        return;
                        //control_success('se ha encontrado la siguiente información');
                      }
                      control_warning(
                        'No se ha encontrado información para exportar'
                      );
                    } catch (error) {
                      control_warning(
                        'No se ha encontrado información para exportar, intente de nuevo o con otro trámite'
                      );
                    }
                  })();

                  /*void getAnexosPqrsdf(params?.row?.id_PQRSDF).then((res) => {
                    //  console.log('')(res);
                    setActionsPQRSDF(params?.row);
                    navigate(
                      `/app/gestor_documental/panel_ventanilla/pqr_info/${params.row.id_PQRSDF}`
                    );
                    setAnexos(res);
                    if (res.length > 0) {
                      handleOpenInfoMetadatos(false); //* cierre de la parte de los metadatos
                      handleOpenInfoAnexos(false); //* cierra la parte de la información del archivo realacionaod a la pqesdf que se consulta con el id del anexo
                      return;
                    }

                    return;
                  });*/
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <DocumentScannerIcon
                    sx={{
                      color: 'success.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  dispatch(
                    setCurrentElementPqrsdComplementoTramitesYotros(params?.row)
                  );
                  handleSixthLoading(true);
                  /* void getAnexosPqrsdf(params?.row?.id_PQRSDF).then((res) => {
                    //  console.log('')(res);
                    setActionsPQRSDF(params?.row);
                    navigate(
                      `/app/gestor_documental/panel_ventanilla/pqr_info/${params.row.id_PQRSDF}`
                    );
                    setAnexos(res);
                    if (res.length > 0) {
                      handleOpenInfoMetadatos(false); //* cierre de la parte de los metadatos
                      handleOpenInfoAnexos(false); //* cierra la parte de la información del archivo realacionaod a la pqesdf que se consulta con el id del anexo
                      return;
                    }

                    return;
                  });*/
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <VisibilityIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <ModalInfoElementos
        openModalOne={sixthLoading}
        openModalTwo={sevenLoading}
        handleOpenModalOne={handleSixthLoading}
        handleOpenModalTwo={handleSevenLoading}
      />

      <RenderDataGrid
        rows={
          listaElementosPqrsfTramitesUotros.filter(
            (el: { radicado: string }) => el?.radicado
          ) ?? []
        }
        columns={columns ?? []}
        title={`Lista de solicitudes de ${listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud}S`}
      />
    </>
  );
};
