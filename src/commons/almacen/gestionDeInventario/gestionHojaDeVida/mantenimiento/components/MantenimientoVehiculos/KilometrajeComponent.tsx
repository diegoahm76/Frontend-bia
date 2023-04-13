import { 
    Box, 
    Button, 
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    OutlinedInput,
    Stack,
} from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const KilometrajeComponent:React.FC = () => {
  return (
    <>
        <Box
            component="form"
            sx={{ mt: '20px'}}
            noValidate
            autoComplete="off"
        >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        size='small'
                    />
                    <FormHelperText>1) Cada:</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        size='small'
                    />
                    <FormHelperText>2) Desde:</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        size='small'
                    />
                    <FormHelperText>Hasta:</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        </Box>
        <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px' }}
        >
            <Button
                color='primary'
                variant='contained'
            >
                Validar Kilometros
            </Button>
        </Stack>
    </>
  )
}
