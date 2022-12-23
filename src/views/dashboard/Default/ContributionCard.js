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
    const [openCSJ, setOpenCSJ] = React.useState(false);
    const [openESJ, setOpenESJ] = React.useState(false);
    const [openRSJ, setOpenRSJ] = React.useState(false);
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
    const handleClickOpenCSJ = () => {
        setOpenCSJ(true);
    };
    const handleCloseCSJ = () => {
        setOpenCSJ(false);
    };
    const handleClickOpenESJ = () => {
        setOpenESJ(true);
    };
    const handleCloseESJ = () => {
        setOpenESJ(false);
    };
    const handleClickOpenRSJ = () => {
        setOpenRSJ(true);
    };
    const handleCloseRSJ = () => {
        setOpenRSJ(false);
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
                                        <Typography variant="h4">Penalty (Php20)</Typography>
                                        <Typography variant="body2">to be used for team and bingo prizes</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={6}>
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
                                <Divider sx={{ my: 1.5 }} />
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        Total contribution amount: Php15000
                                    </Typography>
                                    <Typography variant="subtitle2" color="inherit">
                                        Contribution breakdown:
                                    </Typography>
                                    <Grid container xs={12} align="center">
                                        <Grid item xs={4}>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.medAvatar,
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    my: 1
                                                }}
                                                onClick={handleClickOpenRSJ}
                                            >
                                                RSJ
                                            </Avatar>
                                            <Dialog
                                                open={openRSJ}
                                                onClose={handleCloseRSJ}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle variant="h3" align="center">
                                                    RSJ Total: Php8700
                                                </DialogTitle>
                                                <DialogContent align="center">
                                                    <p>Nita - Php700</p>
                                                    <p>Baby - Php500</p>
                                                    <p>Harold - Php400</p>
                                                    <p>Carl - Php300</p>
                                                    <p>Jan - Php300</p>
                                                    <p>Malou - Php500</p>
                                                    <p>Rpee - Php400</p>
                                                    <p>Marwin - Php300</p>
                                                    <p>Diane(Raffy) - Php500</p>
                                                    <p>Majo - Php400</p>
                                                    <p>Sean - Php300</p>
                                                    <p>Zeny - Php500</p>
                                                    <p>Hazel - Php400</p>
                                                    <p>Frances - Php400</p>
                                                    <p>Mark - Php400</p>
                                                    <p>Katrina - Php400</p>
                                                    <p>Dennis - Php500</p>
                                                    <p>Felix - Php400</p>
                                                    <p>Denise - Php300</p>
                                                    <p>Danny - Php500</p>
                                                    <p>Dan Marlou - Php300</p>
                                                </DialogContent>
                                            </Dialog>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.medAvatar,
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    my: 1
                                                }}
                                                onClick={handleClickOpenESJ}
                                            >
                                                ESJ
                                            </Avatar>
                                            <Dialog
                                                open={openESJ}
                                                onClose={handleCloseESJ}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle variant="h3" align="center">
                                                    ESJ Total: Php2600
                                                </DialogTitle>
                                                <DialogContent align="center">
                                                    <p>Lita - Php700</p>
                                                    <p>Peen - Php500</p>
                                                    <p>Tessa - Php300</p>
                                                    <p>Gie - Php500</p>
                                                    <p>Joelle - Php300</p>
                                                    <p>Pam - Php300</p>
                                                </DialogContent>
                                            </Dialog>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.medAvatar,
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    my: 1
                                                }}
                                                onClick={handleClickOpenCSJ}
                                            >
                                                CSJ
                                            </Avatar>
                                            <Dialog
                                                open={openCSJ}
                                                onClose={handleCloseCSJ}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle variant="h3" align="center">
                                                    CSJ Total: Php3700
                                                </DialogTitle>
                                                <DialogContent align="center">
                                                    <p>Clarita - Php700</p>
                                                    <p>Santy - Php500</p>
                                                    <p>Crispin - Php500</p>
                                                    <p>Crislyn - Php300</p>
                                                    <p>Baba - Php300</p>
                                                    <p>Renren - Php300</p>
                                                    <p>Kulot - Php500</p>
                                                    <p>MC - Php300</p>
                                                    <p>Ian - Php300</p>
                                                </DialogContent>
                                            </Dialog>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="subtitle2" color="inherit">
                                        Contribution deadline: 12/18
                                    </Typography>
                                </Grid>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography variant="subtitle1">Incorrect secret santa guess</Typography>
                                        <Divider sx={{ my: 1.5 }} />
                                        <Typography variant="subtitle1">Correct guess by monito/monita</Typography>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item>
                                        <Typography variant="subtitle2" color="inherit">
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
