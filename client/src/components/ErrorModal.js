import { useContext } from 'react'
import AuthContext from '../auth'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ErrorModal() {
    const { auth } = useContext(AuthContext);
    let isOpen = false;
    let message = ""
    if (auth.error) {
        isOpen = true;
        message = auth.error;
    }
    function handleCloseModal() {
        auth.hideCloseModal();
    }
    return (
        <Modal
            open={isOpen}
            data-animation="slideInOutLeft"
            aria-labelledby="dialog-header"
            aria-describedby="modal-button">
            <Box sx={style}>
                <Typography variant='h5'>Error: {message}</Typography>
                <div id='confirm-cancel-container'>
                    <Button style={buttonStyle} onClick={handleCloseModal}>Ok</Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ErrorModal;