import React, { useEffect, useState, useRef } from "react";
import Item from "./Item";
import { Card, CardHeader, CardContent, Box, Grid, Typography } from '@material-ui/core';
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
	let currentGroupIndex = 0;
	let bufferDistance = 80; // 緩衝距離

	let firstGroupTop = 0;
	let lastGroupBottom = 0;

	groupElements.forEach((grp, index) => {
		const groupTop = grp.getBoundingClientRect().top - bufferDistance // group的上緣的位置
		const groupBottom = grp.getBoundingClientRect().bottom + bufferDistance // group的下緣的位置

		if (index === 0) {
			firstGroupTop = groupTop
		}

		if (index === groupElements.length - 1) {
			lastGroupBottom = groupBottom;
		}

		if (windowScrollY >= groupTop && windowScrollY <= groupBottom) {
			// 若scrollY介於 group的上緣、下緣之間，就是當前的group
			currentGroupIndex = index;
			return currentGroupIndex
		}
	})

	if (windowScrollY < firstGroupTop) {
		currentGroupIndex = 0
	}
	if (windowScrollY > lastGroupBottom) {
		currentGroupIndex = groupElements.length - 1;
	}

	return currentGroupIndex
}

const Group = ({ groupMenuData, updateGroupInView }) => {

	const prevScrollY = useScrollYPosition() // 上一次 Y scroll位置

	const groupRef = useRef([]);

	useEffect(() => {

		if (groupRef.current) {
			const groupIndex = getCurrentGroupInView(prevScrollY, groupRef.current);
			updateGroupInView(groupIndex);
		}

	}, [groupRef, prevScrollY])

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
