import { Box } from "@mui/material"
import { useEffect, useState } from "react";
import { type crear_mantenimiento } from "../../interfaces/IProps";
import { TablaGeneral } from '../../../../../../../components/TablaGeneral/TablaGeneral'

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
        // { field: "id_articulo", header: "Id", visible: true },
        {
          field: 'cod_tipo_mantenimiento',
          header: 'Tipo de mantenimiento',
          visible: true,
          renderCell: (row: any) => {
            switch (row.cod_tipo_mantenimiento) {
              case 'C':
                return 'Correctivo';
              case 'P':
                return 'Preventivo';
              default:
                return row.cod_tipo_mantenimiento;
            }
          },
        },
        { field: 'doc_identificador_nro', header: 'Placa', visible: true },
        {
          field: 'kilometraje_programado',
          header: 'Kilometraje',
          visible: true,
          renderCell: (row: any) =>
            row.kilometraje_programado ? row.kilometraje_programado + ' km' : 'N/A',
        },
        { field: 'fecha_programada', header: 'Fecha', visible: true },
        {
          field: 'tipo_programacion',
          header: 'Tipo de programación',
          visible: true,
        },
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

