import axios from 'axios';

const getSearchResults = (req: any, res: any) => {
  const { query } = req.body;
  axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=10&namespace=articles&format=json`)
  .then((result: any) => {
    res.send(result.data[1].map((id: string) => ({ id, label: id })));
  })
  .catch((err: any) => {
    console.log(err);
  })
}

export {
  getSearchResults
}