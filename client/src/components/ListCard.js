import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
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
    const [ comment, setComment ] = useState("");

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
        if (!expanded && idNamePair.isPublished) {
            store.view(idNamePair);
        }
    }

    async function handleLike(event) {
        if (auth.isGuest) {
            return;
        }
        event.stopPropagation();
        store.like(idNamePair);
    }

    async function handleDislike(event) {
        if (auth.isGuest) {
            return;
        }
        event.stopPropagation();
        store.dislike(idNamePair);
    }

    async function handleComment(event) {
        if (auth.isGuest) {
            return;
        }
        event.stopPropagation();
        console.log(comment);
        let newComment = {
            commenter: auth.user.firstName + " " + auth.user.lastName,
            message: comment
        }
        store.addComment(idNamePair, newComment);
        setComment("");
    }

    async function handleChange(event) {
        setComment(event.target.value);
    }

    let expandList = "";
    let expandIcon = <ExpandMoreIcon style={{fontSize:'48pt'}} />;
    let expandComments = "";
    if (expanded) {
        let items = idNamePair.items;
        if (!idNamePair.isCommunity) {
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
            </Box>
            </div>
        }
        else {
            let getTop5 = idNamePair.communityItems;
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
                        <Typography variant="h4">1. {getTop5[0].item} </Typography>
                        <Typography variant="h7"> ({getTop5[0].points} Votes) </Typography><br/>
                        <Typography variant="h4">2. {getTop5[1].item} </Typography>
                        <Typography variant="h7"> ({getTop5[1].points} Votes) </Typography><br/>
                        <Typography variant="h4">3. {getTop5[2].item} </Typography>
                        <Typography variant="h7"> ({getTop5[2].points} Votes) </Typography><br/>
                        <Typography variant="h4">4. {getTop5[3].item} </Typography>
                        <Typography variant="h7"> ({getTop5[3].points} Votes) </Typography><br/>
                        <Typography variant="h4">5. {getTop5[4].item} </Typography>
                        <Typography variant="h7"> ({getTop5[4].points} Votes) </Typography><br/>
                    </div>
                </div>
            </Box>
            </div>
        }
        
        expandComments =
            <div>
                <div style={{ display: 'flex',  flexDirection: 'column',  overflow: 'auto' }}>
                <List style={{ fontSize: '20pt', position: 'absolute', right: '7%', 
                               top: '24%', width: '40%', maxHeight: '48%', overflow: 'auto'}}>
                    {
                        idNamePair.comments.map((comment) => (
                            <Box style={{ marginTop: '5px',
                                          display: 'flex',
                                          borderStyle: 'solid', 
                                          borderWidth: '.1px',
                                          borderColor: 'black', 
                                          borderRadius: '10px',
                                          backgroundColor: '#d4af37',
                                          color: 'black' }}
                                 sx={{p: 1}}>
                                <div>
                                    <Typography variant="h6">
                                        <span style={{color:'blue'}}><u>{comment.commenter}</u></span>
                                    </Typography>
                                    <Typography variant="h5"> {comment.message} </Typography>
                                </div>
                            </Box>
                        ))
                    }
                </List>
                </div>
                <TextField type="text" value={comment} onChange={handleChange} placeholder="Add comment" 
                           style={{ width: '40%', position: 'absolute', bottom: '12%', right: '7%' }}
                           onKeyDown={(e) => {if (e.key === "Enter") { handleComment(e, idNamePair._id); }}} />
            </div>
        expandIcon = <ExpandLessIcon style={{fontSize:'48pt'}} />;
    }

    let editFunction = "";
    if (!idNamePair.isPublished && searchState === "Home") {
        editFunction = 
            <Box sx={{ p: 1, color: 'red' }} style={{ width: '2%' }}>
                <Typography style={{ fontSize: '14pt' }} onClick={(event) => handleLoadList(event)}>
                    <u>Edit</u>
                </Typography>
            </Box>
    }

    let deletable = "";
    if (searchState === "Home" && !idNamePair.isCommunity) {
        deletable = 
            <div>
                <Box sx={{ p: 1 }} style={{ position: 'absolute', right: '1%', top: '3%', fontSize: '20pt' }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'40pt'}} />
                    </IconButton>
                </Box>
            </div>
    }

    let likeIcon = <ThumbUpIcon style={{fontSize:'40pt'}} />;
    if (!auth.isGuest && idNamePair.likes.indexOf(auth.user.email) > -1) {
        likeIcon = <LikedIcon style={{fontSize:'40pt'}} />;
    }
    let dislikeIcon = <ThumbDownIcon style={{fontSize:'40pt'}} />;
    if (!auth.isGuest && idNamePair.dislikes.indexOf(auth.user.email) > -1) {
        dislikeIcon = <DislikedIcon style={{fontSize:'40pt'}} />;
    }

    let publishUser = "";
    if (!idNamePair.isCommunity) {
        publishUser =
            <Box sx={{ p: 1 }}>By: <span style={{ color: 'blue' }}><u>{idNamePair.publisher}</u></span></Box>
    }

    let background = '#fffff1';
    let interact = "";
    let views = "";
    //temp solution to publish i guess
    let publishDate = "";
    if (idNamePair.isPublished) {
        background = '#d4d4f5';
        if (idNamePair.isCommunity) {
            publishDate =
                <Box sx={{ p: 1 }}>Updated: <span style={{ color: 'green' }}>{formatDate(idNamePair.createdAt)}</span></Box>
        }
        else {
            publishDate =
                <Box sx={{ p: 1 }}>Published: <span style={{ color: 'green' }}>{formatDate(idNamePair.createdAt)}</span></Box>
        }
        views = 
            <Box sx={{ p: 1 }} style={{ position: 'absolute', right: '10%', bottom: '2%' }}>
                Views: <span style={{ color: 'red' }}>{idNamePair.views}</span>
            </Box>
        interact = 
            <div>
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
            </div>
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
                  bgcolor: {background}, 
                  borderRadius: '15px' }}
            style={{ width: '100%', fontSize: '16pt' }}
        >
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ p: 1 }} style={{ fontSize: '20pt' }}>{idNamePair.name}</Box>
                    {publishUser}
                    {expandList}
                    {expandComments}
                    {editFunction}
                    {publishDate}
                </Box>
                {interact}
                {deletable}
                <Box style={{ position: 'absolute', right: '1.1%', bottom: '0%', fontSize: '20pt' }}>
                    <IconButton onClick={(event) => {
                        handleExpandList(event)
                    }} aria-label='expand'>
                        {expandIcon}
                    </IconButton>
                </Box>
                {views}
        </ListItem>
    return (
        cardElement
    );
}

export default ListCard;