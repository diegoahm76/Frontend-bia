/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { RenderDataGrid } from '../../../Atom/RenderDataGrid/RenderDataGrid';
import { Avatar, Chip, IconButton } from '@mui/material';
import { AvatarStyles } from '../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';

//* icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DownloadButton } from '../../../../../../utils/DownloadButton/DownLoadButton';
import type { dataGridTypes } from '../../../types/tca.types';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { ModalContextTCA } from '../../../context/ModalContextTca';
import {
  set_catalog_TCA_action,
  set_catalog_trd_action,
  set_mixed_tipologias,
  set_selected_item_from_catalogo_action,
  set_tipologias_NO_reservadas,
  set_tipologias_reservadas
} from '../../../toolkit/TCAResources/slice/TcaSlice';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  delete_item_catalogo_tca_service,
  get_catalogo_TCA_service,
  get_catalogo_TRD_service,
  get_tipologias_relacion
} from '../../../toolkit/TCAResources/thunks/TcaServicesThunks';
import { use_tca } from '../../../hooks/use_tca';

export const CatalogoTCAAdministracionScreen: FC<dataGridTypes> = ({
  rows,
  columns,
  title
}: dataGridTypes): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context declaration
  const { openModalAdministracionTca, closeModalAdministracionTca } =
    useContext(ModalContextTCA);

  //* ------- HOOK USE_TCA DECLARATION -------------- */
  const { reset_administrar_tca, setLoadTipologias } = use_tca();

  //* redux states declararion
  const { tca_current } = useAppSelector((state) => state.tca_slice);

  const deleteCatalogoTCA = (id: number) =>
    delete_item_catalogo_tca_service(id);

  const updateCatalogoTRD = async (id: number) => {
    const res = await get_catalogo_TRD_service(id);
    return dispatch(set_catalog_trd_action(res));
  };

  const updateCatalogoTCA = async (id: number) => {
    const res = await get_catalogo_TCA_service(id);
    return dispatch(set_catalog_TCA_action(res));
  };

  const resetAdministrarTCA = (): void => {
    reset_administrar_tca({
      id_cat_serie_und_ccd_trd: '',
      cod_clas_expediente: {
        label: '',
        value: ''
      }
    });
  };

  const handleClickDeleteIcon = (params: any): void => {
    void deleteCatalogoTCA(params?.row?.id_cat_serie_unidad_org_ccd_trd_tca)
      .then(() => updateCatalogoTRD(tca_current?.id_trd))
      .then(() => updateCatalogoTCA(params?.row.id_tca))
      .then(() => {
        closeModalAdministracionTca();
        resetAdministrarTCA();
      });
  };

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
              title="Editar relación catalogo TCA"
              onClick={() => {
                //  console.log('')(params.row);
                void get_tipologias_relacion(
                  params.row.id_cat_serie_und_ccd_trd,
                  setLoadTipologias
                ).then((res: any) => {
                  const tipologias_reservadas = res.filter(
                    (item: any) => item.reservada
                  );

                  const tipologias_NO_reservadas = res.filter(
                    (item: any) => !item.reservada
                  );

                  dispatch(set_mixed_tipologias(res))
                  dispatch(set_tipologias_reservadas(tipologias_reservadas));
                  dispatch(
                    set_tipologias_NO_reservadas(tipologias_NO_reservadas)
                  );
                });
                openModalAdministracionTca();
                dispatch(set_selected_item_from_catalogo_action(params.row));
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
            {tca_current.actual ? null : (
              <IconButton
                aria-label="delete"
                size="large"
                title="Eliminar relación catalogo TRD"
                onClick={() => {
                  // //  console.log('')(params.row);
                  handleClickDeleteIcon(params);
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
            )}
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
      <RenderDataGrid rows={rows || []} columns={newColums} title={title} />
    </>
  );
};
