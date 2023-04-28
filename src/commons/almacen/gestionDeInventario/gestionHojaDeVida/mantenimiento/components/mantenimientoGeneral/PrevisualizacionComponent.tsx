import { Box } from "@mui/material"
import { useEffect, useState } from "react";
import { type crear_mantenimiento } from "../../interfaces/IProps";
import { TablaGeneral } from './../../../../../../../components/TablaGeneral'

interface IProps {
    data_grid: crear_mantenimiento[],
    limpiar_formulario: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrevisualizacionComponent: React.FC<IProps> = ({ data_grid, limpiar_formulario }: IProps) => {
    const [data_previsualizacion, set_data_previsualizacion] = useState<crear_mantenimiento[]>([]);
    useEffect(() => {
        for (let m = 0; m < data_grid.length; m++) {
            set_data_previsualizacion(prevArray => [...prevArray, data_grid[m]])
        }
    }, [data_grid]);

    useEffect(() => {
        if (limpiar_formulario)
            set_data_previsualizacion([]);
    }, [limpiar_formulario]);

    const columns = [
        { field: "id_articulo", header: "Id", visible: false },
        { field: "cod_tipo_mantenimiento", header: "Codigo", visible: true },
        { field: "serial_placa", header: "Serial", visible: true },
        { field: "fecha_programada", header: "Fecha", visible: true },
        { field: "cod_tipo_mantenimiento", header: "Tipo de mantenimiento", visible: true }
    ];

    return (
        <>
            <Box sx={{ width: '100%', mt: '20px' }}>
                <div className="App">
                    <TablaGeneral
                        showButtonExport
                        tittle={'Productos'}
                        columns={columns}
                        rowsData={data_previsualizacion}
                        staticscroll={true}
                        stylescroll={"780px"}
                    />
                </div>
            </Box>
        </>
    )
}

