import { type SetStateAction, type Dispatch, useState } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    MenuItem,
    Select,
    Stack,
    type SelectChangeEvent, 
    Button,
    InputLabel,
    Grid,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { Dialog } from "@material-ui/core"
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

const tipo_proceso = [{ value: 'fecha', label: 'Fecha' }, { value: 'documento', label: 'Documento' }, { value: 'opciones', label: 'Opciones'}, { value: 'texto', label: 'Texto'}, { value: 'valor', label: 'Valor'},]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstadosProcesoModal:React.FC<IProps> = ({ is_modal_active ,set_is_modal_active }: IProps) => {

    const handle_close = ():void => {
        set_is_modal_active(false);
    }

    const [tipo, set_tipo] = useState("");

    const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
    }

    return (
        <Dialog
            maxWidth="xl"
            open={is_modal_active}
            onClose={handle_close}
        >
            <Box
                component="form"
                sx={{
                    width: '500px'
                }}
            >
                <DialogTitle>Nuevo Atributo</DialogTitle>
                <Divider />

                <DialogContent sx={{ mb: '0px' }}>
                    <Grid container direction='column'>
                        <Grid item xs={11} md={5} margin={1}>
                            <TextField
                                helperText="Fecha de emisión de la resolución"
                                type="date"
                                margin="dense"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={11} md={5} margin={1}>
                            <FormControl size='small' fullWidth>
                                <InputLabel>Tipo</InputLabel>
                                <Select
                                    value={tipo}
                                    label='Tipo'
                                    onChange={handle_change}
                                >
                                    { tipo_proceso.map(({value, label}) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} md={5} margin={1}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Obligatorio" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    
                </DialogContent>

                <Divider />

                <DialogActions>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mr: '15px', mb: '10px', mt: '10px' }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handle_close}
                            startIcon={<CloseIcon />}
                        >
                            Cerrar
                        </Button>
                        <Button color="success" variant="contained">
                            Agregar
                        </Button>
                    </Stack>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
