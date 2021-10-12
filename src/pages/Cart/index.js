
import { connect } from 'react-redux'


const Cart = ({ cart }) => {
    return (
        <div>
            This is Cart.
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.order.cart
    }
}
export default connect(mapStateToProps)(Cart)