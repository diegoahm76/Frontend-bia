import {
    Button,
    FormControl,
    Grid,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
    Typography,
    InputLabel
} from "@mui/material"
import { useState } from 'react';

const tipo_liquidacion = [{ value: 'cobro_coactivo', label: 'Cobro Coactivo' }, { value: 'mandamiento_pago', label: 'Mandamiento de Pago' }];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarCartera:React.FC = () => {

    const [tipo, set_tipo] = useState("");

    const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
    }

  return (
    <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Deudor'
                    helperText='Ingrese Deudor'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Factura'
                    helperText='Ingrese Factura'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Monto Inicial'
                    helperText='Ingrese Monto Inicial'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    type="date"
                    helperText='Ingrese Año'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    type="date"
                    helperText='Ingrese Periodo'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Concepto'
                    helperText='Ingrese Concepto'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Codigo Contable'
                    helperText='Ingrese Codigo Contable'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    placeholder="Cobro Persuasivo"
                    size="small"
                    fullWidth
                    disabled
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ pb:'10px' }}  size='small' fullWidth>
                    <InputLabel>Mover a</InputLabel>
                    <Select
                        label='Mover a'
                        value={tipo}
                        onChange={handle_change}
                    >
                        { tipo_liquidacion.map(({value, label}) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    color='error'
                    variant='contained'
                >
                    Mover
                </Button>
            </Grid>
        </Grid>

        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                pb: '10px'
            }}
        >
            <Typography>Saldo total</Typography>
            <Typography variant="h4">$576.942</Typography>
            <Typography>Dias de Mora</Typography>
            <Typography variant="h6">125</Typography>
        </Grid>
    </>
  )
}
