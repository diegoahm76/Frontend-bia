/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC /* useState */ } from 'react';
import { RenderDataGrid } from './../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { colOrgActANuevo } from './columns/collOrgActANuevo';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import Select from 'react-select';
import { setUnidadesSeleccionadas } from '../../toolkit/UxE_slice/UxE_slice';
import { Button, Grid, Tooltip } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';

export const GridActualANuevo: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* use states redux declaration
  const { gridActualANuevo, unidadesSeleccionadas } = useAppSelector(
    (state) => state.u_x_e_slice
  );

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
            style = {{
              zIndex: 999999,
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

  if (gridActualANuevo.length === 0)
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