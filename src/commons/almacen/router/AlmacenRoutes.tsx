import { Route, Routes } from "react-router-dom"
import { ConfiguracionRoutes } from "../configuracion/routes/ConfiguracionRoutes"

export const AlmacenRoutes: React.FC = () => {
    return <Routes>
        <Route path='configuracion/*' element={<ConfiguracionRoutes />}/>
    </Routes>
}