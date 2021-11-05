import React, { useEffect, useRef } from "react"
import Item from "./Item";
import styled from "styled-components"
import { PAGE_CONTAINER } from '../../../global/globalStyle'
import useScrollYPosition from "../../../hooks/useScrollYPosition"

const GroupWrapper = styled.div`
	${PAGE_CONTAINER}
`

const AGroup = styled.ul`
	margin-bottom: 48px;
	.groupTitle{
		font-weight: 400;
	}
`

function getCurrentGroupInView(windowScrollY, groupElements){
	const bufferDistance = 80; // 緩衝距離
	let groupInView = null; // 滑進範圍的group
	groupElements.forEach((grp, index) => {
		const groupTop = grp.getBoundingClientRect().top - bufferDistance // group的top與螢幕上邊框的距離，會隨著scroll改變
		const groupBottom = grp.getBoundingClientRect().bottom + bufferDistance // group的bottom與螢幕上邊框的距離

		if (windowScrollY >= groupTop && windowScrollY <= groupBottom) {
			groupInView = index
		}
	})
	return groupInView
}

const Group = ({ groupMenuData, updateGroupInView }) => {
	const prevScrollY = useScrollYPosition() // 上一次 Y scroll位置
	const groupRef = useRef([]);
	useEffect(() => {

		if (!groupRef.current) {
			return
		}
			
		const groupIndex = getCurrentGroupInView(prevScrollY, groupRef.current);
		if (groupIndex !== null) {
			updateGroupInView(groupIndex);
		}
		
	}, [groupRef, prevScrollY, updateGroupInView])

  return (
		<GroupWrapper className="group-wrapper">
			{groupMenuData.map((group, idx) => (
				<AGroup key={idx} id={group.name} ref={ref => {
					groupRef.current[idx] = ref
				}}>
					<h2 className="groupTitle">{group.name}</h2>
					{group.items.map((item) => {
						const { id, name, note, price } = item;
						return (
							<Item key={id} id={id} name={name} note={note} price={price} />
						);
					})}
				</AGroup>
				)
			)}
		</GroupWrapper>
  );
};
export default Group;

