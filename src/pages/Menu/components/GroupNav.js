import React from "react"
import { AppBar, Tab, Tabs } from '@mui/material'

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
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto">
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