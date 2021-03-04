import React, { useState, useEffect } from "react";
import TeaService from "../../services/TeaService";
import { Link } from "react-router-dom";

const Tea = props => {
  const initialTeaState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTea, setCurrentTea] = useState(initialTeaState);
  const [message, setMessage] = useState("");

  console.log(props);

  const getTea = id => {
    TeaService.get(id)
      .then(response => {
        setCurrentTea(response);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // useEffect(() => {
  //   getTea(props.match.params.id);
  // }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTea({ ...currentTea, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTea.id,
      title: currentTea.title,
      description: currentTea.description,
      published: status
    };

    TeaService.update(currentTea.id, data)
      .then(response => {
        setCurrentTea({ ...currentTea, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTea = () => {
    TeaService.update(currentTea.id, currentTea)
      .then(response => {
        console.log(response.data);
        setMessage("The Tea was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTea = () => {
    TeaService.remove(currentTea.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/Teas");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {console.log(props)}
      {currentTea ? (
        <div className="edit-form">
          <h4>Tea</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTea.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTea.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTea.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTea.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tea;