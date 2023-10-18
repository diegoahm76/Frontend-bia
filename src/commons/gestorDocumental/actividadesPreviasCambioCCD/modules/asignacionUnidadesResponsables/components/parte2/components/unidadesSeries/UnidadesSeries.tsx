/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Title } from '../../../../../../../../../components';
import { Avatar, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { VisaulTexto } from './visualTexto/VisualTexto';
import { useAppSelector } from '../../../../../../../../../hooks';
import { unidadSeriesColumns } from './columns/unidadSeriesColumns';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { type GridValueGetterParams } from '@mui/x-data-grid';

export const UnidadesSeries = (): JSX.Element => {
  //* redux states neccesaries
  const { seccionesSinResponsable } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  // ? definicion de la columnas necesarias para el funcionamiento de las tablas

  // ? columnas para la tabla de secciones del ccd actual
  const columnsSeccionCcActual: any[] = [
    ...unidadSeriesColumns,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 150,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Tooltip title="Seleccionar persistencia">
            <IconButton
              aria-label="select"
              size="large"
              // disabled={currentPersistenciaSeccionSubseccion}
              onClick={() => {
                console.log(params?.row);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DoneAllIcon
                  sx={{
                    color: 'green',
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
  ];
  // ? columnas para la tabla de secciones del ccd nuevo
  //* -------------

  if (!seccionesSinResponsable?.unidades?.length) return <></>;

  return (
    <>
      <Title title="Selección de secciones responsables del CCD nuevo sobre las series documentales de secciones del CCD actual" />
      <Grid
        item
        xs={12}
        sm={12}
        sx={{
          width: '100%',
          display: 'flex',
          mt: '20px',
          mb: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <VisaulTexto
          elements={[
            'Las asignaciones aquí realizadas son sólo para responsables sobre el catálogo de series, no continuarán con los permisos ni los consecutivos en el nuevo CCD',
            'Éstas asignaciones se realizan cuando la sección o subsección actual no tienen persistencia en el nuevo CCD',
          ]}
        />
      </Grid>
      {/* debe ponerse la condicional de la carga de este elemento */}
      <RenderDataGrid
        title="Secciones CCD actual"
        columns={columnsSeccionCcActual ?? []}
        rows={seccionesSinResponsable?.unidades ?? []}
      />
      {/* debe ponerse la condicional de la carga de este elemento */}
      {/* <RenderDataGrid
        title="Catálogo asociado - ${nombreUnidadSeleccionada}"
        columns={[]}
        rows={seccionesSinResponsable ?? []}
      /> */}
    </>
  );
};
