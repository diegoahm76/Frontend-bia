/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Title } from "../../../../components/Title"
import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { api } from "../../../../api/axios";
import SearchIcon from '@mui/icons-material/Search';



interface Row {
  id: number;
  tipoSolicitud: string;
  fechaSolicitud: string;
  numeroRadicado: string;
  asunto: string;
  titular: string;
  numeroAnexos: number;
  estadoDigitalizacion: string;
}
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
  tipo_solicitud: '',
  fecha_desde: '',
  fecha_hasta: '',
}

export const PantallaHistoricoSolicitudes = () => {

  const [choise_tipo_solicitud, set_choise_tipo_solicitud] = useState([{ value: "", label: "" }]);
  const [form, setForm] = useState(initial_data);

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


  useEffect(() => {

    fetch_tipo_solicitud();
  }, []);


  const navigate = useNavigate();

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
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate(
              `/app/gestor_documental/central_digitalizacion_otros/digitalizacion/${1}`
            );
          }}
        >
          Acción
        </Button>
      ),
    },
  ];

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
          <Title title="PantallaHistoricoSolicitudes  " />
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



        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            style={{ marginTop: 15, width: '90%' }}
            type="date"
            size="small"
            variant="outlined"
            value={form.fecha_desde}
            label=" Fecha desde "
            onChange={(e) => handleInputChange('fecha_desde', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>


        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            value={form.fecha_hasta}
            label=" Fecha hasta"
            onChange={(e) => handleInputChange('fecha_hasta', e.target.value)}
            style={{ marginTop: 15, width: '90%' }}
            InputLabelProps={{ shrink: true }}
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
          <Grid item xs={12} sm={5} md={4}>
            <Button
              style={{ margin: 8 }}
              color="primary"
              variant="contained"
              startIcon={<ArrowOutwardIcon />}
              onClick={() => {
                navigate(
                  "/app/gestor_documental/central_digitalizacion_otros/principal"
                );
              }}
            >
              Central de Digitalizacion
            </Button>
          </Grid>
        </Grid>


      </Grid>


    </>
  )
}

