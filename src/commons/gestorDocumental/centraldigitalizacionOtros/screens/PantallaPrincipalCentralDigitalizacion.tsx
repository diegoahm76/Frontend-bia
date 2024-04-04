/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Title } from "../../../../components/Title";
import { api } from "../../../../api/axios";
import SearchIcon from '@mui/icons-material/Search';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';

const rows = [
  {
    id: 1,
    tipoSolicitud: "Aprobación",
    fechaSolicitud: "2024-02-15",
    numeroRadicado: "67890",
    asunto: "Documento Confidencial",
    titular: "Jane Doe",
    numeroAnexos: 5,
    estadoDigitalizacion: "Completado",
  },
  {
    id: 2,
    tipoSolicitud: "Consulta",
    fechaSolicitud: "2024-02-10",
    numeroRadicado: "54321",
    asunto: "Informe Mensual",
    titular: "Alice Johnson",
    numeroAnexos: 2,
    estadoDigitalizacion: "En Proceso",
  },
  {
    id: 3,
    tipoSolicitud: "Aprobación",
    fechaSolicitud: "2024-02-08",
    numeroRadicado: "98765",
    asunto: "Contrato de Servicios",
    titular: "Bob Smith",
    numeroAnexos: 8,
    estadoDigitalizacion: "Pendiente",
  },
  {
    id: 4,
    tipoSolicitud: "Consulta",
    fechaSolicitud: "2024-02-20",
    numeroRadicado: "12345",
    asunto: "Informe Trimestral",
    titular: "Eva Martinez",
    numeroAnexos: 4,
    estadoDigitalizacion: "Completado",
  },
  {
    id: 5,
    tipoSolicitud: "Aprobación",
    fechaSolicitud: "2024-02-18",
    numeroRadicado: "23456",
    asunto: "Contrato de Compra",
    titular: "Charlie Brown",
    numeroAnexos: 6,
    estadoDigitalizacion: "En Proceso",
  },
];




const initial_data = {
  numero_radicado: '',
  tipo_solicitud: '',
  estado: '',


}
export const PantallaPrincipalCentralDigitalizacion: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial_data);
  const [choise_tipo_solicitud, set_choise_tipo_solicitud] = useState([{ value: "", label: "" }]);
  const [choise_estado, set_choise_estado] = useState([{ value: "", label: "" }]);


  const columns: GridColDef[] = [
    { field: "tipoSolicitud", headerName: "Tipo de Solicitud", flex: 1 },
    { field: "fechaSolicitud", headerName: "Fecha de Solicitud", flex: 1 },
    { field: "numeroRadicado", headerName: "Número de Radicado", flex: 1 },
    { field: "asunto", headerName: "Asunto", flex: 1 },
    { field: "titular", headerName: "Titular", flex: 1 },
    { field: "numeroAnexos", headerName: "Número de Anexos", flex: 1 },
    {
      field: "estadoDigitalizacion",
      headerName: "Estado de Digitalización",
      flex: 1,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (param: GridRenderCellParams) => (
        <Button

          onClick={() => {
            navigate(
              `/app/gestor_documental/central_digitalizacion_otros/digitalizacion/${1}`
            );
          }}
        >
          <RuleFolderIcon />
        </Button>
      ),
    },
  ];



  const handleInputChange = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };


  const fetch_tipo_solicitud = async (): Promise<void> => {
    try {
      let url = '/gestor/choices/cod-tipo-consecutivo/';
      const res = await api.get(url);
      const Data_consulta = res.data.data;
      set_choise_tipo_solicitud(Data_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  const fetch_tipo_estado = async (): Promise<void> => {
    try {
      let url = '/gestor/choices/cod-tipo-consecutivo/';
      const res = await api.get(url);
      const Data_consulta = res.data.data;
      set_choise_estado(Data_consulta);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch_tipo_estado();
    fetch_tipo_solicitud();
  }, []);


  return (
    <>
      <Grid
        container
        sx={{
          position: "relative",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "20px",
          mb: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}
      >
        <Grid item xs={12}>
          <Title title="Central de Digitalizacion" />
        </Grid>


        <Grid item xs={12} sm={3}>
          <FormControl fullWidth style={{ marginTop: 15, width: "95%" }}>
            <InputLabel id="estado-solicitud-label">Tipo de Solicitud</InputLabel>
            <Select
              name="Tipo de Solicitud"
              size="small"
              label="Tipo de Solicitud"
              value={form.tipo_solicitud}
              onChange={(e) => handleInputChange("tipo_solicitud", e.target.value)}
            >
              {choise_tipo_solicitud.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>



        <Grid item xs={12} sm={3}>
          <FormControl fullWidth style={{ marginTop: 15, width: "95%" }}>
            <InputLabel id="estado-solicitud-label">Estado</InputLabel>
            <Select
              name="estado"
              size="small"
              label="Estado"
              value={form.estado}
              onChange={(e) => handleInputChange("estado", e.target.value)}
            >
              {choise_estado.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="Numero Radicado"
            value={form.numero_radicado}
            onChange={(e) => handleInputChange('numero_radicado', e.target.value)}
            style={{ marginTop: 15, width: '90%' }}
          />
        </Grid>



        <Grid item xs={12} sm={3}>

          <Button
            color="primary"
            variant="contained"
            style={{ marginTop: 15 }}
            startIcon={<SearchIcon />}
          >
            Buscar
          </Button>
        </Grid>


        <Grid item xs={12} style={{ marginTop: 15 }}>
          {/* DataGrid */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight
          />
        </Grid>

        <Grid item container justifyContent="flex-end">

          <Button
            style={{ marginTop: 15 }}
            color="primary"
            variant="contained"
            startIcon={<ManageSearchIcon />}
            onClick={() => {
              navigate(
                "/app/gestor_documental/central_digitalizacion_otros/Historico"
              );
            }}
          >
            Solicitudes Respondidas
          </Button>
        </Grid>
      </Grid>
    </>
  );
};


