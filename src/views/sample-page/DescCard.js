import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthDispatchContext, signIn, signInFailure } from 'contexts/user';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Typography,
    TextField,
    Menu,
    MenuItem,
    OutlinedInput,
    Select
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import _get from 'lodash.get';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const DescCard = ({ isLoading }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const navigate = useNavigate();
    const location = useLocation();
    const fromUrl = _get(location, 'state.from.pathname');
    console.log('location => ', location);
    const [anchorEl, setAnchorEl] = useState(null);
    const authDispatch = useContext(AuthDispatchContext);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const signInSuccess = (userData) => {
        signIn(authDispatch, userData);
        navigate('/kris-kringle');
    };

    const signInFail = () => {
        signInFailure(authDispatch);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false} sx={{ backgroundColor: '#D0F0C0' }}>
                    <CardContent>
                        <Typography variant="h4">How would you describe your monito/monita?</Typography>
                        <Formik
                            initialValues={{
                                desc: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string().max(255).required('Description is required')
                            })}
                            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                                try {
                                    const userData = { ...values };
                                    setSubmitting(true);
                                    resetForm();
                                    signInSuccess(userData);
                                } catch (err) {
                                    console.error(err);
                                    if (scriptedRef.current) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                    signInFail();
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <TextField
                                            id="outlined-adornment-password-login"
                                            type="desc"
                                            value={values.desc}
                                            name="desc"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                        />
                                    </FormControl>

                                    <Box>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="small"
                                                type="submit"
                                                variant="contained"
                                                color="error"
                                            >
                                                Submit Description
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

DescCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DescCard;
