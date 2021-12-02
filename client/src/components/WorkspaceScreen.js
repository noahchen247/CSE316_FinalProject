import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let text = event.target.value;
            store.changeListName(store.currentList._id, text);
        }
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', position: 'relative', top: '3%', right: '10%' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100%' }}
        >
            <Grid item xs={11}>
                <div style={{ height: '700px', backgroundColor: '#d4d4f5',
                              borderStyle: 'solid', borderWidth: '1px', borderRadius: '15px' }}>
                    <TextField style={{backgroundColor: 'white', position: 'relative', top: '1%', left: '2%', width: '600px' }} 
                               defaultValue={store.currentList.name}
                               onKeyPress={handleKeyPress}
                    />
                    <div style={{ width: '95%', height: '600px', backgroundColor: '#2c2f70', position: 'relative', 
                                  left: '2%', top: '3%', borderStyle: 'solid', borderWidth: '1px', borderRadius: '15px' }}>
                        <div className="item-number"><Typography variant="h3">1.</Typography></div>
                        <div className="item-number"><Typography variant="h3">2.</Typography></div>
                        <div className="item-number"><Typography variant="h3">3.</Typography></div>
                        <div className="item-number"><Typography variant="h3">4.</Typography></div>
                        <div className="item-number"><Typography variant="h3">5.</Typography></div>
                        {editItems}
                    </div>
                </div>
            </Grid> 
        </Grid>
    )
}

export default WorkspaceScreen;