//import React, { useContext, useEffect, useState } from 'react'
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import HomeIcon from '@mui/icons-material/Home'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import FunctionsIcon from '@mui/icons-material/Functions'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
//import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';

import WorkspaceScreen from './WorkspaceScreen.js'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [searchState, setSearchState] = useState("Home");

    function handleHomePairs() {
        setSearchState("Home");
        store.homeTest();
    }
    function handleAllListsPairs() {
        setSearchState("All Lists");
        store.getAllLists();
    }
    function handleUserPairs() {
        setSearchState("Users");
        store.getUsersLists();
    }
    //NEED SOMETHING FOR COMMUNITY LISTS IDK
    function search() {
        let criteria = document.getElementById("search-bar").value;
        console.log(searchState + ": " + criteria);
        if (searchState === "Home") {
            store.searchHomePairsByName(criteria);
            //console.log(store.idNamePairs);
        }
        else if (searchState === "All Lists") {
            store.searchAllListsByName(criteria);
        }
        else if (searchState === "Users") {
            //FILL THIS IN AND PROBABLY REPLACE WITH SWITCH???
            store.searchUsersListsByUser(criteria);
        }
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
            <Fab 
                color="primary" 
                aria-label="add"
                onClick={handleHomePairs}
            >
                <HomeIcon />
            </Fab>
            <Fab 
                color="primary" 
                aria-label="add"
                onClick={handleAllListsPairs}
            >
                <GroupsIcon />
            </Fab>
            <Fab 
                color="primary" 
                aria-label="add"
                onClick={handleUserPairs}
            >
                <PersonIcon />
            </Fab>
            <Fab 
                color="primary" 
                aria-label="add"
                onClick={handleHomePairs}
            >
                <FunctionsIcon />
            </Fab>
            <TextField id='search-bar' placeholder="Search" type="search" onKeyDown={(e) => {if (e.key === "Enter") { search(); }}} />
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
        </div>)
}

export default HomeScreen;