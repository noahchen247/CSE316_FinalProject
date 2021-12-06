import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    GET_ALL_LISTS: "GET_ALL_LISTS",
    FILTER_PAIRS: "FILTER_PAIRS",
    CLEAN_PAIRS: "CLEAN_PAIRS",
    SEARCH_PAIRS: "SEARCH_PAIRS",
    REFRESH_PAIRS: "REFRESH_PAIRS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null
    });
    const history = useHistory();

    //console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    //console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.GET_ALL_LISTS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            case GlobalStoreActionType.FILTER_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            case GlobalStoreActionType.CLEAN_PAIRS: {
                return setStore({
                    idNamePairs: [],
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            case GlobalStoreActionType.SEARCH_PAIRS: {
                //console.log("PAYLOAD: " + payload);
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            case GlobalStoreActionType.REFRESH_PAIRS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            default:
                return store;
        }
    }

    store.getCurrentDateAsString = function () {
        var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
        const date = new Date();
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.status === 200) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.status === 200) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createTop5List(newListName, ["?", "?", "?", "?", "?"], auth.user.email, 
            auth.user.userName, [], false, 0, [], [], false, [], "");
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        //console.log("store.loadIdNamePairs");
        const response = await api.getTop5ListPairs();
        if (response.status === 200) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    //Initial set for home lists (all lists under auth.user.email)
    store.getHomeLists = async function () {
        if (auth.isGuest) {
            storeReducer({
                type: GlobalStoreActionType.CLEAN_PAIRS,
                payload: null
            });
            return;
        }
        const response = await api.getTop5ListsByEmail(auth.user.email);
        if (response.status === 200) {
            let pairs = response.data.top5Lists;
            //console.log("homeTest result: " + pairs);
            storeReducer({
                type: GlobalStoreActionType.FILTER_PAIRS,
                payload: pairs
            });
            history.push("/");
        }
    }

    store.getCommunityLists = async function () {
        const response = await api.getTop5Lists();
        if (response.status === 200) {
            let lists = response.data.top5Lists;
            lists = lists.filter(list => list.isCommunity);
            storeReducer({
                type: GlobalStoreActionType.FILTER_PAIRS,
                payload: lists
            });
        }
    }

    //initial set for users list to null (all lists that are published)
    store.getUsersLists = async function () {
        storeReducer({
            type: GlobalStoreActionType.CLEAN_PAIRS,
            payload: []
        });
        history.push("/");
    }

    store.searchHomePairsByName = async function (criteria) {
        if (auth.isGuest) {
            return;
        }
        const response = await api.getTop5ListsByEmail(auth.user.email);
        if (response.status === 200) {
            let pairs = response.data.top5Lists;
            if (criteria !== "") {
                pairs = pairs.filter(pair => pair.name === criteria);
            }
            //console.log(filteredLists);
            storeReducer({
                type: GlobalStoreActionType.SEARCH_PAIRS,
                payload: pairs
            })
        }
    }

    store.getAllLists = async function () {
        const response = await api.getTop5Lists();
        if (response.status === 200) {
            let top5Lists = response.data.top5Lists;
            top5Lists = top5Lists.filter(list => list.isPublished && !list.isCommunity);
            //console.log(top5Lists);
            storeReducer({
                type: GlobalStoreActionType.GET_ALL_LISTS,
                payload: top5Lists
            });
            history.push("/");
        }
    }

    store.searchUsersListsByUser = async function (criteria) {
        const response = await api.getTop5Lists();
        if (response.status === 200) {
            let pairs = response.data.top5Lists;
            pairs = pairs.filter(pair => pair.isPublished && !pair.isCommunity);
            if (criteria !== "") {
                pairs = pairs.filter(pair => pair.publisher === criteria);
            }
            storeReducer({
                type: GlobalStoreActionType.SEARCH_PAIRS,
                payload: pairs
            });
        }
    }

    store.searchAllListsByName = async function (criteria) {
        const response = await api.getTop5Lists();
        if (response.status === 200) {
            let pairs = response.data.top5Lists;
            pairs = pairs.filter(pair => pair.isPublished && !pair.isCommunity);
            if (criteria !== "") {
                pairs = pairs.filter(pair => pair.name === criteria);
            }
            //console.log(filteredLists);
            storeReducer({
                type: GlobalStoreActionType.SEARCH_PAIRS,
                payload: pairs
            })
        }
    }

    store.sortListsByCriteria = function (criteria) {
        let pairs = store.idNamePairs;
        if (criteria === "Publish Date (Newest)") {
            pairs = pairs.sort((a, b) => a.published < b.published);
        }
        else if (criteria === "Publish Date (Oldest)") {
            pairs = pairs.sort((a, b) => a.published > b.published);
        }
        else if (criteria === "Views") {
            pairs = pairs.sort((a, b) => a.views < b.views);
        }
        else if (criteria === "Likes") {
            pairs = pairs.sort((a, b) => a.likes.length < b.likes.length);
        }
        else if (criteria === "Dislikes") {
            pairs = pairs.sort((a, b) => a.dislikes.length < b.dislikes.length);
        }
        storeReducer({
            type: GlobalStoreActionType.FILTER_PAIRS,
            payload: pairs
        });
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.status === 200) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.handleCommunityDelete = async function (top5List) {
        let response = await api.getTop5Lists();
        if (response.status === 200) {
            let lists = response.data.top5Lists;
            lists = lists.filter(list => list.isCommunity);
            let associated = lists.find(list => list.name === top5List.name);
            let itemsToRemove = top5List.items;
            for (let i = 0; i < 5; i++) {
                let findItem = itemsToRemove[i];
                let found = associated.communityItems.findIndex(object => object.item === findItem);
                let base = associated.communityItems[found].points;
                if (base - 5 + i === 0) {
                    associated.communityItems.splice(found, 1);
                }
                else {
                    let newItem = {
                        item: findItem,
                        points: base - 5 + i
                    }
                    associated.communityItems[found] = newItem;
                }
            }
            console.log(associated.communityItems);
            if (associated.communityItems.length === 0) {
                console.log("DELETING" + associated._id);
                response = await api.deleteTop5ListById(associated._id);
                if (response === 200) {
                    console.log("Deleted community list");
                }
            }
            else {
                console.log("UPDATING AFTER DELETE" + associated._id);
                response = await api.updateTop5ListById(associated._id, associated);
                if (response === 200) {
                    console.log("Updated community list");
                }
            }
        }
    }

    store.deleteList = async function (listToDelete) {
        if (listToDelete.isPublished) {
            store.handleCommunityDelete(listToDelete);
        }
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.status === 200) {
            store.getHomeLists();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.status === 200) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (index, newText) {
        let oldText = store.currentList.items[index];
        let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    //UPDATES ITEM WITHOUT SAVING IT CHANGED
    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList
        });
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.updateList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) {
            let top5List = response.data.top5List;
            response = await api.updateTop5ListById(id, top5List);
        }
    }

    store.like = async function (top5List) {
        if (top5List.likes.indexOf(auth.user.email) > -1) {
            top5List.likes.splice(top5List.likes.indexOf(auth.user.email), 1);
        }
        else {
            top5List.likes.push(auth.user.email);
            if (top5List.dislikes.indexOf(auth.user.email) > -1) {
                top5List.dislikes.splice(top5List.dislikes.indexOf(auth.user.email), 1);
            }
        }
        const response = await api.updateTop5ListById(top5List._id, top5List);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.REFRESH_PAIRS,
                payload: null
            })
            history.push("/");
        }
    }

    store.dislike = async function (top5List) {
        if (top5List.dislikes.indexOf(auth.user.email) > -1) {
            top5List.dislikes.splice(top5List.likes.indexOf(auth.user.email), 1);
        }
        else {
            top5List.dislikes.push(auth.user.email);
            if (top5List.likes.indexOf(auth.user.email) > -1) {
                top5List.likes.splice(top5List.likes.indexOf(auth.user.email), 1);
            }
        }
        const response = await api.updateTop5ListById(top5List._id, top5List);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.REFRESH_PAIRS,
                payload: null
            })
            history.push("/");
        }
    }

    store.view = async function (top5List) {
        top5List.views = top5List.views + 1;
        const response = await api.updateTop5ListById(top5List._id, top5List);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.REFRESH_PAIRS,
                payload: null
            })
            history.push("/");
        }
    }

    store.addComment = async function (top5List, comment) {
        top5List.comments.unshift(comment);
        const response = await api.updateTop5ListById(top5List._id, top5List);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.REFRESH_PAIRS,
                payload: null
            })
            history.push("/");
        }
    }

    //uhhh IS THIS USED?????
    store.saveCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.status === 200) {
            store.closeCurrentList();
        }
    }

    store.handleCommunityLists = async function (top5List) {
        let response = await api.getTop5Lists();
        if (response.status === 200) {
            let lists = response.data.top5Lists;
            lists = lists.filter(list => list.isCommunity);
            let associated = lists.find(list => list.name === top5List.name);
            //console.log(associated);
            if (associated !== undefined) {
                console.log("Updating community list");
                let itemsToAdd = top5List.items;
                for (let i = 0; i < 5; i++) {
                    let findItem = itemsToAdd[i];
                    let found = associated.communityItems.findIndex(object => object.item === findItem);
                    if (found > -1) {
                        let base = associated.communityItems[found].points;
                        let newItem = {
                            item: findItem,
                            points: 5 - i + base
                        }
                        associated.communityItems[found] = newItem;
                    }
                    else {
                        let newItem = {
                            item: findItem,
                            points: 5-i
                        }
                        associated.communityItems.push(newItem);
                    }
                }
                console.log(associated.communityItems);
                console.log(associated._id);
                associated.published = top5List.published;
                response = await api.updateTop5ListById(associated._id, associated);
                if (response === 200) {
                    console.log("SUCESSFULLY UPDATED");
                }
            }
            else {
                let communityItems = [];
                for (let j = 0; j < 5; j++) {
                    let newItem = {
                        item: top5List.items[j],
                        points: 5-j
                    }
                    communityItems.push(newItem);
                }
                response = await api.createTop5List(top5List.name, top5List.items, 
                    "", "", [], true, 0, [], [], true, communityItems, top5List.published);
                if (response.status === 201) {
                    console.log("Created new community list");
                    //console.log(response.data.top5List);
                }
            }
        }
    }

    store.publishCurrentList = async function () {
        let top5List = store.currentList;
        top5List.isPublished = true;
        top5List.published = store.getCurrentDateAsString();
        console.log(top5List);
        const response = await api.updateTop5ListById(store.currentList._id, top5List);
        if (response.status === 200) {
            store.handleCommunityLists(top5List);
            store.closeCurrentList();
            store.getHomeLists();
        }
    }

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.canUndo = function() {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function() {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };