import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function DataUploader() {
  const [file, setFile] = useState(null);
  const [scatterData, setScatterData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  

  useEffect(() => {
    fetchDataForScatter();
    fetchDataForBar();
   
  }, []);

    const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setErrorMessage('');
    } else {
      setFile(null);
      setErrorMessage('Please select a CSV file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://fastapi-x21t.onrender.com/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);
      // Handle success, e.g., display message to the user
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error, e.g., display error message to the user
    }
  };

  const fetchDataForScatter = async () => {
    try {
      const response = await axios.post('https://fastapi-x21t.onrender.com/plot/scatter' , { params: { x_column: 'age', y_column: 'sex' }});
      setScatterData(response.data);
    } catch (error) {
      console.error('Error fetching scatter data:', error);
    }
  };

  const fetchDataForBar = async () => {
    try {
      const response = await axios.post('https://fastapi-x21t.onrender.com/plot/bar' , { params: { x_column: 'age', y_column: 'sex' }});
      setBarData(response.data);
    } catch (error) {
      console.error('Error fetching bar data:', error);
    }
  };

  return (
    <div>
      {/* <input accept=".csv" type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button> */}
       <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
   

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
    </div>
  );
}
export default DataUploader;



