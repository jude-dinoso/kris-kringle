import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthStateContext, AuthDispatchContext, signIn, signInFailure } from 'contexts/user';

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
    ListSubheader,
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

const LoginCard = ({ isLoading }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const navigate = useNavigate();
    const location = useLocation();
    const fromUrl = _get(location, 'state.from.pathname');
    const [anchorEl, setAnchorEl] = useState(null);
    const authDispatch = useContext(AuthDispatchContext);
    const [showPassword, setShowPassword] = useState(false);
    const { isLoggedIn, first_name } = useContext(AuthStateContext);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                                first_name: 'User',
                                password: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string().max(255).required('Password is required')
                            })}
                            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
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
                                            <MenuItem value="User" disabled>
                                                <em>Select from list...</em>
                                            </MenuItem>
                                            <ListSubheader sx={{ color: 'black' }}>RSJ</ListSubheader>
                                            <MenuItem value="Nita">Nita</MenuItem>
                                            <MenuItem value="Frances">Baby</MenuItem>
                                            <MenuItem value="Frances">Rick</MenuItem>
                                            <MenuItem value="Frances">Harold</MenuItem>
                                            <MenuItem value="Jenn">Jenn</MenuItem>
                                            <MenuItem value="Grant">Grant</MenuItem>
                                            <MenuItem value="Carl">Carl</MenuItem>
                                            <MenuItem value="Jan">Jan</MenuItem>
                                            <MenuItem value="Edwin">Edwin</MenuItem>
                                            <MenuItem value="Malou">Malou</MenuItem>
                                            <MenuItem value="Rpee">Rpee</MenuItem>
                                            <MenuItem value="Travis">Travis</MenuItem>
                                            <MenuItem value="Marwin">Marwin</MenuItem>
                                            <MenuItem value="Raffy">Raffy</MenuItem>
                                            <MenuItem value="Majo">Majo</MenuItem>
                                            <MenuItem value="Ryan">Ryan</MenuItem>
                                            <MenuItem value="Luna">Luna</MenuItem>
                                            <MenuItem value="Alonzo">Alonzo</MenuItem>
                                            <MenuItem value="Sean">Sean</MenuItem>
                                            <MenuItem value="Martina">Martina</MenuItem>
                                            <MenuItem value="Rocco">Rocco</MenuItem>
                                            <MenuItem value="Hansel">Zeny</MenuItem>
                                            <MenuItem value="Zeny">Hansel</MenuItem>
                                            <MenuItem value="Hazel">Hazel</MenuItem>
                                            <MenuItem value="Mark Liriel">Mark Liriel</MenuItem>
                                            <MenuItem value="Noah">Noah</MenuItem>
                                            <MenuItem value="Zoe">Zoe</MenuItem>
                                            <MenuItem value="Sachi">Sachi</MenuItem>
                                            <MenuItem value="Frances">Frances</MenuItem>
                                            <MenuItem value="Frances">Richard</MenuItem>
                                            <MenuItem value="Vincent">Vincent</MenuItem>
                                            <MenuItem value="Charlize Kate">Charlize Kate</MenuItem>
                                            <MenuItem value="Mark Haze">Mark Haze</MenuItem>
                                            <MenuItem value="Mark Crylle">Mark Crylle</MenuItem>
                                            <MenuItem value="Cardale">Cardale</MenuItem>
                                            <MenuItem value="Yui">Yui</MenuItem>
                                            <MenuItem value="Kratos">Kratos</MenuItem>
                                            <MenuItem value="Katrina">Katrina</MenuItem>
                                            <MenuItem value="Jamil">Jamil</MenuItem>
                                            <MenuItem value="Dennis">Dennis</MenuItem>
                                            <MenuItem value="Berna">Berna</MenuItem>
                                            <MenuItem value="Felix">Felix</MenuItem>
                                            <MenuItem value="Denise">Denise</MenuItem>
                                            <MenuItem value="Anne">Anne</MenuItem>
                                            <MenuItem value="Caelum">Caelum</MenuItem>
                                            <MenuItem value="Danny">Danny</MenuItem>
                                            <MenuItem value="Dan Marlou">Dan Marlou</MenuItem>
                                            <MenuItem value="Daene">Daene</MenuItem>
                                            <ListSubheader sx={{ color: 'black' }}>ESJ</ListSubheader>
                                            <MenuItem value="Resty">Resty</MenuItem>
                                            <MenuItem value="Lita">Lita</MenuItem>
                                            <MenuItem value="Peen">Peen</MenuItem>
                                            <MenuItem value="Fidel">Fidel</MenuItem>
                                            <MenuItem value="Tessa">Tessa</MenuItem>
                                            <MenuItem value="Kaye">Kaye</MenuItem>
                                            <MenuItem value="TJ">TJ</MenuItem>
                                            <MenuItem value="Gie">Gie</MenuItem>
                                            <MenuItem value="Maeng">Maeng</MenuItem>
                                            <MenuItem value="Joelle">Joelle</MenuItem>
                                            <MenuItem value="Pam">Pam</MenuItem>
                                            <ListSubheader sx={{ color: 'black' }}>CSJ</ListSubheader>
                                            <MenuItem value="Clarita">Clarita</MenuItem>
                                            <MenuItem value="Santy">Santy</MenuItem>
                                            <MenuItem value="Shirley">Shirley</MenuItem>
                                            <MenuItem value="Jodi">Jodi</MenuItem>
                                            <MenuItem value="Crispin">Crispin</MenuItem>
                                            <MenuItem value="Linda">Linda</MenuItem>
                                            <MenuItem value="Crislyn">Crislyn</MenuItem>
                                            <MenuItem value="Baba">Baba</MenuItem>
                                            <MenuItem value="Renren">Renren</MenuItem>
                                            <MenuItem value="Kulot">Kulot</MenuItem>
                                            <MenuItem value="Julie">Julie</MenuItem>
                                            <MenuItem value="MC">MC</MenuItem>
                                            <MenuItem value="Ian">Ian</MenuItem>
                                            <MenuItem value="Chy">Chy</MenuItem>
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
