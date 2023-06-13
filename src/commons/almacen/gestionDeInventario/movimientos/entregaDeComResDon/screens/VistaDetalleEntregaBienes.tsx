/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from '@mui/material';
import { type Dispatch, type SetStateAction } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '../../../../../../hooks';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Title } from '../../../../../../components/Title';
interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    formulario_entrega: any,
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const VistaDetalleEntregaBienes = (props: IProps) => {
    const dispatch = useAppDispatch();
    const realizar_entrega = (): void => {

    }
    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Dialog
            fullWidth
            maxWidth="md"
            open={props.is_modal_active}
            onClose={() => { props.set_is_modal_active(false); }}
        >
            <DialogTitle>{"Detalle entrega de bienes de consumo a vivero"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
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
                        <Grid item md={12} xs={12}>
                            <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Número entrega"
                                            type={'number'}
                                            size="small"
                                            fullWidth
                                            // value={props.formulario_entrega.numero_entrega}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Stack
                                            direction="row"
                                            justifyContent="flex-end"
                                        >
                                            <Grid item xs={12} sm={6}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Fecha entrada"
                                                        value={null}
                                                        onChange={() => { }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                size="small"
                                                                {...params}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
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
                <Grid item md={12} xs={12}>
                    <Title title="Documento de entrada" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Número"
                                    type={'number'}
                                    size="small"
                                    fullWidth
                                    // value={props.formulario_entrega.numero_documento}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tipo"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    // value={props.formulario_entrega.tipo}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
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
                <Grid item md={12} xs={12}>
                    <Title title="Bienes de consumo solicitables por vivero" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color='inherit'
                    variant='contained'
                    startIcon={<ClearIcon />}
                    onClick={() => { props.set_is_modal_active(false); }}>Cancelar</Button>
                <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SaveIcon />}
                    onClick={realizar_entrega}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}
// eslint-disable-next-line no-restricted-syntax
export default VistaDetalleEntregaBienes;