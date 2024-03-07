/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { Button, Grid, Tooltip } from '@mui/material';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { VisaulTexto } from '../../../../../asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import { styles } from '../../../parte2/components/SeccSubCcdActual/SeccSubCcdActual';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import Select from 'react-select';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { setOficinasNuevaSeleccionadas } from '../../../../toolkit/slice/DelOfiResSlice';
import { Title } from '../../../../../../../../../components';

export const SeleccionOfiResp = (): JSX.Element => {
  // ?  dispatch declaration
  const dispatch = useAppDispatch();
  // ? redux states
  const {
    grilladoDeOficinas, // : { unidadActual, oficinas },
    currentUnidadSeleccionadaResponsable,
    oficinasNuevaSeleccionadas,
  } = useAppSelector((state) => state.DelOfiResSlice);

  //* context declaration
  const { thirdLoading } = useContext(ModalAndLoadingContext);

  // ? FUNCTIONS

  const onChange = (
    id_unidad_organizacional: any,
    oficinaSeleccionada: any
  ) => {
    dispatch(
      setOficinasNuevaSeleccionadas({
        ...oficinasNuevaSeleccionadas,
        [id_unidad_organizacional]: oficinaSeleccionada,
      })
    );
  };

  const handleLimpiarSelect = (id_unidad_organizacional: any) => {
    dispatch(
      setOficinasNuevaSeleccionadas({
        ...oficinasNuevaSeleccionadas,
        [id_unidad_organizacional]: null,
      })
    );
  };

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
      minWidth: 400,
      renderCell: (params: any) =>
        params.row.actual ? (
          <div
            style={{
              color: 'gray',
              backdropFilter: 'blur(500px)',
            }}
          >
            <b>
              {grilladoDeOficinas?.unidadNueva[0]?.codigo.toUpperCase()} --{' '}
              {grilladoDeOficinas?.unidadNueva[0]?.nombre.toUpperCase()}
            </b>
          </div>
        ) : (
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
                    width: '300px',
                    height: '30px',
                    zIndex: 999999,
                    borderRadius: '5px',
                  }),
                }}
                value={
                  oficinasNuevaSeleccionadas[
                    params.row.id_unidad_organizacional
                  ]
                }
                onChange={(selectedOption) => {
                  onChange(params.row.id_unidad_organizacional, selectedOption);
                }}
                menuPortalTarget={document.body}
                options={grilladoDeOficinas?.oficinasNuevas?.map(
                  (oficina: any) => ({
                    ...oficina,
                    unidad_delegada: oficina.unidad_delegada,
                    value: oficina.id_unidad_organizacional,
                    label: `${oficina.codigo} -- ${oficina.nombre}`,
                    id_unidad_organizacional:
                      params.row.id_unidad_organizacional,
                  })
                )}
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
      renderCell: (params: any) =>
        params.row.actual ? (
          <></>
        ) : (
          <Tooltip title="Limpiar listado">
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
                handleLimpiarSelect(params.row.id_unidad_organizacional);
              }}
            />
          </Tooltip>
        ),
    },
  ];

  useEffect(() => {
    if (grilladoDeOficinas?.oficinasActuales) {
      const updates = grilladoDeOficinas?.oficinasActuales?.reduce(
        (acc: any, oficina: any) => {
          const oficinaSeleccionada = {
            ...oficina,
            value: oficina.unidad_delegada?.value,
            label: oficina.unidad_delegada?.label,
            id_unidad_organizacional: oficina.id_unidad_organizacional,
          };
          return {
            ...acc,
            [oficina.id_unidad_organizacional]: oficinaSeleccionada,
          };
        },
        {}
      );

      dispatch(
        setOficinasNuevaSeleccionadas({
          ...oficinasNuevaSeleccionadas,
          ...updates,
        })
      );
    }
  }, [grilladoDeOficinas]);
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
  if (Array.isArray(rowsArray) && !rowsArray.length) return <></>;

  return (
    <Grid
      container
      sx={{
        ...containerStyles,
        justifyContent: 'center',
      }}
    >
      <Title title="Selección de oficinas responsables" />
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
        title="Listado de elementos"
        columns={columns || []}
        rows={rowsArray || []}
      />
    </Grid>
  );
};
