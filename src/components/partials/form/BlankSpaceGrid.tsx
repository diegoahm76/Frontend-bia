import { Grid } from '@mui/material';

interface IProps {
  xs: number;
  md: number;
  margin?: number;
  marginTop?: number;
  hidden_text?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BlankSpaceGrid = ({ xs, md, margin, marginTop, hidden_text }: IProps) => {
  return (
    <>
      {!(hidden_text ?? false) && (
        <Grid
          item
          xs={xs}
          md={md}
          margin={margin ?? 0}
          marginTop={marginTop ?? 0}
        ></Grid>
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default BlankSpaceGrid;
