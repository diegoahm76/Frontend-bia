import { Grid, Divider, Box } from '@mui/material';
// Componentes personalizados
import { Title } from '../../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ConsultaPOAIScreen(): JSX.Element {
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          marginTop: '20px',
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ marginTop: '-20px' }}>
            <Grid item xs={12} spacing={2}>
              <Title title="Consulta POAI"></Title>
            </Grid>
            <Grid
              item
              xs={12}
              spacing={2}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            ></Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          marginTop: '20px',
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ marginTop: '-20px' }}>
            <Grid item xs={12} spacing={2}>
                <Title title="Plan Operativo Anual de Inversiones POAI"></Title>
            </Grid>
            <Grid
              item
              xs={12}
              spacing={2}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            ></Grid>
            <iframe
              title="BI FINANCIERO CORMACARENA 2024"
              width="100%"
              height="541.25"
              src="https://app.powerbi.com/reportEmbed?reportId=2af770d2-a335-4295-bc9d-df75978b6b49&autoAuth=true&ctid=d99da890-2db3-45b4-8fbb-a6e8de9c9584"
              frameBorder="0"
              allow="fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-popups allow-scripts allow-same-origin allow-forms"
            ></iframe>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
