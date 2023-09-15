/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box, Button, Stack } from "@mui/material";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Title } from "../../../../components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
interface IProps {
    analitica: any[];
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResultadosBusqueda: React.FC<IProps> = (props: IProps) => {
    const cols = [
        { field: 'nombre_vivero', header: 'Vivero', width: '15%' },
        { field: 'nombre_bien', header: 'Bien', width: '15%' },
        { field: 'tipo_bien', header: 'Tipo bien', width: '10%' },
        { field: 'cantidad_existente', header: 'Cant. existente', width: '10%' },
        { field: 'cantidad_cuarentena', header: 'En cuarentena', width: '10%' },
        { field: 'etapa_lote', header: 'Etapa lote', width: '10%' },
        { field: 'nro_lote', header: 'Nº del lote', width: '10%' },
        { field: 'agno_lote', header: 'Año del lote', width: '10%' }
    ];
    const export_columns = cols.map((col) => ({ title: col.header, dataKey: col.field }));


    const export_pdf: () => void = () => {
        import('jspdf').then((jsPDF: any) => {
            import('jspdf-autotable').then(() => {
                // eslint-disable-next-line new-cap
                const doc: any = new jsPDF.default(0, 0);
                doc.autoTable(export_columns, props.analitica);
                doc.save('resultados.pdf');
            });
        });
    }

    const export_excel: () => void = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(props.analitica);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excel_buffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            save_as_excel_file(excel_buffer);
        });
    };

    const save_as_excel_file: (e: { bookType: string, type: string }) => void = (excel_buffer: any) => {
        import('file-saver').then((module) => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (module?.default) {
                const excel_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const excel_extension = '.xlsx';
                const data = new Blob([excel_buffer], {
                    type: excel_type
                });

                module.default.saveAs(data, 'resultados' + new Date().getTime() + excel_extension);
            }
        });
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Stack
                direction="row"
                justifyContent="flex-end"
            >
                <Button variant="outlined" style={{ fontSize: "medium" }} color="success" startIcon={<DescriptionOutlinedIcon />} onClick={export_excel}>Excel</Button>
                <Button variant="outlined" style={{ fontSize: "medium", marginLeft: '2px' }} color="error" startIcon={<PictureAsPdfOutlinedIcon />} onClick={export_pdf}>Pdf</Button>
            </Stack>
        </div>
    );
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
                                sortMode="multiple"
                                stripedRows
                                paginator
                                rows={5}
                                scrollable scrollHeight="flex"
                                tableStyle={{ minWidth: '90rem' }}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                header={header}
                            >
                                {cols.map((col, index) => (
                                    <Column key={index} field={col.field} header={col.header} style={{ width: col.width }} sortable/>
                                ))}
                            </DataTable>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}