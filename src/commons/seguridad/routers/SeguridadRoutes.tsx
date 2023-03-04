import { Navigate, Route, Routes } from "react-router-dom"
import { RolScreen } from "../screen/RolScreen"


// eslint-disable-next-line @typescript-eslint/naming-convention
export  const SeguridadRoutes: React.FC =() => {
  return (
    <Routes>
        <Route path="/" element = {<RolScreen/>  }/>
        <Route path ="/*" element ={<Navigate to={'/'}/> }/>    
    </Routes>


  )
}
