import { useState } from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@mui/material"

const opcion_programar = [{ value: "MA", label: "Manual" },{ value: "AU", label: "Automatica" }, { value: "OT", label: "Otro"}];

const opcion_programar_fecha = [{ value: "semanas", label: "Semanas" },{ value: "meses", label: "Meses" }];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FechasComponent:React.FC = () => {

    const [tipo, set_tipo] = useState("");
    const [fecha, set_fecha] = useState("");

    const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
    }

    const handle_change_fecha:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_fecha(event.target.value);
    }

  return (
    <>
        <Box
            component="form"
            sx={{ mt: '20px'}}
            noValidate
            autoComplete="off"
        >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <FormControl required size='small' fullWidth>
                    <InputLabel>Programación</InputLabel>
                    <Select
                        value={tipo}
                        label="Programación"
                        onChange={handle_change}
                    >
                        { opcion_programar.map(({value, label}) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    type='number'
                    label="Kilometraje"
                    helperText="Seleccione Kilometraje"
                    size="small"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl required size='small' fullWidth>
                    <InputLabel>Tiempo</InputLabel>
                    <Select
                        value={fecha}
                        label="Tiempo"
                        onChange={handle_change_fecha}
                    >
                        { opcion_programar_fecha.map(({value, label}) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    type='date'
                    helperText="Fecha Desde"
                    size="small"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    type='date'
                    helperText="Fecha Hasta"
                    size="small"
                    required
                    fullWidth
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        renderInput={(props) => {
                            return props
                        }}
                    />
                </LocalizationProvider> */}
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label='Incluir sabados y domingos'/>
                    <FormControlLabel control={<Checkbox />} label='Incluir festivos'/>
                </FormGroup>
            </Grid>
        </Grid>
        </Box>
        <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px' }}
        >
        <Button
            color='primary'
            variant='contained'
        >
            Validar Fechas
        </Button>
        </Stack>
    </>
  )
}
