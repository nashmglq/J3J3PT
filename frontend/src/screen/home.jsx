import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserGetActions, UserInputActions } from "../actions/userActions";

export const Home = () => {
  const [data, setData] = useState("");
  const [holder, setHolder] = useState("");
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.UserInput);

  useEffect(() => {
    UserInputActions();
  }, [dispatch]);

  const submitButton = (e) => {
    e.preventDefault();
    // This is done to structure the data as {data: contents} before sending it to the backend, matching the expected format.
    const formData = { data };
    dispatch(UserInputActions(formData));
    setData("");
    // useState are async so they did not sync clear (lol lucky shot hehe?)
    setHolder(data);
  };

  return (
    <div>
      <h1>j3j3-GPT</h1>

      {/* CHAT CONVO */}

      <div className="container">
        <div className="row">
          <div className="col">
            {holder ? (
              <div className="justify-content-end d-flex p-4">
                <div className="bg-light text-dark p-2 rounded mt-2">
                  {holder}
                </div>
                <p className="p-2">:User </p>
              </div>
            ) : null}
            {message ? (
              <div className="justify-content-start d-flex">
                <p className="p-2">J3J3: </p>
                <div className="bg-light text-dark p-2 rounded">{message}</div>
              </div>
            ) : null}
          </div>
        </div>

        {/* CHAT INPUTS */}
        <footer className="fixed-bottom mb-2">
          <div className="container">
            <div className="row">
              <div className="col sm-2">
                <form className="form-group">
                  <div className="d-flex">
                    <textarea
                      className="form-control bg-primary text-white"
                      onChange={(e) => setData(e.target.value)}
                      value={data}
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
