/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';
import { Button, Grid, Tooltip } from '@mui/material';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { VisaulTexto } from '../../../../../asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import { styles } from '../../../parte2/components/SeccSubCcdActual/SeccSubCcdActual';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import Select from 'react-select';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export const SeleccionOfiResp = (): JSX.Element => {
  //* redux states

  const {
    grilladoDeOficinas, // : { unidadActual, oficinas },
    currentUnidadSeleccionadaResponsable,
  } = useAppSelector((state) => state.DelOfiResSlice);

  //* context declaration
  const { thirdLoading } = useContext(ModalAndLoadingContext);

  // ? FUNCTIONS

  /*  const onChange = (idPersona: number, unidadSeleccionada: any) => {
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
  };*/

  const rowsArray = grilladoDeOficinas?.unidadActual
    ? [
        ...grilladoDeOficinas?.unidadActual,
        ...grilladoDeOficinas?.oficinasActuales,
      ]
    : [];

  const columns = [
    {
      headerName: 'codigo',
      field: 'codigo',
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => {
        const { codigo } = params.row;

        if (params.row.actual) {
          return (
            <div
              style={{
                color: 'red',
                backdropFilter: 'blur(5px)',
                background: 'rgba(255,255,255,0.5)',
              }}
            >
              <b>{codigo}</b>
            </div>
          );
        }

        return <div>{codigo}</div>;
      },
    },
    {
      headerName: 'Nombre',
      field: 'nombre',
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        const { nombre } = params.row;

        if (params.row.actual) {
          return (
            <div
              style={{
                color: 'red',
                backdropFilter: 'blur(50px)',
              }}
            >
              <b>{nombre.toUpperCase()}</b>
            </div>
          );
        }

        return <div>{nombre}</div>;
      },
    },

    {
      headerName: 'Selección nuevo oficina responsable',
      field: 'oficinasNuevas',
      minWidth: 300,
      renderCell: (params: any) => (
        <>
          <div
            style={{
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

                  borderRadius: '5px',
                }),
              }}
              // value={unidadesSeleccionadas[params.row.id_persona]}
              // value={unidadesSeleccionadas}
              onChange={(selectedOption) => {
                //  onChange(params.row.id_persona, selectedOption);
              }}
              menuPortalTarget={document.body}
              options={params?.row?.oficinasNuevas?.map((oficina: any) => ({
                value: oficina.id_unidad_organizacional,
                label: oficina.nombre,
                // idPersona: params.row.id_persona
              }))}
              placeholder="Seleccionar"
            />
          </div>
        </>
      ),
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
                // marginLeft: '5px',
                width: '20px !important',
                border: 'none',
              }}
              startIcon={<CleaningServicesIcon />}
              onClick={() => {
                // handleLimpiarSelect(params.row.id_persona);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  // Verificar si hay loading
  if (thirdLoading) {
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

  // ? Verificar la longitud del array de unidadesResponsablesActual
 // if (Array.isArray(rowsArray) && !rowsArray.length) return <></>;

  return (
    <Grid
      container
      sx={{
        ...containerStyles,
        justifyContent: 'center',
      }}
    >
      <Grid item xs={12} sm={12} sx={styles}>
        <VisaulTexto
          elements={[
            `Oficinas del CCD actual de la unidad ( ${
              currentUnidadSeleccionadaResponsable?.nom_unidad_actual ?? 'X'
            } ) / oficinas del CCD nuevo de la unidad ( ${
              currentUnidadSeleccionadaResponsable?.nom_unidad_nueva ?? 'Z'
            } )         `,
          ]}
        />
      </Grid>
      <RenderDataGrid
        title="Selección de oficinas responsables"
        columns={columns || []}
        rows={rowsArray || []}
      />
    </Grid>
  );
};
