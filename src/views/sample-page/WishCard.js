import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthStateContext, AuthDispatchContext, signInFailure, updateWishList } from 'contexts/user';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardContent, FormControl, InputLabel, OutlinedInput } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import { Formik } from 'formik';

// assets

const WishCard = ({ isLoading }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const authDispatch = useContext(AuthDispatchContext);
    const { first_name, wishlist1, wishlist2, wishlist3 } = useContext(AuthStateContext);
    const [isEdit, setIsEdit] = useState(!(wishlist1 && wishlist2 && wishlist3));

    // best way to fix this is to listen to the login event
    const userWishlist1 = useRef(wishlist1);
    const userWishlist2 = useRef(wishlist2);
    const userWishlist3 = useRef(wishlist3);
    const userName = useRef(first_name);

    const initialValues = {
        wishlist1,
        wishlist2,
        wishlist3,
        submit: null
    };

    useEffect(() => {
        if (
            (userWishlist1.current !== wishlist1 || userWishlist2.current !== wishlist2 || userWishlist3.current !== wishlist3) &&
            userName.current !== first_name
        ) {
            setIsEdit(!(wishlist1 && wishlist2 && wishlist3));
            userName.current = first_name;
            userWishlist1.current = wishlist1;
            userWishlist2.current = wishlist2;
            userWishlist3.current = wishlist3;
        }
    }, [wishlist1, wishlist2, wishlist3, first_name]);

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
                <MainCard title="Your Wishlist (optional)" content={false} sx={{ backgroundColor: '#ffb8bf' }}>
                    <CardContent>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    const userData = { ...values };
                                    setSubmitting(true);
                                    updateWL(userData, first_name);
                                    setIsEdit(false);
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
                                <>
                                    {!isEdit && !isSubmitting ? (
                                        <>
                                            <MainCard
                                                sx={{
                                                    mt: 1.7,
                                                    height: 60,
                                                    backgroundColor: 'transparent',
                                                    color: 'black',
                                                    borderColor: '#fb928e'
                                                }}
                                            >
                                                Item #1: {wishlist1}
                                            </MainCard>
                                            <MainCard
                                                sx={{
                                                    mt: 1.7,
                                                    height: 60,
                                                    backgroundColor: 'transparent',
                                                    color: 'black',
                                                    borderColor: '#fb928e'
                                                }}
                                            >
                                                Item #1: {wishlist2}
                                            </MainCard>
                                            <MainCard
                                                sx={{
                                                    mt: 1.7,
                                                    mb: 1.5,
                                                    height: 60,
                                                    backgroundColor: 'transparent',
                                                    color: 'black',
                                                    borderColor: '#fb928e'
                                                }}
                                            >
                                                Item #1: {wishlist3}
                                            </MainCard>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                color="orange"
                                                sx={{ color: 'black' }}
                                                onClick={() => setIsEdit(!isEdit)}
                                            >
                                                Change Wishlist
                                            </Button>
                                        </>
                                    ) : (
                                        <form noValidate onSubmit={handleSubmit}>
                                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-email-login">Item #1</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="wishlist1"
                                                    value={values.wishlist1}
                                                    name="wishlist1"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>

                                            <FormControl
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                sx={{ ...theme.typography.customInput }}
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Item #2</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="wishlist2"
                                                    value={values.wishlist2}
                                                    name="wishlist2"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>

                                            <FormControl
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                sx={{ ...theme.typography.customInput }}
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Item #3</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="wishlist3"
                                                    value={values.wishlist3}
                                                    name="wishlist3"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
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
                                                        color="orange"
                                                        sx={{ color: 'black' }}
                                                    >
                                                        Update Wishlist
                                                    </Button>
                                                </AnimateButton>
                                            </Box>
                                        </form>
                                    )}
                                </>
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
