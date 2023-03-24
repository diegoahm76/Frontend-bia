import { Route, Routes } from "react-router-dom"
import { ProgramacionMantenientoScreen } from "../mantenimiento/screens/ProgramacionMantenientoScreen"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionHojaDeVidaRoutes:React.FC = () => {
  return (
    <Routes>
      <Route 
        path="mantenimiento/*"
        element={<ProgramacionMantenientoScreen />}
      />
    </Routes>
  )
}
