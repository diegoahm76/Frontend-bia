/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { type FC } from 'react';
import { RenderDataGrid } from '../../../Atom/RenderDataGrid/RenderDataGrid';
import { Avatar, Chip, IconButton } from '@mui/material';
import { AvatarStyles } from '../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';

//* icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DownloadButton } from '../../../../../../utils/DownloadButton/DownLoadButton';

export const CatalogoTCAAdministracionScreen: FC<any> = ({
  rows,
  columns,
  title
}: any): JSX.Element => {
  const newColums = [
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              title="Editar relación catalogo TRD"
              onClick={() => {
                // ? this is the function to get data asociated to trd
                /*  dispatch(
                  set_selected_item_from_catalogo_trd_action(params.row)
                );
                dispatch(
                  get_tipologia_doc_asociadas_trd(
                    params.row.id_catserie_unidadorg
                  )
                );
                openModalAdministracionTRD(); */
                console.log(params.row);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <EditIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              title="Eliminar relación catalogo TRD"
              onClick={() => {
                console.log(params.row);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
            {/* {trd_current.actual ? null : (
              <IconButton
                aria-label="delete"
                size="large"
                title="Eliminar relación catalogo TRD"
                onClick={() => {
                  
                  dispatch(
                    delete_item_catalogo_trd(params.row.id_catserie_unidadorg)
                  )
                    .then(() => {
                      dispatch(get_catalogo_trd(trd_current.id_trd));
                    })
                    .then(() => {
                      dispatch(
                        getServiceSeriesSubseriesXUnidadOrganizacional({
                          id_ccd: trd_current.id_ccd,
                          id_organigrama: trd_current.id_organigrama
                        })
                      );
                      closeModalAdministracionTRD();
                      dispatch(get_tipologias_asociadas_a_trd([]));
                      reset_administrar_trd({
                        cod_disposicion_final: '',
                        digitalizacion_dis_final: true,
                        tiempo_retencion_ag: '',
                        tiempo_retencion_ac: '',
                        descripcion_procedimiento: '',
                        justificacion_cambio: '',
                        tipologias: [],
                        ruta_archivo_cambio: ''
                      });
                    });

                  console.log(params.row);
                }}
              >
                <Avatar sx={AvatarStyles} variant="rounded">
                  <DeleteIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            )} */}
          </>
        );
      }
    },
    ...columns,
    {
      headerName: 'Justificación cambio',
      field: 'justificacion_cambio',
      width: 220
    },
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
      headerName: 'Archivo cambio',
      field: 'ruta_archivo_cambio',
      renderCell: (params: any) =>
        params.row.ruta_archivo_cambio && (
          <DownloadButton
            fileName="ruta_archivo_cambio"
            condition={false}
            fileUrl={params.row.ruta_archivo_cambio}
          />
        )
    }
  ];

  return (
    <>
      <RenderDataGrid rows={rows} columns={newColums} title={title} />
    </>
  );
};
