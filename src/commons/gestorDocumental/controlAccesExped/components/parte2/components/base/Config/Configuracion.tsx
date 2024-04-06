/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react'
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { Grid } from '@mui/material';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { setControlAccesoExpedientesList, setCurrentControlAccesoExpedientes, setCurrentSerieSubserie, setCurrentUnidadOrganizacional, setSeriesSubseriesList, setUnidadesOrganizacionales, setVerModuloAutorizacioneGenerales, set_mood_module } from '../../../../../toolkit/slice/CtrlAccesoExpSlice';
import { optionsSelectConfiguracion } from '../utils/choices';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { getUnidadesOrganizacionalesSeccionSubseccion } from '../../../../../toolkit/thunks/unidadesOrgnizacionalesThunks';
import { rowsDataGrid } from '../../../../parte3/components/AutorizacionesGenerales/utils/initialState';

{/* bajo la decisión que se tome en este componente se procede a realizar el proceso necesario, dependiendo si se elige la opción # 1 o la opción # 2 */}
export const ConfiguracionInicial = (params: any): JSX.Element | null => {
  const { setRowsControlInicial, rowsControlInicial } = params;


  //* get states from the redux store
  const { moodConfig, currentCcdCtrlAccesoExp, currentUnidadOrganizacional, currentSerieSubserie } = useAppSelector((state) => state.ctrlAccesoExpSlice);
  //*dispatch declarations
    const dispatch = useAppDispatch();
    //* context declarations
    const { handleModalSecSub } = useContext(ModalAndLoadingContext);

  const handleChange = (selectedOption: any) => {
    //  console.log('')(selectedOption)
    dispatch(setVerModuloAutorizacioneGenerales(false));
    dispatch(setControlAccesoExpedientesList([]));
    dispatch(setCurrentControlAccesoExpedientes(null));
    dispatch(set_mood_module(selectedOption));
    setRowsControlInicial(rowsDataGrid.map((row: any) => ({
      ...row,
      id_ccd: currentCcdCtrlAccesoExp?.id_ccd,
      id_serie_doc: currentSerieSubserie?.id_serie_doc, 
      nombre_serie: currentSerieSubserie?.nombre_serie,
      codigo_serie: currentSerieSubserie?.codigo_serie,
      id_subserie_doc: currentSerieSubserie?.id_subserie_doc,
      nombre_subserie: currentSerieSubserie?.nombre_subserie,
      codigo_subserie: currentSerieSubserie?.codigo_subserie,
      nombre_unidad_organizacional: currentUnidadOrganizacional?.nombre_unidad_org_actual_admin_series,
      codigo_unidad_organizacional: currentUnidadOrganizacional?.codigo_unidad_org_actual_admin_series,
    })))
    
    //* if selected option . value = 2, se debe hacer la petición http al servidor para obtener las unidades organizacionales asociadas a ese organigrama y en consecuencia las series documentales asociadas a esa unidad organizacional luego de seleccionar la respectiva unidad organizacional
    if(selectedOption?.value === 1){
      //  console.log('')('getting directly control de acceso de expedientes')
      dispatch(setUnidadesOrganizacionales([]));
      dispatch(setCurrentUnidadOrganizacional(null));
      dispatch(setSeriesSubseriesList([]));
      dispatch(setCurrentSerieSubserie(null));
    }

    if(selectedOption?.value === 2){
      // ? se deben realizar también aquellas validaciones que solo sean útiles en el módulo 1

      dispatch(setUnidadesOrganizacionales([]));
      dispatch(setCurrentUnidadOrganizacional(null));
      dispatch(setSeriesSubseriesList([]));
      dispatch(setCurrentSerieSubserie(null));


      //  console.log('')('getting unidades organizacionales, then get series documentales, then get control de acceso de expedientes')
      void getUnidadesOrganizacionalesSeccionSubseccion({
        idOrganigrama: currentCcdCtrlAccesoExp.id_organigrama,
        setLoadingUnidadesOrg: handleModalSecSub,
      }
      ).then((_resUnidadesOrganizacionales: any) => {
        dispatch(setUnidadesOrganizacionales(_resUnidadesOrganizacionales));
      })
    }
  };


  return (
    <>
    <Grid
      item
      xs={12}
      sm={8}
      sx={{
        ...stylesGrid,
        zIndex: 6
      }}
    >
          <div>
            <Select
              value={moodConfig}
              onChange={(selectedOption: any) => {
                handleChange(selectedOption);
              }}
              options={optionsSelectConfiguracion as any}
              placeholder="Seleccionar"
            />
            <label>
              <small
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 'thin',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  marginLeft: '0.25rem'
                }}
              >
                Configuración
              </small>
            </label>
          </div>
    </Grid>
  </>
  )
}
