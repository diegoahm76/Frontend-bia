
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Icv, type IcvArtivlesComputers, type IcvComputers, type IcvMaintenance } from "../../interfaces/CvComputo";

const initial_state: Icv = {
    cv_articles: [],
    cv_computers: null,
    cv_maintenance: [],

};

export const cv_computo_slice = createSlice({
    name: "cv",
    initialState: initial_state,
    reducers: {
               
        get_cv_computers: (
            state: Icv, 
            action: PayloadAction<IcvComputers | null>
            ) => {
            state.cv_computers = action.payload;
        },
        get_cv_maintenance: (
            state: Icv, 
            action: PayloadAction<IcvMaintenance[]>
            ) => {
            state.cv_maintenance = action.payload;
        },
        get_cv_articles: (
            state: Icv, 
            action: PayloadAction<IcvArtivlesComputers[]>
            ) => {
            state.cv_articles = action.payload;
        },
    }
})

export const {  get_cv_computers, get_cv_maintenance, get_cv_articles } = cv_computo_slice.actions;

