import { Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Title } from '../../../../components/Title';




interface IProps {
    control_deposito: any;
    get_values: any;
    open_modal: boolean;
    set_open_modal: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DepositoInfo = ({ control_deposito, get_values, open_modal, set_open_modal }: IProps) => {


    return (
        <>
            <Grid container spacing={2}>
                <Title title="DEPOSITO" />

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
                                    // console.log(e.target.value);
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
                                    // console.log(e.target.value);
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




            </Grid>

        </>


    );
};

// eslint-disable-next-line no-restricted-syntax
export default DepositoInfo;




