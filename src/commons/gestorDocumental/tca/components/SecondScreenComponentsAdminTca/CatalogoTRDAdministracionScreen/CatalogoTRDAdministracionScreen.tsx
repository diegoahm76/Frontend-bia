/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { type FC } from 'react';
import { RenderDataGrid } from '../../../Atom/RenderDataGrid/RenderDataGrid';
import { Avatar, Chip, IconButton } from '@mui/material';
import { AvatarStyles } from '../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';

//* icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAppSelector } from '../../../../../../hooks';

export const CatalogoTRDAdministracionScreen: FC<any> = ({
  rows,
  columns,
  title
}: any): JSX.Element => {
  const { catalog_trd } = useAppSelector((state) => state.tca_slice);

  const newColums = [
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 80,
      renderCell: (params: { row: { id_cat_serie_und: string } }) => {
        return (
          <>
            <IconButton
              aria-label="admin"
              size="large"
              title="Administrar TRD en base a relación"
              onClick={() => {
                // ? this is the function to get data asociated to trd
                // dispatch(get_tipologia_doc_asociadas_trd(params.row.id_cat_serie_und));
                console.log(params.row);
                /*   openModalAdministracionTRD();
                dispatch(
                  set_selected_item_from_catalogo_trd_action(params.row)
                );
                dispatch(get_tipologias_asociadas_a_trd([])); */
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
        rows={catalog_trd || []}
        columns={newColums}
        title={title}
      />
      {/*
        mirar si se debe añadir componente adicional

        button - añadir nueva relacion del TRD o cancelar relacion del TRD en la propiedad aditionalElement
      */}
    </>
  );
};
