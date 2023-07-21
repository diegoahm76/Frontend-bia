import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import {
    Box, Button,
    Grid,
    Typography
} from "@mui/material";
import { Title } from "../../../../../../../components/Title";
import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import SearchIcon from '@mui/icons-material/Search';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import FuncionarioResponsable from "../../../../../../almacen/registroSolicitudesAlmacen/solicitudBienConsumo/components/componenteBusqueda/PersonaResponsable";
import { BuscadorPersonaDialog } from "../../../../../../almacen/gestionDeInventario/gestionHojaDeVida/mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoGeneral/BuscadorPersonaDialog";

interface ModalEditarCargoProps {
    name: string;
    fecha: string;
    titlee: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalEditarCargo: React.FC<ModalEditarCargoProps> = ({ name, fecha, titlee }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = React.useState<boolean>(false);

    const footer_content = (
        <div>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { setVisible(false) }} >Aceptar</Button>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { setVisible(false) }} >Descartar</Button>
        </div>
    );

    const title = (<Title title={"Cambiar " + titlee + "Actual"} />);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // const [age, setAge] = React.useState('');

    // // eslint-disable-next-line @typescript-eslint/naming-convention
    // const handleChange = (event: any): void => {
    //     setAge(event.target.value);
    // };
    const [abrir_modal_proveedor, set_abrir_modal_proveedor] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (): void => {
        setVisible(true);
        set_abrir_modal_proveedor(true);
    };


    return (
        <div>

            <Button
                style={{ margin: 3, marginTop: 10, marginRight: 10 }}
                color="primary"
                variant="contained"
                onClick={handleClick}
            >
                Cambiar
            </Button>
            <Dialog header={title} visible={visible} style={{ width: '50%' }} onHide={() => { setVisible(false) }} footer={footer_content}>
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >
                    <BuscadorPersonaDialog 
                        is_modal_active={abrir_modal_proveedor}
                        set_is_modal_active={set_abrir_modal_proveedor} title="Busqueda Avanzada" set_persona={undefined} />

                    <Grid item xs={12} sm={6} >
                        <Typography variant="subtitle1" fontWeight="bold">Director Actual</Typography>
                        <InputText aria-describedby="username-help" disabled placeholder={name} />
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <Typography variant="subtitle1" fontWeight="bold">Fecha de registro</Typography>

                        <InputText aria-describedby="username-help" disabled placeholder={fecha} />
                    </Grid>

                </Grid>
                <Title title={"Nuevo " + titlee} />
                <Grid container sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >

                    <Box component="form" noValidate autoComplete="off">

                        <Grid item container xs={12}>

                            <Grid item xs={12} >
                                <FuncionarioResponsable title="usqueda Avanzada" get_values_solicitud={1} />
                            </Grid>

                            {/* <Grid item xs={12} sm={6} md={2} >




                                <Typography variant="subtitle1" fontWeight="bold">Tipo id</Typography>
                                <Select
                                    style={{ width: '80%', height: 45 }}
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>Nit</em>
                                    </MenuItem>
                                    <MenuItem value={10}>CC</MenuItem>
                                    <MenuItem value={20}>NIT</MenuItem>
                                    <MenuItem value={30}>OTRO</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1" fontWeight="bold">Num Doc id</Typography>
                                <InputText style={{ width: '80%' }} aria-describedby="username-help" disabled placeholder="21346793" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1" fontWeight="bold">Nombre</Typography>
                                <InputText style={{ width: '80%' }} aria-describedby="username-help" disabled placeholder="21346793" />
                            </Grid>

                            <Grid item xs={12} sm={6} md={2} sx={{ alignSelf: 'flex-end' }}>
                                <Button color="primary" variant="contained" onClick={() => { setVisible(false) }}><SearchIcon /></Button>
                            </Grid>

                            <Grid item xs={12}  >
                                <Typography variant="subtitle1" fontWeight="bold">Observaciones del Cambio</Typography>

                                <InputTextarea style={{ padding: 2, width: "80%" }} keyfilter="int" placeholder="Observaciones del cambio de director" rows={5} cols={30} />


                            </Grid> */}
                        </Grid>
                    </Box>



                </Grid>

            </Dialog>
        </div>
    );
};