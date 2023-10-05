import Metaphor from "metaphor-node";

const key = process.env.REACT_APP_METAPHOR_API_KEY

const metaphor = new Metaphor(key);

export const search = async (query, autoprompt) => {
  try {
    const query_len = query.trim().split(/\s+/).length;
    const response = await metaphor.search(query, {
      numResults: 5,
      useAutoprompt: autoprompt,
      type: query_len <= 2 ? 'keyword' : 'neural'
    });
    return response.results
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export const getContent = async (id) => {
  try {
    const response = await metaphor.getContents([id]);
    return response.contents[0]
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
