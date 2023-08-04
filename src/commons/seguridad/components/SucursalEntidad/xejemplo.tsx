/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState, type FC, type ChangeEvent } from 'react';
import { baseURL } from '../../../../api/axios';
import { Grid,   } from '@mui/material';
 import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
 // eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {  SucursalDireccionesProps } from './utils/interfac';

 interface Municipios {
    label: string;
    value: string;
};

interface MunicipiosResponse {
    success: boolean;
    detail: string;
    data: Municipios[];
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalEntidad: FC = (): any => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [Municipioss, setMunicipioss] = useState<Municipios[]>([]);

    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(`${baseURL}listas/municipios/?cod_departamento=`);
                const data: MunicipiosResponse = await response.json();
                if (data.success) {
                    setMunicipioss(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching Municipioss:', error);
            }
        };

        void fetch_data();
    }, []);
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
}


// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalDirecciones: FC<SucursalDireccionesProps> = ({ form_values, handleinput_change }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention  
     
    const [same_address, setsame_address] = useState(false);

    const handle_checkbox = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }): void => {
        setsame_address(event.target.checked);
        if (event.target.checked) {
            // If "Misma dirección física" checkbox is checked, copy the value from "direccion" to "direccion_notificacion"
            handleinput_change({
                target: {
                    name: 'direccion_notificacion',
                    value: form_values.direccion,
                },
            } as ChangeEvent<HTMLInputElement>);
        }
    };
    
    const handle_direccion_notificacion = (event: ChangeEvent<HTMLInputElement>) => {
        if (!same_address) {
            // Update the value of "direccion_notificacion" if the checkbox is not checked
            handleinput_change(event as ChangeEvent<HTMLInputElement>);
        }
    };
    return (
        <>
        <Grid
            container
            spacing={2}
            direction="row"
            border={1}
            padding={2}
            borderColor="lightgray"
            borderRadius={2}
            sx={{ marginTop: '10px', marginLeft: '7px' }}
        >

<Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="direccion geografica  "
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion_sucursal_georeferenciada"
                        value={form_values.direccion_sucursal_georeferenciada}
                        onChange={handleinput_change}
                    />
                </Grid>
            
            <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    size="small"
                    label="direccion"
                    fullWidth
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="direccion"
                    value={form_values.direccion}
                    onChange={handleinput_change}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControlLabel
                    control={<Checkbox checked={same_address} onChange={handle_checkbox} />}
                    label="Misma dirección física"
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    size="small"
                    label="direccion_notificacion"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="direccion_notificacion"
                    value={form_values.direccion_notificacion}
                    onChange={handle_direccion_notificacion}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="direccion_notificacion_geografica"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion_notificacion_referencia"
                        value={form_values.direccion_notificacion_referencia}
                        onChange={handleinput_change}
                    />
                </Grid>
        </Grid>
    </>
    );
}


