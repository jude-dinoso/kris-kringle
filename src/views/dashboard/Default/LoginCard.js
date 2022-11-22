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
    CardActions,
    CardContent,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import _get from 'lodash.get';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginCard = ({ isLoading }) => {
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
        console.log('---------------------------------', userData);
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
                <MainCard content={false}>
                    <CardContent>
                        <Formik
                            initialValues={{
                                first_name: 'Pam',
                                password: '888',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string().max(255).required('Password is required')
                            })}
                            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                                try {
                                    const userData = { ...values };
                                    console.log('hello', userData);
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
                                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                        <InputLabel htmlFor="outlined-adornment-email-login">SJ Family Member</InputLabel>
                                        <Select
                                            id="outlined-adornment-email-login"
                                            type="first_name"
                                            value={values.first_name}
                                            name="first_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="SJ Family Member"
                                            inputProps={{}}
                                            sx={{ paddingTop: 2 }}
                                        >
                                            <MenuItem value="Lita">Lita</MenuItem>
                                            <MenuItem value="Resty">Resty</MenuItem>
                                            <MenuItem value="Nita">Nita</MenuItem>
                                            <MenuItem value="Pam">Pam</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password-login">3-Digit Passcode</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            inputProps={{}}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    {errors.submit && (
                                        <Box sx={{ mt: 3 }}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Box>
                                    )}

                                    <Box sx={{ mt: 2 }}>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Sign in
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

LoginCard.propTypes = {
    isLoading: PropTypes.bool
};

export default LoginCard;
