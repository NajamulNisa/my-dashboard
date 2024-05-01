import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function DataUploader() {
  const [file, setFile] = useState(null);
  const [scatterData, setScatterData] = useState(null);
  const [barData, setBarData] = useState(null);
  // Add more state variables for other graph types as needed

  useEffect(() => {
    fetchDataForScatter();
    fetchDataForBar();
    // Fetch data for other graph types as needed
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://fastapi-x21t.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // After successful upload, fetch data for graphs
      fetchDataForScatter();
      fetchDataForBar();
      // Fetch data for other graph types as needed
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fetchDataForScatter = async () => {
    try {
      const response = await axios.post('https://fastapi-x21t.onrender.com/plot/scatter');
      setScatterData(response.data);
    } catch (error) {
      console.error('Error fetching scatter data:', error);
    }
  };

  const fetchDataForBar = async () => {
    try {
      const response = await axios.post('https://fastapi-x21t.onrender.com/plot/bar');
      setBarData(response.data);
    } catch (error) {
      console.error('Error fetching bar data:', error);
    }
  };

  // Add more functions to fetch data for other graph types as needed

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>

      {scatterData && (
        <div>
          <h2>Scatter Plot</h2>
          <Plot
            data={[{ type: 'scatter', x: scatterData.x, y: scatterData.y }]}
            layout={{ width: 800, height: 400, title: 'Scatter Plot' }}
          />
        </div>
      )}

      {barData && (
        <div>
          <h2>Bar Chart</h2>
          <Plot
            data={[{ type: 'bar', x: barData.x, y: barData.y }]}
            layout={{ width: 800, height: 400, title: 'Bar Chart' }}
          />
        </div>
      )}

      {/* Render other graphs based on fetched data */}
    </div>
  );
}

export default DataUploader;
