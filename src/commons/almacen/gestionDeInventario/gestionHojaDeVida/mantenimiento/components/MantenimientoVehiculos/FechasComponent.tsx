import { useEffect, useState } from 'react';
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
} from "@mui/material";
import { CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import use_previsualizacion from './hooks/usePrevisualizacion';
import { type detalle_articulo } from '../../interfaces/IProps';

interface IProps {
    parent_state_setter: any,
    detalle_vehiculo: detalle_articulo
}
const opcion_programar = [{ value: "MA", label: "Manual" },{ value: "AU", label: "Automatica" }, { value: "OT", label: "Otro"}];

const opcion_programar_fecha = [{ value: "semanas", label: "Semanas" },{ value: "meses", label: "Meses" }];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const FechasComponent:React.FC<IProps> = ({parent_state_setter},{detalle_vehiculo}) => {
    console.log('detalle_vehiculo: ',detalle_vehiculo);
    // Hooks
    const {
        rows,
        set_rows
    } = use_previsualizacion();
    
    useEffect(() => {
        parent_state_setter(rows);
      }, [parent_state_setter, rows]);

    const [tipo, set_tipo] = useState("");
    const [fecha, set_fecha] = useState("");
    const [disabled_type, set_disabled_type] = useState(false);
    const [selected_date, set_selected_date] = useState(null);
    
    const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
        set_disabled_type(tipo === 'AU' || tipo === 'OT');
    }

    const handle_change_fecha:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_fecha(event.target.value);
    }

    const emit_new_data: () => void = () => {
        set_rows([...rows, { id: 110, codigo: 2903020, serial_placa: 'FEU213', kilometraje: '38212km/h', fecha: '11/04/2023', tipo_mantenimiento: 'Manual' }])
    }

  return (
    <>
        <Box
            component="form"
            sx={{ mt: '20px'}}
            noValidate
            autoComplete="off"
        >
        <Grid container>
            <Grid item container spacing={2} xs={12} sm={4}>
                <Grid item xs={12} sm={12}>
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
                <Grid item container spacing={2} xs={12} sm={12}>
                    <Grid item xs={12} sm={6}>
                        <FormControl required size='small' fullWidth>
                            <TextField
                                type='number'
                                helperText="Cada"
                                size="small"
                                required
                                fullWidth
                                disabled={disabled_type}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                    <FormControl required size='small' fullWidth>
                        <InputLabel>Tiempo</InputLabel>
                        <Select
                            value={fecha}
                            label="Tiempo"
                            onChange={handle_change_fecha}
                            disabled={disabled_type}
                        >
                            { opcion_programar_fecha.map(({value, label}) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                </Grid>
                <Grid item xs={12} sm={12} >
                <TextField
                    type='date'
                    helperText="Fecha Desde"
                    size="small"
                    required
                    fullWidth
                    disabled={disabled_type}
                />
            </Grid>
            <Grid item xs={12} sm={12} >
                <TextField
                    type='date'
                    helperText="Fecha Hasta"
                    size="small"
                    required
                    fullWidth
                    disabled={disabled_type}
                />
            </Grid>
            <Grid item xs={12} sm={12} >
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label='Incluir sabados y domingos'
                        disabled={disabled_type}/>
                    <FormControlLabel control={<Checkbox />} label='Incluir festivos'
                        disabled={disabled_type}/>
                </FormGroup>
            </Grid>
            </Grid>
            <Grid item xs={12} sm={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CalendarPicker date={selected_date} onChange={(selected_date) => { set_selected_date(selected_date); }}/>
                </LocalizationProvider>
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
            onClick={ emit_new_data }
        >
            Agregar
        </Button>
        </Stack>
    </>
  )
}
