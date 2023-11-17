/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { miEstilo } from '../interfaces/types';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Stack, Typography, } from '@mui/material';
import FolderIcon from "@mui/icons-material/Folder";
import MoverCarpeta from '../../deposito/Carpetas/components/MoverCarpeta';
import { IObjCarpeta } from '../../deposito/interfaces/deposito';
import { useForm } from "react-hook-form";
import { eliminar_carpeta } from '../../deposito/store/thunks/deposito';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { control_error, control_success } from '../../../../helpers';
import CierreExpedientesScreen from '../../Expedientes/cierreExpediente/screen/CierreExpedientesScreen';
import { ExpedientesScreen } from '../../Expedientes/aperturaExpedientes/screens/ExpedientesScreen';
import { Expedien } from '../../Expedientes/aperturaExpedientes/screens/ReubicacionExpediente';


export const ActualizarExpediente: React.FC = () => {
 



    return (
        <>
        
         <Expedien/>
        </>
    );
};
