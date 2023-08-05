import { Grid, Box } from "@mui/material";
import { Title } from "../../../../components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
interface IProps{
    analitica: any[];
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResultadosBusqueda: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <Title title="Resultados de búsqueda" />
            <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <div className="card">
                            <DataTable
                                value={props.analitica}
                                sortField="nombre_vivero"
                                stripedRows
                                paginator
                                rows={5}
                                scrollable scrollHeight="flex"
                                tableStyle={{ minWidth: '90rem' }}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                            >
                                <Column
                                    field="nombre_vivero"
                                    header="Vivero"
                                    style={{ width: '15%' }}
                                ></Column>
                                <Column
                                    field="nombre_bien"
                                    header="Bien"
                                    style={{ width: '15%' }}
                                ></Column>
                                <Column
                                    field="tipo_bien"
                                    header="Tipo bien"
                                    style={{ width: '10%' }}
                                ></Column>
                                <Column
                                    field="cantidad_existente"
                                    header="Cant. existente"
                                    style={{ width: '10%' }}
                                ></Column>
                                <Column
                                    field="cantidad_cuarentena"
                                    header="En cuarentena"
                                    style={{ width: '10%' }}
                                ></Column>
                                <Column
                                    field="etapa_lote"
                                    header="Etapa lote"
                                    style={{ width: '10%' }}
                                ></Column>
                                <Column
                                    field="nro_lote"
                                    header="Nº del lote"
                                    style={{ width: '10%' }}
                                ></Column>
                                <Column
                                    field="agno_lote"
                                    header="Año del lote"
                                    style={{ width: '10%' }}
                                ></Column>
                            </DataTable>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}