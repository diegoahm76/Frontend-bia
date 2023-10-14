/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Title } from '../../../../../../../../../components';
import { Subtitle } from '../../../../../../../../../components/Subtitle';
import { Sub } from '../../../../../../../../../components/Sub';
import { Grid, TextField } from '@mui/material';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';
import { VisaulTexto } from './visualTexto/VisualTexto';

export const UnidadesSeries = (): JSX.Element => {

    //* redux states neccesaries
    const { seccionesSinResponsable } = useAppSelector(
      (state) => state.AsigUniRespSlice
    );
  
    if (seccionesSinResponsable.length === 0) return <></>;
  
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
      <RenderDataGrid title="Secciones CCD actual" columns={[]} rows={[]} />
      <RenderDataGrid
        title="Catálogo asociado - ${nombreUnidadSeleccionada}"
        columns={[]}
        rows={seccionesSinResponsable ?? []}
      />
    </>
  );
};
