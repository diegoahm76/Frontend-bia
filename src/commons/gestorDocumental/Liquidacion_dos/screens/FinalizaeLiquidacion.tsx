/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid } from "@mui/material";
import { Title } from '../../../../components/Title';
import { ModalDocumentoLiquidacionDetalle } from "../components/ModalDocumento/ModalDocumentoLiquidacionDetalle";
import { useSelector } from "react-redux";
import { AuthSlice } from "../../../auth/interfaces/authModels";
import { ModalConfirmacionLiquidacion } from "../components/ModalDocumento/ModalConfirmacionLiquidacion/ModalConfirmacionLiquidacion";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CorreoNotificacinSinPopos } from "../components/ModalDocumento/NotificacionContent/Notificacion";



export const FinalizaeLiquidacion: React.FC = () => {
    const navigate = useNavigate();

    const { userinfo } = useSelector(
        (state: AuthSlice) => state.auth
    );
    console.log(userinfo.tipo_usuario)


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
                    boxShadow: '0px 3px 6px #042F4A26'
                }}
            >

                <Grid item xs={12}>
                    <Title title="Finalizar Liquidacion"></Title>
                </Grid>
                {userinfo.tipo_usuario === 'E' && <>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={10}>
                            <ModalDocumentoLiquidacionDetalle />
                        </Grid>
                    </Grid>
                </>}



                {userinfo.tipo_usuario === 'I' && <>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={10}>
                            <CorreoNotificacinSinPopos />
                        </Grid>
                    </Grid>
                </>}

            </Grid>

            <Grid
                justifyContent="flex-end"
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26'
                }}
            >

                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>

                    <Button
                        fullWidth
                        style={{ width: "90%", marginTop: 15, color: "white", backgroundColor: "red" }}
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        color="error"
                        onClick={() => {
                            navigate('/app/gestor_documental/liquidacion/documneto');
                        }}
                    >
                        Regresar
                    </Button>
                </Grid>


                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>

                    <ModalConfirmacionLiquidacion />

                </Grid>
            </Grid>
        </>
    );
};
