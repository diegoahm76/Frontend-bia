/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from '../../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';
import { columnsAsignacionesDeLideres } from '../utils/columsAsignacionesDeLideres/columnsAsignacionesDeLideres';
import { Avatar, Chip, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AvatarStyles } from '../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';

export const AsignacionesDeLideresScreen: FC = (): JSX.Element => {
  //* states declarations
  const { asignaciones_lideres_list } = useAppSelector(
    (state: any) => state.lideres_slice
  );

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
                console.log(params.row);
                // dispatch(set_organigrama_lideres_current(params.row));
                // closeModal();
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <VisibilityIcon
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
        title="Líderes asignados por unidad organizacional"
      />
    </>
  );
};
