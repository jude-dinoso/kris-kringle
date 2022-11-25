import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthDispatchContext, signInFailure } from 'contexts/user';

// material-ui
import { Box, Button, CardContent } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import { Formik } from 'formik';

const LogoutCard = ({ isLoading }) => {
    const scriptedRef = useScriptRef();
    const navigate = useNavigate();
    const authDispatch = useContext(AuthDispatchContext);

    const signInFail = () => {
        signInFailure(authDispatch);
        navigate('/');
    };
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false} sx={{ backgroundColor: 'white' }}>
                    <CardContent>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                desc: '',
                                submit: null
                            }}
                            onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
                                try {
                                    setSubmitting(true);
                                    signInFail();
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
                            {({ handleSubmit, isSubmitting }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <Box>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="error"
                                            >
                                                Logout
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

LogoutCard.propTypes = {
    isLoading: PropTypes.bool
};

export default LogoutCard;
