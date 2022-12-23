import PropTypes from 'prop-types';

// material-ui
import { CardContent, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';

// assets

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const TeamsCard = ({ isLoading }) => {
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Teams</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ mt: 3.6 }} xs={12}>
                                <Grid item xs={6} sm={3} md={3} lg={3} sx={{ mb: 1.5 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" color="red">
                                            <center>Red</center>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle3" sx={{ color: 'red' }}>
                                            <center>
                                                <p style={{ textTransform: 'capitalize' }}>noli</p>
                                                <p style={{ textTransform: 'capitalize' }}>cell</p>
                                                <p style={{ textTransform: 'capitalize' }}>maeng</p>
                                                <p style={{ textTransform: 'capitalize' }}>elmer</p>
                                                <p style={{ textTransform: 'capitalize' }}>riz</p>
                                                <p style={{ textTransform: 'capitalize' }}>tj</p>
                                                <p style={{ textTransform: 'capitalize' }}>janelle</p>
                                                <p style={{ textTransform: 'capitalize' }}>noemi</p>
                                                <p style={{ textTransform: 'capitalize' }}>erika</p>
                                                <p style={{ textTransform: 'capitalize' }}>emory</p>
                                            </center>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} lg={3} sx={{ mb: 1.5 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" color="blue">
                                            <center>Blue</center>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle3" sx={{ color: 'blue' }}>
                                            <center>
                                                <p style={{ textTransform: 'capitalize' }}>resty</p>
                                                <p style={{ textTransform: 'capitalize' }}>lita</p>
                                                <p style={{ textTransform: 'capitalize' }}>fidel</p>
                                                <p style={{ textTransform: 'capitalize' }}>ryan</p>
                                                <p style={{ textTransform: 'capitalize' }}>ruthie</p>
                                                <p style={{ textTransform: 'capitalize' }}>nevin</p>
                                                <p style={{ textTransform: 'capitalize' }}>maki</p>
                                                <p style={{ textTransform: 'capitalize' }}>pikay</p>
                                                <p style={{ textTransform: 'capitalize' }}>jas</p>
                                                <p style={{ textTransform: 'capitalize' }}>zaccy</p>
                                            </center>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} lg={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" color="green">
                                            <center>Green</center>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle3" sx={{ color: 'green' }}>
                                            <center>
                                                <p style={{ textTransform: 'capitalize' }}>precy</p>
                                                <p style={{ textTransform: 'capitalize' }}>norman</p>
                                                <p style={{ textTransform: 'capitalize' }}>jeanette</p>
                                                <p style={{ textTransform: 'capitalize' }}>ichi</p>
                                                <p style={{ textTransform: 'capitalize' }}>joan</p>
                                                <p style={{ textTransform: 'capitalize' }}>anika</p>
                                                <p style={{ textTransform: 'capitalize' }}>blake</p>
                                                <p style={{ textTransform: 'capitalize' }}>gab</p>
                                                <p style={{ textTransform: 'capitalize' }}>ellen</p>
                                                <p style={{ textTransform: 'capitalize' }}>edge</p>
                                            </center>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} lg={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" color="#FCE205">
                                            <center>Yellow</center>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle3" sx={{ color: '#FCE205' }}>
                                            <center>
                                                <p style={{ textTransform: 'capitalize' }}>ineng</p>
                                                <p style={{ textTransform: 'capitalize' }}>ej</p>
                                                <p style={{ textTransform: 'capitalize' }}>rich</p>
                                                <p style={{ textTransform: 'capitalize' }}>julius</p>
                                                <p style={{ textTransform: 'capitalize' }}>tine</p>
                                                <p style={{ textTransform: 'capitalize' }}>pam</p>
                                                <p style={{ textTransform: 'capitalize' }}>biboy</p>
                                                <p style={{ textTransform: 'capitalize' }}>reman</p>
                                                <p style={{ textTransform: 'capitalize' }}>alphee</p>
                                                <p style={{ textTransform: 'capitalize' }}>kite</p>
                                            </center>
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

TeamsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TeamsCard;
