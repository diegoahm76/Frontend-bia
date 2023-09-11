/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC /* useState */ } from 'react';
import { RenderDataGrid } from '../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
// import { colOrgActANuevo } from './columns/collOrgActANuevo';
import {
  useAppDispatch,
  /* useAppDispatch, */ useAppSelector
} from '../../../../../../../../hooks';
// import Select from 'react-select';
// import { setUnidadesSeleccionadas } from '../../toolkit/UxE_slice/UxE_slice';
// import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { colGridAntANuevo } from './columns/colGridAntANuevo';
// import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
// import { Loader } from '../../../../../../../../utils/Loader/Loader';
import Select from 'react-select';
import { Grid, Button, Tooltip } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { setUnidadesSeleccionadasAnteriorAActual } from '../../toolkit/UxE_slice/UxE_slice';

export const GridAnteriorAActual2: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* use states redux declaration
  // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-unused-vars
  const { gridAnteriorAActual, unidadesSeleccionadasAnteriorAActual } =
    useAppSelector((state) => state.u_x_e_slice);

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

  /* useEffect(() => {
  const obtenerDatos = async () => {
    const datos = await obtenerDatosParaTraslado();
    const datosConPropiedades = datos.map((dato: any) => ({
      ...dato,
      seleccionado: dato.seleccionado || false,
      unidadesDisponiblesParaTraslado: dato.unidadesDisponiblesParaTraslado || '',
      unidadOrganizacional: dato.unidadOrganizacional || dato.unidadOrganizacionalActual
    }));
    setRowData(datosConPropiedades);
  };
  obtenerDatos();
}, []); */


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
              // value={unidadesSeleccionadas}
              onChange={(selectedOption) => {
                // console.log(params.row.id_persona, 'selectedOption');
                console.log(selectedOption, 'selectedOption');
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
                console.log('limpiando select');
                handleLimpiarSelect(params.row.id_persona);
              }}
            />
          </Tooltip>
        </>
      )
    }
  ];

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
