import { useEffect, useState } from 'react';
import type { DataPersonas, } from "../../../../interfaces/globalModels";
import {
    Button, Grid, Stack, TextField,
} from "@mui/material";
import { Title } from "../../../../components/Title";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DialogRepresentanteLegal } from "../DialogCambioRepresentanteLegal";
import { DialogHistoricoRepresentanteLegal } from '../HistoricoRepresentanteLegal';
import type { PropsDatosRepresentanteLegal } from './types';
import { get_datos_representante_legal } from '../Services/api.services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosRepresentanteLegal: React.FC<PropsDatosRepresentanteLegal> = ({
    id_persona = 0,
}: PropsDatosRepresentanteLegal) => {

    const [datos_persona, set_datos_persona] = useState<DataPersonas>();
    const [is_modal_active, set_is_modal_active] = useState(false);
    const [datos_representante, set_datos_representante] = useState<DataPersonas>({
        id_persona: 0,
        nombre_unidad_organizacional_actual: '',
        tiene_usuario: false,
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        tipo_persona: '',
        numero_documento: '',
        digito_verificacion: '',
        nombre_comercial: '',
        razon_social: '',
        pais_residencia: '',
        municipio_residencia: '',
        direccion_residencia: '',
        direccion_residencia_ref: '',
        ubicacion_georeferenciada: '',
        direccion_laboral: '',
        direccion_notificaciones: '',
        pais_nacimiento: '',
        fecha_nacimiento: '',
        sexo: '',
        fecha_asignacion_unidad: '',
        es_unidad_organizacional_actual: '',
        email: '',
        email_empresarial: '',
        telefono_fijo_residencial: '',
        telefono_celular: '',
        telefono_empresa: '',
        cod_municipio_laboral_nal: '',
        cod_municipio_notificacion_nal: '',
        telefono_celular_empresa: '',
        telefono_empresa_2: '',
        cod_pais_nacionalidad_empresa: '',
        acepta_notificacion_sms: false,
        acepta_notificacion_email: false,
        acepta_tratamiento_datos: false,
        cod_naturaleza_empresa: '',
        direccion_notificacion_referencia: '',
        fecha_cambio_representante_legal: '',
        fecha_inicio_cargo_rep_legal: '',
        fecha_inicio_cargo_actual: '',
        fecha_a_finalizar_cargo_actual: '',
        observaciones_vinculacion_cargo_actual: '',
        fecha_ultim_actualizacion_autorizaciones: '',
        fecha_creacion: '',
        fecha_ultim_actualiz_diferente_crea: '',
        tipo_documento: '',
        estado_civil: '',
        id_cargo: 0,
        id_unidad_organizacional_actual: 0,
        representante_legal: 0,
        cod_municipio_expedicion_id: '',
        id_persona_crea: 0,
        id_persona_ultim_actualiz_diferente_crea: 0,
        cod_departamento_expedicion: '',
        cod_departamento_residencia: '',
        cod_departamento_notificacion: '',
        cod_departamento_laboral: '',
    });
    const result_representante = (result_representante_datalle: DataPersonas): void => {
        set_datos_representante({
            ...datos_representante,
            id_persona: result_representante_datalle.id_persona,
            nombre_unidad_organizacional_actual: result_representante_datalle.nombre_unidad_organizacional_actual,
            tiene_usuario: result_representante_datalle.tiene_usuario,
            primer_nombre: result_representante_datalle.primer_nombre,
            segundo_nombre: result_representante_datalle.segundo_nombre,
            primer_apellido: result_representante_datalle.primer_apellido,
            segundo_apellido: result_representante_datalle.segundo_apellido,
            tipo_persona: result_representante_datalle.tipo_persona,
            numero_documento: result_representante_datalle.numero_documento,
            digito_verificacion: result_representante_datalle.digito_verificacion,
            nombre_comercial: result_representante_datalle.nombre_comercial,
            razon_social: result_representante_datalle.razon_social,
            pais_residencia: result_representante_datalle.pais_residencia,
            municipio_residencia: result_representante_datalle.municipio_residencia,
            direccion_residencia: result_representante_datalle.direccion_residencia,
            direccion_residencia_ref: result_representante_datalle.direccion_residencia_ref,
            ubicacion_georeferenciada: result_representante_datalle.ubicacion_georeferenciada,
            direccion_laboral: result_representante_datalle.direccion_laboral,
            direccion_notificaciones: result_representante_datalle.direccion_notificaciones,
            pais_nacimiento: result_representante_datalle.pais_nacimiento,
            fecha_nacimiento: result_representante_datalle.fecha_nacimiento,
            sexo: result_representante_datalle.sexo,
            fecha_asignacion_unidad: result_representante_datalle.fecha_asignacion_unidad,
            es_unidad_organizacional_actual: result_representante_datalle.es_unidad_organizacional_actual,
            email: result_representante_datalle.email,
            email_empresarial: result_representante_datalle.email_empresarial,
            telefono_fijo_residencial: result_representante_datalle.telefono_fijo_residencial,
            telefono_celular: result_representante_datalle.telefono_celular,
            telefono_empresa: result_representante_datalle.telefono_empresa,
            cod_municipio_laboral_nal: result_representante_datalle.cod_municipio_laboral_nal,
            cod_municipio_notificacion_nal: result_representante_datalle.cod_municipio_notificacion_nal,
            telefono_celular_empresa: result_representante_datalle.telefono_celular_empresa,
            telefono_empresa_2: result_representante_datalle.telefono_empresa_2,
            cod_pais_nacionalidad_empresa: result_representante_datalle.cod_pais_nacionalidad_empresa,
            acepta_notificacion_sms: result_representante_datalle.acepta_notificacion_sms,
            acepta_notificacion_email: result_representante_datalle.acepta_notificacion_email,
            acepta_tratamiento_datos: result_representante_datalle.acepta_tratamiento_datos,
            cod_naturaleza_empresa: result_representante_datalle.cod_naturaleza_empresa,
            direccion_notificacion_referencia: result_representante_datalle.direccion_notificacion_referencia,
            fecha_cambio_representante_legal: result_representante_datalle.fecha_cambio_representante_legal,
            fecha_inicio_cargo_rep_legal: result_representante_datalle.fecha_inicio_cargo_rep_legal,
            fecha_inicio_cargo_actual: result_representante_datalle.fecha_inicio_cargo_actual,
            fecha_a_finalizar_cargo_actual: result_representante_datalle.fecha_a_finalizar_cargo_actual,
            observaciones_vinculacion_cargo_actual: result_representante_datalle.observaciones_vinculacion_cargo_actual,
            fecha_ultim_actualizacion_autorizaciones: result_representante_datalle.fecha_ultim_actualizacion_autorizaciones,
            fecha_creacion: result_representante_datalle.fecha_creacion,
            fecha_ultim_actualiz_diferente_crea: result_representante_datalle.fecha_ultim_actualiz_diferente_crea,
            tipo_documento: result_representante_datalle.fecha_ultim_actualiz_diferente_crea,
            estado_civil: result_representante_datalle.estado_civil,
            id_cargo: result_representante_datalle.id_cargo,
            id_unidad_organizacional_actual: result_representante_datalle.id_unidad_organizacional_actual,
            representante_legal: result_representante_datalle.representante_legal,
            cod_municipio_expedicion_id: result_representante_datalle.cod_municipio_expedicion_id,
            id_persona_crea: result_representante_datalle.id_persona_crea,
            id_persona_ultim_actualiz_diferente_crea: result_representante_datalle.id_persona_ultim_actualiz_diferente_crea,
            cod_departamento_expedicion: result_representante_datalle.cod_departamento_expedicion,
            cod_departamento_residencia: result_representante_datalle.cod_departamento_residencia,
            cod_departamento_notificacion: result_representante_datalle.cod_departamento_notificacion,
            cod_departamento_laboral: result_representante_datalle.cod_departamento_laboral,
        })
    };
    const handle_open_historico_representante = (): void => {
        set_is_modal_active(true);
    };

    useEffect(() => {
        void get_datos_representante_legal(id_persona, set_datos_persona)
    }, [])

    return (
        <>
            <Grid item xs={12} spacing={2}>
                <form>
                    <Grid container spacing={2}>
                        {/* datos de representante legal */}
                        <>
                            <Grid item xs={12}>
                                <Title title="DATOS DEL REPRESENTANTE LEGAL" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tipo de Documento"
                                    id="tipo-doc-representante"
                                    select
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    disabled
                                    defaultValue={datos_representante?.tipo_documento}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Número Identificación"
                                    id="documento_representante"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    defaultValue={datos_representante?.numero_documento}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Representante Legal"
                                    type="text"
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    value={datos_persona?.primer_nombre}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size="small"
                                    label="Dirección"
                                    disabled
                                    required
                                    autoFocus
                                    defaultValue={datos_representante?.direccion_notificaciones}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size="small"
                                    label="Telefono"
                                    disabled
                                    required
                                    autoFocus
                                    defaultValue={datos_representante?.telefono_celular}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tipo de Documento"
                                    id="tipo-doc-representante"
                                    select
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    disabled
                                    defaultValue={datos_representante?.cod_municipio_notificacion_nal}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    size="small"
                                    label="E-mail"
                                    disabled
                                    required
                                    autoFocus
                                    defaultValue={datos_representante?.email_empresarial}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    label="Tipo de Documento"
                                    id="tipo-doc-representante"
                                    select
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    disabled
                                    defaultValue={datos_representante?.fecha_inicio_cargo_rep_legal}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack
                                    justifyContent="flex-end"
                                    sx={{ m: '0 0 0 0' }}
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button
                                        variant="outlined"
                                        startIcon={<RemoveRedEyeIcon />}
                                        onClick={() => {
                                            handle_open_historico_representante();
                                        }}
                                    >
                                        Historico Representante Legal
                                    </Button>

                                    <DialogRepresentanteLegal
                                        onResult={result_representante}
                                    />
                                </Stack>
                            </Grid>
                        </>
                    </Grid>
                </form>
            </Grid>
            <DialogHistoricoRepresentanteLegal
                is_modal_active={is_modal_active}
                set_is_modal_active={set_is_modal_active}
                id_persona={id_persona}
            />
        </>
    );
};
