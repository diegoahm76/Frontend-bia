/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../../../hooks';

//? icons necesario para los botones de acciones de pqrsdf
import DevicesIcon from '@mui/icons-material/Devices';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';

// ? icons necesarios para los botones de acciones de tramites y servicios
import BalanceIcon from '@mui/icons-material/Balance';

//* todos inicialmente deben tener el disabled en true ya que sobre todos los elementos no se puede permitir ciertas acciones dependiendo lo que incluye el elemento
const actionsPQRSDF: any[] = [
  {
    id: 'Dig',
    icon: <DevicesIcon />,
    name: 'Enviar solicitud de digitalización',
    path: '',
    disabled: false,
  },
  {
    id: 'AsigPer',
    icon: <PersonAddIcon />,
    name: 'Enviar solicitud al usuario',
    path: '/app/gestor_documental/panel_ventanilla/asignar_a_usario',
    disabled: false,
  },
  {
    id: 'AsigGrup',
    icon: <GroupsIcon />,
    name: 'Asignar al grupo',
    path: '/app/gestor_documental/panel_ventanilla/asignar_a_grupo',
    disabled: true,
  },
  {
    id: 'ContinuarAsigGrup',
    icon: <ReduceCapacityIcon />,
    name: 'Continuar con asignación de grupo',
    path: '',
    disabled: true,
  },
];

const actionsTramitesYServicios: any[] = [
  {
    id: 'Jurídica',
    icon: <BalanceIcon />,
    name: 'Revisión jurídica',
    path: '', // pendiente por definir
    disabled: false,
  },
  {
    id: 'AsigGrup',
    icon: <GroupsIcon />,
    name: 'Asignar al grupo y generación de expediente',
    path: '', // pendiente por definir
    disabled: false,
  },
  {
    id: 'Dig',
    icon: <DevicesIcon />,
    name: 'Enviar solicitud de digitalización',
    path: '', // pendiente por definir
    disabled: false,
  },
];

const initialState: any = {
  // ? valores para los botones (acciones) que se ejercen dentro de panel de ventanilla
  //* acciones de los botones (tambien se deberán configurar los botones para pqrsdf, trámites y servicios y otros)
  actions: actionsPQRSDF,
  actionsTramitesYServicios,
  currentElementPqrsdComplementoTramitesYotros: null,
  listaElementosPqrsfTramitesUotros: [],
  listaComplementosRequerimientosOtros: [],
};

export const PanelVentanillaSlice = createSlice({
  name: 'PanelVentanillaSlice',
  initialState,
  reducers: {
    //* este es editor de actions inicial de los botones, se deberá también definir los de tramites y servicios y otros
    setActionssToManagePermissions: (state, action: PayloadAction<any>) => {
      state.actions = action.payload;
    },

    // ? set pqrsdf tras búsqueda
    setListaElementosPqrsfTramitesUotrosBusqueda: (
      state,
      action: PayloadAction<any>
    ) => {
      state.listaElementosPqrsfTramitesUotros = action.payload;
    },

    setListaElementosComplementosRequerimientosOtros: (
      state,
      action: PayloadAction<any>
    ) => {
      state.listaComplementosRequerimientosOtros = action.payload;
    },

    // ? actualizador del elemento actual de pqrsd complemento
    setCurrentElementPqrsdComplementoTramitesYotros: (
      state,
      action: PayloadAction<any>
    ) => {
      state.currentElementPqrsdComplementoTramitesYotros = action.payload;
    },
    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    resetPanelVentanillaFull: (state) => {
      state.currentElementPqrsdComplementoTramitesYotros = null;
      state.listaElementosPqrsfTramitesUotros = [];
      state.listaComplementosRequerimientosOtros = [];
    },
  },
});

export const {
  // ? acciones sobre lo botones del panel de ventanilla
  setActionssToManagePermissions,
  // ? acciones sobre lista de elementos de pqrsdf, trámites y servicios y otros
  setListaElementosPqrsfTramitesUotrosBusqueda,
  // ? acciones sobre lista de complementos, derequerimientos y otros
  setListaElementosComplementosRequerimientosOtros,
  // ? acciones sobre la visualización de los elementos de pqrsd complemento
  setCurrentElementPqrsdComplementoTramitesYotros,
  // ? reset de todos los estados del slice
  resetPanelVentanillaFull,
} = PanelVentanillaSlice.actions;
