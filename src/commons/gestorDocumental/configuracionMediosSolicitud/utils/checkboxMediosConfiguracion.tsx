/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { Grid } from '@mui/material';
interface BasicRatingProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BasicRating({ isChecked, setIsChecked }: BasicRatingProps) {
  const [localIsChecked, setLocalIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setLocalIsChecked(!localIsChecked);
    setIsChecked(!localIsChecked); // También actualiza el estado externo
  };

  return (

    <Grid
      container
      style={{ width: 70 }}
    >
      <input
        type="checkbox"
        checked={localIsChecked}
        onChange={handleCheckboxChange}
      />
      {localIsChecked ? (
        <Typography variant="body2">
          Si
          <Tooltip
            title="Formato tipo de medio activo"
            placement="right"
          >
            <InfoIcon
              sx={{
                width: '1.2rem',
                height: '1.2rem',
                ml: '0.5rem',
                color: 'green'
              }}
            />
          </Tooltip>
        </Typography>
      ) : (
        <Typography variant="body2">
          No
          <Tooltip
            title="Formato tipo de medio inactivo"
            placement="right"
          >
            <InfoIcon
              sx={{
                width: '1.2rem',
                height: '1.2rem',
                ml: '0.5rem',
                color: 'red'
              }}
            />
          </Tooltip>
        </Typography>
      )}
    </Grid>
  );
}
