import { useEffect, useState } from 'react';

// material-ui
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import LoginCard from 'views/dashboard/Default/LoginCard';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';

const SamplePage = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <LoginCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                        <MainCard title="Your monito/monita is..." sx={{ backgroundColor: '#ffb1ab', height: 270 }}>
                            <Typography variant="h2">get from db</Typography>
                        </MainCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                        <MainCard title="How would you describe your monito/monita?" sx={{ backgroundColor: '#76af7b', height: 270 }}>
                            <Typography variant="h2">textbox + button</Typography>
                        </MainCard>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                <MainCard title="Your Monito/Monita's Wishlist (if any)" sx={{ backgroundColor: '#aedef0' }}>
                                    <Typography variant="body2">get from db</Typography>
                                </MainCard>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                <MainCard title="Your Wishlist (optional)" sx={{ backgroundColor: '#f4abb4' }}>
                                    <Typography variant="body2">get from db</Typography>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SamplePage;
