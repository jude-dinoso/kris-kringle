import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthStateContext, AuthDispatchContext, signIn, signInFailure, updateWishList } from 'contexts/user';

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

const WishCard = ({ isLoading }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const navigate = useNavigate();
    const location = useLocation();
    const fromUrl = _get(location, 'state.from.pathname');
    const [anchorEl, setAnchorEl] = useState(null);
    const authDispatch = useContext(AuthDispatchContext);
    const { first_name, desc, wishlist1, wishlist2, wishlist3 } = useContext(AuthStateContext);
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

    const updateWL = (userData) => {
        updateWishList(authDispatch, userData, first_name);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard title="Your Wishlist (optional)" content={false} sx={{ backgroundColor: '#f4abb4' }}>
                    <CardContent>
                        <Formik
                            initialValues={{
                                wishlist1: '',
                                wishlist2: '',
                                wishlist3: '',
                                submit: null
                            }}
                            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                                try {
                                    const userData = { ...values };
                                    setSubmitting(true);
                                    updateWL(userData, first_name);
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
                                        <InputLabel htmlFor="outlined-adornment-email-login">Item #1: {wishlist1}</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type="wishlist1"
                                            value={values.wishlist1}
                                            name="wishlist1"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                        />
                                    </FormControl>

                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-email-login">Item #2: {wishlist2}</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type="wishlist2"
                                            value={values.wishlist2}
                                            name="wishlist2"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                        />
                                    </FormControl>

                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-email-login">Item #3: {wishlist3}</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type="wishlist3"
                                            value={values.wishlist3}
                                            name="wishlist3"
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
                                                color="primary"
                                            >
                                                Update Wishlist
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

WishCard.propTypes = {
    isLoading: PropTypes.bool
};

export default WishCard;
