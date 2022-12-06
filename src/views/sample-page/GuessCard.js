import React from 'react';
import PropTypes from 'prop-types';
import { useState, useContext, useEffect, useRef } from 'react';
import { AuthStateContext, AuthDispatchContext, updateGuess, signInFailure } from 'contexts/user';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Autocomplete,
    Avatar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Box,
    Button,
    CardContent,
    FormControl,
    TextField
} from '@mui/material';
import { gridSpacing } from 'store/constant';
import DescriptionIcon from '@mui/icons-material/Description';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import { Formik } from 'formik';

// assets
import { members } from './family';
import GetDesc from './GetDesc';

const GuessCard = ({ isLoading }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const authDispatch = useContext(AuthDispatchContext);
    const { first_name, guess } = useContext(AuthStateContext);
    const [isEdit, setIsEdit] = useState(!guess);
    const [inputValue, setInputValue] = useState('');

    // best way to fix this is to listen to the login event
    const userGuess = useRef(guess);
    const userName = useRef(first_name);

    const initialValues = {
        guess,
        submit: null
    };

    useEffect(() => {
        if (userGuess.current !== guess && userName.current !== first_name) {
            setIsEdit(!guess);
            userName.current = first_name;
            userGuess.current = guess;
        }
    }, [guess, first_name]);

    const updateUserGuess = (userData) => {
        updateGuess(authDispatch, userData, first_name);
    };
    const signInFail = () => {
        signInFailure(authDispatch);
    };
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard title="Who do you think is your Secret Santa?" content={false} sx={{ backgroundColor: '#D0F0C0', height: 258 }}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={4} sm={4} md={4} lg={4} sx={{ my: 2 }}>
                                <center>
                                    <Typography sx={{ fontSize: 10, color: '#8b0000' }}>Description List:</Typography>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: '#8b0000',
                                            color: 'white',
                                            my: 1
                                        }}
                                        onClick={handleClickOpen}
                                    >
                                        <DescriptionIcon />
                                    </Avatar>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle variant="h3">Description List</DialogTitle>
                                        <DialogContent>
                                            <GetDesc isLoading={isLoading} />
                                        </DialogContent>
                                    </Dialog>
                                </center>
                            </Grid>
                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                <Formik
                                    enableReinitialize
                                    initialValues={initialValues}
                                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                        try {
                                            const userData = { ...values };
                                            setSubmitting(true);
                                            updateUserGuess(userData);
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
                                    {({ setFieldValue, handleSubmit, isSubmitting, values }) => (
                                        <>
                                            {!isEdit && !isSubmitting ? (
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
                                                        {guess}
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
                                                        Change Guess
                                                    </Button>
                                                </>
                                            ) : (
                                                <form noValidate onSubmit={handleSubmit}>
                                                    <FormControl fullWidth sx={{ ...theme.typography.autoCompleteContainer }}>
                                                        <Autocomplete
                                                            id="outlined-adornment-email-login"
                                                            type="guess"
                                                            name="guess"
                                                            value={values.guess}
                                                            inputValue={inputValue}
                                                            onInputChange={(_event, newInputValue) => {
                                                                setInputValue(newInputValue);
                                                            }}
                                                            onChange={(_event, value) => setFieldValue('guess', value?.label ?? null)}
                                                            options={members}
                                                            groupBy={(option) => option.family}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="SJ Family Member"
                                                                    sx={{ ...theme.typography.autoCompleteInput }}
                                                                />
                                                            )}
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
                                                                Submit Guess
                                                            </Button>
                                                        </AnimateButton>
                                                    </Box>
                                                </form>
                                            )}
                                        </>
                                    )}
                                </Formik>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

GuessCard.propTypes = {
    isLoading: PropTypes.bool
};

export default GuessCard;
