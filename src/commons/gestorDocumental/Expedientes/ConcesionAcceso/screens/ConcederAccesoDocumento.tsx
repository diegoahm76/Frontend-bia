
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks';
import { SeleccionPersonaDocumento } from './SeleccionPersonaDocumento';
import { ConcesionesPermisosVigentesDoc } from './ConcesionesPermisosVigentesDoc';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { InformacionDocumento } from './InformacionDocumento';
interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    documento: any;
    metadata: any;
}

const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const ConcederAccesoDocumento: React.FC<IProps> = (props: IProps) => {
    const [concesion, set_concesion] = useState<any>(null);
    const [editar_concesion, set_editar_concesion] = useState<any>(null);
    const [guardar, set_guardar] = useState<boolean>(false);

    useEffect(() => {
        if (guardar) {
            set_guardar(false);
        }
    }, [guardar]);

    return (
        <>
            <Dialog fullWidth maxWidth="lg"
                open={props.is_modal_active}
                onClose={() => { props.set_is_modal_active(false); }} >
                <DialogTitle>{'Conceder acceso a documento'}</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        sx={class_css}
                    >
                        <InformacionDocumento documento={props.documento} metadata={props.metadata}></InformacionDocumento>
                    </Grid>
                    <Grid
                        container
                        sx={class_css}
                    >
                        <SeleccionPersonaDocumento documento={props.documento} set_concesion={set_concesion} editar_concesion={editar_concesion}></SeleccionPersonaDocumento>
                    </Grid>
                    <Grid
                        container
                        sx={class_css}
                    >
                        <ConcesionesPermisosVigentesDoc documento={props.documento} concesion={concesion} accion_guardar={guardar} set_editar_concesion={set_editar_concesion} set_is_modal_active={props.set_is_modal_active}></ConcesionesPermisosVigentesDoc>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        color='success'
                        variant='contained'
                        startIcon={<SaveIcon />}
                        onClick={ () => { set_guardar(true); }}>Guardar</Button>
                    <Button
                        color='error'
                        variant='contained'
                        startIcon={<ClearIcon />}
                        onClick={() => { props.set_is_modal_active(false); }}>Salir</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default ConcederAccesoDocumento;