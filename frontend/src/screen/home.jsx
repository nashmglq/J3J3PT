import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserGetActions, UserInputActions } from "../actions/userActions";
import { Toast, ToastContainer } from "react-bootstrap";

export const Home = () => {
  const [data, setData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showToast, setShowToast] = useState(true);
  const [error, setError] = useState(false);
  
  const dispatch = useDispatch();
  const { message, error: apiError } = useSelector((state) => state.UserInput);

  useEffect(() => {
    UserInputActions();
    
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [dispatch]);

  useEffect(() => {
    if (apiError) {
      setError(true);
      return;
    }
    
    if (message && message !== "") {
      setChatHistory(prevChat => [
        ...prevChat,
        { sender: "J3J3", content: message }
      ]);
    }
  }, [message, apiError]);

  const submitButton = (e) => {
    e.preventDefault();
    if (!data.trim()) return;
    
    setChatHistory(prevChat => [
      ...prevChat,
      { sender: "User", content: data }
    ]);
    
    const formData = { data };
    dispatch(UserInputActions(formData));
    setData("");
  };

  return (
    <div>
      <h1>j3j3-GPT</h1>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>This chat does not save conversations. All messages will be lost on refresh.</Toast.Body>
        </Toast>
      </ToastContainer>

      {error && (
        <div className="alert alert-danger" role="alert">
          Something went wrong BRO!
        </div>
      )}

      <div className="container">
        <div className="row">
          <div className="col chat-container" style={{ height: "70vh", overflowY: "auto", paddingBottom: "80px" }}>
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`d-flex ${msg.sender === "User" ? "justify-content-end" : "justify-content-start"} p-2`}
              >
                {msg.sender !== "User" && <p className="p-2">{msg.sender}: </p>}
                <div className="bg-light text-dark p-2 rounded">
                  {msg.content}
                </div>
                {msg.sender === "User" && <p className="p-2">:{msg.sender} </p>}
              </div>
            ))}
          </div>
        </div>

        <footer className="fixed-bottom mb-2">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <form className="form-group">
                  <div className="d-flex">
                    <textarea
                      className="form-control bg-primary text-white"
                      onChange={(e) => setData(e.target.value)}
                      value={data}
                      placeholder="Type your message..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          submitButton(e);
                        }
                      }}
                    ></textarea>
                    <button
                      className="btn btn-primary text-white"
                      onClick={submitButton}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};