/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { api, baseURL } from "../../../../api/axios";
import { Button, FormControl, Grid, TextField, Dialog } from "@mui/material";
import { control_error, control_success } from "../../../../helpers";
import { RadioGroup, FormControlLabel, Radio, Typography, } from "@mui/material";
import { FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, } from "@mui/material";
import { miEstilo } from "../../Encuesta/interfaces/types";
import Slide from '@mui/material/Slide';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TransitionProps } from '@mui/material/transitions';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Email: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [is_buscar, set_is_buscar] = useState<boolean>(true);
    const handle_open_buscar = (): void => {
        set_is_buscar(true);
    };

    const handle_close = (): void => {
        set_is_buscar(false);
    };
    return (
        <>




            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >

                <Grid item xs={12} sm={12}>
                    <Title title="Asignación  de encuesta " />
                </Grid>
                <Grid item xs={12} sm={1.4}>
                    <Button onClick={handle_open_buscar} fullWidth variant="contained"    >
                        buscar
                    </Button>
                </Grid>


            </Grid>

            <Dialog
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                open={is_buscar}
                onClose={handle_close}
                maxWidth="xl"
            >


                <Grid
                    container spacing={2}
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px',
                        mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26'
                    }}
                >
                    <Grid item xs={12} sm={12}>
                        <Title title=" Ingrese clave de coreeo electronico      " />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={14} marginTop={2} sm={14}>

                            <TextField
                                variant="outlined"
                                size="small"
                                label="Correo electronico"
                                fullWidth
                                disabled
                                sx={{ width: '300px' }}
                            />
                        </Grid>


                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} marginTop={2} sm={12}>
                         

                            <FormControl required size="small" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>

                        </Grid>


                    </Grid>

                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} marginTop={2} sm={12}>

                            <Button fullWidth variant="contained"    >
                                Ingresar
                            </Button>
                        </Grid>
                    </Grid>




                </Grid>
            </Dialog>

        </>
    );
};