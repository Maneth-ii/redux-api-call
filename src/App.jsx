import { useDispatch, useSelector } from "react-redux";
import { getData } from "./store/reducers/postDataSlice";
import { useEffect, useState } from "react"; // Use useEffect to handle async data fetching
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const posts = useSelector((store) => store.postData.data)
  const isLoading = useSelector((store) => store.postData.loading)
  const err = useSelector((store) => store.postData.error)
  const dispatch = useDispatch();
  const [postsList, setPostsList] = useState([]);

  const handleClick = () => {
    dispatch(getData());

  };

  // Use useEffect to update postsList when posts data changes
  useEffect(() => {
    setPostsList(posts);
  }, [posts,isLoading]);

  const containerStyle = {
    width:'60%',
    border:"1px solid tomato",
    margin:'.3em auto',
    padding:'1em',
    textAlign:'center'
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "cyan",
};

  return (
    <>
    <ClipLoader
        content="Loading"
        color={'cyan'}
        loading={isLoading}
        size={150}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

    {err && <h1>Somethings Wrong!...</h1>}
      <button onClick={handleClick}>GET</button>
      {postsList.map((aPost) => (
        <div key={aPost.id} style={containerStyle}>
          <h3>{aPost.title}</h3>
          <small>{aPost.body}</small>
        </div>
      ))}
    </>
  );
}

export default App;
