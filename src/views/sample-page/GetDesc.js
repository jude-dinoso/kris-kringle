import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const GetDesc = () => {
    const [descList, setDescList] = useState();
    useEffect(() => {
        getDescription();
    }, []);
    const getDescription = () => {
        try {
            const descList = axios
                .get('https://kris-kringle-backend.herokuapp.com/description_all')
                .then(function (response) {
                    setDescList(response.data);
                })
                .catch((err) => {
                    alert(err.data.detail);
                    console.log('error fetching descriptions');
                });
            return descList;
        } catch (err) {
            console.error(err);
        }
    };
    if (descList !== undefined) {
        return (
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {descList.map((row) => (
                            <TableRow key={row.first_name} sx={{ '&last-child td, &: last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.first_name}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};

GetDesc.propTypes = {
    isLoading: PropTypes.bool
};

export default GetDesc;
