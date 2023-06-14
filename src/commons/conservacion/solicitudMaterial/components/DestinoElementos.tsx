import { Grid, MenuItem, TextField, } from '@mui/material';



// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { type IList } from '../../../../interfaces/globalModels';
import { api } from '../../../../api/axios';
import { Controller } from 'react-hook-form';
import { Title } from '../../../../components/Title';
// eslint-disable-next-line @typescript-eslint/no-unused-vars




interface IProps {

    control_solicitud: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DestinoSolicitud = ({

    control_solicitud,
    get_values
}: IProps) => {

    // const { userinfo } = useSelector((state: AuthSlice) => state.auth);

    // const {  solicitudes} = useAppSelector((state: { solicitud_vivero: any; }) => state.solicitud_vivero);
    const [municipalities, set_municipalities] = useState<IList[]>([]);
    const text_choise_adapter: any = (dataArray: string[]) => {
        const data_new_format: IList[] = dataArray.map((dataOld) => ({
            label: dataOld[1],
            value: dataOld[0],
        }));
        return data_new_format;
    };
    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: municipalities_no_format } = await api.get(
                    'choices/municipios/'
                );

                const municipalities_format: IList[] = text_choise_adapter(
                    municipalities_no_format
                );

                set_municipalities(municipalities_format);
            } catch (err) {
                console.log(err);
            }
        };

        void get_selects_options();
    }, []);








    return (
        <>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Title title="Destino de los elementos"></Title>
                <Grid item xs={8} md={3} margin={2}>
                    <Controller
                        name="con_municipio_destino"
                        control={control_solicitud}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="Municipio"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                helperText={
                                    error != null
                                        ? 'Es obligatorio seleccionar metodo valoración'
                                        : 'seleccione el municipio'
                                }
                            >
                                {municipalities.map((option: IList) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={8} md={3} margin={2}>
                    <Controller
                        name="nombre_predio_destino"
                        control={control_solicitud}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Nombre del predio"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                helperText={
                                    error != null
                                        ? 'Es obligatorio seleccionar metodo valoración'
                                        : ''
                                }
                            >

                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={8} md={3} margin={2}>
                    <Controller
                        name="direccion_destino"
                        control={control_solicitud}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Dirección del predio"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                helperText={
                                    error != null
                                        ? 'Es obligatorio seleccionar metodo valoración'
                                        : ''
                                }
                            >

                            </TextField>
                        )}
                    />
                </Grid>

            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default DestinoSolicitud;


