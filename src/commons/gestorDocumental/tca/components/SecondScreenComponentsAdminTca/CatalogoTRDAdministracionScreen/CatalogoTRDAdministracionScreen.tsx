/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { type FC, useContext } from 'react';
import { RenderDataGrid } from '../../../Atom/RenderDataGrid/RenderDataGrid';
import { Avatar, Chip, IconButton } from '@mui/material';
import { AvatarStyles } from '../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';

//* icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import type { dataGridTypes } from '../../../types/tca.types';
import { useAppDispatch } from '../../../../../../hooks';
import { ModalContextTCA } from '../../../context/ModalContextTca';
import {
  set_selected_item_from_catalogo_action,
  set_tipologias_NO_reservadas,
  set_tipologias_reservadas
} from '../../../toolkit/TCAResources/slice/TcaSlice';
import { type GridColDef } from '@mui/x-data-grid';
import { get_tipologias_relacion } from '../../../toolkit/TCAResources/thunks/TcaServicesThunks';
import { use_tca } from '../../../hooks/use_tca';

export const CatalogoTRDAdministracionScreen: FC<dataGridTypes> = ({
  rows,
  columns,
  title,
  aditionalElement
}: dataGridTypes): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context declaration
  const { openModalAdministracionTca } = useContext(ModalContextTCA);

  const {
    setLoadTipologias
    // ? establishe the formState
  } = use_tca();

  const newColums: GridColDef[] = [
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 80,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              aria-label="admin"
              size="large"
              title="Administrar TRD en base a relación"
              onClick={() => {
                console.log(params.row);
                openModalAdministracionTca();
                dispatch(set_selected_item_from_catalogo_action(params.row));
                void get_tipologias_relacion(
                  params.row.id_catserie_unidadorg,
                  setLoadTipologias
                ).then((res: any) => {
                  const tipologias_reservadas = res.filter(
                    (item: any) => item.reservada
                  );

                  const tipologias_NO_reservadas = res.filter(
                    (item: any) => !item.reservada
                  );

                  console.log('tipologias_reservadas,', tipologias_reservadas);
                  console.log(
                    'tipologias_NO_reservadas,',
                    tipologias_NO_reservadas
                  );

                  dispatch(set_tipologias_reservadas(tipologias_reservadas));
                  dispatch(
                    set_tipologias_NO_reservadas(tipologias_NO_reservadas)
                  );
                });
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <AdminPanelSettingsIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          </>
        );
      }
    },
    ...columns,
    {
      headerName: 'Fecha registro',
      field: 'fecha_registro',
      width: 180,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={params.row.fecha_registro}
            color="success"
            variant="outlined"
          />
        );
      }
    },
    {
      headerName: 'Digitalización',
      field: 'digitalizacion',
      width: 160,
      renderCell: (params: any) => {
        return params.row.digitalizacion ? (
          <Chip size="small" label="SI" color="primary" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="error" variant="outlined" />
        );
      }
    }
  ];

  return (
    <>
      <RenderDataGrid
        rows={rows || []}
        columns={newColums || []}
        title={title}
        aditionalElement={aditionalElement}
      />
    </>
  );
};
