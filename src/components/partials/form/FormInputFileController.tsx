import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DownloadButton } from '../../../utils/DownloadButton/DownLoadButton';
import { useEffect } from 'react';

interface IRuleMessage {
  rule: any;
  message: string | null;
}

interface IRules {
  required_rule?: IRuleMessage;
  min_rule?: IRuleMessage;
  max_rule?: IRuleMessage;
}
interface IProps {
  xs: number;
  md: number;
  margin?: number;
  control_form: any;
  control_name: string;
  default_value: string | number | null;
  rules: IRules;
  label: string;
  disabled: boolean;
  helper_text: string;
  file_name: string | null;
  set_value?: any;
  value_file?: any;
  hidden_text?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormInputFileController = ({
  xs,
  md,
  control_form,
  control_name,
  rules,
  label,
  disabled,
  helper_text,
  default_value,
  file_name,
  set_value,
  hidden_text,
  margin,
  value_file,
}: IProps) => {
  const handle_file_input_change = (e: any): void => {
    set_value(e.target.files != null ? e.target.files[0] : '');
  };

  return (
    <>
      {!(hidden_text ?? false) && (
        <Grid item container xs={xs} md={md} margin={margin ?? 0}>
          <Grid
            item
            xs={
              value_file !== '' &&
              value_file !== null &&
              typeof value_file === 'string'
                ? 10
                : 12
            }
            md={
              value_file !== '' &&
              value_file !== null &&
              typeof value_file === 'string'
                ? 10
                : 12
            }
          >
            <Controller
              name={control_name}
              control={control_form}
              defaultValue={default_value}
              rules={{
                required: rules.required_rule?.rule,
                min: rules.min_rule?.rule,
                max: rules.max_rule?.rule,
              }}
              render={({ fieldState: { error } }) => (
                <FormControl fullWidth>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    style={{ height: '40px' }}
                  >
                    <Typography
                      style={{
                        fontWeight: 'thin',
                        fontSize:
                          value_file !== '' &&
                          value_file !== null &&
                          typeof value_file === 'string'
                            ? '0.75rem'
                            : 'medium',
                      }}
                      noWrap
                    >
                      {file_name !== '' ? file_name : label}
                    </Typography>
                    <Input
                      type="file"
                      // disabled={disabled}
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                      onChange={handle_file_input_change}
                      error={!(error == null)}
                    />
                  </Button>

                  <FormHelperText error={!(error == null)}>
                    {error != null
                      ? rules.required_rule?.message
                      : file_name !== ''
                      ? label
                      : helper_text}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          {value_file !== '' &&
            value_file !== null &&
            typeof value_file === 'string' && (
              <Grid item xs={1} md={1} spacing={1}>
                <DownloadButton
                  fileUrl={value_file}
                  fileName={control_name}
                  condition={false}
                />
              </Grid>
            )}
        </Grid>
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormInputFileController;
