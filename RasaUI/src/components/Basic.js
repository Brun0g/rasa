import "./chatBot.css";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BiBot, BiUser } from "react-icons/bi";

function Basic() {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);

  useEffect(() => {
    console.log("called");
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "shreyas";
    const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

    if (inputMessage !== "") {
      setChat((chat) => [...chat, request_temp]);
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  };

  const rasaAPI = async function handleClick(name, msg) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});

    await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      credentials: "same-origin",
      body: JSON.stringify({ sender: name, message: msg }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          const temp = response[0];
          const recipient_id = temp["recipient_id"];
          const recipient_msg = temp["text"];

          const response_temp = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
          setbotTyping(false);

          setChat((chat) => [...chat, response_temp]);
          // scrollBottom();
        }
      });
  };

  console.log(chat);

  const stylecard = {
    maxWidth: "50rem",
    paddingLeft: "0px",
    paddingRight: "0px",
    borderRadius: "10px",
    marginTop: "10%",
    boxShadow: "0 16px 20px 0 rgba(0,0,0,0.4)",
  };

  const styleHeader = {
    height: "5rem",
    borderBottom: "1px solid black",
    borderRadius: "10px 10px 0px 0px",
    background: "linear-gradient(114deg, rgba(0,0,0,1) 0%, rgba(85,85,85,1) 50%, rgba(20,20,21,1) 100%)",
  };

  const styleFooter = {
    //maxWidth : '32rem',
    height: "7rem",
    borderRadius: "0px 0px 10px 10px",
    background: "linear-gradient(114deg, rgba(0,0,0,1) 0%, rgba(85,85,85,1) 50%, rgba(20,20,21,1) 100%)",
  };

  const styleBody = {
    paddingTop: "10px",
    height: "28rem",
  };

  return (
    <div>
      {/* <button onClick={()=>rasaAPI("shreyas","hi")}>Try this</button> */}

      <div className="container">
        <div className="row justify-content-center">
          <div className="card" style={stylecard}>
            <div className="cardHeader text-white" style={styleHeader}>
              <h1 style={{ marginTop: "1%", fontSize: "2rem" }}>AI Assistant</h1>
              {botTyping ? <h6>Bot Typing....</h6> : null}
            </div>
            <div className="cardBody" id="messageArea" style={styleBody}>
              <div className="row msgarea">
                {chat.map((user, key) => (
                  <div key={key}>
                    {user.sender === "bot" ? (
                      <div className="msgalignstart">
                        <BiBot className="botIcon" />
                        <h5 className="botmsg">{user.msg}</h5>
                      </div>
                    ) : (
                      <div className="msgalignend">
                        <h5 className="usermsg">{user.msg}</h5>
                        <BiUser className="userIcon" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="cardFooter text-white" style={styleFooter}>
              <div className="row">
                <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                  <div className="col-10" style={{ paddingRight: "0px" }}>
                    <input placeholder="Digite aqui..." onChange={(e) => setInputMessage(e.target.value)} value={inputMessage} type="text" className="msginp"></input>
                  </div>
                  <div className="col-2 cola">
                    <button type="submit" className="circleBtn">
                      <IoMdSend className="sendBtn" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basic;
