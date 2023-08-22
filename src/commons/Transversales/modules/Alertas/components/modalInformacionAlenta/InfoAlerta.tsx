import  {useState } from "react";
import { Dialog } from 'primereact/dialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Button,
    Grid, TextField, Tooltip
} from "@mui/material";

import { Title } from "../../../../../../components/Title";
import { ModificadorFormatoFecha } from "../../utils/ModificaforFecha";


interface InterfazMostarAlerta {
    columnnns: any; // o el tipo adecuado para id_alerta_bandeja_alerta_persona

}


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalInfoAlerta: React.FC<InterfazMostarAlerta> = (prop) => {

// 

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleGuardarYPoner = (): void => {
        setVisible(false)
      
    };



    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = useState<boolean>(false);

    const footer_content = (
        <div>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { handleGuardarYPoner() }} >Salir</Button>

        </div>
    );

    const title = (<Title title="Cambiar " />);


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [alerta_idTo_find, set_alerta_idTo_find] = useState<any>(prop.columnnns);
    const {
        nombre_clase_alerta,
        tipo_alerta,
        fecha_hora,
        responsable_directo,
        fecha_envio_email,
        email_usado,
        nombre_modulo,
        repeticiones_suspendidas,
        nivel_prioridad




    } = alerta_idTo_find;

    const handle_suspender_alerta_click: () => Promise<void> = async () => {
        try {

            ;
            set_alerta_idTo_find(prop.columnnns);

        } catch (error) {
            // Manejo de errores si es necesario
        }
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (): void => {
        setVisible(true);
        handle_suspender_alerta_click().catch((error) => {
            console.error(error);
        });;

    };




    return (
        <div>
            <Tooltip title="Informacion de alerta" placement="right">
            <Button
                onClick={handleClick}
                
            >
              <VisibilityIcon

              />
            </Button>
            </Tooltip>
            <Dialog header={title} visible={visible} style={{ width: '60%' }} closable={false} onHide={() => { setVisible(false) }} footer={footer_content}>
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >


                    <Grid item xs={12}  >

                        <TextField
                            style={{ width: "95%",margin:6 }}
                            label="Clase Alerta"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={nombre_clase_alerta}
                     
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Tipo de Alerta"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={tipo_alerta}

                           
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Fecha/Hora"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={ModificadorFormatoFecha(fecha_hora)}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Responsable Directo"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={responsable_directo === true ? "Sí" : "No"}

                        />
                    </Grid>

                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Fecha Envio a Email"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={fecha_envio_email}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label=" Envio a Email"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={email_usado}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Modulo Destino"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={nombre_modulo}
                        />
                    </Grid>
              
              
                  

                <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ margin: 6, width: "85%" }}
                            label="Suspendido"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={repeticiones_suspendidas === true ? "Sí" : "No"}
                           
                        />
                    </Grid>
                <Grid item xs={12} sm={2} >

                    <TextField
                        style={{ margin: 6 , width: "85%"}}
                        label="Prioridad"
                        variant="outlined"
                        size="small"
                        disabled
                        fullWidth
                        value={nivel_prioridad}
                    />
                </Grid>


                    <Grid item xs={12}>
                        <TextField
                            style={{ margin: 6, width: "100%" }}
                            label="Mensaje"
                            id="description"
                        />

                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
};