/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid, TextField, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { useForm } from 'react-hook-form';
import { useAppDispatch, } from '../../../../hooks';
import FormButton from '../../../../components/partials/form/FormButton';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfiguracionMetadatos from '../components/ConfiguracionMetadatos';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const MetadatosScreen = () => {











    return (

        <Grid
            container
            spacing={2}
            marginTop={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >


            <ConfiguracionMetadatos />





        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default MetadatosScreen;


