/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Dialog, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Title } from "../../../../../components/Title";
import { DownloadButton } from "../../../../../utils/DownloadButton/DownLoadButton";


interface ModalVerRequerimientoTramiteProps {
    data: any;
    onClose: () => void;
}


export const ModalVerRequerimientoTramite: React.FC<ModalVerRequerimientoTramiteProps> = ({ data, onClose }: ModalVerRequerimientoTramiteProps) => {

    const id = data || "";


    return (
        <Dialog open={true} fullWidth maxWidth="xl" onClose={() => { onClose() }}>
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
                <Grid item xs={12}>
                    <Title title="Ver Requerimiento" />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        disabled
                        value={"445525855-2023"}
                        label="Radicado del Requerimiento"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        value={"2024/12/1"}
                        disabled
                        label="Fecha del Requerimiento"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        value={"2024/12/1"}
                        disabled
                        label="Plazo de Entrega"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        disabled
                        value={"juan pedro ardila"}
                        label="Funcionario que Requiere"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12}>
                    <TextField
                        style={{ marginTop: 25, width: '100%' }}
                        label={`Observacion`}
                        id="description"
                        value={"Esto te permitirá mantener el valor del switch en el estado local switchValue. Si necesitas enviar este valor"}
                        name="observacion"
                        multiline
                        rows={2}

                    // error={emailMismatch}
                    // helperText={emailMismatch ? "El campo de observaciones esta vacio " : ""}
                    />
                </Grid>

                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={4} style={{ marginTop: 15 }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            disabled
                            value={"juan pedro ardila"}
                            label="Funcionario que Requiere"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={1} style={{ marginTop: 15 }}>
                        <DownloadButton
                            fileUrl={"as"}
                            fileName={'exhibit_link'}
                            condition={false}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            startIcon={<ClearIcon />}
                            fullWidth
                            style={{ width: "90%", marginTop: 15 }}
                            variant="contained"
                            color="error"
                            onClick={() => { onClose() }}
                        >
                            Salir
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Dialog >
    );
};

