import { useState } from 'react';
import { 
    Box, 
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField 
} from "@mui/material"


const tipo_mantenimiento = [{ value: "PR", label: "Preventivo" },{ value: "CO", label: "Correctivo" },{ value: "OT", label: "Otro" }]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MantenimientoComponent:React.FC = () => {

    const [tipo, set_tipo] = useState("");

    const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
    }

  return (
    <>
        <Box
            component="form"
            sx={{ mt: '20px'}}
            noValidate
            autoComplete="off"
        >
        <Grid container spacing={2} direction='column'>
            <Grid item xs={12} sm={4}>
                <FormControl required size='small' fullWidth>
                    <InputLabel>Tipo de mantenimiento</InputLabel>
                    <Select
                        value={tipo}
                        label="Tipo de mantenimiento"
                        onChange={handle_change}
                    >
                        { tipo_mantenimiento.map(({value, label}) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        multiline
                        rows={4}
                        label="Especificaciones tecnicas"
                        helperText="Seleccione especificaciones tecnicas"
                        size="small"
                        required
                        fullWidth
                    />
                </Grid>
        </Grid>
        </Box>
    </>
  )
}
