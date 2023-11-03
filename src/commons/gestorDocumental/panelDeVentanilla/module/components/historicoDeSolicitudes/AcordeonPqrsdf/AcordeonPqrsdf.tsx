/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useRef, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
// import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, TextField } from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import Swal from 'sweetalert2';
import { control_success } from '../../../../../../../helpers';

export const AcordeonPqrsdf = () => {
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const [radicado, setRadicado] = useState<string>('');

  const buttonLink = useRef<any>(null);

  {
    /*  this is the handle change that manages accordeon element */
  }
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const onChange = (event: any) => setRadicado(event.target.value);

  const onSubmit = () => {
    const searchElement = accordionData.find(
      (element) => element?.panelId === radicado
    );

    if (searchElement) {
      if (buttonLink.current) {
        buttonLink.current.href = `#${radicado}`;
      }
      control_success(
        'Se ha encontrado un elemento un elemento que coincide con el radicado ingresado'
      );
      setExpanded(radicado);
    } else {
      void Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No se ha encontrado un elemento que coincida con el radicado ingresado',
      });
      setExpanded(false);
    }

    // buttonLink.current?.click();

    // href={`#${radicado}`} //* se debe asignar al buttonLink como prop para poder dirigirlo al elemento
    console.log('se ha encontrado el siguiente elemento', searchElement);
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
    {
      panelId: 'panel4',
      header: 'Personal data',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
    {
      panelId: 'panel5',
      header: 'Personal data',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
    {
      panelId: 'panel6',
      header: 'Personal data',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
    {
      panelId: 'panel7',
      header: 'Personal data',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
    {
      panelId: 'panel8',
      header: 'Personal data',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
    {
      panelId: 'panel9',
      header: 'Personal data',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
    {
      panelId: 'panel10',
      header: 'Personal data',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
    {
      panelId: 'panel11',
      header: 'Personal data',
      details:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
  ];

  return (
    <>
      {/* se crea el buscador necesaria, en el mismo sentido al seleccionar la pqrsdf y exista se debe expandir dicho elemento y navegar a el  */}
      <Grid container sx={containerStyles}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  label="Radicado"
                  size="small"
                  variant="outlined"
                  value={radicado}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <a ref={buttonLink} href={`#${radicado}`}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    startIcon={<SearchIcon />}
                  >
                    BUSCAR
                  </Button>
                </a>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* se crea el buscador necesaria, en el mismo sentido al seleccionar la pqrsdf y exista se debe expandir dicho elemento y navegar a el  */}

      {accordionData.map((item, index) => (
        // luego la idea en construir el link con el id del panel cuando se cree el elemento de busqueda para el filtrado de las pqrsqdf
        <Accordion
          id={'panel11'}
          key={index}
          expanded={expanded === item.panelId}
          onChange={handleChange(item.panelId)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandCircleDownIcon
                sx={{
                  color: 'primary.main',
                }}
              />
            }
            aria-controls={`${item.panelId}bh-content`}
            id={`${item.panelId}bh-header`}
          >
            <Typography
            sx={{ width: '33%', flexShrink: 0 }}>
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
      ))}
    </>
  );
};
