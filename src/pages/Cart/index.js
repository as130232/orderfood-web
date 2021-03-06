import { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import { Alert, AlertTitle, Box, Grid, Typography, Divider, TextField, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { FONT_COLOR } from '../../global/globalStyle'
import { API_GET_ORDER } from '../../global/constants'
import { adjustQty, removeFromCart } from '../../redux/Ordering/OrderingActions'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { useLiff } from 'react-liff'
import { TransitionGroup } from 'react-transition-group';

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

// const DeliveryType = ({ type }) => {
//     //??????
//     if (type === 1) {
//         // const [date, setDate] = React.useState(new Date());
//         return (
//             <div>
//                 {/* <MobileDatePicker
//                     label="For mobile"
//                     value={date}
//                     onChange={(newValue) => {
//                         setDate(newValue);
//                     }}
//                     renderInput={(params) => <TextField {...params} />}
//                 /> */}
//             </div>
//         )
//     } else if (type === 2) {

//     }
// }

const Cart = ({ cart, store, removeFromCart, adjustQty }) => {
    document.title = "?????????"
    const { liff, isLoggedIn } = useLiff()
    const [lineProfile, setLineProfile] = useState('')
    const [order, setOrder] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    let thirtyMinutesLater = new Date()
    thirtyMinutesLater.setMinutes(Math.round(thirtyMinutesLater.getMinutes() / 10) * 10 + 30)
    thirtyMinutesLater.setSeconds(0)
    thirtyMinutesLater.setMilliseconds(0)
    const [dateValue, setDateValue] = useState(thirtyMinutesLater)

    useEffect(() => {
        if (!isLoggedIn) return;
        (async () => {
            const profile = await liff.getProfile();
            setLineProfile(profile)
        })()
    }, [liff, isLoggedIn])

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
            "code": store.id,
            "group": false,
            "note": "",
            "type": 1,
            "takeTime": dateValue,
            "items": items,
            "userToken": lineProfile.userId,
            "username": lineProfile.displayName,
            // "address": "string",
            // "phone": "string",
        })
    }, [cart, totalPrice, totalCount, setTotalPrice, setTotalCount, dateValue, store, lineProfile])



    if (cart.length === 0) {
        return (<Box>???????????????</Box>)
    }

    const submit = () => {
        console.log('order', order)
        setIsLoading(true)
        fetch(API_GET_ORDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(res => res.json()).then(res => res.data).then((orderUuid) => {
            console.log('orderUuid', orderUuid)
            if (orderUuid === null) {
                return (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        ?????????????????????
                    </Alert>)
            }
            liff.sendMessages([
                {
                    type: 'text',
                    text: '@?????? ' + orderUuid
                }
            ]).then(() => {
                console.log('message sent')
                liff.closeWindow()  //????????????
            }).catch((err) => {
                console.log('sendMessages error', err)
            })
        }).catch((error) => {
            console.error('API_GET_ORDER error', error)
        })
    }

    let maxDateTime = new Date()
    maxDateTime.setHours(store.closedTime ? store.closedTime.split(':')[0] : 23)
    maxDateTime.setMinutes(store.closedTime ? store.closedTime.split(':')[1] : 59)

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {cart && cart.map((item, idx) => {
                return <CartItem key={idx} item={item} removeFromCart={removeFromCart} adjustQty={adjustQty}></CartItem>
            })}
            <Box sx={{ my: 3, mx: 2 }}>
                <Grid item container>
                    <Grid item xs={10}>
                        <Typography variant="h6" align="right">??????:{totalCount} , ??????</Typography>
                        {/* ?????? */}
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
                        label="??????"
                        variant="outlined"
                        multiline
                        rows={1}
                        value={order.note}
                        onChange={(e) => { setOrder(prev => ({ ...prev, note: e.target.value })) }}
                    />
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="payType" name="row-radio-buttons-group" defaultValue="1">
                            <FormControlLabel value="1" control={<Radio />} label="????????????" />
                            <FormControlLabel
                                value="2"
                                disabled
                                control={<Radio />}
                                label="????????????"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="type" name="row-radio-buttons-group" defaultValue="1">
                            <FormControlLabel value="1" control={<Radio />} label="??????" onChange={(e) => {
                                setOrder(prev => ({ ...prev, type: e.target.value }))
                            }} />
                            <FormControlLabel value="2" control={<Radio />} label="????????????" onChange={(e) => {
                                setOrder(prev => ({ ...prev, type: e.target.value }))
                            }} />
                        </RadioGroup>
                    </FormControl>

                    <DateTimePicker
                        value={dateValue}
                        minDateTime={new Date()}
                        maxDateTime={maxDateTime}
                        onChange={(newValue) => {
                            setDateValue(newValue)
                            setOrder(prev => ({ ...prev, takeTime: newValue }))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <p></p>
                    <LoadingButton loading={isLoading} variant="contained" onClick={submit}>??????</LoadingButton>
                </Grid>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.order.cart,
        store: state.order.store
    }
}
const mapDispatchToProps = dispatch => {
    return {
        adjustQty: (uuid, qty) => dispatch(adjustQty(uuid, qty)),
        removeFromCart: (uuid) => dispatch(removeFromCart(uuid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)