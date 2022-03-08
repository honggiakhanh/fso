import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newId = (100000 * Math.random()).toFixed(0).toString();
  const newAnec = {
    content: content,
    id: newId,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnec);
  return response.data;
};

const upvote = async (id) => {
  const anecToUpvote = await axios.get(`${baseUrl}/${id}`)
  const upvotedAnec = {...anecToUpvote.data, votes: anecToUpvote.data.votes + 1}
  const response = await axios.put(`${baseUrl}/${upvotedAnec.id}`, upvotedAnec)
  return response.data
}

export default { 
  getAll, 
  createNew,
  upvote
};
