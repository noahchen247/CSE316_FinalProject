import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let index = event.target.id.substring("list-".length);
            let text = event.target.value;
            store.addUpdateItemTransaction(index-1, text);
            toggleEdit();
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }
    let { index } = props;

    let cardElement =  
        <Box className='top5-item' 
             style={{backgroundColor: '#d4af37', borderStyle: 'solid', borderWidth: '1px', borderRadius: '10px'}}>
            <TextField
                required
                fullWidth
                id={"item-" + (index+1)}
                name="item"
                autoComplete="Top 5 List Item"
                onKeyPress={handleKeyPress}
                defaultValue={props.text}
                inputProps={{style: {fontSize: 48, position: 'relative', right: '3%'}}}
            />
        </Box>

    return (
        cardElement
    );
}

export default Top5Item;