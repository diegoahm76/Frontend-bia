/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useEffect } from 'react';
import { RenderDataGrid } from './../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { colOrgActANuevo } from './columns/collOrgActANuevo';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import Select from 'react-select';
import { setUnidadesSeleccionadas } from '../../toolkit/UxE_slice/UxE_slice';
import { Button, Tooltip } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export const GridActualANuevo: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* use states redux declaration
  const {
    gridActualANuevo,
    unidadesSeleccionadas,
    asignacionConsultaTablaTemporal
  } = useAppSelector((state) => state.u_x_e_slice);

  //* hook use_x_entidad

  const title = 'Traslado masivo de organigrama actual a nuevo';

  const onChange = (idPersona: number, unidadSeleccionada: any) => {
    dispatch(
      setUnidadesSeleccionadas({
        ...unidadesSeleccionadas,
        [idPersona]: unidadSeleccionada
      })
    );
  };

  const handleLimpiarSelect = (idPersona: any) => {
    dispatch(
      setUnidadesSeleccionadas({
        ...unidadesSeleccionadas,
        [idPersona]: null
      })
    );
  };

  const columnsModified = [
    ...colOrgActANuevo,
    {
      headerName: 'unidad organizacional nueva',
      field: ' unidad organizacional nueva',
      width: 220,
      renderCell: (params: any) => (
        <>
          <div
            style={{
              zIndex: 999999
            }}
          >
            <Select
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: '200px',
                  height: '30px',

                  zIndex: 999999,

                  borderRadius: '5px'
                })
              }}
              value={unidadesSeleccionadas[params.row.id_persona]}
              // value={unidadesSeleccionadas}
              onChange={(selectedOption) => {
                onChange(params.row.id_persona, selectedOption);
              }}
              menuPortalTarget={document.body}
              options={params?.row?.unidadesDisponiblesParaTraslado?.map(
                (unidad: any) => ({
                  value: unidad.id_unidad_organizacional,
                  label: unidad.nombre,
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
                handleLimpiarSelect(params.row.id_persona);
              }}
            />
          </Tooltip>
        </>
      )
    }
  ];

  useEffect(() => {
    if (asignacionConsultaTablaTemporal) {
     /* //  console.log('')(
        'resultados consulta tabla temporal',
        asignacionConsultaTablaTemporal
      ); */
    }

    if (gridActualANuevo) {
     // //  console.log('')('gridActualANuevo', gridActualANuevo);

      const unidadesSeleccionadasTemp = gridActualANuevo
        ?.filter((persona: any) => {
          return persona?.nombre_nueva_unidad_organizacional;
        })
        .reduce((unidadesSeleccionadasObj: any, persona: any) => {
          const unidadSeleccionada = {
            value: persona.id_nueva_unidad_organizacional,
            label: persona.nombre_nueva_unidad_organizacional,
            idPersona: persona.id_persona
          };
          return {
            ...unidadesSeleccionadasObj,
            [persona.id_persona]: unidadSeleccionada
          };
        }, {});

      dispatch(setUnidadesSeleccionadas(unidadesSeleccionadasTemp));

      // //  console.log('')('unidadesSeleccionadasTemp', unidadesSeleccionadasTemp);
    }
  }, [gridActualANuevo]);

 /* if (gridActualANuevo.length === 0)
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
    ); */

  return (
    //* renderiza los datos necesarios para el traslado unidades organizacionales actuales a nuevas
    <>
      <RenderDataGrid
        columns={columnsModified || []}
        rows={gridActualANuevo || []}
        title={title}
      />
    </>
  );
};
