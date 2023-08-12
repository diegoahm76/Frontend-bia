import { 
    Box,
    Button,
    Checkbox,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Divider, 
    FormControl, 
    Grid, 
    InputLabel, 
    MenuItem, 
    Select, 
    type SelectChangeEvent, 
    Stack,
    TextField,
    Typography, 
} from "@mui/material"
import {
    useState,
    type Dispatch,
    type SetStateAction
} from "react";
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

const tipo_articulo = [{ value: 'estrato1', label: '1' }, { value: 'estrato2', label: '2' }, { value: 'estrato3', label: '3'},]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PruebasLiquidacionModal:React.FC<IProps> = ({ is_modal_active, set_is_modal_active }:IProps) => {

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
        <DialogTitle>Prueba de liquidacion</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
            <Grid container direction='row'>
                <Grid item xs={11} md={5} margin={1}>
                    <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Parametros</InputLabel>
                    <Divider />
                    <InputLabel sx={{ p: '18.5px' }}>Volumen Promedio</InputLabel>
                    <Divider />
                    <InputLabel sx={{ p: '18.5px' }}>Es rural</InputLabel>
                    <Divider />
                    <InputLabel sx={{ p: '18.5px' }}>Estrato</InputLabel>
                </Grid>
                <Grid item xs={11} md={5} margin={1}>
                    <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Valor</InputLabel>
                    <Divider />
                    <TextField sx={{ p: '10px' }} size="small"/>
                    <Divider />
                    <Checkbox sx={{ p: '18px' }} />
                    <Divider />
                    <FormControl sx={{ p:'10px' }} required size='small' fullWidth>
                        <Select
                            value={tipo}
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
            </Grid>
            <Grid 
                container 
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Typography variant="h4">$256.000</Typography>
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
            <Button variant="contained">
                Calcular
            </Button>
        </Stack>
    </DialogActions>
    </Box>

</Dialog>
  )
}
