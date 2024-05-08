/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom"; // Asumo que estás utilizando react-router
import CleanIcon from '@mui/icons-material/CleaningServices';
import { PreciosContext } from "../../context/PersonalContext";
import { useContext } from "react";
import { control_error, control_success } from "../../../alertasgestor/utils/control_error_or_success";
import { api } from "../../../../../api/axios";
import type { AuthSlice } from "../../../../auth/interfaces/authModels";
import { useSelector } from "react-redux";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';


export const BotonesFinales = () => {

  const navigate = useNavigate();
  const {
    userinfo: { id_persona, email, telefono_celular, numero_documento }
  } = useSelector((state: AuthSlice) => state.auth);

  const { precios,setPrecios } = useContext(PreciosContext);








  const LimpiarTabla=()=>{
    setPrecios([]);
  }

  return (
    <Grid
      container

      justifyContent="flex-end"
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >


     

      <Grid item xs={12} sm={4}>
        <Button
          startIcon={<DescriptionOutlinedIcon />}
          fullWidth
          style={{ width: "90%", marginTop: 15,backgroundColor:"green",color:"white" }}
          variant="contained"
          color="error"
          onClick={() => {
            navigate('/app/gestor_documental/liquidacion/documneto');
            // localStorage.setItem("valor_recarga", false.toString()); // Convertir a cadena usando toString()

          }}
        >
          Generar documento
        </Button>
      </Grid>

      <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
        <Button color='primary' onClick={LimpiarTabla} style={{ width: "90%", marginTop: 15 }} variant="outlined" fullWidth startIcon={<CleanIcon />}>
          Limpiar
        </Button>
      </Grid>



      <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
        <Button
          startIcon={<ClearIcon />}
          fullWidth
          style={{ width: "90%", marginTop: 15 ,backgroundColor:"red",color:"white"}}
          variant="contained"
          color="error"
          onClick={() => {
            navigate('/app/home');
          }}
        >
          Salir
        </Button>
      </Grid>
    </Grid>
  );
};
