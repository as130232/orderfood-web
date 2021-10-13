import { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import { Box, Grid, Typography, Divider } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { FONT_COLOR } from '../../global/constants'
import { adjustQty, removeFromCart } from '../../redux/Ordering/OrderingActions'

const CartItem = ({ item, removeFromCart, adjustQty }) => {
    let history = useHistory()
    let mealTotal = (item.price + (item.selections.reduce((prev, cur) => { return prev + cur.price }, 0))) * item.qty

    const [mealCount, setMealCount] = useState(item.qty)
    useEffect(() => {
        let count = item.qty;
        setMealCount(count)
    }, [item, mealCount])

    const handleSubCount = (event) => {
        if (item.qty === 1) {
            removeFromCart(item.uuid)
            return
        }
        let count = item.qty - 1;
        adjustQty(item.uuid, count)
    };

    const handleAddCount = (event) => {
        let count = item.qty + 1;
        adjustQty(item.uuid, count)
    };

    return (
        <Box sx={{ my: 3, mx: 2, cursor: 'pointer' }}>
            <Grid item container
                onClick={() => {
                    history.push(`/store/meal/${item.uuid}?`)
                }}>
                <Grid item xs={10}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="overline">{item.selections.map((selection) => selection.name).join(", ")}</Typography>
                    <div />
                    <Typography variant="overline">{item.note ? `"${item.note}"` : ''}</Typography>
                    <RemoveCircleIcon fontSize="large" style={{ color: FONT_COLOR }}
                        onClick={handleSubCount} />
                    {mealCount}
                    <AddCircleIcon fontSize="large" style={{ color: FONT_COLOR }}
                        onClick={handleAddCount} />
                </Grid>
                <Grid item xs={2}>
                    <Typography align="right" variant="h6">${mealTotal}</Typography>
                </Grid>
            </Grid>
            <Divider variant="middle" />
        </Box>
    )
}


const Cart = ({ cart, removeFromCart, adjustQty }) => {
    document.title = "購物車"

    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    useEffect(() => {
        let price = 0
        let count = 0
        cart.forEach(item => {
            count += item.qty
            price += item.qty * (item.price + item.selections.reduce((prev, cur) => { return prev + cur.price }, 0))
        })
        setTotalPrice(price)
        setTotalCount(count)
    }, [cart, totalPrice, totalCount, setTotalPrice, setTotalCount])

    if (cart.length == 0) {
        return (<Box>空的購物車</Box>)
    }

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {cart && cart.map((item, idx) => {
                return <CartItem key={idx} item={item} removeFromCart={removeFromCart} adjustQty={adjustQty}></CartItem>
            })}
            <Box sx={{ my: 3, mx: 2 }}>
                <Grid item container>
                    <Grid item xs={10}>
                        <Typography variant="h6" align="right">數量:{totalCount} , 小計</Typography>
                        {/* 運費 */}
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" align="right" >${totalPrice}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state, dispatch) => {
    return {
        cart: state.order.cart,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        adjustQty: (uuid, qty) => dispatch(adjustQty(uuid, qty)),
        removeFromCart: (uuid) => dispatch(removeFromCart(uuid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)