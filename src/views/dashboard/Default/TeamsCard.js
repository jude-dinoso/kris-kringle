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
                                        <Typography variant="h3" color="pink">
                                            <center>Pink</center>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle3" sx={{ color: 'pink' }}>
                                            <center>
                                                <p>Rick</p>
                                                <p>Baby</p>
                                                <p>Nita</p>
                                                <p>Maeng</p>
                                                <p>Crispin</p>
                                                <p>Linda</p>
                                                <p>Berna</p>
                                                <p>Jenn</p>
                                                <p>Carl</p>
                                                <p>Ryan</p>
                                                <p>Pam</p>
                                                <p>Denise</p>
                                                <p>Ian</p>
                                                <p>Dan Marlou</p>
                                                <p>Mark Crylle</p>
                                                <p>Yui</p>
                                                <p>Grant</p>
                                                <p>Luna</p>
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
                                                <p>Resty</p>
                                                <p>Lita</p>
                                                <p>Zeny</p>
                                                <p>Raffy</p>
                                                <p>Danny</p>
                                                <p>Rpee</p>
                                                <p>Jan</p>
                                                <p>Mark Haze</p>
                                                <p>Richard</p>
                                                <p>Felix</p>
                                                <p>Anne</p>
                                                <p>Crislyn</p>
                                                <p>Baba</p>
                                                <p>MC</p>
                                                <p>Noah</p>
                                                <p>Rocco</p>
                                                <p>Caelum</p>
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
                                                <p>Edwin</p>
                                                <p>Malou</p>
                                                <p>Fidel</p>
                                                <p>Santy</p>
                                                <p>Shirley</p>
                                                <p>Harold</p>
                                                <p>Frances</p>
                                                <p>Jamil</p>
                                                <p>Majo</p>
                                                <p>Sean</p>
                                                <p>Daene</p>
                                                <p>Vincent</p>
                                                <p>Cardale</p>
                                                <p>Zoe</p>
                                                <p>Kratos</p>
                                                <p>Jodi</p>
                                                <p>Alonzo</p>
                                            </center>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} lg={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" color="#9E9E9E">
                                            <center>White</center>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle3" sx={{ color: '#9E9E9E' }}>
                                            <center>
                                                <p>Clarita</p>
                                                <p>Kulot</p>
                                                <p>Dennis</p>
                                                <p>Hansel</p>
                                                <p>Julie</p>
                                                <p>Hazel</p>
                                                <p>Mark Liriel</p>
                                                <p>Katrina</p>
                                                <p>Marwin</p>
                                                <p>Martina</p>
                                                <p>Renren</p>
                                                <p>TJ</p>
                                                <p>Charlize Kate</p>
                                                <p>Chy</p>
                                                <p>Travis</p>
                                                <p>Yui</p>
                                                <p>Sachi</p>
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
