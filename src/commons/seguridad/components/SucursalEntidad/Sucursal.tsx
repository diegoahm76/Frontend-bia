import { useState, type FC, } from 'react';
import { Grid } from '@mui/material';
import { control_error } from './utils/control_error_or_success';
import { SucursalDirecciones } from './SucursalDirecciones';
import { SucursalEntidad } from './SucursalEntidad';
import { SucursalTabla } from './SucursalTabla';

const columns = [
    { field: 'id', headerName: 'Nro Sucursal', width: 150, flex: 1 },
    { field: 'nombre', headerName: 'descripcin', width: 120, flex: 1 },
    { field: 'principal', headerName: 'Principal', width: 120, flex: 1 },
];


const rows = [
    { id: 1, principal: 'Sí', nombre: 'miguel' },
    // Agrega más filas según sea necesario
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Sucursal: FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention


    const [nueva_sucursal, setnueva_sucursal] = useState('');
    const [nombrenuebo, setnombrenuebo] = useState('');

    const [data_rows, set_data_rows] = useState(rows);


    const agregar_sucursal = (): void => {
        const nueva_sucursal_obj = {
            id: data_rows.length + 1,
            principal: nueva_sucursal,
            nombre: nombrenuebo,
        };

        const nuevas_filas = [...data_rows, nueva_sucursal_obj];
        set_data_rows(nuevas_filas);
        setnueva_sucursal('');
        setnombrenuebo('');
    };

    const [email, set_email] = useState('');
    const [confirm_email, set_confirm_email] = useState('');
    const [, set_error] = useState<any>('');

    const handle_email_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
        set_email(event.target.value);
    };

    const handle_confirm_email_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
        set_confirm_email(event.target.value);
    };

    const handle_submit = (): void => {
        if (email === confirm_email) {
            set_error('');
        } else {
            set_error(control_error('Los Emails  no coinciden'));
        }
    };


    // Establece la dirección generada en el generador de direcciones

    return (
        <>
            < >

            </>
            <Grid
                container
                spacing={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                    marginTop: '20px',
                    marginLeft: '-5px',
                }}
            >

                {/* sucursal entidad ///////////////////// */}
                <SucursalEntidad />

                {/*  direcciones      //////////////////// */}
                <SucursalDirecciones />

                {/* tabla SUCURSAL         ///////////////////// */}
                <SucursalTabla
                    email={email}
                    handle_email_change={handle_email_change}
                    nombrenuebo={nombrenuebo}
                    setnombrenuebo={setnombrenuebo}
                    confirm_email={confirm_email}
                    handle_confirm_email_change={handle_confirm_email_change}
                    nueva_sucursal={nueva_sucursal}
                    handle_submit={handle_submit}
                    data_rows={data_rows}
                    columns={columns}
                    agregar_sucursal={agregar_sucursal}
                    setnueva_sucursal={setnueva_sucursal}
                />
            </Grid>
        </>
    );
}