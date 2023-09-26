import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IArchivoFisico, IObjDepositos, IObjEstantes } from '../../interface/archivoFisico';


const initial_state: IArchivoFisico = {
    depositos: [],
    estantes: [],


};


export const archivo_fisico_slice = createSlice({
    name: 'archivo_fisico',
    initialState: initial_state,
    reducers: {

        set_depositos: (
            state: IArchivoFisico,
            action: PayloadAction<IObjDepositos[]>
        ) => {
            state.depositos = action.payload;
        },
        set_estantes: (
            state: IArchivoFisico,
            action: PayloadAction<IObjEstantes[]>
        ) => {
            state.estantes = action.payload;
        },

    },
});
export const {
    set_depositos,

} = archivo_fisico_slice.actions;
