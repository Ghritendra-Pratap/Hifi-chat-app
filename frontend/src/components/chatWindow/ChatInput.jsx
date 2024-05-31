import React from "react";

const ChatInput = ({ message, image, setMessage, setImage, sendMessage, handleImage, handleKeyPress,receiverData }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
        {receiverData &&<div className="msginput">
          <div style={{ position: "relative", display: "inline-block"  }}>
            <img
              src="attach.png"
              alt=""
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              id="fileInput"
              type="file"
              name="image"
              onChange={handleImage}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </div>
          {image && (
            <div>
              <img
                src={image}
                alt="Selected"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: 0,
                }}
              />
              <button
                onClick={() => {
                  setImage("");
                }}
                style={{}}
              >
                x
              </button>
            </div>
            
          )}

          <input
            type="text"
            className="msginput-field"
            placeholder=" Type message here......"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>}
      
    </form>
  );
};

export default ChatInput;
