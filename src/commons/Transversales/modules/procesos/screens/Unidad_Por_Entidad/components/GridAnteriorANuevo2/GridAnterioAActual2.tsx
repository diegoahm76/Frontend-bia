/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useEffect } from 'react';
import { RenderDataGrid } from '../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  /* useAppDispatch, */ useAppSelector
} from '../../../../../../../../hooks';
import { colGridAntANuevo } from './columns/colGridAntANuevo';
import Select from 'react-select';
import { Button, Tooltip } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { setUnidadesSeleccionadasAnteriorAActual } from '../../toolkit/UxE_slice/UxE_slice';

export const GridAnteriorAActual2: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* use states redux declaration
  const {
    gridAnteriorAActual,
    unidadesSeleccionadasAnteriorAActual,
    asignacionConsultaTablaTemporal
  } = useAppSelector((state) => state.u_x_e_slice);

  //* hook use_x_entidad

  const title = 'Traslado masivo de organigrama anterior a actual';
  const onChange = (idPersona: number, unidadSeleccionada: any) => {
    dispatch(
      setUnidadesSeleccionadasAnteriorAActual({
        ...unidadesSeleccionadasAnteriorAActual,
        [idPersona]: unidadSeleccionada
      })
    );
  };

  const handleLimpiarSelect = (idPersona: any) => {
    dispatch(
      setUnidadesSeleccionadasAnteriorAActual({
        ...unidadesSeleccionadasAnteriorAActual,
        [idPersona]: null
      })
    );
  };

  const columnsModified = [
    ...colGridAntANuevo,
    {
      headerName: 'unidad organizacional nueva',
      field: 'unidad organizacional nueva',
      width: 220,
      renderCell: (params: any) => (
        <>
          <div>
            <Select
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: '200px',
                  height: '30px',
                  zIndex: 9999,
                  borderRadius: '5px'
                })
              }}
              value={
                unidadesSeleccionadasAnteriorAActual[params.row.id_persona]
              }
              onChange={(selectedOption) => {
                onChange(params.row.id_persona, selectedOption);
              }}
              menuPortalTarget={document.body}
              options={params?.row?.unidadesDisponiblesParaTraslado?.map(
                (unidad: any) => ({
                  // nombre_completo: unidad?.nombre_completo,
                  value: unidad.id_unidad_organizacional,
                  label: unidad.nombre,
                  data: unidad,
                  idPersona: params.row.id_persona
                })
              )}
              placeholder="Seleccionar"
            />
          </div>
        </>
      )
    },
    {
      headerName: 'Acciones',
      field: 'acción',
      width: 100,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Limpiar lista desplegable">
            <Button
              variant="outlined"
              color="primary"
              sx={{
                marginLeft: '5px',
                width: '20px !important',
                border: 'none'
              }}
              startIcon={<CleaningServicesIcon />}
              onClick={() => {
                // //  console.log('')('limpiando select');
                handleLimpiarSelect(params.row.id_persona);
              }}
            />
          </Tooltip>
        </>
      )
    }
  ];

  // ? cambios para realizar el proceder de traslado de unidades organizacionales
  useEffect(() => {
    if (asignacionConsultaTablaTemporal) {
     /* //  console.log('')(
        'resultados consulta tabla temporal',
        asignacionConsultaTablaTemporal
      ); */
    }

    if (gridAnteriorAActual) {
      // //  console.log('')('gridActualANuevo', gridAnteriorAActual);

      const unidadesSeleccionadasTemp = gridAnteriorAActual
        ?.filter((persona: any) => {
          return persona?.nombre_nueva_unidad_organizacional;
        })
        .reduce((unidadesSeleccionadasObj: any, persona: any) => {
          const unidadSeleccionada = {
            value: persona.id_nueva_unidad_organizacional,
            label: persona.nombre_nueva_unidad_organizacional,
            data: persona,
            idPersona: persona.id_persona
          };
          return {
            ...unidadesSeleccionadasObj,
            [persona.id_persona]: unidadSeleccionada
          };
        }, {});

      dispatch(
        setUnidadesSeleccionadasAnteriorAActual(unidadesSeleccionadasTemp)
      );

      // //  console.log('')('unidadesSeleccionadasTemp', unidadesSeleccionadasTemp);
    }
  }, [gridAnteriorAActual, dispatch]);

  //* -------------------------------------------------------------------------- */
/*
  if (gridAnteriorAActual.length === 0)
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          position: 'static',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Loader altura={150} />
      </Grid>
    );
*/
  return (
    //* renderiza los datos necesarios para el traslado unidades organizacionales actuales a nuevas
    <>
      <RenderDataGrid
        columns={columnsModified || []}
        rows={gridAnteriorAActual || []}
        title={title}
      />
    </>
  );
};
