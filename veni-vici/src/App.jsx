import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const api_key = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = `https://api.thedogapi.com/v1/images/search?api_key=${api_key}`;
  useEffect(() => {
    console.log("Fetching from API.  Url: ", url);
    const fetchDogs = async () => {
      try {
        console.log("fetching data...");
        const response = await fetch(url);
        console.log("response status: ", response.status);
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

    
  
  if (loading){
    return (
      <div>
        <h1>Loading Image</h1>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Pick-a-Pup</h1>
      <h2>Find your ideal dog with this app.</h2>
      {data.length > 0 ? (
        <img src={data[0].url} alt="Cute dog picture from TheDogAPI"/>
      ) : (
        <p>No dog images found</p>
      )}
    </div>
  )
}

export default App
