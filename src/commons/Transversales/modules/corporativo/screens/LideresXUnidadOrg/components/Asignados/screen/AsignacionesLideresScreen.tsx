/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { RenderDataGrid } from '../../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../hooks';
import { Avatar, Button, Chip, IconButton } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { AvatarStyles } from '../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { columnsAsignacionesDeLideres } from '../utils/columsAsignacionesLideres/columnsAsignacionLideres';
import { set_asignacion_lideres_current } from '../../../toolkit/LideresSlices/LideresSlice';
import { BusquedaAsignacionesLideresModal } from '../components/BusquedaAsignacionesLideres/BusquedaAsignacionesLideresModal';
import { ModalContextLideres } from '../../../context/ModalContextLideres';

export const AsignacionesDeLideresScreen: FC = (): JSX.Element => {
  //* dispatch declarations
  const dispatch = useAppDispatch();

  //* states declarations
  const { asignaciones_lideres_list } = useAppSelector(
    (state: any) => state.lideres_slice
  );

  //* CONTEXT
  const { openModalBusquedaAvanzadaLideres } = useContext(ModalContextLideres);

  const columnsLideres = [
    {
      headerName: 'Acción',
      field: 'accion',
      width: 65,
      renderCell: (params: any) =>
        (
          <>
            <IconButton
              onClick={() => {
                //  console.log('')(params.row);
                dispatch(set_asignacion_lideres_current(params.row));
                // closeModal();
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <EditIcon
                  titleAccess="Editar asignación de líder"
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </>
        ) as JSX.Element
    },
    ...columnsAsignacionesDeLideres,
    {
      headerName: 'Fecha Terminado',
      field: 'fecha_terminado',
      minWidth: 180,
      maxWidth: 220,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`${new Date(params.row.fecha_asignacion).toLocaleString()}`}
            color="success"
            variant="outlined"
          />
        ) as JSX.Element;
      }
    }
  ];

  return (
    <>
      <RenderDataGrid
        rows={asignaciones_lideres_list}
        columns={columnsLideres}
        title={
          asignaciones_lideres_list.length > 0
            ? 'Líderes asignados a las unidades organizacionales'
            : 'No hay asignaciones de lideres en las unidades organizacionales '
        }
       aditionalElement={
          <Button
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={openModalBusquedaAvanzadaLideres}
          >
           CONSULTA DE LÍDERES QUE FUERON ASIGNADOS
          </Button>
        }
      />

      {/* modal busqueda asignaciones de lideres   */}

      <BusquedaAsignacionesLideresModal />

      {/* modal busqueda asignaciones de lideres   */}
    </>
  );
};
