import { useContext } from 'react';
import { Link } from 'react-router-dom'

import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import Button from '@mui/material/Button';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    function guestButton() {
        auth.loginGuest();
        store.getAllLists();
    }

    return (
        <div id="splash-screen">
            Welcome to:<br />The Top 5<br />Lister
            <div style={{fontSize: '16pt', position: 'absolute', bottom: '20%', left: '28%'}}>
                Student Developer: Noah Chen<br /><br />
                The best way to show your Top 5 to everyone else and see how they stack up against others.
            </div>
            <div style={{fontSize: '16pt', position: 'absolute', bottom: '10%', left: '27%'}}>
                <span><Link to='/login'><Button style={{color: 'black', width: '200px'}} 
                            variant='contained'>Login</Button></Link></span>
                <span><Link to='/register'><Button style={{color: 'black', width: '200px'}} 
                            variant='contained'>Register Account</Button></Link></span>
                <span><Button style={{color: 'black', width: '200px'}} 
                            variant='contained' onClick={guestButton}>Continue as Guest</Button></span>
            </div>
        </div>
    )
}