/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    Grid,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import FormButton from '../../../../../components/partials/form/FormButton';
import PrintIcon from '@mui/icons-material/Print';

interface IProps {

    control_rotulo: any;
    open: any;

}

const styles = {
    modalContainer: {
      width: '100%', // Ajusta el ancho del modal
      height: '80%', // Ajusta la altura del modal
      margin: 'auto', // Centra el modal horizontalmente
    },
  };
function EditableTable() {
    const [data, setData] = useState([
        { id: 1, col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '' },
        { id: 2, col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '' },
        { id: 3, col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '' },
        { id: 4, col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '' },
        { id: 5, col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '' },


    ]);

    const handleCellEdit = (id: number, field: string, value: string) => {
        const updatedData = data.map((row) => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setData(updatedData);
    };
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date().toLocaleDateString());
        }, 60000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);
    const { cajas, } = useAppSelector((state: { deposito: any }) => state.deposito);
    //  console.log('')(cajas)
    return (
        
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }} colSpan={4} rowSpan={4} >
                        <img src="/26_logocorma2_200x200.png" alt="Imagen" style={{ width: '80%' }} />
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '5px', fontSize: '10px', borderTop: '1px solid #ddd' }} colSpan={3} >Código: FGO-04</th>
                </tr>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '5px', fontSize: '10px' }} colSpan={3}>
                        Versión: 02
                    </th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '3px', fontSize: '10px' }} colSpan={4} rowSpan={4} >RÓTULO DE CAJAS</th>
                    <th style={{ border: '1px solid #ddd', padding: '5px', borderTop: '1px solid #ddd', fontSize: '8px' }} colSpan={3} >{currentDate}</th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '9px', textAlign: 'left' }} >Unidad Administrativa</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={2} ></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '9px', textAlign: 'left' }}  >Código:</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={3}  ></th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '9px', textAlign: 'left' }}  >Oficina Productora:</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={2} ></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '9px', textAlign: 'left' }}  >Código:</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={3}  ></th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '9px', textAlign: 'left' }} >Serie:</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px' }} colSpan={2} ></th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '9px', textAlign: 'left', }}  >Código:</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', width: '9px' }} colSpan={3} ></th>
                </tr>

            </thead>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '8px', textAlign: 'center' }} colSpan={3}  >Caja Número:</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '9px', textAlign: 'center' }} colSpan={4} >{cajas.id_caja}</th>

                </tr>

            </thead>

            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '8px', textAlign: 'left', width: '5%' }} >Número de orden </th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '8px', textAlign: 'center' }} >Código de serie </th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '8px', textAlign: 'center' }} >Identificación CC-Nit-N</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '8px', textAlign: 'center' }} > Nombre de las series Subseries o Asuntos</th>

                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '8px', borderTop: '1px solid #ddd' }} colSpan={2} >Fechas Externas</th>
                    <th style={{ border: '1px solid #ddd', padding: '2px', fontSize: '8px', }}  >Número de folios</th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '1px', fontSize: '8px', textAlign: 'center' }} colSpan={4}></th>
                    <th style={{ border: '1px solid #ddd', padding: '1px', fontSize: '8px', textAlign: 'center' }} >Inicial</th>
                    <th style={{ border: '1px solid #ddd', padding: '1x', fontSize: '8px', textAlign: 'center' }} >Final</th>
                    <th style={{ border: '1px solid #ddd', padding: '1px', fontSize: '8px', textAlign: 'center' }} ></th>


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
                                style={{ width: '100%', border: 'none', padding: '5px', fontSize: '6px'  }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col2}
                                onChange={(e) => handleCellEdit(row.id, 'col2', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', fontSize: '6px'  }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col3}
                                onChange={(e) => handleCellEdit(row.id, 'col3', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', maxWidth: '200px' , fontSize: '6px' }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col4}
                                onChange={(e) => handleCellEdit(row.id, 'col4', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', maxWidth: '200px', fontSize: '6px' }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col5}
                                onChange={(e) => handleCellEdit(row.id, 'col5', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', fontSize: '6px', textAlign: 'left' }}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col6}
                                onChange={(e) => handleCellEdit(row.id, 'col6', e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '5px', fontSize: '6px' , textAlign: 'left'}}
                            />
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <input
                                type="text"
                                value={row.col7}
                                onChange={(e) => handleCellEdit(row.id, 'col7', e.target.value)}
                                style={{ width: '70%', border: 'none', padding: '5px', fontSize: '6px',  }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
            <Grid item xs={12} md={1.5} marginTop={2}>
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

const Rotulo = ({ control_rotulo, open, }: IProps) => {
    const { deposito, cajas_lista } = useAppSelector((state) => state.deposito);
    const dispatch = useAppDispatch();

    return (

        <div style={styles.modalContainer}>
        <EditableTable />
        </div>

    );


}

export default Rotulo;