/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { miEstilo } from '../../Encuesta/interfaces/types';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import {
  organigrama,
  AsignacionEncuesta,
  FormData,
  Pqr,
  estado,
  TipoPQRSDF,
} from '../interface/types';
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  cargarAsignaciones,
  cargarestado,
  cargarorganigrama,
  fetchSpqrs,
  fetchTipoPQRSDF,
} from '../services/consultaExterno.service';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';



export interface props {
  handleInputChange:any;
  formData:any;
  setFormData:any;
  estado:any;
  setestado:any;
};
export const ConsultaExternoPQR: React.FC<props> = ({setestado, estado,setFormData, handleInputChange,formData}) => {
  const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);

  useEffect(() => console.log(asignaciones), [asignaciones])

  const initialFormData: FormData = {
    id_persona_alertar: null,
    pqrs: '',
    estado: '',
    radicado: '',
    organigrama: '',
    fecha_desde: '',
    fecha_hasta: '',
    tipo_solicitud: '',
    estado_solicitud: '',
  };
  // const [formData, setFormData] = useState(initialFormData);
  // const handleInputChange = (event: any) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  useEffect(() => {
    cargarAsignaciones({
      setAsignaciones: setAsignaciones,
      formData: formData,
    });
  }, []);
  const columns = [
    // { field: 'Id_PQRSDF', headerName: 'Id_PQRSDF  ', width: 220, flex: 1, },
    {
      field: 'Tipo de Solicitud',
      headerName: 'Tipo de Solicitud',
      minWidth: 150,
    },
    // {
    //   field: 'tipo_pqrsdf_descripcion',
    //   headerName: 'Tipo de PQRSDF',
    //   minWidth: 200,
    // },
    { field: 'Titular', headerName: 'Titular', minWidth: 450, },
    { field: 'Asunto', headerName: 'Asunto', minWidth: 300, },
    { field: 'Radicado', headerName: 'Radicado', minWidth: 200, },
    {
      field: 'Fecha de Radicado',
      headerName: 'Fecha de Radicado',
      minWidth: 200,
      valueFormatter: (params: { value: string | number | Date }) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${date.getFullYear()}`;
        return formattedDate;
      },
    },
    {
      field: 'Persona Que Radicó',
      headerName: 'Persona Que Radicó  ',
      minWidth: 450,
    },
    // {
    //   field: 'Tiempo Para Respuesta',
    //   headerName: 'Tiempo Para Respuesta',
    //   minWidth: 200,
    // },
    { field: 'Estado', headerName: 'Estado',      minWidth: 250, },
    {
      field: 'ruta_archivo',
      headerName: 'Archivo',
      minWidth: 100,
      renderCell: (params: any) => (
        <DownloadButton
          condition={params.row.URL_Documento === null}
          fileUrl={params.row.Archivo.ruta_archivo}
          fileName={params?.value?.Id_PQRSDF}
        />
      ),
    },
  ];
  // Efecto para cargar los datos del pqrs
  const [pqrss, setpqrs] = useState<Pqr[]>([]);
  useEffect(() => {
    fetchSpqrs({ setpqrs });
  }, []);
  //Organigrama
  const [organigrama, setorganigrama] = useState<organigrama[]>([]);

  useEffect(() => {
    cargarorganigrama({ setorganigrama });
  }, []);
  //
  const [tipoPQRSDF, setTipoPQRSDF] = useState<TipoPQRSDF[]>([]);
  useEffect(() => {
    fetchTipoPQRSDF({ setTipoPQRSDF });
  }, []);
  //Estado
  // const [estado, setestado] = useState<estado[]>([]);
  useEffect(() => {
    cargarestado({ setestado });
  }, []);
  //eliminar
  const handleResetForm = () => {
    setFormData(initialFormData);
    cargarAsignaciones({
      setAsignaciones: setAsignaciones,
      formData: formData,
    });
  };
  return (
    <>

     <Grid item xs={12} sm={3}>
          <FormControl size="small" fullWidth>
            <InputLabel>Tipos de PQRS</InputLabel>
            <Select
              onChange={handleInputChange}
              value={formData.pqrs}
              name="pqrs"
              label="PQRS"
            >
              {pqrss.map((pqrs) => (
                <MenuItem key={pqrs.value} value={pqrs.value}>
                  {pqrs.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={() => {
              handleResetForm();
            }}
          >
            Limpiar
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => {
              cargarAsignaciones({
                setAsignaciones: setAsignaciones,
                formData: formData,
              });
            }}
          >
            buscar
          </Button>
        </Grid>





        <RenderDataGrid
          title="Resultados de la busqueda"
          rows={asignaciones}
          columns={columns}
        />



    </>
  );
};
