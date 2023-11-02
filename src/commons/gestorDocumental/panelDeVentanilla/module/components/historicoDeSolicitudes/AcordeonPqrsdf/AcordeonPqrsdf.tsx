/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, Stack, TextField } from '@mui/material';

export const AcordeonPqrsdf = () => {
  const [expanded, setExpanded] = useState<string | boolean>(false);

  {
    /*  this is the handle change that manages accordeon element */
  }
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const accordionData = [
    {
      panelId: 'panel1',
      header: 'General settings',
      // secondaryHeader: 'I am an accordion',
      details:
        'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.',
    },
    {
      panelId: 'panel2',
      header: 'Users',
      // secondaryHeader: 'You are currently not an owner',
      details:
        'Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.',
    },
    {
      panelId: 'panel3',
      header: 'Advanced settings',
      // secondaryHeader: 'Filtering has been entirely disabled for whole web server',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
    /* {
      panelId: 'panel4',
      header: 'Personal data',
      details: 'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.'
    }*/
  ];

  return (
    <>
      {/* se crea el buscador necesaria, en el mismo sentido al seleccionar la pqrsdf y exista se debe expandir dicho elemento y navegar a el  */}

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // onSubmit();
            }}
            style={{
              marginTop: '20px',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  // name="nombre"
                  label="Nombre del TRD"
                  helperText="Actualice el nombre"
                  size="small"
                  variant="outlined"
                  value={'radicado x'}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    console.log(e);
                    /* onChange(e.target.value);
                e.target.value.length === 50 &&
                  control_warning('máximo 50 caracteres');*/
                    // console.log(e.target.value);
                  }}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                // onClick={openModalModalSearchTRD}
              >
                BUSCAR TRD
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {/* se crea el buscador necesaria, en el mismo sentido al seleccionar la pqrsdf y exista se debe expandir dicho elemento y navegar a el  */}

      {accordionData.map((item, index) => (
        // luego la idea en construir el link con el id del panel cuando se cree el elemento de busqueda para el filtrado de las pqrsqdf
        <a id={`#${item.panelId}`} key={index}>
          <Accordion
            expanded={expanded === item.panelId}
            onChange={handleChange(item.panelId)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.panelId}bh-content`}
              id={`${item.panelId}bh-header`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {item.header}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {/*{item.secondaryHeader}*/}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.details}</Typography>
            </AccordionDetails>
          </Accordion>
        </a>
      ))}
    </>
  );
};
