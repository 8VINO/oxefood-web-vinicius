
import { Modal} from "semantic-ui-react";

export default function ModalBase({ open, onClose, children, showClose = true }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            size="large"
            closeIcon={showClose}
            style={{
                maxHeight: "90vh",
                display: "flex",
            }}
        >
           
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    maxHeight: "70vh",
                    padding: "1rem",
                }}
            >
                {children}
            </div>

      
        </Modal>
    );
}
