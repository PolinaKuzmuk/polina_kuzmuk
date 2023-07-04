import React from "react";
import { Box, Table, TableBody, TableCell, TableRow, Paper, TableHead, TableContainer, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../common/Button/Button";
import { CustomRow } from "../common/CustomRow/CustomRow";
import { updateActiveUserThunk } from "../../store/user/userActions";
import { useNavigate } from "react-router-dom";
import { getTotalSumObj } from "../../utils/getTotalSumObj";
import './Cart.css';


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const shoppingCart = useSelector(store => store.user.shoppingCart);
    const productList = useSelector(store => store.products);

    function completeOrder() {
        const updatedUser = { ...user, orders: [...user.orders, ...shoppingCart], shoppingCart: [] }
        dispatch(updateActiveUserThunk(updatedUser))
            .then(navigate('/account'))
    }

    if (shoppingCart.length > 0) {
        const totalSumObj = getTotalSumObj(shoppingCart, productList);

        return (
            <Box className="cart_wrapper main container">
                <Box>
                    <Typography variant="h3" className="title" fontSize={'2rem'} sx={{ mb: 2 }}>Items in shopping cart</Typography>
                    <TableContainer component={Paper} key='user-orders'>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>Item decription</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Sale</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {shoppingCart.map(item => {
                                    const elementData = totalSumObj.totalSumObj[item.id];
                                    if (elementData) {
                                        return <CustomRow
                                            el={elementData.el}
                                            item={item}
                                            key={item.id}
                                            totalItemSum={elementData.totalItemSum}
                                            isChanging={true}/>
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box>
                    <Typography variant="h3" className="title" fontSize={'2rem'} sx={{ mb: 2 }}>My Order Summary</Typography>
                    <Box className="summary" sx={{ mb: 2 }}>
                        <Typography className="paragraph">Order total</Typography>
                        <Typography className="paragraph">${totalSumObj.totalSum}</Typography>
                    </Box>
                    <CustomButton className="btn" type="submit" text="Complete order" onClick={completeOrder} />
                </Box>
            </Box>
        );
    }
    else {
        return <Typography variant="h3" className="empty">Your shopping cart is empty</Typography>
    }
}

export default Cart;