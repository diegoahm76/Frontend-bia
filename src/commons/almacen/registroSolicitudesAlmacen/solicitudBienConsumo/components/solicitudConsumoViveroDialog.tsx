
import "react-datepicker/dist/react-datepicker.css";
import { Grid, } from '@mui/material';
// import { Title } from '../../../../../components/Title';
import PersonaResponsable from './componenteBusqueda/PersonaResponsable';
import CheckIcon from '@mui/icons-material/Check';
import SeleccionarSolicitudVivero from "./componenteBusqueda/SeleccionarSolicitudVivero";
import FormButton from "../../../../../components/partials/form/FormButton";



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudConsumoViveroDialog = () => {


    return (


        <Grid
            container
            spacing={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >
            <Grid item xs={12} marginY={2}>
                <SeleccionarSolicitudVivero />
                <PersonaResponsable
                    title={"Funcionario responsable"} />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormButton
                    variant_button="contained"
                    on_click_function={null}
                    icon_class={<CheckIcon />}
                    label={"Confirmar creación de solicitud"}
                    type_button="button"
                />
            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default SolicitudConsumoViveroDialog;
