import { Navigate, Route, Routes } from 'react-router-dom';
import { CatalogodeBienesScreen} from '../screen/CatalogodeBienesScreen';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntradaysalidArticulosRoutes: React.FC= () =>{
    return (
    <Routes>
      <Route
        path="catalogo-bienes"
        element={<CatalogodeBienesScreen />}
      />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
    )
}
