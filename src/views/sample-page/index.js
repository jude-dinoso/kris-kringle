import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import LoginCard from 'views/dashboard/Default/LoginCard';
import LogoutCard from './LogoutCard';
import WishCard from './WishCard';
import { gridSpacing } from 'store/constant';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { AuthStateContext } from 'contexts/user';

// switch between desc/guess
// import DescCard from './DescCard';
import GuessCard from './GuessCard';

const SamplePage = () => {
    const [isLoading, setLoading] = useState(true);
    const { first_name, recipient, isLoggedIn, r_wishlist1, r_wishlist2, r_wishlist3 } = useContext(AuthStateContext);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(false);
        if (!isLoggedIn) {
            navigate('/dashboard/default');
        }
    }, [isLoggedIn, navigate]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <MainCard sx={{ height: 258 }}>
                            <Grid container direction="column" alignItems="center" justifyContent="space-between" sx={{ pt: 8 }}>
                                <Typography sx={{ fontSize: '1.5rem', color: 'black' }}>Hello,</Typography>
                                <Typography sx={{ fontSize: '3rem', color: 'black' }}>{first_name}!</Typography>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <MainCard title="Your monito/monita is..." sx={{ backgroundColor: '#ffb1ab', height: 258 }}>
                            <Grid container direction="column" alignItems="center" justifyContent="space-between" sx={{ pt: 5, px: 2 }}>
                                <Typography variant="h1">{recipient}</Typography>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        {/* switch between desc/guess */}
                        {/* <DescCard isLoading={isLoading} /> */}
                        <GuessCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                <MainCard title="Your Monito/Monita's Wishlist (if any)" sx={{ backgroundColor: '#aedef0', height: 420 }}>
                                    <MainCard sx={{ mt: 1.5, backgroundColor: '#4682b4', color: 'white' }}>Item #1: {r_wishlist1}</MainCard>
                                    <MainCard sx={{ mt: 2.9, backgroundColor: '#4682b4', color: 'white' }}>Item #2: {r_wishlist2}</MainCard>
                                    <MainCard sx={{ mt: 2.9, backgroundColor: '#4682b4', color: 'white' }}>Item #3: {r_wishlist3}</MainCard>
                                </MainCard>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                <WishCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                <LoginCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                <LogoutCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SamplePage;
