import React from "react";
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppBar from '@material-ui/core/AppBar';
import { Tab, Tabs } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const GroupNav = ({ groupMenuData }) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        <Tab label={group.name} />
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
    );
};
export default GroupNav;