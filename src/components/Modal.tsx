interface ModelData {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const OVERLAY_STLES: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const Modal: React.FC<ModelData> = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STLES}></div>
      <div className="user-modal">
        <button className="follow-button modal-btn" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
