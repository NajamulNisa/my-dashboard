import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function DataDashboard() {
  const [graphType, setGraphType] = useState('scatter');
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [graphType]);

  const fetchData = async () => {
    try {
      let response;
      switch (graphType) {
        case 'scatter':
          response = await axios.post('https://cors-anywhere.herokuapp.com/https://fastapi-x21t.onrender.com/plot/scatter');
          break;
        case 'bar':
          response = await axios.post('https://cors-anywhere.herokuapp.com/https://fastapi-x21t.onrender.com/plot/bar/');
          
          break;
        // Add cases for other graph types as needed
        default:
          response = null;
      }

      const data = response ? response.data : null;
      setGraphData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGraphTypeChange = (type) => {
    setGraphType(type);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleGraphTypeChange('scatter')}>Scatter Plot</button>
        <button onClick={() => handleGraphTypeChange('bar')}>Bar Chart</button>
        {/* Add buttons for other graph types */}
      </div>

      <div>
        <h2>{graphType === 'scatter' ? 'Scatter Plot' : 'Bar Chart'}</h2>
        {graphData && (
          <Plot
            data={[graphData]}
            layout={{ width: 800, height: 400, title: graphType === 'scatter' ? 'Scatter Plot' : 'Bar Chart' }}
          />
        )}
      </div>
    </div>
  );
}

export default DataDashboard;
