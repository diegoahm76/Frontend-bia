import { Route, Routes, Navigate } from 'react-router-dom';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const LiquidacionTUARoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='ejemplo'/>
        <Route path='/*' element={<Navigate to={'/'} />}/>
    </Routes>
  )
}
