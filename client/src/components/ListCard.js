import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
//import AuthContext from '../auth';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
//import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    //const { auth } = useContext(AuthContext);
    //const [editActive, setEditActive] = useState(false);
    //const [text, setText] = useState("");
    const { idNamePair, searchState } = props;
    const [listActive, setListActive] = useState(false);

    var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

    function handleLoadList(event) {
        console.log("handleLoadList for " + idNamePair._id);
        store.setCurrentList(idNamePair._id);
    }

    /*
    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }
    */

    function formatDate(date) {
        let split = date.substring(0, date.indexOf("T")).split("-");
        return months[split[1]] + " " + split[2] + ", " + split[0];
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        //let _id = event.target.id;
        //_id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    async function handleExpandList(event, id) {
        event.stopPropagation();
    }

    let editFunction = "";
    if (searchState === "Home") {
        editFunction = 
            <Box sx={{ p: 1, color: 'red' }} style={{ width: '2%' }}>
                <Typography style={{ fontSize: '14pt' }} onClick={(event) => handleLoadList(event)}>
                    <u>Edit</u>
                </Typography>
            </Box>
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', 
                  display: 'flex', 
                  p: 1, 
                  borderStyle: 'solid', 
                  borderWidth: '.1px',
                  borderColor: 'black', 
                  bgcolor: '#d4d4f5', 
                  borderRadius: '15px' }}
            style={{ width: '100%', fontSize: '16pt' }}
        >
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ p: 1 }} style={{ fontSize: '20pt' }}>{idNamePair.name}</Box>
                    <Box sx={{ p: 1 }}>By: <span style={{ color: 'blue' }}><u>{idNamePair.publisher}</u></span></Box>
                    {editFunction}
                    <Box sx={{ p: 1 }}>Published: <span style={{ color: 'green' }}>{formatDate(idNamePair.published)}</span></Box>
                </Box>
                <Box sx={{ p: 1 }}>
                    <Box sx={{ p: 1}}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                    </Box>
                    <Box sx={{ p: 1}}>
                    <IconButton onClick={(event) => {
                        handleExpandList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <ExpandMoreIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                    </Box>
                </Box>
        </ListItem>
    return (
        cardElement
    );
}

export default ListCard;