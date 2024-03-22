import Grid from '@mui/material/Grid';

interface IProps {
  xs: number;
  md: number;
  margin?: number;
  selected_image?: any;
  width_image?: string;
  height_image?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ImageUploader = ({
  xs,
  md,
  selected_image,
  margin,
  width_image,
  height_image,
}: IProps) => {
  return (
    <Grid item xs={xs} md={md} margin={margin ?? 0}>
      {selected_image !== null && (
        <div
          style={{
            width: width_image ?? '300px',
            height: height_image ?? 'auto',
            marginBottom: '10px',
          }}
        >
          <img src={selected_image ?? ''} alt="Selected" className="image" />
        </div>
      )}
    </Grid>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default ImageUploader;
