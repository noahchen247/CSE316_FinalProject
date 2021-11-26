import { useState, useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const [ publishState, setPublishState ] = useState(true);

    //let enabledButtonClass = "top5-button";
    function checkPublishState() {
        let checkList = store.currentList.items;
        if (checkList.filter(item => item === "").length > 0) {
            //console.log("a");
            return false;
        }
        let checkSet = new Set(checkList);
        if (checkList.length !== checkSet.size) {
            //console.log("b");
            return false;
        }
        //console.log("c");
        return true;
    }
    function handleSave() {
        store.updateCurrentList();
        setPublishState(!checkPublishState());
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <div id="edit-toolbar">
            <Button 
                disabled={editStatus}
                id='close-button'
                onClick={handleSave}
                variant="contained">
                    Save
            </Button>
            <Button 
                disabled={publishState}
                id='close-button'
                onClick={checkPublishState}
                variant="contained">
                    Publish
            </Button>
        </div>
    )
}

export default EditToolbar;