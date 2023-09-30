import { useEffect, useState } from 'react';
import { api } from '../../../../../../api/axios';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../../auth/interfaces';

import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';

import { ICoordonadorVivero, type IObjFuncionario } from '../../interfaces/solicitudBienConsumo';
import { get_coordinador_actual, get_funcionario_document_service, get_funcionario_service, get_person_id_service } from '../../store/solicitudBienConsumoThunks';
import { set_coordinador_vivero, set_current_funcionario, set_funcionarios } from '../../store/slices/indexSolicitudBienesConsumo';
import { Title } from '../../../../../../components/Title';
import FormInputController from '../../../../../../components/partials/form/FormInputController';

interface IProps {
    title?: string;
    get_values_solicitud: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FuncionarioResponsableCoordinador = ({
    title,
    get_values_solicitud

}: IProps) => {

    const dispatch = useAppDispatch();

    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_coordinador, reset: reset_persona, getValues: get_values, watch } = useForm<ICoordonadorVivero>();
    const { coordinador_vivero } = useAppSelector((state) => state.solic_consumo);





    useEffect(() => {

        void dispatch(get_coordinador_actual())

    }, []);


    useEffect(() => {
        reset_persona(coordinador_vivero)
    }, [coordinador_vivero]);



    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}
            >




                <Title title="FUNCIONARIO RESPONSABLE" />



                <Grid container spacing={2} marginTop={2}>
                    <FormInputController
                        xs={12}
                        md={6}
                        margin={0}
                        control_form={control_coordinador}
                        control_name="nombre_completo"
                        default_value={''}
                        rules={{}}
                        type="text"
                        disabled={true}
                        helper_text=""
                        hidden_text={null}
                        label={"Nombre del coordinador del vivero"}
                    />
                    <FormInputController
                        xs={12}
                        md={6}
                        margin={0}
                        control_form={control_coordinador}
                        control_name="nombre_unidad_organizacional_actual"
                        default_value={''}
                        rules={{}}
                        type="text"
                        disabled={true}
                        helper_text=""
                        hidden_text={null}
                        label={"Unidad a la que pertenece:"}
                    />
                </Grid>



            </Grid>

        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default FuncionarioResponsableCoordinador;