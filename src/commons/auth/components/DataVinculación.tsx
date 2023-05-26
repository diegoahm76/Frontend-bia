import {
    useEffect,
    useState
} from "react";
import type { DatosVinculacionCormacarena } from "../../../interfaces/globalModels";
import { Divider, Grid, TextField } from "@mui/material";
import { Title } from "../../../components/Title";
import { control_error } from "../../../helpers";
import { consultar_vinculacion_persona } from "../../seguridad/request/Request";

interface Props {
    id_persona: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosVinculacion: React.FC<Props> = ({
    id_persona,
}: Props) => {

    const [datos_vinculacion, set_datos_vinculacion] = useState<DatosVinculacionCormacarena>();
    const [is_ver_datos_vinculacion, set_is_ver_datos_vinculacion] = useState(false);

    useEffect(() => {
        void get_datos_vinculación()
    }, [id_persona])

    // trae los datos de vinculacion de una persona
    const get_datos_vinculación = async (): Promise<void> => {
        set_is_ver_datos_vinculacion(false)
        try {
            const response = await consultar_vinculacion_persona(id_persona);
            set_datos_vinculacion(response)
            set_is_ver_datos_vinculacion(true)
        } catch (err) {
            control_error(err);
        }
    };

    return (
        <>
            {/* Datos de vinculación a cormacarena */}
            {(is_ver_datos_vinculacion) && (
                <>

                    <Grid item xs={12}>
                        <Title title="DATOS DE VINCULACIÓN ACTUAL A CORMACARENA" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Cargo Actual"
                            type="text"
                            fullWidth
                            size="small"
                            margin="dense"
                            autoFocus
                            disabled
                            value={datos_vinculacion?.cargo_actual}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Fecha de inicio"
                            type="text"
                            fullWidth
                            size="small"
                            margin="dense"
                            autoFocus
                            disabled
                            value={datos_vinculacion?.fecha_inicio_cargo_actual}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Fecha a finalizar"
                            type="text"
                            fullWidth
                            size="small"
                            margin="dense"
                            disabled
                            autoFocus
                            value={datos_vinculacion?.fecha_a_finalizar_cargo_actual}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Observaciones de la vinculación"
                            type="text"
                            fullWidth
                            size="small"
                            margin="dense"
                            autoFocus
                            disabled
                            multiline
                            value={datos_vinculacion?.observaciones_vinculacion_cargo_actual}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Cargo del organigrama actual"
                            type="text"
                            fullWidth
                            size="small"
                            margin="dense"
                            autoFocus
                            disabled
                            multiline
                            value={datos_vinculacion?.unidad_organizacional_actual}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Es unidad del organigrama actual"
                            type="text"
                            fullWidth
                            size="small"
                            margin="dense"
                            autoFocus
                            disabled
                            multiline
                            value={datos_vinculacion?.es_unidad_organizacional_actual}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Fecha de asignación"
                            type="text"
                            fullWidth
                            size="small"
                            margin="dense"
                            autoFocus
                            disabled
                            multiline
                            value={datos_vinculacion?.fecha_asignacion_unidad}
                        />
                    </Grid>
                </>
            )}
        </>
    );
};
