import React, { useState } from 'react';
import Papa from 'papaparse';
import './Dashboard.css'; 
import Plot from 'react-plotly.js';


const Dashboard = () => {
  const [csvData, setCsvData] = useState(null);
  const [manipulatedData, setManipulatedData] = useState(null);
  const [renamedColumns, setRenamedColumns] = useState({});
  const [missingValuesFilled, setMissingValuesFilled] = useState(false);
 const [uploadedData, setUploadedData] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState('');
   const [filledData, setFilledData] = useState(null);
   const [fillMethod, setFillMethod] = useState('')

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      Papa.parse(text, {
        complete: (result) => {
          setCsvData(result.data);
          generateReport(result.data);
        },
        header: true
      });
    };

    reader.readAsText(file);
  };

  const generateReport = (data) => {
    // Analyze the data and generate the report
    console.log('Summary statistics:', data);
    console.log('Data types:', data[0]); // Assuming the first row contains column names
    console.log('Missing values analysis:', calculateMissingValues(data));
    // Visualize data distribution
    // Implement data distribution visualization as needed
  };

  const calculateMissingValues = (data) => {
    const missingValues = {};
    data.forEach(row => {
      Object.keys(row).forEach(key => {
        if (!row[key]) {
          missingValues[key] = (missingValues[key] || 0) + 1;
        }
      });
    });
    return missingValues;
  };
   const handleGraphChange = (event) => {
    setSelectedGraph(event.target.value);
  };

  const handleRenameColumn = (oldName, newName) => {
    const newRenamedColumns = { ...renamedColumns, [oldName]: newName };
    setRenamedColumns(newRenamedColumns);
    const newData = csvData.map(row => {
      const newRow = {};
      Object.keys(row).forEach(key => {
        newRow[newRenamedColumns[key] || key] = row[key];
      });
      return newRow;
    });
    setCsvData(newData);
    generateReport(newData);
  };

  const handleFillMissingValues = (method) => {
    if (csvData) {
      const newData = csvData.map(row => {
        const newRow = { ...row };
        Object.keys(newRow).forEach(key => {
          if (!newRow[key]) {
            if (method === 'mean') {
              newRow[key] = calculateMean(csvData, key);
            } else if (method === 'median') {
              newRow[key] = calculateMedian(csvData, key);
            }
          }
        });
        return newRow;
      });
      setManipulatedData(newData);
      setMissingValuesFilled(true);
      generateReport(newData);
    }
  };

  const calculateMean = (data, columnName) => {
    const values = data.map(row => parseFloat(row[columnName])).filter(value => !isNaN(value));
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const calculateMedian = (data, columnName) => {
    const values = data.map(row => parseFloat(row[columnName])).filter(value => !isNaN(value));
    values.sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
  };
   const generateGraph = () => {
    if (!filledData) return null;

    const data = filledData.split('\n').map(row => row.split(','));
    const headers = data[0];
    const rows = data.slice(1);

    let xData = [];
    let yData = [];

    for (let i = 0; i < rows.length; i++) {
      xData.push(rows[i][0]);
      yData.push(rows[i][1]);
    }

    switch (selectedGraph) {
      case 'scatter':
        return (
          <Plot
            data={[
              {
                x: xData,
                y: yData,
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'blue' },
              },
            ]}
            layout={{ width: '100%', height: 400, title: 'Scatter Plot' }}
          />
        );
      case 'histogram':
        return (
          <Plot
            data={[
              {
                x: xData,
                type: 'histogram',
              },
            ]}
            layout={{ width: '100%', height: 400, title: 'Histogram' }}
          />
        );
      case 'bar':
        return (
          <Plot
            data={[
              {
                x: xData,
                y: yData,
                type: 'bar',
              },
            ]}
            layout={{ width: '100%', height: 400, title: 'Bar Chart' }}
          />
        );
      case 'heatmap':
        return (
          <Plot
            data={[
              {
                z: rows,
                x: headers,
                y: yData,
                type: 'heatmap',
              },
            ]}
            layout={{ width: '100%', height: 400, title: 'Heatmap' }}
          />
        );
      default:
        return null;
    }
    
  };
  return (
    <div className="container">
      <div>
          <h1>Upload CSV File</h1>
      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
      <div className="file-upload">
        <label htmlFor="file-upload-input" style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', position:'centre' }}>
            Choose a CSV file
          </label>
          <input
            type="file"
            id="file-upload-input"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }} 
          />
          </div> 
          <div className="sidebar-section">
          <h2>Select Graph Type</h2>
          <div className="dropdown">
            <select value={selectedGraph} onChange={handleGraphChange}>
              <option value="">Select...</option>
              <option value="scatter">Scatter Plot</option>
              <option value="histogram">Histogram</option>
              <option value="bar">Bar Chart</option>
              <option value="heatmap">Heatmap</option>
            </select>
          </div>
        </div>   
      {csvData && (
        <div>
          <h2>Dataset Manipulation</h2>
          <button onClick={() => handleFillMissingValues('mean')} disabled={missingValuesFilled}>
            Fill Missing Values with Mean
          </button>
          <button onClick={() => handleFillMissingValues('median')} disabled={missingValuesFilled}>
            Fill Missing Values with Median
          </button>
          <h3>Rename Columns</h3>
          <ul className="rename-columns-container" >
            {Object.keys(csvData[0]).map((column, index) => (
              <li key={index}>
                <input
                  type="text"
               className="columns-list"
                  placeholder={column}
                  onChange={(e) => handleRenameColumn(column, e.target.value)}
                />
              </li>
            ))}
          </ul>
          </div>
      )}
    </div> 
    <div className="graph-container">
          {generateGraph()}
        </div>  
    </div>
  );
};

export default Dashboard;
