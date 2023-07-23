import { Grid, Select } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { type FC, } from 'react';
import { Title } from '../../../../components';

interface Props {
    nombrenuebo: string;
    setnombrenuebo: (value: string) => void;
    email: string;
    handle_email_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    confirm_email: string;
    handle_confirm_email_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    nueva_sucursal: string;
    handle_submit: () => void;
    data_rows: any[]; // Actualiza el tipo de data_rows según tus necesidades
    columns: any[]; // Actualiza el tipo de columns según tus necesidades
    agregar_sucursal: () => void;
    setnueva_sucursal: (value: string) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalTabla: FC<Props> = (props) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention



    // Establece la dirección generada en el generador de direcciones

    return (
        <>
            <Grid
                container
                spacing={2}
                direction="row"
                border={1} padding={2}
                borderColor="lightgray"
                borderRadius={2}
                sx={{ marginTop: '10px', marginLeft: "7px", }}
            >

                <Grid item xs={12} sx={{ marginTop: "-20px" }}     >
                    <Title title="Sucursal" />
                </Grid>
                <Grid item xs={12} sm={1.5} >
                    <TextField variant="outlined"
                        size="small"
                        label="Nro"
                        style={{ marginBottom: '10px' }}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={10.3} >
                    <TextField variant="outlined"
                        size="small"
                        style={{ marginBottom: '10px' }}
                        label=" Descripcion"
                        required
                        fullWidth
                        value={props.nombrenuebo} onChange={(event) => { props.setnombrenuebo(event.target.value) }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ marginBottom: '10px' }}
                        label="Email de notificaciónes"
                        fullWidth
                        value={props.email}
                        onChange={props.handle_email_change}
                    />
                    {/* {is_error && <div
                        //   style={{color: "red"}} 
                        >{error}</div>} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ marginBottom: '10px' }}
                        label="Confirmar Email de notificaciónes"
                        fullWidth
                        value={props.confirm_email}
                        onChange={props.handle_confirm_email_change}
                    />
                    {/* {is_error && <div
                        //   style={{color: "red"}} 
                        >{error}</div>} */}
                </Grid>
                <Grid item xs={12} sm={4} >
                    <TextField variant="outlined"
                        label="Telf. contacto"
                        style={{ marginBottom: '10px' }}
                        fullWidth
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel>Principal</InputLabel>
                        <Select value={props.nueva_sucursal} onChange={(event) => { props.setnueva_sucursal(event.target.value) }}
                            label="Principal"
                        >
                            <MenuItem value="si">Sí</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel>Activo</InputLabel>
                        <Select
                            label="Activo"
                        >
                            <MenuItem value="si">Sí</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Button variant='contained' onClick={props.handle_submit}>Verificar correos </Button>
                </Grid>
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid rows={props.data_rows} columns={props.columns} />
                </div>
                <Button onClick={props.agregar_sucursal}>agregar</Button>
            </Grid>

        </>
    );
}