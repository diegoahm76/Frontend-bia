/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */

import { Chip, type ChipProps } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BeenhereIcon from '@mui/icons-material/Beenhere';
interface OrganigramaChipProps {
  organigrama_lideres_current: {
    fecha_retiro_produccion?: string;
    actual?: boolean;
    fecha_puesta_produccion?: string;
    fecha_terminado: string;
  };
}

export const OrganigramaChip: React.FC<OrganigramaChipProps> = ({
  organigrama_lideres_current
}) => {
  let labelValue = 'no definido';
  let colorValue = 'info';
  let iconValue = <HelpOutlineIcon />;

  if (organigrama_lideres_current?.fecha_retiro_produccion) {
    labelValue = 'ORGANIGRAMA FUERA DE PRODUCCIÓN';
    colorValue = 'error';
    iconValue = <HelpOutlineIcon />;
  } else if (organigrama_lideres_current?.actual) {
    labelValue = 'ORGANIGRAMA ACTUAL';
    colorValue = 'info';
    iconValue = <TipsAndUpdatesIcon />;
  } else if (organigrama_lideres_current?.fecha_puesta_produccion) {
    labelValue = 'ORGANIGRAMA EN PRODUCCIÓN';
    colorValue = 'success';
    iconValue = <BeenhereIcon />;
  }else if(organigrama_lideres_current?.fecha_terminado){
    labelValue = 'ORGANIGRMA TERMINADO';
    colorValue = 'success';
    iconValue = <BeenhereIcon />;
  }

  return (
    <Chip
      sx={{
        marginRight: '10px'
      }}
      size="small"
      label={labelValue}
      icon={iconValue}
      color={colorValue as ChipProps['color']}
      variant="outlined"
    />
  );
};

