/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import FormButton from '../../../../../components/partials/form/FormButton';
import PrintIcon from '@mui/icons-material/Print';
import { IObjCarpeta } from '../../interfaces/deposito';
import { get_rotulo_carpeta } from '../../store/thunks/deposito';

interface IProps {

    control_rotulo: any;
    open: any;
    selected_carpeta:any

}
function EditableTable({ selected_carpeta }: { selected_carpeta: IObjCarpeta }) {
    const [data, setData] = useState([
        { id: 1, col1: '', col2: '', col3: '', col4: '', col5: '' },


    ]);
    const dispatch = useAppDispatch();
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

    const handleCellEdit = (id: number, field: string, value: string) => {
        const updatedData = data.map((row) => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setData(updatedData);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date().toLocaleDateString());
        }, 60000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    const { cajas, rotulo_carpeta} = useAppSelector((state: { deposito: any }) => state.deposito);
    console.log(cajas)
    console.log(rotulo_carpeta)

    useEffect(() => {
        // Asegúrate de que selected_carpeta.id_carpeta no es undefined
        if (cajas.id_carpeta !== undefined) {
          void dispatch(get_rotulo_carpeta(cajas.id_carpeta));
        }
      }, [cajas.id_carpeta]); // Agrega selected_carpeta.id_carpeta como dependencia
      
    return (
        <table style={{ borderCollapse: 'collapse', width: '80%' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }} colSpan={3} rowSpan={4} >
                        <img src="/26_logocorma2_200x200.png" alt="Imagen" style={{ width: '80%' }} />
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '5px', fontSize: '10px', borderTop: '1px solid #ddd' }} colSpan={2} >Código: FGO-04</th>
                </tr>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '5px', fontSize: '10px' }} colSpan={2}>
                        Versión: 02
                    </th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '3px', fontSize: '10px' }} colSpan={3} rowSpan={4} >RÓTULO DE CARPETAS</th>
                    <th style={{ border: '1px solid #ddd', padding: '5px', borderTop: '1px solid #ddd', fontSize: '10px' }} colSpan={2} >{currentDate}</th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', width: '40px' }}  >UNIDAD ADMINISTRATIVA</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={4} ></th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left' }} >Código</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={4} ></th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left' }}  >OfICINA PRODUCTORA</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={4} ></th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left' }}  >Código</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={4} ></th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }}></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'left', fontSize: '10px', width: '80px' }} colSpan={2} >Código</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} colSpan={2}  >Nombre:</th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }}>SERIE</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'left', fontSize: '12px', }} colSpan={2}></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} colSpan={2}  ></th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }}>SUBSERIE</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'left', fontSize: '12px', }} colSpan={2}></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} colSpan={2}  ></th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }}>No. EXPEDIENTE</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '12px', textAlign: 'left', }} colSpan={4}  ></th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', fontSize: '10px', textAlign: 'left', }} >EXPEDIENTE</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'left', fontSize: '12px', }} colSpan={4} ></th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', }}></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} >FECHA INICIAL</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', }}></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} >FECHA FINAL</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'left', fontSize: '12px', }}></th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', }}></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} >DEL FOLIO</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', }}></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} >AL FOLIO</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'left', fontSize: '12px', }}></th>

                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} >NÚMERO DE FOLIO</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', }} colSpan={4}></th>

                </tr>

            </thead>
            <thead>
                <tr>

                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} >CARPETA:</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', }}>{cajas.identificacion_por_caja}</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', }}></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'left', }} >CAJA:</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'left', fontSize: '12px', }}>{cajas.identificacion_caja}</th>

                </tr>
            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '10px', textAlign: 'center', }} colSpan={5}  >Nota: Verificar la vigencia del documento en el listado maestro de documentos</th>
                </tr>

            </thead>

            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col1}
                                onChange={(e) => handleCellEdit(row.id, 'col1', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col2}
                                onChange={(e) => handleCellEdit(row.id, 'col2', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px' }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col3}
                                onChange={(e) => handleCellEdit(row.id, 'col3', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', maxWidth: '200px' }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col4}
                                onChange={(e) => handleCellEdit(row.id, 'col4', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', maxWidth: '200px' }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col5}
                                onChange={(e) => handleCellEdit(row.id, 'col5', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', maxWidth: '200px' }}
                            />
                        </td>

                    </tr>
                ))}

            </tbody>






            <Grid item xs={12} md={1.5}>
                <FormButton

                    variant_button='outlined'
                    icon_class={<PrintIcon />}
                    on_click_function={() => { window.print(); }}
                    label={'Imprimir'}
                    type_button="button" />

            </Grid>
        </table>

    );
}

const Rotulo = ({ control_rotulo, open, selected_carpeta}: IProps) => {
    const { deposito, cajas_lista, rotulo_carpeta } = useAppSelector((state) => state.deposito);
    const dispatch = useAppDispatch();

    return (

        <EditableTable  selected_carpeta={selected_carpeta}/>


    );


}

export default Rotulo;