/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import '../Modal.css';

const sx = {
  fontWeight: 'bold',
  fontSize: '20px',
  mb: '10px'
};

export const ModalContent: React.FC<{ keys: any[]; values: any[] }> = ({
  keys,
  values
}) => (
  <section className="grid-modal">
    <div className="grid-internal">
      {keys?.map((key: any, index: number) => (
        <div className="sub-grid-internal" key={index}>
          <Typography sx={sx}>{key} : &nbsp;</Typography>
        </div>
      ))}
    </div>

    <div className="grid-internal">
      {values?.map((value: any, index: number) => (
        <div className="sub-grid-internal" key={index}>
          <Typography sx={sx}>{value}</Typography>
        </div>
      ))}
    </div>
  </section>
);
