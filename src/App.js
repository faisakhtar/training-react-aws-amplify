import { useState, useEffect } from "react";


function App() {

    const [thedata, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiEndPoint = "https://9rweqiz9zj.execute-api.us-east-1.amazonaws.com/animals/all";

    async function fetchData() {
        try {
          const response = await fetch(apiEndPoint)
          const resData = await response.json();
          console.log(resData);
          setData(resData)
          setError(null);
        } catch (e) {
          console.error(e);
          setError(e.message);
        }
      }

    useEffect(() => {
        console.log("Firing...")
        fetchData();
      }, []);


  return (
    <div className="App">
        <h1>Animals</h1>
        {loading && <div>A moment please...</div>}
        {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}

        <ul id="animalsList">
           {
              thedata != null ? 
              thedata.Items.map((item) => (
                    <li key={item.id}>
                    <span>{item.name}</span>
                    </li>
                ))

                : <li></li>
           }
        </ul>
    </div>
  );
}

export default App;
