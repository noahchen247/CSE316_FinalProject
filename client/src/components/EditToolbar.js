import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import ErrorModal from "../components/ErrorModal";

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    let publishState = true;

    //let enabledButtonClass = "top5-button";
    function checkPublishState() {
        let checkList = store.currentList.items;
        if (checkList.filter(item => item === "").length > 0) {
            return false;
        }
        let checkSet = new Set(checkList);
        if (checkList.length !== checkSet.size) {
            return false;
        }
        return true;
    }
    function handleSave() {
        store.saveCurrentList();
    }
    function publish() {
        if (checkPublishState) {
            store.publishCurrentList();
        }
    }
    publishState = !checkPublishState();
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <div id="edit-toolbar">
            <ErrorModal/>
            <Button 
                disabled={editStatus}
                id='save-button'
                onClick={handleSave}>
                    Save
            </Button>
            <Button 
                disabled={publishState}
                id='publish-button'
                onClick={publish}>
                    Publish
            </Button>
        </div>
    )
}

export default EditToolbar;