import {
    Box,
    Grid,
    TextField
} from "@mui/material"
import { useEffect } from "react";
import use_previsualizacion from "./hooks/usePrevisualizacion";
interface IProps {
    parent_state_setter: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DetallesComponent: React.FC<IProps> = ({ parent_state_setter }) => {

    const {
       // States
       marca,
       serial_placa,
       modelo,
       kilometraje,
       // Edita States
       set_marca,
       set_serial_placa,
       set_modelo,
       set_kilometraje
    } = use_previsualizacion();
    const on_change_marca: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_marca(e.target.value);
    };
    const on_change_serial_placa: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_serial_placa(e.target.value);
    };
    const on_change_modelo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_modelo(e.target.value);
    };
    const on_change_kilometraje: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_kilometraje(e.target.value);
    };

    useEffect(() => {
        parent_state_setter({marca,serial_placa,modelo,kilometraje});
    }, [parent_state_setter, marca,serial_placa,modelo,kilometraje]);

    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Marca"
                            helperText="Seleccione Marca"
                            size="small"
                            required
                            fullWidth
                            value={marca}
                            onChange={on_change_marca}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Serial/Placa"
                            helperText="Seleccione Serial/Placa"
                            size="small"
                            required
                            fullWidth
                            value={serial_placa}
                            onChange = {on_change_serial_placa}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Modelo"
                            helperText="Seleccione Modelo"
                            size="small"
                            required
                            fullWidth
                            value={modelo}
                            onChange = {on_change_modelo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Kilometraje"
                            helperText="Seleccione Kilometraje"
                            size="small"
                            required
                            fullWidth
                            value={kilometraje}
                            onChange = {on_change_kilometraje}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
