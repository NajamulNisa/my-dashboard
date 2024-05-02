import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function DataUploader() {
  const [uploadedData, setUploadedData] = useState(null);
  const [graphType, setGraphType] = useState('');
  const [graphData, setGraphData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (graphType) {
      fetchDataForGraph();
    }
  }, [graphType]);

  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the file is a CSV file
    if (!file.name.endsWith('.csv')) {
      setErrorMessage('Please select a CSV file.');
      return;
    }

    // Create FormData object to send file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make POST request to upload API endpoint
      const response = await axios.post('https://fastapi-x21t.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Set uploaded data in state
      setUploadedData(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    }
  };

  // Function to fetch data for the selected graph type
  const fetchDataForGraph = async () => {
    try {
      let response;
      // Fetch data based on the selected graph type
      switch (graphType) {
        case 'scatter':
          response = await axios.post('https://fastapi-x21t.onrender.com/plot/scatter?x_column=ApplicantIncome&y_column=CoapplicantIncome');
          break;
        case 'bar':
          response = await axios.post('https://fastapi-x21t.onrender.com/plot/bar?x_column=ApplicantIncome&y_column=CoapplicantIncome');
          break;
        case 'heatmap':
          response = await axios.post('https://fastapi-x21t.onrender.com/plot/heatmap/?x_column=ApplicantIncome&y_column=CoapplicantIncome');
          break;
        default:
          // Handle invalid graph type
          setGraphData(null);
          return;
      }
      // Set fetched data in state
      console.log('Fetched data:', response.data);
      setGraphData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setGraphData(null);
    }
  };

  // Function to plot graph
  const plotGraph = () => {
    if (!graphData) {
      return <p>No data available to plot.</p>;
    }

    // Plot graph based on graph type
    switch (graphType) {
      case 'scatter':
        // Plot scatter plot
        return (
          <Plot
            data={[{ type: 'scatter', x: graphData.x, y: graphData.y }]}
            layout={{ width: 800, height: 400, title: 'Scatter Plot' }}
          />
        );
      case 'bar':
        // Plot bar chart
        return (
          <Plot
            data={[{ type: 'bar', x: graphData.x, y: graphData.y }]}
            layout={{ width: 800, height: 400, title: 'Bar Chart' }}
          />
        );
      case 'heatmap':
        // Plot histogram
        return (
          <Plot
            data={[{ type: 'heatmap', x: graphData.data }]}
            layout={{ width: 800, height: 400, title: 'heatmap' }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Input field for file upload */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {/* Dropdown for selecting graph type */}
      <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
        <option value="">Select Graph Type</option>
        <option value="scatter">Scatter Plot</option>
        <option value="bar">Bar Chart</option>
        <option value="heatmap">Heatmap</option>
      </select>

      {/* Error message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Plot graph based on selected graph type */}
      {plotGraph()}
    </div>
  );
}

export default DataUploader;




