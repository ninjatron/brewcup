import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import TeaService from "../../services/TeaService";

const TeaWrapper = styled.div`

`;

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

  useEffect(() => {
    getTea(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTea({ ...currentTea, [name]: value });
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

    </div>
  );
};

export default Tea;