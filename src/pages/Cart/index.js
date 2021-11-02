import { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { Button, Box, Grid, Typography, Divider, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { FONT_COLOR } from '../../global/globalStyle'
import { adjustQty, removeFromCart } from '../../redux/Ordering/OrderingActions'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';

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
    }

    const handleAddCount = (event) => {
        let count = item.qty + 1;
        adjustQty(item.uuid, count)
    }

    return (
        <Box sx={{ my: 3, mx: 2, cursor: 'pointer' }}>
            <Grid item container
                onClick={() => {
                    history.push(`/store/meal/${item.id}?uuid=${item.uuid}`)
                }}
            >
                <Grid item xs={10}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="overline">{item.selections.map((selection) => selection.name).join(", ")}</Typography>
                    <div />
                    <Typography variant="overline">{item.note ? `"${item.note}"` : ''}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align="right" variant="h6">${mealTotal}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Grid item>
                    <RemoveCircleIcon fontSize="large" style={{ color: FONT_COLOR.ORANGE, cursor: 'pointer' }}
                        onClick={handleSubCount} />
                </Grid>
                <Grid item>
                    <Typography variant="h5">{mealCount}</Typography>
                </Grid>
                <Grid item>
                    <AddCircleIcon fontSize="large" style={{ color: FONT_COLOR.ORANGE, cursor: 'pointer' }}
                        onClick={handleAddCount} />
                </Grid>
            </Grid>
            <Divider variant="middle" />
        </Box>
    )
}

const DeliveryType = ({ type }) => {
    //自取
    if (type === 1) {
        // const [date, setDate] = React.useState(new Date());
        return (
            <div>
                {/* <MobileDatePicker
                    label="For mobile"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                /> */}
            </div>
        )
    } else if (type === 2) {

    }
}

const Cart = ({ cart, storeCode, removeFromCart, adjustQty }) => {
    document.title = "購物車"
    const [order, setOrder] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    useEffect(() => {
        let price = 0
        let count = 0
        let items = [];
        cart.forEach(item => {
            count += item.qty
            price += item.qty * (item.price + item.selections.reduce((prev, cur) => { return prev + cur.price }, 0))
            let selections = item.selections.map(e => e.id)
            let orderItem = {
                "count": item.qty,
                "mealId": item.id,
                "note": item.note,
                "selections": selections
            }
            items.push(orderItem)
        })
        setTotalPrice(price)
        setTotalCount(count)
        setOrder({
            "code": storeCode,
            "group": false,
            "note": "",
            "type": 1,
            "takeTime": "",
            "items": items,
            // "address": "string",
            // "phone": "string",
            // "userToken": "string",
            // "username": "string"
        })
    }, [cart, totalPrice, totalCount, setTotalPrice, setTotalCount])

    const [value, setValue] = useState(new Date());

    if (cart.length == 0) {
        return (<Box>空的購物車</Box>)
    }

    const submit = () => {
        console.log('order', order)

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

                <p></p>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <TextField
                        id="outlined-basic"
                        label="備註"
                        variant="outlined"
                        multiline
                        rows={1}
                        value={order.note}
                        onChange={(e) => { setOrder(prev => ({ ...prev, note: e.target.value })) }}
                    />
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="payType" name="row-radio-buttons-group" defaultValue="1">
                            <FormControlLabel value="1" control={<Radio />} label="現場付款" />
                            <FormControlLabel
                                value="2"
                                disabled
                                control={<Radio />}
                                label="線上付款"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="type" name="row-radio-buttons-group" defaultValue="1">
                            <FormControlLabel value="1" control={<Radio />} label="自取" onChange={(e) => {
                                setOrder(prev => ({ ...prev, type: e.target.value }))
                            }} />
                            <FormControlLabel value="2" control={<Radio />} label="店家外送" onChange={(e) => {
                                setOrder(prev => ({ ...prev, type: e.target.value }))
                            }} />
                        </RadioGroup>
                    </FormControl>

                    <MobileDateTimePicker
                        value={value}
                        minDateTime={new Date()}
                        // onChange={(newValue) => {
                        //     setValue(newValue);
                        // }}
                        onChange={(newValue) => {
                            setOrder(prev => ({ ...prev, takeTime: newValue }))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <p></p>
                    <Button variant="contained" onClick={submit}>訂餐</Button>
                </Grid>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.order.cart,
        storeCode: state.order.storeCode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        adjustQty: (uuid, qty) => dispatch(adjustQty(uuid, qty)),
        removeFromCart: (uuid) => dispatch(removeFromCart(uuid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)