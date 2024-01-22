/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { type Obligacion, type ObligacionesUsuario } from '../interfaces/interfaces';
import { Dialog, } from '@mui/material';
import { Title } from '../../../../components/Title';
import { Grid, Box, Checkbox, TextField, Stack, Button } from '@mui/material';

interface RootState {
    obligaciones: {
        obligaciones: ObligacionesUsuario;
    }
}
interface BuscarProps {
    is_modal_active: any;
    set_is_modal_active: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TenerEncuenta: React.FC<BuscarProps> = ({ is_modal_active, set_is_modal_active }) => {
    const [selected, set_selected] = useState<readonly string[]>([]);
    const [capital, set_capital] = useState(0);
    const [intereses, set_intereses] = useState(0);
    const [total, set_total] = useState(0);
    const [modal, set_modal] = useState(false);
    const [modal_opcion, set_modal_opcion] = useState(0);
    const { obligaciones } = useSelector((state: RootState) => state.obligaciones);
    const [lista_obligaciones, set_lista_obligaciones] = useState(Array<Obligacion>)







    const handle_closee = (): void => {
        set_is_modal_active(false);
    };
    return (
        <>
            <Dialog open={is_modal_active} onClose={handle_closee} maxWidth="xl"
            >
                <Grid container
                    item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                    sx={{

                        width: '900px', // Cambia '700px' por el ancho que desees
                        height: '100%', // Cambia '500px' por el alto que desees
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px', m: '10px 0 20px 0', mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >

                    <Title title='Facilidad de pago debe tener en cuenta' />

                    <div>
                        <h3>Persona natural:</h3>
                        <ul>
                            <li>Copia de la consignación del abono, (en caso de realizarlo).</li>
                            <li>Copia del documento de identidad del deudor.</li>
                            <li>Relación de Bienes la cual deberá contener la identificación, ubicación y avalúo de los bienes o última declaración del impuesto predial o de vehículos, según el caso, así como la prueba de propiedad. (en caso de que aplique).</li>
                            <li>Manifestación expresa en la cual se compromete a no enajenar los bienes relacionados ni a afectar su dominio, cuando se trate de una solicitud de facilidad, amparada en la denuncia de bienes para su posterior embargo y secuestro (en caso de que aplique).</li>
                            <li>No estar reportado en el Boletín de Deudores Morosos del Estado - BDME, Contaduría General de la Nación, por incumplimiento de facilidades de pago con otras entidades del Estado (esta consulta la realiza internamente la corporación).</li>
                            <li>En caso de que la propuesta de facilidad de pago sea superior a 1 año, debe de cumplir con alguna garantía.</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3>Persona jurídica:</h3>
                        <ul>
                            <li>Copia de la consignación del abono, (en caso de realizarlo).</li>
                            <li>Poder debidamente otorgado cuando se actúe a través del apoderado.</li>
                            <li>Copia del documento de identidad del apoderado o representante legal.</li>
                            <li>Relación de Bienes la cual deberá contener la identificación, ubicación y avalúo de los bienes o última declaración del impuesto predial o de vehículos, según el caso, así como la prueba de propiedad. (en caso de que aplique).</li>
                            <li>Manifestación expresa en la cual se compromete a no enajenar los bienes relacionados ni a afectar su dominio, cuando se trate de una solicitud de facilidad, amparada en la denuncia de bienes para su posterior embargo y secuestro (en caso de que aplique).</li>
                            <li>No estar reportado en el Boletín de Deudores Morosos del Estado - BDME, Contaduría General de la Nación, por incumplimiento de facilidades de pago con otras entidades del Estado (esta consulta la realiza internamente la corporación).</li>
                            <li>Certificado de existencia y representación legal expedida con no más de un mes de anticipación (personas jurídicas).</li>
                            <li>En caso de que la propuesta de facilidad de pago sea superior a 1 año, debe de cumplir con alguna garantía.</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Deudor solidario:</h3>
                        <ul>
                            <li>Copia de la consignación del abono, (en caso de realizarlo).</li>
                            <li>Copia del documento de identidad del deudor solidario.</li>
                            <li>Certificado de existencia y representación legal expedida con no más de un mes de anticipación (personas jurídicas).</li>
                            <li>Relación de Bienes la cual deberá contener la identificación, ubicación y avalúo de los bienes o última declaración del impuesto predial o de vehículos, según el caso, así como la prueba de propiedad. (en caso de que aplique).</li>
                            <li>Manifestación expresa en la cual se compromete a no enajenar los bienes relacionados ni a afectar su dominio, cuando se trate de una solicitud de facilidad, amparada en la denuncia de bienes para su posterior embargo y secuestro (en caso de que aplique).</li>
                            <li>No estar reportado en el Boletín de Deudores Morosos del Estado - BDME, Contaduría General de la Nación, por incumplimiento de facilidades de pago con otras entidades del Estado (esta consulta la realiza internamente la corporación).</li>
                            <li>Cuando la solicitud de facilidad de pago sea presentada por un tercero este debe manifestar que se constituirá en deudor solidario y cumplirá con todos los requisitos exigidos por las disposiciones legales para su otorgamiento y que su responsabilidad será por el total de las obligaciones contenidas en el acuerdo de pago, más los intereses y actualizaciones que se generen hasta la cancelación total de dichas obligaciones.</li>
                            <li>En caso de que la propuesta de facilidad de pago sea superior a 1 año, debe de cumplir con alguna garantía.</li>
                        </ul>
                    </div>

                </Grid>

            </Dialog>
        </>
    );
}
