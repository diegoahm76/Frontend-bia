/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { VisaulTexto } from '../../../../../asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import { Title } from '../../../../../../../../../components';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { columnsPart2 } from '../../columns/columnsParte2';
import GradingIcon from '@mui/icons-material/Grading';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { getOficinas } from '../../../../toolkit/thunks/seleccionOficina.service';
import {
  setCurrentUnidadSeleccionadaResp,
  setGrilladoOficinas,
} from '../../../../toolkit/slice/DelOfiResSlice';
import { control_error } from '../../../../../../../../../helpers';

export const styles = {
  width: '100%',
  display: 'flex',
  mt: '20px',
  mb: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

export const SeccSubCcdActual = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const { unidadesResponsablesActual, ccdOrganigramaCurrentBusquedaOfiResp } =
    useAppSelector((state) => state.DelOfiResSlice);
  //* context declaration
  const { secondLoading, handleThirdLoading } = useContext(
    ModalAndLoadingContext
  );

  //* Verificar si hay loading
  if (secondLoading) {
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          boxShadow: 'none',
          background: '#fff',
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Loader altura={400} />
      </Grid>
    );
  }

  // Verificar la longitud del array de unidadesResponsablesActual
  if (
    Array.isArray(unidadesResponsablesActual) &&
    !unidadesResponsablesActual.length
  )
    return <></>;

  // ? espacio para las funciones manejadorqes de eventos
  const handleRequest = async (row: any) => {
    const { id_unidad_actual, id_unidad_nueva } = row;
    try {
      const getGrilladoOficinas = await getOficinas({
        idUnidadOrganizacionalActual: id_unidad_actual,
        idCcdNuevo: ccdOrganigramaCurrentBusquedaOfiResp.id_ccd,
        idUnidadNueva: id_unidad_nueva,
        setLoading: handleThirdLoading,
      });

      //* se setean las oficinas de la unidad actual que ha sido seleccionada
      dispatch(setCurrentUnidadSeleccionadaResp(row));

      // ? se asiga todo el grillado de oficinas en un solo dispatch( tanto las oficinas de la unidad actual como las posibles oficinas a seleccionar, de la nueva unidad)
      dispatch(setGrilladoOficinas(getGrilladoOficinas));
    } catch (error) {
      //* manejar el error de mejor manera
      //  console.log('')(error);
      control_error('Error al traer las oficinas de la unidad actual');
    }
  };

  // ? manejo de columnas para el elemento que se está renderizando
  const columns =
    [
      ...columnsPart2,
      {
        headerName: 'Acciones',
        field: 'acciones',
        width: 150,
        renderCell: (params: GridValueGetterParams) => {
          return (
            <Tooltip title="Seleccionar elemento">
              <IconButton
                aria-label="select"
                size="large"
                onClick={() => {
                  // //  console.log('')(params.row);
                  // * aqui se debe realizar la petición para traer las oficinas correspondientes
                  handleRequest(params.row);
                }}
              >
                <Avatar sx={AvatarStyles} variant="rounded">
                  <GradingIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          );
        },
      },
    ] || [];

  return (
    <>
      <Grid
        container
        sx={{
          ...containerStyles,
          justifyContent: 'center',
        }}
      >
        <Title title="Sección - Subsección del CCD actual" />
        <Grid item xs={12} sm={12} sx={styles}>
          <VisaulTexto
            elements={[
              'Elija la sección o subsección del CCD actual a delegar oficinas responsables.',
            ]}
          />
        </Grid>
        <RenderDataGrid
          title="Listado de elementos"
          columns={columns}
          rows={[...unidadesResponsablesActual] || []}
        />
      </Grid>
    </>
  );
};
