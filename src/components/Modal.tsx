interface ModelData {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const MODAL_STYLE: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  zIndex: 1000,
};

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
      <div style={MODAL_STYLE}>
        <button onClick={onClose}>Close Modal</button>
        {children}
      </div>
    </>
  );
};

export default Modal;
