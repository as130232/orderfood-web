import React from "react";
import AppBar from '@material-ui/core/AppBar';
import { Tab, Tabs } from '@material-ui/core';

const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
    }
}

const GroupNav = ({ groupMenuData, groupInView }) => {
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
      setValue(newValue)
    }

		React.useEffect(() => {
			setValue(groupInView);
		}, [groupInView]);

    return (
        <AppBar position="sticky" color="default">
            <Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="secondary"
							textColor="secondary"
							variant="scrollable"
							scrollButtons="on">
							{groupMenuData.map((group, idx) => {
								return (
										<Tab key={idx} label={group.name} onClick={() =>
												scrollToAnchor(group.name)
										} />
								);
							})}
            </Tabs>
        </AppBar>
        // <Nav fill variant="tabs" defaultActiveKey="/home">
        //     {groupMenuData.map((group, idx) => {
        //         return (
        //             <Nav.Item key={idx}>
        //                 <Nav.Link href="/home">{group.name}</Nav.Link>
        //             </Nav.Item>
        //         );
        //     })}
        // </Nav>
    )
}
export default GroupNav;