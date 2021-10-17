import React from "react"
import styled from "styled-components"

const ImageBoxWrapper = styled.div`
	.scale{
		width: 100%;
	}
	.image{
		position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
	}
`

const ImageBox = ({
	src = '',
	heightRatio = '100%'
}) => (
	<ImageBoxWrapper className="imageBox">
		<div className="scale" style={{paddingTop: heightRatio}}>
			<div className="image" style={{backgroundImage: `url(${src})`}}></div>
		</div>
	</ImageBoxWrapper>
);

export default ImageBox;