return (
    <div className="chat_page">
      {!showPaint ? (
        <div className={theme ? "starter_div dark" : "starter_div"}>
          <img src="../resources/Main_logo.jpg" alt="optional" />
          <p className="slogan">the simple, the smart</p>
          <p>
            <b>tap on a contact to start conversation</b>
          </p>
        </div>
      ) : (
        <>
          <header className={theme ? "chat_header dark" : "chat_header"}>
            <Avatar src={chat.avatar} sx={{ bgcolor: deepOrange[500] }}>
              {chat.name}
            </Avatar>
            {isOnline && <span style={{ color: "red" }}>Online</span>}
            <h2>{chat.Name}</h2>
          </header>

          <div
            className={theme ? "chat_content dark" : "chat_content"}
            ref={chatContentRef}
          >
            {messages.chatsAvailable && messages.chats.length > 0 ? (
              messages.chats.map((single, index) => (
                <React.Fragment key={index}>
                  <div
                    className={
                      single.senderId === userInformation.id
                        ? "sent"
                        : "received"
                    }
                  >
                    {single.image ? (
                      <figure>
                        <img src={single.image} alt="chat-img" />
                        <figcaption>{single.text}</figcaption>
                      </figure>
                    ) : (
                      single.text
                    )}
                  </div>
                  {index === messages.chats.length - 1 && (
                    <div ref={lastMessage} className="scroll-anchor" />
                  )}
                </React.Fragment>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>Start a conversation</p>
            )}

            {/* loader between messages */}
            {mssgLoading && (
              <div className="message-loader">
                <ClipLoader color="#4f46e5" size={30} />
              </div>
            )}
          </div>

          <div className={theme ? "chat_footer dark" : "chat_footer"}>
            {imagePreview && (
              <div className="image_preview">
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ width: "100px" }}
                />
                <ClearIcon className="svg" onClick={() => setPreview("")} />
              </div>
            )}
            <input
              className={theme ? "dark" : ""}
              type="text"
              value={input}
              onChange={handleInput}
              placeholder="Type a message..."
            />
            <input
              type="file"
              accept="image/*"
              ref={MsgImage}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <AddPhotoAlternateIcon id="msg_icon" onClick={handleIconClick} />
            {(input || image) && (
              <button className="msg_btn" onClick={sendMessage}>
                Send
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ChatsData;
