import { 
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    Select,
    type SelectChangeEvent,
    TextField, 
    MenuItem,
    DialogActions,
    Stack,
    Button
} from '@mui/material';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Title } from '../../../../../components';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

const tipo_articulo = [{ value: 'opc', label: 'Opciones' }, { value: 'opc2', label: 'opciones2' },]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AddParametroModal:React.FC<IProps> = ({ is_modal_active, set_is_modal_active }: IProps) => {

    const handle_close = (): void => {
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
            <DialogTitle>Nuevo parametro</DialogTitle>
            <Divider />
            <DialogContent sx={{ mb: '0px' }}>
                <Grid container direction='column'>
                    <Title title='Parametro'></Title>
                    <Grid item xs={11} md={5} margin={1}>
                        <TextField
                            helperText='Ingrese nombre'
                            margin='dense'
                            fullWidth
                            size='small'
                            label='Nombre'
                        />
                    </Grid>
                    <Grid item xs={11} md={5} margin={1}>
                        <TextField
                            helperText='Ingrese descripción'
                            margin='dense'
                            fullWidth
                            size='small'
                            label='Descripción'
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
                                { tipo_articulo.map(({value, label}) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11} md={5} margin={1}>
                        <TextField
                            margin='dense'
                            fullWidth
                            size='small'
                            label='Opciones'
                            multiline
                            rows={4}
                        />
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
                <Button variant="contained" startIcon={<SaveIcon />}>
                    Agregar
                </Button>
            </Stack>
        </DialogActions>
        </Box>

    </Dialog>
  )
}
