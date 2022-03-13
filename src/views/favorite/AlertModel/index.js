import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Transition = React.forwardRef((props, ref) => <Fade direction="up" ref={ref} {...props} />);

// eslint-disable-next-line react/prop-types
export default function AlertModel({ open, msg, handleClose, updateProductStar }) {
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <Typography variant="h4" align="center">
                        {msg}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ mr: 4.5 }}>
                        <Button onClick={handleClose}>取消</Button>
                        <Button onClick={updateProductStar}>确认</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
}
AlertModel.protoTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    msg: PropTypes.string,
    updateProductStar: PropTypes.func
};
