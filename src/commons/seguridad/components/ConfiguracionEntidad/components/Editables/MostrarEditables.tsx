import { useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

import { Box, Grid } from "@mui/material";
import { Title } from "../../../../../../components/Title";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEditables: React.FC = () => {
    const toast = useRef<Toast | null>(null);

    const show = (): void => {
        // eslint-disable-next-line
        if (toast.current) {
            toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
        }
    };

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            const errors: { value?: string } = {};
// eslint-disable-next-line
            if (!data.value) {
                 
                errors.value = 'Name - Surname is required.';
            }

            return errors;
        }, 
        onSubmit: (data) => {
            // eslint-disable-next-line
            data && show();
            formik.resetForm();
        }
    });
// eslint-disable-next-line
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const isFormFieldInvalid = (field: keyof typeof formik.values): boolean => {
        // eslint-disable-next-line
        return Boolean(formik.touched[field] && formik.errors[field]);
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const getFormErrorMessage = (field: keyof typeof formik.values): React.ReactNode => {
        return isFormFieldInvalid(field) ? <small className="p-error">{formik.errors[field]}</small> : null;
    };

    return (
        <Grid
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item md={12} xs={12}>
                <Title title="Editables" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <div className="card flex justify-content-center">
                            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                                <span className="p-float-label">
                                    <Toast ref={toast} />
                                    <InputText
                                        id="value"
                                        name="value"
                                        value={formik.values.value}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                                    />
                                    <label htmlFor="input_value">1</label>
                                </span>
                                {getFormErrorMessage('value')}
                                <Button type="submit" label="Submit" />
                            </form>
                        </div>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};