/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { VisaulTexto } from '../../../../../asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import { Title } from '../../../../../../../../../components';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { columnsPart2 } from '../../columns/columnsParte2';
import GradingIcon from '@mui/icons-material/Grading';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { type GridValueGetterParams } from '@mui/x-data-grid';

const styles = {
  width: '100%',
  display: 'flex',
  mt: '20px',
  mb: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

export const SeccSubCcdActual = (): JSX.Element => {
  //* redux states
  const { unidadesResponsablesActual } = useAppSelector(
    (state) => state.DelOfiResSlice
  );

  // Verificar si hay loading
  /* if (loading) {
      return <LoaderComponent />;
    }
  */
  // Verificar la longitud del array de unidadesResponsablesActual
  if (
    Array.isArray(unidadesResponsablesActual) &&
    !unidadesResponsablesActual.length
  )
    return <></>;

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
                  console.log(params.row)
                  // handleRequest(params.row)
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
          rows={
            [
              ...unidadesResponsablesActual,
              ...unidadesResponsablesActual,
            ] || []
          }
        />
      </Grid>
    </>
  );
};
