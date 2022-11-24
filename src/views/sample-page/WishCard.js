import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
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
import _get from 'lodash.get';

// assets

const WishCard = ({ isLoading }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const authDispatch = useContext(AuthDispatchContext);
    const { first_name, wishlist1, wishlist2, wishlist3 } = useContext(AuthStateContext);
    const [isEdit, setIsEdit] = useState(!(wishlist1 && wishlist2 && wishlist3));

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
                            initialValues={{
                                wishlist1,
                                wishlist2,
                                wishlist3,
                                submit: null
                            }}
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
                                    {(wishlist1 || wishlist2 || wishlist3) && !isEdit && !isSubmitting ? (
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
