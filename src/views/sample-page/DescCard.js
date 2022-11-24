import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthStateContext, AuthDispatchContext, updateDescription, signInFailure } from 'contexts/user';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardContent, FormControl, InputLabel, Typography, OutlinedInput } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import { Formik } from 'formik';
import _get from 'lodash.get';

const DescCard = ({ isLoading }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const authDispatch = useContext(AuthDispatchContext);
    const { first_name, desc } = useContext(AuthStateContext);
    const [isEdit, setIsEdit] = useState(!desc);

    const updateDesc = (userData) => {
        updateDescription(authDispatch, userData, first_name);
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
                            enableReinitialize
                            initialValues={{
                                desc,
                                submit: null
                            }}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    const userData = { ...values };
                                    setSubmitting(true);
                                    updateDesc(userData);
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
                                    {desc && !isEdit && !isSubmitting ? (
                                        <>
                                            <p>{desc}</p>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                color="orange"
                                                sx={{ color: 'white' }}
                                                onClick={() => setIsEdit(!isEdit)}
                                            >
                                                Change Description
                                            </Button>
                                        </>
                                    ) : (
                                        <form noValidate onSubmit={handleSubmit}>
                                            <FormControl
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                sx={{ ...theme.typography.customInput }}
                                            >
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="desc"
                                                    value={values.desc}
                                                    name="desc"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    multiline
                                                    rows={2}
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
                                                        sx={{ color: 'white' }}
                                                    >
                                                        Submit Description
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

DescCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DescCard;
