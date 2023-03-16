import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Componentes de Material UI
import {
  Grid,
  Box,
  Stack,
  Button,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
// Icons de Material UI
import AddIcon from '@mui/icons-material/Add';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Componentes personalizados
import { Title } from '../../../../components/Title';
// // Hooks
 import { useAppDispatch, useAppSelector } from '../../../../hooks';
 // Thunks
 import { get_nurseries_service } from '../store/thunks/gestorViveroThunks';
// import CrearOrganigramaDialogForm from '../componentes/CrearOrganigramaDialogForm';
// // Slices
 import { current_nursery } from '../store/slice/viveroSlice';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdministrarViveroScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { nurseries } = useAppSelector((state) => state.nursery);
  const [add_nursery_is_active, set_add_nursery_is_active] =
    useState<boolean>(false);

  useEffect(() => {
    void dispatch(get_nurseries_service());
  }, []);

  return (
    <>
      <h1>vivero</h1>
    </>
  );
}
