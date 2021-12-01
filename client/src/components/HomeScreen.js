//import React, { useContext, useEffect, useState } from 'react'
import React, { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import Statusbar from './Statusbar'
import WorkspaceScreen from './WorkspaceScreen.js'

import HomeIcon from '@mui/icons-material/HomeOutlined'
import GroupsIcon from '@mui/icons-material/GroupsOutlined'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import FunctionsIcon from '@mui/icons-material/FunctionsOutlined'
import SortIcon from '@mui/icons-material/SortOutlined';
import List from '@mui/material/List';
//import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
//import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [searchState, setSearchState] = useState("Home");
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-sort-account-menu';
    const [pass, setPass] = useState("false");

    const handleSortMenuOpen = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleHomePairs() {
        setSearchState("Home");
        store.getHomeLists();
    }
    function handleAllListsPairs() {
        setSearchState("All Lists");
        store.getAllLists();
    }
    function handleUserPairs() {
        setSearchState("Users");
        store.getUsersLists();
    }
    function handleCommunityPairs() {
        store.getCommunityLists();
    }
    function search() {
        let criteria = document.getElementById("search-bar").value;
        setPass(criteria);
        console.log("Searching " + searchState + " Lists with: " + criteria);
        if (searchState === "Home") {
            store.searchHomePairsByName(criteria);
        }
        else if (searchState === "All Lists") {
            store.searchAllListsByName(criteria);
        }
        else if (searchState === "Users") {
            store.searchUsersListsByUser(criteria);
        }
    }
    useEffect(() => {
        search();
    }, []);
    function sort (criteria) {
        console.log("Sorting By: " + criteria);
        store.sortListsByCriteria(criteria);
        handleMenuClose();
    }
    let listCard = "";
    if (store) {
        if (store.currentList != null) {
            listCard = <WorkspaceScreen />
        }
        else {
            listCard = 
                <List sx={{ width: '90%', left: '5%' }}>
                {
                    store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            searchState={searchState}
                        />
                    ))
                }
                </List>;
        }
    }
    return (
        <div id="top5-list-selector" style={{backgroundColor: '#c4c4c4'}}>
            <div id="list-selector-heading">
                <HomeIcon style={{ width: 60, height: 60, minWidth: '80px' }} onClick={handleHomePairs} />
                <GroupsIcon style={{ width: 60, height: 60, minWidth: '80px' }} onClick={handleAllListsPairs} />
                <PersonIcon style={{ width: 60, height: 60, minWidth: '80px' }} onClick={handleUserPairs} />
                <FunctionsIcon style={{ width: 60, height: 60, minWidth: '80px' }} onClick={handleCommunityPairs}/>
                <TextField id='search-bar' 
                           placeholder="Search" 
                           type="search" 
                           style = {{ width: 600 }}
                           onKeyDown={(e) => {if (e.key === "Enter") { search(); }}} 
                />
            </div>
            <div id="list-selector-ending">
                Sort By 
                <IconButton
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleSortMenuOpen} >
                    <SortIcon style={{ width: 60, height: 60, minWidth: '80px', minHeight: '80px' }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => sort("Publish Date (Newest)")}>Publish Date (Newest)</MenuItem>
                    <MenuItem onClick={() => sort("Publish Date (Oldest)")}>Publish Date (Oldest)</MenuItem>
                    <MenuItem onClick={() => sort("Views")}>Views</MenuItem>
                    <MenuItem onClick={() => sort("Likes")}>Likes</MenuItem>
                    <MenuItem onClick={() => sort("Dislikes")}>Dislikes</MenuItem>
                </Menu>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            <Statusbar passed={pass} />
        </div>)
}

export default HomeScreen;