/* eslint-disable @typescript-eslint/naming-convention */
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    // Typography
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { Title } from "../../../components"
import { change_super_user } from "../request/authRequest"
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DelegacionSuperuserScreen:React.FC = () => {

    const {
        tipo_documento_opt,
        tipo_documento,
        set_tipo_documento
    } = change_super_user();

    const [nuevoSuperUsuario, setNuevoSuperUsuario] = useState({
        tipoDocumento: tipo_documento,
        numeroIdentificacion: '',
        nombre: ''
    })

    useEffect(() => {
        if (tipo_documento !== undefined) {
            set_tipo_documento(tipo_documento);
        }
    }, [tipo_documento])

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
                <Title title="Delegacion de SuperUsuario"></Title>
                <Box
                    component='form'
                    sx={{ mt: '20px' }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid 
                        container 
                        spacing={1}
                        sx={{
                            justifyContent: 'center'
                        }}
                    >
                         <Grid item xs={12} sm={4}>
                            {/* <Typography variant="h6">SuperUsuarioActual:</Typography> */}
                            <TextField
                                placeholder="SuperUsuario Actual"
                                size="small"
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ my: '10px'}}>
                        <Grid item xs={12} sm={4}>
                            <FormControl size='small' fullWidth>
                                <InputLabel>Tipo de Documento</InputLabel>
                                <Select
                                    label='Tipo de Documento'
                                    value={nuevoSuperUsuario.tipoDocumento}
                                    onChange={(event) => {
                                        setNuevoSuperUsuario((prevState) => ({
                                            ...prevState,
                                            tipoDocumento: event.target.value
                                        }));
                                    }}
                                >
                                    { tipo_documento_opt.map(({value, label}) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                label='Número de identificación'
                                size="small"
                                helperText="Ingrese Número de Documento"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                disabled
                                placeholder="Nombre"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                type="button"
                                variant="contained"
                                startIcon={<SearchIcon />}
                                onClick={() => {}}
                            >
                                Busqueda Personal
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    </>
  )
}
