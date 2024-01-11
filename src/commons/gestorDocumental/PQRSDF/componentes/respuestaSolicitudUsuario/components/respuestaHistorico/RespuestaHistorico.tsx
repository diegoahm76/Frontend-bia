/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { PQRSDFContext } from "../../context/CreateRespuestaPqrs";
import { api } from "../../../../../../../api/axios";
import { v4 as uuidv4 } from 'uuid';
import { ResSolicitudUsuarioContext } from "../../context/ResSolicitudUsarioContext";
import { useAppSelector } from "../../../../../../../hooks";


export const RespuestaHistorico = () => {
  const {
    setRespuestaPqrs

  } = useContext(ResSolicitudUsuarioContext);
  const { pqrsdfData, setPQRSDFData } = useContext(PQRSDFContext);
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  console.log("pqrsdfData", pqrsdfData);

  const Peticion_Respuesta_PQRS = async (): Promise<void> => {
    try {
      const url = `/gestor/pqr/get_pqrsdf-panel/${currentElementPqrsdComplementoTramitesYotros.id_pqrsdf}/`;
      const res = await api.get(url);
      const consulta = res.data.data;
        ;  // Coloca el objeto dentro de un arreglo
      setPQRSDFData(consulta);
      // setRespuestaPqrs(consulta);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Aquí podrías manejar el error de manera más específica
    }
  };




  const columns: GridColDef[] = [
    {
      field: 'id_anexo',
      headerName: 'id_anexo',
      width: 100,
    },
    {
      field: 'nombre_medio_almacenamiento',
      headerName: 'nombre_medio_almacenamiento',
      width: 100,
    },   
    {
      field: 'ya_digitalizado',
      headerName: 'ya_digitalizado',
      width: 100,
    },
    {
      field: 'ya_digitalizado',
      headerName: 'ya_digitalizado',
      width: 100,
    },
    // Agrega más columnas según sea necesario
  ];

  useEffect(() => {
    Peticion_Respuesta_PQRS();
  }, []);

  return (
    <>
      <div>RespuestaHistorico</div>

      <div style={{ height: 400, width: '100%' }}>
        {/* <DataGrid
          density="compact"
          style={{ marginTop: 15, width: "100%" }}
          autoHeight
          rows={pqrsdfData.anexos || []}
          columns={columns}
          getRowId={(row) => uuidv4()}
        /> */}
      </div>

      <button onClick={Peticion_Respuesta_PQRS}>Fetch Data</button>
    </>
  );
};
