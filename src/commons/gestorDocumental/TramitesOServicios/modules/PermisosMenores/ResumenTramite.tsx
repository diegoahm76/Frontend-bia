/* eslint-disable @typescript-eslint/naming-convention */
import {
  Grid,
  Button,
  Stack,
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Avatar,
  Fab,
  Paper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from 'react';
const class_css = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  mb: '20px',
  boxShadow: '0px 3px 6px #042F4A26',
};
interface IProps {
  formulario_paso_uno: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResumenTramite: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{mt:'1.8rem', mb: '1.7rem', display:'flex', justifyContent: 'center'}}>
          <Typography variant="button" gutterBottom>
            Resumen de la solicitud pendiente de radicación
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ padding: 1, marginTop: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="button" gutterBottom>
                {props.formulario_paso_uno?.desc_permiso_ambiental}
              </Typography>
              <Fab
                size="small"
                variant="extended"
                sx={{
                  mx: 0.5,
                  my: 0.25,
                  bgcolor: 'success.main',
                  color: 'common.white',
                  px: 2.5,
                }}
              >
                Completado
              </Fab>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
