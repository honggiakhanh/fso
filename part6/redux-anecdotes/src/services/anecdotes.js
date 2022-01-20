import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newId = (100000 * Math.random()).toFixed(0).toString();
  const newAnec = {
    content,
    id: newId,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnec);
  return response.data;
};

export default { getAll, createNew };
