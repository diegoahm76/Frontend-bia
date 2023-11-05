/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';
import { Grid } from '@mui/material';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { VisaulTexto } from '../../../../../asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import { styles } from '../../../parte2/components/SeccSubCcdActual/SeccSubCcdActual';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';

export const SeleccionOfiResp = (): JSX.Element => {
  //* redux states

  const {
    oficinasUnidadActual: { unidadActual, oficinas },
    currentUnidadSeleccionadaResponsable,
  } = useAppSelector((state) => state.DelOfiResSlice);

  //* context declaration
  const { thirdLoading } = useContext(ModalAndLoadingContext);

  const rowsArray = unidadActual ? [...unidadActual, ...oficinas] : [];

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

  // Verificar la longitud del array de unidadesResponsablesActual
  if (Array.isArray(rowsArray) && !rowsArray.length) return <></>;

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
