import { Button, Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Title } from '../../../../components/Title';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import { useAppSelector } from '../../../../hooks';
import { useState } from 'react';




interface IProps {
    control_deposito: any;
    get_values: any;
    open_modal: boolean;
    set_open_modal: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DepositoInfo = ({ control_deposito, get_values, open_modal, set_open_modal }: IProps) => {
    const { deposito, current_deposito } = useAppSelector((state) => state.deposito);
    const [select_orden, set_select_orden] = useState(false);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_orden = () => {
        set_select_orden(true);
    };
    return (
        <>
            <Grid container spacing={2}>
                <Title title=" Deposito" />

                <Grid item xs={12} sm={6}>
                    <Controller
                        name="nombre_deposito"
                        control={control_deposito}
                        defaultValue=""
                        // rules={{ required: false }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error }
                        }) => (
                            <TextField
                                // margin="dense"
                                fullWidth
                                label="Nombre"
                                size="small"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    // //  console.log('')(e.target.value);
                                }}
                                error={!(error == null)}

                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Controller
                        name="identificacion_por_entidad"
                        control={control_deposito}
                        defaultValue=""
                        // rules={{ required: false }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error }
                        }) => (
                            <TextField
                                // margin="dense"
                                fullWidth
                                label="Identificación"
                                size="small"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    // //  console.log('')(e.target.value);
                                }}
                                error={!(error == null)}

                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="orden_ubicacion_por_entidad"
                        control={control_deposito}
                        defaultValue=""
                        // rules={{ required: false }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error }
                        }) => (
                            <TextField
                                // margin="dense"
                                fullWidth
                                label="Órden"
                                size="small"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => {
                                    onChange(e.target.value);

                                }}
                                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                                error={!!error}

                            />
                        )}
                    />
                </Grid>
                {current_deposito.id_deposito !== null &&
                    <>

                        <Grid item xs={12} sm={4}>
                            <Button
                                variant="contained"
                                onClick={handle_orden}
                                disabled={false}
                            >
                                Cambiar órden
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormSelectController
                                xs={12}
                                md={4}
                                control_form={control_deposito}
                                control_name={'orden_ubicacion_por_entidad'}
                                default_value=''
                                rules={{}}
                                label='Nuevo órden'
                                disabled={!select_orden}
                                helper_text=''
                                select_options={deposito}
                                option_label='orden_ubicacion_por_entidad'
                                option_key='orden_ubicacion_por_entidad'
                                multiple={false}
                                hidden_text={false}
                                auto_focus={false}
                            />
                        </Grid>

                    </>
                }
            </Grid>

        </>


    );
};

// eslint-disable-next-line no-restricted-syntax
export default DepositoInfo;




