import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const api_key = process.env.API_KEY;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = `https://api.thedogapi.com/v1/images/search?api_key=${api_key}`;
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
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

      {loading ? <img src={data.url} alt="Cute dog picture from TheDogAPI"/> : <p>Loading image</p>}
    </div>
  )
}

export default App
