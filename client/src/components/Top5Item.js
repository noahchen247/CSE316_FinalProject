import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
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
        <TextField
            required
            fullWidth
            id={"item-" + (index+1)}
            label={"Item #" + (index+1)}
            name="item"
            autoComplete="Top 5 List Item"
            className='top5-item'
            onKeyPress={handleKeyPress}
            defaultValue={props.text}
            inputProps={{style: {fontSize: 48}}}
            InputLabelProps={{style: {fontSize: 24}}}
            autoFocus
        />

    return (
        cardElement
    );
}

export default Top5Item;