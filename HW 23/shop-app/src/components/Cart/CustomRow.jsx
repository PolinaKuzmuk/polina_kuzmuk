import React from "react";
import { updateActiveUserThunk } from "../../store/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { TableCell, TableRow, Typography, TextField } from "@mui/material";
import Image from 'mui-image';

export const CustomRow = ({ el, item, totalItemSum }) => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    function updateCart(e) {
        const updatedUser = {
            ...user, shoppingCart: [...user.shoppingCart.map(product => {
                if (product.id === item.id) {
                    return ({
                        id: `${item.id}`,
                        count: Number(e.target.value)
                    })
                } else {
                    return product;
                }
            })]
        }
        dispatch(updateActiveUserThunk(updatedUser))
    }

    function deleteItem() {
        const updatedCart = user.shoppingCart.filter(el => el.id !== item.id);
        const updatedUser = {
            ...user, shoppingCart: [...updatedCart]
        }
        dispatch(updateActiveUserThunk(updatedUser))
    }

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>
                <Image height={70} width={70} src={`img/products/${el.img}.png`} />
            </TableCell>
            <TableCell>{el.title}</TableCell>
            <TableCell>{`$${el.price}`}</TableCell>
            <TableCell>
                <Typography className={el.sale ? `paragraph percent` : 'paragraph'}>
                    {el.sale ? `-${el.salePercent}%` : ''}
                </Typography>
            </TableCell>
            <TableCell>
                <TextField type="number" defaultValue={item.count} InputProps={{ inputProps: { min: 1 } }} onChange={updateCart} />
            </TableCell>
            <TableCell>{`$${totalItemSum}`}</TableCell>
            <TableCell>
                <Image className="trash-img" src="./img/delete.png" height={30} width={30} alt="add-to-cart" onClick={deleteItem} />
            </TableCell>
        </TableRow>
    )
}