import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import FunctionsIcon from '@mui/icons-material/Functions'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [searchState, setSearchState] = useState("Home");

    useEffect(() => {
        store.loadIdNamePairs();
        store.getHomeLists();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    function handleHomePairs() {
        setSearchState("Home");
        store.getHomeLists();
    }
    function handleUserPairs() {
        //console.log(document.getElementById("search-bar").value);
        setSearchState("Users");
        store.loadIdNamePairs();
    }
    let listCard = "";
    if (store) {
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
                onClick={handleHomePairs}
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
            <TextField id='search-bar' placeholder="Search" type="search" />
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
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