/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Title } from '../../../../../../../../../components';
import { Subtitle } from '../../../../../../../../../components/Subtitle';
import { Sub } from '../../../../../../../../../components/Sub';
import { Grid, TextField } from '@mui/material';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';

export const UnidadesSeries = (): JSX.Element => {
  return (
    <>
      <Title title="Selección de secciones responsables del CCD nuevo sobre las series documentales de secciones del CCD actual" />
      {/* <Title
          title="Las asignaciones aquí realizadas son sólo para responsables sobre el catálogo de series, no continuarán con los permisos ni los consecutivos en el nuevo CCD"
          width="98%"
          fontSize="12.5px"
        />*/}
      {/* <Sub
          title="Éstas asignaciones se realizan cuando la sección o subsección actual no tienen persistencia en el nuevo CCD"
          width="80%"
        />*/}
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
        <TextField
          fullWidth
          multiline
          rows={2}
          label=""
          size="small"
          variant="outlined"
          disabled={true}
          value={
            'Las asignaciones aquí realizadas son sólo para responsables sobre el catálogo de series, no continuarán con los permisos ni los consecutivos en el nuevo CCD'
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        sx={{
          width: '100%',
          display: 'flex',

          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={2}
          label=""
          size="small"
          variant="outlined"
          disabled={true}
          value={
            'Éstas asignaciones se realizan cuando la sección o subsección actual no tienen persistencia en el nuevo CCD'
          }
        />
      </Grid>

      <RenderDataGrid title="Secciones CCD actual" columns={[]} rows={[]} />
      <RenderDataGrid
        title="Catálogo asociado - ${nombreUnidadSeleccionada}"
        columns={[]}
        rows={[]}
      />
    </>
  );
};
