/* eslint-disable @typescript-eslint/naming-convention */
import Chip from '@material-ui/core/Chip';


export const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
};

export const PaymentChip = ({ paid }:any) => {
    return (
        <Chip
            label={paid ? 'Pagado' : 'Pendiente'}
            color={paid ? 'primary' : 'secondary'}
        />
    );
};
