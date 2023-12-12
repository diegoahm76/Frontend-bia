import { Route, Routes } from 'react-router-dom';
import { PlanesRoutes } from '../Planes/router/PlanesRoutes';
import { Page404 } from '../../../screens/404';
import { ConfiguracionesBasicasRoutes } from '../configuraciones/Routes/ConfiguracionesBasicasRoutes';
import { EjeEstretegicoRoutes } from '../EjeEstrategico/router/EjeEstretegicoRoutes';
import { ObjetivosRoutes } from '../Objetivos/router/ObjetivosRoutes';
import { ProgramasRoutes } from '../Programas/router/ProgramasRoutes';
import { ProyectosRoutes } from '../Proyectos/router/ProyectosRoutes';
import { ProductosRoutes } from '../Productos/router/ProductosRoutes';
import { ActividadesRoutes } from '../Actividades/router/ActividadesRoutes';
import { IndicadoresRoutes } from '../Indicadores/router/IndicadoresRoutes';
import { MetasRoutes } from '../MetasPorIndicador/router/MetasRoutes';
import { RubrosRoutes } from '../Rubro/Rubro/router/RubrosRoutes';
import { SubProgramasRoutes } from '../Subprogramas/router/SubProgramasRoutes';
import { FuentesFinanciacionRoutes } from '../FinanciaciónIndicadores/router/FuentesFinanciacionRoutes';
import { DetalleInversionRoutes } from '../DetalleInversionCuentas/router/DetalleInversionRoutes';
import { ConceptoPOAIRoutes } from '../ConceptoPOAI/router/ConceptoPOAIRoutes';
import { FuentesRoutes } from '../FuenteFinanciacion/router/FuentesFinanciacionRoutes';
import { BancosRoutes } from '../BancoProyecto/router/BancosRoutes';
import { PlanAdquisicionesRoutes } from '../PlanAnualAdquisiciones/router/PlanAdquisicionesRoutes';
import { SeguimientoPAIRoutes } from '../SeguimientoPAI/router/SeguimientoPAIRoutes';

const routes = [
  {
    path: 'informacion/', // * Planes
    name: 'informacion',
    component: () => <PlanesRoutes />,
  },
  {
    path: 'eje/', // eje estrategico
    name: 'eje',
    component: () => <EjeEstretegicoRoutes />,
  },
  {
    path: 'configuraciones_basicas/',
    name: 'configuraciones_basicas',
    component: () => <ConfiguracionesBasicasRoutes />,
  },
  {
    path: 'objetivos/',
    name: 'objetivos',
    component: () => <ObjetivosRoutes />,
  },
  {
    path: 'programas/',
    name: 'programas',
    component: () => <ProgramasRoutes />,
  },
  {
    path: 'proyectos/',
    name: 'proyectos',
    component: () => <ProyectosRoutes />,
  },
  {
    path: 'productos/',
    name: 'productos',
    component: () => <ProductosRoutes />,
  },
  {
    path: 'actividades/',
    name: 'actividades',
    component: () => <ActividadesRoutes />,
  },
  {
    path: 'indicadores/',
    name: 'indicadores',
    component: () => <IndicadoresRoutes />,
  },
  // metas por indicador
  {
    path: 'metas/',
    name: 'metas',
    component: () => <MetasRoutes />,
  },
  // rubros
  {
    path: 'rubros/',
    name: 'rubros',
    component: () => <RubrosRoutes />,
  },
  // subprogramas
  {
    path: 'subprogramas/',
    name: 'subprogramas',
    component: () => <SubProgramasRoutes />,
  },
  // Fuentes de financiacion
  {
    path: 'fuentes_financiacion/',
    name: 'fuentes_financiacion',
    component: () => <FuentesFinanciacionRoutes />,
  },
  // Detalle de inversion cuentas
  {
    path: 'detalle_inversion/',
    name: 'detalle_inversion',
    component: () => <DetalleInversionRoutes />,
  },
  // Concepto POAI
  {
    path: 'poai/',
    name: 'poai',
    component: () => <ConceptoPOAIRoutes />,
  },
  // * Fuentes de financiacion poai
  {
    path: 'fuentes/',
    name: 'fuentes',
    component: () => <FuentesRoutes />,
  },
  // bancos
  {
    path: 'banco/',
    name: 'banco',
    component: () => <BancosRoutes />,
  },
  // PlanAdquisicionesRoutes
  {
    path: 'plan_anual/',
    name: 'plan_anual',
    component: () => <PlanAdquisicionesRoutes />,
  },
  // SeguimientoPAIRoutes
  {
    path: 'seguimiento/',
    name: 'seguimiento',
    component: () => <SeguimientoPAIRoutes />,
  },
  {
    path: '/*',
    name: '404',
    component: () => <Page404 />,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguimientoPlanesRoutes: React.FC = () => {
  return (
    // <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={`${route.path}/${route.path === '/' ? '' : '*'}`}
          element={route.component()}
        />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
    // </Suspense>
  );
};
