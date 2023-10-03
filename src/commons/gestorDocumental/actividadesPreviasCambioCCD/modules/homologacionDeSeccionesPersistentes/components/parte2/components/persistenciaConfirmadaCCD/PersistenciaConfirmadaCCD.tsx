/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, IconButton, Tooltip } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsCoincidenciasHalladas as columnsPersistenciasConfirmadas } from '../coincidenciasHalladasCCD/columnsCoincidenciasHalladas/columnsCoincidenciasHalladas';
import DeleteIcon from '@mui/icons-material/Delete';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { control_success } from '../../../../../../../../../helpers';
import {
  setHomologacionUnidades,
  setUnidadesPersistentes,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import { type GridValueGetterParams } from '@mui/x-data-grid';

export const PersistenciaConfirmadaCCD = (): JSX.Element => {
  // ? dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const { unidadesPersistentes, homologacionUnidades } = useAppSelector(
    (state) => state.HomologacionesSlice
  );



// ? ----- ESPACIO PARA FUNCIONES OPEN ------
// ! eliminación de persistencias confirmadas

const handleEliminarPersistencia = (params: GridValueGetterParams) => {



  
  const nuevaHomologacionUnidades = [
    ...homologacionUnidades,
    {
      ...params?.row,
      persistenciaConfirmada: false,
    },
  ];
  const nuevasUnidadesPersistentes = unidadesPersistentes.filter(
    (item: any) => item?.id_unidad_actual !== params?.row?.id_unidad_actual
  );

  dispatch(setHomologacionUnidades(nuevaHomologacionUnidades));
  dispatch(setUnidadesPersistentes(nuevasUnidadesPersistentes));
  control_success('Persistencia eliminada');
};

// ? ----- ESPACIO PARA FUNCIONES OPEN ------

  // ? columnas modificadas para la tabla de persistencia confirmada
  const columns = [
    ...columnsPersistenciasConfirmadas,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Eliminar de tipologías restringidas">
            <IconButton
              aria-label="delete"
              disabled={!params.row?.mismo_organigrama}
              size="large"
              onClick={() => {






                dispatch(
                  setHomologacionUnidades([
                    ...homologacionUnidades,
                    {
                      ...params?.row,
                      persistenciaConfirmada: false,
                    },
                  ])
                );

                // ? debe validarse la eliminación al recorrer primero el array de las persistencias de las series con persistencias, para que se hay
                dispatch(
                  setUnidadesPersistentes(
                    unidadesPersistentes.filter(
                      (item: any) =>
                        item?.id_unidad_actual !== params?.row?.id_unidad_actual
                    )
                  )
                );

                control_success('Persistencia eliminada');
                console.log(params.row);
                // ? ahora bien, dentro de las validaciones que se van a realizar se debe leeer el documento.json que se va a configurar para que se revise si esa pesistencia confirmada no tiene una serie o subserie con persistencia confirmada
                console.log(params.row);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  sx={{
                    color: 'red',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <RenderDataGrid
        columns={columns || []}
        rows={unidadesPersistentes || []}
        title="Persistencia confirmada en nuevo CCD ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
