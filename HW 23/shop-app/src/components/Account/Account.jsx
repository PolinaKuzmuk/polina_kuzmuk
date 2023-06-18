import React from 'react';
import { Box, Table, TableBody, TableCell, TableRow, Paper, TableHead, TableContainer, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getTotalSumObj } from "../../utils/getTotalSumObj";
import CustomButton from '../common/Button/Button';
import { deleteActiveUserThunk } from '../../store/user/userActions';
import { useNavigate } from "react-router-dom";
import { CustomRow } from "../common/CustomRow/CustomRow";
import './Account.css';

export const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const orderHistory = useSelector(store => store.user.orders);
    const productList = useSelector(store => store.products);
    const totalSumObj = getTotalSumObj(orderHistory, productList);

    function deleteAccount() {
        return (
            dispatch(deleteActiveUserThunk(user))
                .then(() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                })
        )
    }

    return (
        <Box className="account_wrapper main container">
            <Box className='orders'>
                <Typography variant="h3" className="title" fontSize={'2rem'} sx={{ mb: 2 }}>Ordered Items</Typography>
                <TableContainer component={Paper} key='user-history'>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>Item decription</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Sale</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderHistory.map(item => {
                                const elementData = totalSumObj.totalSumObj[item.id];
                                if (elementData) {
                                    return <CustomRow
                                        el={elementData.el}
                                        item={item}
                                        key={`item=${orderHistory.indexOf(item)}`}
                                        totalItemSum={elementData.totalItemSum}
                                        isChanging={false} />
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box className='user-info'>
                <Typography variant="h3" className="title" fontSize={'2rem'} sx={{ mb: 2 }}>My Info</Typography>
                <Box className='name'>
                    <Typography className="paragraph">Name:</Typography>
                    <Typography className='paragraph'>{user.name}</Typography>
                </Box>
                <Box className='email' sx={{ mb: 2 }}>
                    <Typography className="paragraph">Email:</Typography>
                    <Typography className="paragraph">{user.email}</Typography>
                </Box>
                <CustomButton className="btn" type="submit" text="Delete account" onClick={deleteAccount} />
            </Box>
        </Box>
    );
}