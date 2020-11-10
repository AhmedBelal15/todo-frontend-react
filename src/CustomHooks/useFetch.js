import { useEffect, useState } from "react";

const useFetch = (pageNumber, up) => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [hasMore, setHasMore] = useState()
  const token = JSON.parse(localStorage.getItem("currentUser")).accessToken;
  useEffect(() => {
    
    //Fetch using IIFE
    (async function () {
    setLoading(true)
      const response = await fetch(
        `https://aqueous-earth-51842.herokuapp.com/gettodos?page=${pageNumber}&limit=10`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            auth: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTodos((prevTodos) => {
        return [...prevTodos, data.todos].flat(1);
      });
      if(data.next) {
        setHasMore(true)
      } else {
        setHasMore(false) 
      }
      setLoading(false)
    })();
  }, [pageNumber]);

  return { loading, todos, hasMore, setTodos };
};

export default useFetch;
