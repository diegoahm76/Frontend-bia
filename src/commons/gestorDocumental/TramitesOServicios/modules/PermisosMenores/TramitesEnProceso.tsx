/* eslint-disable @typescript-eslint/naming-convention */
import {
  Grid,
  Button,
  Stack,
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Avatar,
  Fab,
  Paper,
  ButtonGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../../../hooks';
import { obtener_opas_por_titular } from './thunks/TramitesOServicios';
import { RenderDataGrid } from '../../../tca/Atom/RenderDataGrid/RenderDataGrid';
const class_css = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  mb: '20px',
  boxShadow: '0px 3px 6px #042F4A26',
};
interface IProps {
  usuario: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TramitesEnProceso: React.FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [tramites_proceso, set_tramites_proceso] = useState<any[]>([]);
  const columns: GridColDef[] = [
    {
      field: 'nombre_persona_titular',
      headerName: 'Nombre persona titular',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_persona_interpone',
      headerName: 'Nombre persona interpone',
      sortable: true,
      width: 350,
    },
    {
      field: 'relacion_con_el_titular',
      headerName: 'Relación con el titular',
      width: 200,
    },
    {
      field: 'tipo_permiso_ambiental',
      headerName: 'Tipo permiso ambiental',
      width: 350,
    },
    {
      field: 'permiso_ambiental',
      headerName: 'Permiso ambiental',
      width: 450,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre proyecto',
      width: 200,
    },
    {
      field: 'fecha_ini_estado_actual',
      headerName: 'Fecha inicio',
      width: 170,
      valueGetter: (params) =>
        dayjs(params.row.fecha_ini_estado_actual).format('DD/MM/YYYY HH:mm'),
    },
    {
      field: 'estado_actual_solicitud',
      headerName: 'Estado solicitud',
      width: 280,
    },
    /*{
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => <></>,
    },*/
  ];

  useEffect(() => {
    dispatch(obtener_opas_por_titular(props.usuario.id_persona)).then(
      (response: any) => {
        response.success ? set_tramites_proceso(response.data) : [];
      }
    );
  }, []);
  return (
    <>
      <RenderDataGrid
        title="Lista de permisos menores en proceso"
        rows={tramites_proceso}
        columns={columns}
      />
    </>
  );
};
