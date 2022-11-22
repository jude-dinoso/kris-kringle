import { useContext, useEffect, useState } from 'react';
// material-ui
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import LoginCard from 'views/dashboard/Default/LoginCard';
import { gridSpacing } from 'store/constant';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { AuthStateContext, AuthDispatchContext } from 'contexts/user';

const SamplePage = () => {
    const [isLoading, setLoading] = useState(true);
    const { first_name, recipient } = useContext(AuthStateContext);
    console.log(first_name, recipient, 'hello');
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <MainCard title="Welcome">
                <span>
                    Hi {first_name} your recipient is {recipient}
                </span>
                <Typography variant="body2">testaasdasdasdasdasdasdsadasdsaasdadasdasdasadasdasdas</Typography>
            </MainCard>
            <Grid item xs={12}>
                <Grid item xs={12} md={4}>
                    <LoginCard isLoading={isLoading} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SamplePage;
