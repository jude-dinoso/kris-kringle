import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { AuthStateContext, AuthDispatchContext, updateDescription, signInFailure } from 'contexts/user';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardContent, FormControl, OutlinedInput } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import { Formik } from 'formik';

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
                <MainCard
                    title="How would you describe your monito/monita?"
                    content={false}
                    sx={{ backgroundColor: '#D0F0C0', height: 258 }}
                >
                    <CardContent>
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
                                            <MainCard
                                                sx={{
                                                    mb: 2.2,
                                                    backgroundColor: 'transparent',
                                                    color: 'black',
                                                    height: 70,
                                                    mt: 0.2,
                                                    borderColor: '#30b05a'
                                                }}
                                            >
                                                {desc}
                                            </MainCard>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                color="success"
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
                                                    sx={{ mb: 0.4, mt: -0.5 }}
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
                                                        color="success"
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
