import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import styled from "styled-components"
// import { styled } from '@material-ui/styles';
import { addToCart } from '../../../redux/Ordering/OrderingActions'
import { Box, Grid, ButtonBase, Typography, Paper } from '@material-ui/core'
import { FONT_COLOR } from '../../../global/globalStyle'
import ImageBox from "../../../components/ImageBox"

const itemHeight = `100px`;

const ItemWrapper = styled.li`
	display: flex;
	margin-bottom: 16px;
	height: ${itemHeight};
	box-shadow: 2px 2px 12px 0px rgba(0,0,0,0.1);
	cursor: pointer;
	.info{
		padding: 8px 8px 8px 16px;
		flex: 1;
		.name {
			margin-top: 0;
			margin-bottom: 6px;
			font-size: 1em;
			font-weight: 500;
		}
		.desc {
			margin-top: 0;
			font-size: 0.8em;
		}
		.price{
			font-size: 0.8em;
			font-weight: bold;
			color: ${FONT_COLOR.ORANGE};
			position: absolute;
    	bottom: 8px;
		}
	}
	.image{
		width: ${itemHeight};
	}
`

const Item = ({ id, name, note, price, addToCart }) => {
  let history = useHistory();
  return (
		<ItemWrapper onClick={() => {
			history.push(`/store/meal/${id}`)
		}}>
			<div className="info">
				<h3 className="name">{name}</h3>
				<p className="desc">{note}</p>
				<span className="price">${price}</span>
			</div>
			<div className="image">
				<ImageBox src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/change-1585927834.png?crop=0.501xw:1.00xh;0,0&resize=100:*" heightRatio="100%" />
			</div>
		</ItemWrapper>
  );
};

const mapStateToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}
export default connect(null, mapStateToProps)(Item);
