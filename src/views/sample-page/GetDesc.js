import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
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
                    const result = response.data.map((row) => {
                        row.done = false;
                        row.correct = false;
                        return row;
                    });
                    setDescList(result);
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

    const verifySS = useCallback(
        (row) => {
            row.correct = row.guess === row.secret_santa;
            row.done = true;

            const list = [...descList];
            const idx = list.findIndex((r) => r.first_name === row.first_name);
            list[idx] = row;

            setDescList(list);
        },
        [descList]
    );

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Guess</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {descList?.map((row) => (
                        <TableRow key={row.first_name} sx={{ '&last-child td, &: last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.first_name}
                            </TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell
                                style={{
                                    fontWeight: row.done ? 'bold' : 'inherit',
                                    color: row.done ? (row.correct ? 'green' : 'red') : 'inherit'
                                }}
                                onClick={() => verifySS(row)}
                            >
                                {row.done ? row.secret_santa : row.guess}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

GetDesc.propTypes = {
    isLoading: PropTypes.bool
};

export default GetDesc;
