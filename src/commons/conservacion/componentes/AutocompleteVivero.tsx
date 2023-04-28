import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { type IObjNursery } from "../gestorVivero/interfaces/vivero";
import { get_nurseries_service, get_nursery_service } from '../gestorVivero/store/thunks/gestorViveroThunks';
import { type Dispatch, type SetStateAction } from 'react';


interface IProps {
    set_value: Dispatch<SetStateAction<IObjNursery | null>>;
    value: IObjNursery | null;
    id?: string | number | null
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AutocompleteVivero = ({
    set_value,
    value,
    id
}: IProps) => {
    const { nurseries, current_nursery } = useAppSelector((state) => state.nursery);
    const dispatch = useAppDispatch();
    const default_props = {
        options: nurseries,
        getOptionLabel: (option: IObjNursery) => option.nombre
    };
    useEffect(() => {
        void dispatch(get_nurseries_service());
        if (id !== null && id !== undefined) {
            void dispatch(get_nursery_service(id))
        } else (
            set_value(current_nursery)
        )
    }, []);

    useEffect(() => {
        set_value({ ...current_nursery, justificacion_apertura: "", justificacion_cierre: "" })
    }, [current_nursery]);

    return (
        <Stack spacing={1} sx={{ width: 400 }}>
            <Autocomplete
                {...default_props}
                id="controlled-vivero"
                value={value}
                onChange={(event: any, newValue: IObjNursery | null) => {
                    set_value(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Seleccione vivero..." />
                )}
            />
        </Stack>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default AutocompleteVivero;