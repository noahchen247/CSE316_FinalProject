import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { passed } = props;
    function handleCreateNewList() {
        store.createNewList();
    }
    let status = "";
    let text = "";
    if (store.currentList) {
        text = store.currentList.name;
        status = 
            <div id="top5-statusbar" style={{backgroundColor: '#c4c4c4'}}>
                <Typography variant="h4">{text}</Typography>
            </div>
    } 
    else if (passed !== "") {
        console.log(passed);
        status = 
            <div id="top5-statusbar" style={{backgroundColor: '#c4c4c4'}}>
                <Typography variant="h4">{passed} Lists</Typography>
            </div>
    }
    else {
        status = 
            <div id="top5-statusbar" style={{backgroundColor: '#c4c4c4'}}>
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
    }
    return (
        status
    );
}

export default Statusbar;