import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthDispatchContext, signIn, signInFailure } from 'contexts/user';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Autocomplete,
    Box,
    Button,
    CardContent,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { members } from './family';

const LoginCard = ({ isLoading }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const navigate = useNavigate();
    const authDispatch = useContext(AuthDispatchContext);
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function SignInSuccess(userData) {
        // await signIn(authDispatch, userData);
        const flag = await signIn(authDispatch, userData);
        if (!flag) {
            navigate('/dashboard/default');
        } else {
            navigate('/kris-kringle');
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const signInFail = () => {
        navigate('/dashboard/default');
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
                                first_name: '',
                                password: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string().max(255).required('Password is required')
                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    const userData = { ...values };
                                    setSubmitting(true);
                                    await SignInSuccess(userData);
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
                            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            id="outlined-adornment-email-login"
                                            type="first_name"
                                            name="first_name"
                                            value={values.first_name}
                                            inputValue={inputValue}
                                            onInputChange={(_event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }}
                                            onChange={(_event, value) => setFieldValue('first_name', value?.label ?? null)}
                                            options={members}
                                            groupBy={(option) => option.family}
                                            renderInput={(params) => <TextField {...params} label="SJ Family Member" />}
                                        />
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
                                                Check Kris Kringle Info
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
