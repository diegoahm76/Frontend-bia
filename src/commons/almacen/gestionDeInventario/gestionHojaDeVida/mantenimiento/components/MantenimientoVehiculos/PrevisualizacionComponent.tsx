import { Box } from "@mui/material"
import { type row } from "../../interfaces/IProps";
import { TablaGeneral } from './../../../../../../../components/TablaGeneral'

interface IProps {
    data_grid: row[]
}
// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const PrevisualizacionComponent:React.FC<IProps> = ({data_grid}) => {
    const columns = [
        { field: "id", header: "Id", visible: false },
        { field: "codigo", header: "Codigo", visible: true },
        { field: "serial_placa", header: "Serial/placa", visible: true },
        { field: "kilometraje", header: "Kilometraje", visible: true },
        { field: "fecha", header: "Fecha", visible: true },
        { field: "tipo_mantenimiento", header: "Tipo de mantenimiento", visible: true }
      ];

  return (
    <>
        <Box sx={{ width: '100%', mt: '20px'}}>
            <div className="App">
                <TablaGeneral
                    showButtonExport
                    tittle={'Productos'}
                    columns={columns}
                    rowsData={data_grid}
                    staticscroll={true}
                    stylescroll={"780px"}
                />
            </div>
        </Box>
    </>
  )
}

