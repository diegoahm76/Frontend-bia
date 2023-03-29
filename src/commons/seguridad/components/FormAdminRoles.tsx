import * as React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Title } from '../../../components/Title';

interface IProps {
  set_position_tab_admin_roles: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FormAdminRoles = ({
  set_position_tab_admin_roles,
}: IProps): JSX.Element => {
  const [expanded, set_expanded] = React.useState<string | false>(false);
  const [checked, set_checked] = React.useState([true, false]);

  const tipos_documentos = [
    {
      value: '1',
      label: 'Test',
    },
    {
      value: 'EUR',
      label: 'Test',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const handle_change =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      set_expanded(isExpanded ? panel : false);
    };

  const handle_change_1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    set_checked([event.target.checked, event.target.checked]);
  };

  const handle_change_2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    set_checked([event.target.checked, checked[1]]);
  };

  const handle_change_3 = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    set_checked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        labelPlacement="top"
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handle_change_2} />}
      />
      <FormControlLabel
        labelPlacement="top"
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handle_change_3} />}
      />
    </Box>
  );

  return (
    <>
      <Grid item xs={12}>
        <Title title="LUGAR DE RESIDENCIA" />
        <Box sx={{ m: '20px 0' }}>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            // onSubmit={handle_submit_unidades(submit_unidades)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="País de residencia"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Departamento de residencia"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Departamento de residencia"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ m: '20px 0' }}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handle_change('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Seguridad
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                I am an accordion
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <FormControlLabel
                  label="Parent"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1]}
                      indeterminate={checked[0] !== checked[1]}
                      onChange={handle_change_1}
                    />
                  }
                />
                {children}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handle_change('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Users
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                You are currently not an owner
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat
                lectus, varius pulvinar diam eros in elit. Pellentesque
                convallis laoreet laoreet.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handle_change('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Advanced settings
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Filtering has been entirely disabled for whole web server
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handle_change('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Personal data
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    </>
  );
};
