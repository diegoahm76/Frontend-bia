import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { CatalogodeBienesScreen} from '../screen/CatalogodeBienesScreen';
import {CreacionArticulosFijosForm} from '../components/CrearArticulosFijosForm'


// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntradaysalidArticulosRoutes: React.FC= () =>{
    return (
    <Routes>
      <Route
        path="catalogo_bienes"
        element={<CatalogodeBienesScreen />}
      />
      <Route
        path="crear-articulo-fijos"
        element={<CreacionArticulosFijosForm />}
      />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    )
}
