import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, Dialog, DialogTitle, Divider, Grid, Avatar, Typography, DialogContent } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ContributionCard = ({ isLoading }) => {
    const [open, setOpen] = React.useState(false);
    const [openSRMC, setOpenSRMC] = React.useState(false);
    const theme = useTheme();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenSRMC = () => {
        setOpenSRMC(true);
    };
    const handleCloseSRMC = () => {
        setOpenSRMC(false);
    };
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Contributions & Penalties</Typography>
                                        <Typography variant="body2">to be used for team and bingo prizes</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            Php700
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">1st Generation</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Php500
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">2nd Generation</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Php400
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">3rd Generation - Married</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Php300
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">3rd Generation - Single & Employed</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Php50
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">Penalty for:</Typography>
                                        <Typography variant="subtitle2">- late submission of description (12/11)</Typography>
                                        <Typography variant="subtitle2">- late submission of guess (12/21)</Typography>
                                        <Typography variant="subtitle2">- incorrect secret santa guess</Typography>
                                        <Typography variant="subtitle2">- correct guess by monito/monita</Typography>
                                        <Typography variant="subtitle2">- wrong shirt color at event</Typography>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item>
                                        <Typography variant="subtitle2" color="black">
                                            Modes of payment:
                                        </Typography>
                                        <Grid container xs={12} align="center">
                                            <Grid item xs={6}>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        ...theme.typography.commonAvatar,
                                                        ...theme.typography.medAvatar,
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        my: 1
                                                    }}
                                                    onClick={handleClickOpen}
                                                >
                                                    <SendToMobileIcon />
                                                </Avatar>
                                                <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle variant="h3">GCash</DialogTitle>
                                                    <DialogContent>
                                                        <img
                                                            src="https://pamortiz.net/SJReunion2017/assets/img/IMG_5066.jpg"
                                                            alt="Gcash"
                                                            width="200"
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        ...theme.typography.commonAvatar,
                                                        ...theme.typography.medAvatar,
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        my: 1
                                                    }}
                                                    onClick={handleClickOpenSRMC}
                                                >
                                                    <PaymentsIcon />
                                                </Avatar>
                                                <Dialog
                                                    open={openSRMC}
                                                    onClose={handleCloseSRMC}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle variant="h3">Manual</DialogTitle>
                                                    <DialogContent>Directly pay by cash to Berna or Cely at SRMC.</DialogContent>
                                                </Dialog>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="subtitle2" color="black">
                                            Please submit contributions by December 18th.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

ContributionCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ContributionCard;
