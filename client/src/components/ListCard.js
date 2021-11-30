import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined';
import LikedIcon from '@mui/icons-material/ThumbUp';
import DislikedIcon from '@mui/icons-material/ThumbDown';
import Typography from '@mui/material/Typography';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { idNamePair, searchState } = props;
    const [ expanded, setExpanded ] = useState(false);

    var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

    function handleLoadList() {
        console.log("handleLoadList for " + idNamePair._id);
        store.setCurrentList(idNamePair._id);
    }

    function formatDate(date) {
        let split = date.substring(0, date.indexOf("T")).split("-");
        return months[split[1]] + " " + split[2] + ", " + split[0];
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    async function handleExpandList(event) {
        event.stopPropagation();
        setExpanded(!expanded);
        if (!expanded) {
            store.view(idNamePair._id);
        }
    }

    async function handleLike(event, id) {
        event.stopPropagation();
        store.like(id);
    }

    async function handleDislike(event, id) {
        event.stopPropagation();
        store.dislike(id);
    }

    async function handleComment(event, id, comment) {
        event.stopPropagation();
        store.comment(id, [idNamePair.name, comment]);
    }

    let expandList = "";
    let expandIcon = <ExpandMoreIcon style={{fontSize:'48pt'}} />;
    if (expanded) {
        let items = idNamePair.items;
        expandList = 
            <div>
            <Box sx={{ marginTop: '15px',
                       display: 'flex', 
                       p: 2,
                       borderStyle: 'solid', 
                       borderWidth: '.1px',
                       borderColor: 'black', 
                       bgcolor: '#2c2f70', 
                       borderRadius: '15px',
                       flexGrow: 1 }} 
                style={{ width: '50%', fontSize: '12pt', color: '#d0ab38' }}
            >
                <div>
                    <div>
                        <div><Typography variant="h4">1. {items[0]} </Typography></div><br/>
                        <div><Typography variant="h4">2. {items[1]} </Typography></div><br/>
                        <div><Typography variant="h4">3. {items[2]} </Typography></div><br/>
                        <div><Typography variant="h4">4. {items[3]} </Typography></div><br/>
                        <div><Typography variant="h4">5. {items[4]} </Typography></div>
                    </div>
                </div>
                <TextField placeholder="Add comment" 
                           style={{ width: '45%', position: 'absolute', bottom: '18%', right: '2%' }}
                           onKeyDown={(e) => {if (e.key === "Enter") { handleComment(e, idNamePair._id, "FILL IN LATER"); }}}
                />
            </Box>
            </div>
        expandIcon = <ExpandLessIcon style={{fontSize:'48pt'}} />;
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

    let likeIcon = <ThumbUpIcon style={{fontSize:'40pt'}} />;
    if (idNamePair.likes.indexOf(auth.user.email) > -1) {
        likeIcon = <LikedIcon style={{fontSize:'40pt'}} />;
    }
    let dislikeIcon = <ThumbDownIcon style={{fontSize:'40pt'}} />;
    if (idNamePair.dislikes.indexOf(auth.user.email) > -1) {
        dislikeIcon = <DislikedIcon style={{fontSize:'40pt'}} />;
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
                    {expandList}
                    {editFunction}
                    <Box sx={{ p: 1 }}>Published: <span style={{ color: 'green' }}>{formatDate(idNamePair.createdAt)}</span></Box>
                </Box>
                <Box sx={{ p: 1 }} style={{ position: 'absolute', right: '20%', top: '3%', fontSize: '20pt' }}>
                        <IconButton onClick={(event) => {
                            handleLike(event, idNamePair._id)
                        }} aria-label='like'>
                            {likeIcon}
                        </IconButton>
                        {idNamePair.likes.length}
                </Box>
                <Box sx={{ p: 1 }} style={{ position: 'absolute', right: '10%', top: '3%', fontSize: '20pt' }}>
                        <IconButton onClick={(event) => {
                            handleDislike(event, idNamePair._id)
                        }} aria-label='dislike'>
                            {dislikeIcon}
                        </IconButton>
                        {idNamePair.dislikes.length}
                </Box>
                <Box sx={{ p: 1 }} style={{ position: 'absolute', right: '1.3%', top: '3%', fontSize: '20pt' }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'40pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }} style={{ position: 'absolute', right: '1%', bottom: '0%', fontSize: '20pt' }}>
                    <IconButton onClick={(event) => {
                        handleExpandList(event)
                    }} aria-label='expand'>
                        {expandIcon}
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }} style={{ position: 'absolute', right: '10%', bottom: '2%' }}>
                    Views: <span style={{ color: 'red' }}>{idNamePair.views}</span>
                </Box>
        </ListItem>
    return (
        cardElement
    );
}

export default ListCard;