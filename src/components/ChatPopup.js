import { useState } from "react";
import { MessageCircle, X } from "react-feather";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatPopup.css";

function ChatPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        className="chat-button"
        onClick={() => setOpen(!open)}
        aria-label="Chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Popup */}
      {open && (
        <div className="chat-popup shadow">
          {/* Header */}
          <div className="chat-header d-flex justify-content-between align-items-center">
            <strong>THRIFTLY</strong>
            <button
              className="btn btn-sm text-light p-0"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="chat-body">
            <div className="chat-message">
              <span className="fw-bold">THRIFTLY</span>
              <p>
                You are not sure about the size? Don’t worry, THRIFTLY offers FREE
                RETURN and exchange.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="chat-input d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Tulis pesan Anda..."
            />
            <button className="btn btn-dark ms-2">Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatPopup;