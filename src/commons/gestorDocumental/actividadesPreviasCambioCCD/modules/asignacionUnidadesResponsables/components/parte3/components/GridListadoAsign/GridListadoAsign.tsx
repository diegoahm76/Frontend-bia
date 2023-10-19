/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';
import { columnsGridListado } from '../columns/columnsGridListado';
import { Grid } from '@mui/material';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';

export const GridListadoAsign = (): JSX.Element => {
  //* redux states declarations
  const { listadoDeAsignaciones } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  //* context
  const { generalLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );

  return (
    <>
      {generalLoading ? (
        <>
          <Grid
            container
            sx={{
              ...containerStyles,
              boxShadow: 'none',
              background: 'none',
              position: 'static',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Loader altura={300} />
          </Grid>
        </>
      ) : !listadoDeAsignaciones.length ? (
        <></>
      ) : (
        <>
          <RenderDataGrid
            title="Listado de asignaciones (Unidad CCD actual / Unidad responsable CCD nuevo)"
            columns={columnsGridListado ?? []}
            rows={listadoDeAsignaciones ?? []}
          />
        </>
      )}
    </>
  );
};
