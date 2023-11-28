import { Grid, Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch } from "../../../../../hooks";
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { Title } from "../../../../../components/Title";
import ConcederAccesoDocumento from "../../ConcesionAcceso/screens/ConcederAccesoDocumento";
dayjs.extend(dayOfYear);
interface IProps {
    expediente: any,
    documento: any
  }
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocumentosExpediente: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [documento, set_documento] = useState<any>(null);
    const [abrir_modal_conceder, set_abrir_modal_conceder] = useState<boolean>(false);

    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Documentos de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            Documentos de expedientes
                        </Grid>
                        <Grid item xs={12} sm={4}>
                    <Box
                        component="form"
                        sx={{ mt: '20px', mb: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            spacing={2}
                            sx={{ mt: '20px' }}
                        >
                            <Button
                                color='primary'
                                variant='outlined'
                                startIcon={<ListOutlinedIcon />}
                                onClick={() => { set_abrir_modal_conceder(true); }}
                            >
                                Conceder acceso a documento
                            </Button>
                            {abrir_modal_conceder && <ConcederAccesoDocumento is_modal_active={abrir_modal_conceder} set_is_modal_active={set_abrir_modal_conceder} documento={documento} ></ConcederAccesoDocumento>}
                        </Stack>
                    </Box>
                </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}