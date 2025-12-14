import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle sx={{ fontWeight: 800, color: 'primary.main' }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ gap: 1, p: 2 }}>
                <Button onClick={onCancel} variant="outlined" sx={{ borderColor: 'primary.main', color: 'primary.main' }}>
                    Cancelar
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
