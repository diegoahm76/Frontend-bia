import { Typography } from "@mui/material";
import '../Modal.css';
/* eslint-disable @typescript-eslint/naming-convention */
export const ModalContent: React.FC<{ keys: any[]; values: any[] }> = ({
  keys,
  values,
}: any) => {
  return (
    <section className="grid-modal">
      <div>
        {keys.map((key: any, index: number) => {
          if (key === false ?? undefined) return null;
          return (
            <div key={index}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  mb: '10px',
                  border: '1px solid red',
                }}
              >
                {key}
              </Typography>
            </div>
          );
        })}
      </div>
      <div>
        {values?.map((value: any, index: number) => {
          if (value === false ?? undefined) return null;
          return (
            <div key={index}>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  fontSize: '20px',
                  mb: '10px',
                  border: '1px solid red',
                }}
              >
                {value}
              </Typography>
            </div>
          );
        })}
      </div>
    </section>
  );
};