// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// function DataUploader() {
//   // const [uploadedData, setUploadedData] = useState(null);
//   const [graphType, setGraphType] = useState('');
//   const [graphData, setGraphData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (graphType) {
//       fetchDataForGraph();
//     }
//   }, [graphType, fetchDataForGraph]);

//   // Function to handle file upload
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Check if the file is a CSV file
//     if (!file.name.endsWith('.csv')) {
//       setErrorMessage('Please select a CSV file.');
//       return;
//     }

//     // Create FormData object to send file
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // Make POST request to upload API endpoint
//       const response = await axios.post('https://fastapi-x21t.onrender.com/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Set uploaded data in state
//       setUploadedData(response.data);
//       console.log(response.data)
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setErrorMessage('Error uploading file. Please try again.');
//     }
//   };

//   // Function to fetch data for the selected graph type
//   const fetchDataForGraph = async () => {
//     try {
//       let response;
//       // Fetch data based on the selected graph type
//       switch (graphType) {
//         case 'scatter':
//           response = await axios.post('https://fastapi-x21t.onrender.com/plot/scatter?x_column=ApplicantIncome&y_column=CoapplicantIncome');
//           break;
//         case 'bar':
//           response = await axios.post('https://fastapi-x21t.onrender.com/plot/bar?x_column=ApplicantIncome&y_column=CoapplicantIncome');
//           break;
//         case 'heatmap':
//           response = await axios.post('https://fastapi-x21t.onrender.com/plot/heatmap/?x_column=ApplicantIncome&y_column=CoapplicantIncome');
//           break;
//         default:
//           // Handle invalid graph type
//           setGraphData(null);
//           return;
//       }
//       // Set fetched data in state
//       console.log('Fetched data:', response.data);
//       setGraphData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setGraphData(null);
//     }
//   };

//   // Function to plot graph
//   const plotGraph = () => {
//     if (!graphData) {
//       return <p>No data available to plot.</p>;
//     }

//     // Plot graph based on graph type
//     switch (graphType) {
//       case 'scatter':
//         // Plot scatter plot
//         return (
//           <Plot
//             data={[{ type: 'scatter', x: graphData.x, y: graphData.y }]}
//             layout={{ width: 800, height: 400, title: 'Scatter Plot' }}
//           />
//         );
//       case 'bar':
//         // Plot bar chart
//         return (
//           <Plot
//             data={[{ type: 'bar', x: graphData.x, y: graphData.y }]}
//             layout={{ width: 800, height: 400, title: 'Bar Chart' }}
//           />
//         );
//       case 'heatmap':
//         // Plot histogram
//         return (
//           <Plot
//             data={[{ type: 'heatmap', x: graphData.data }]}
//             layout={{ width: 800, height: 400, title: 'heatmap' }}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       {/* Input field for file upload */}
//       <input type="file" accept=".csv" onChange={handleFileUpload} />

//       {/* Dropdown for selecting graph type */}
//       <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
//         <option value="">Select Graph Type</option>
//         <option value="scatter">Scatter Plot</option>
//         <option value="bar">Bar Chart</option>
//         <option value="heatmap">Heatmap</option>
//       </select>

//       {/* Error message */}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

//       {/* Plot graph based on selected graph type */}
//       {plotGraph()}
//     </div>
//   );
// }

// export default DataUploader;

// Najamms code ---------------------------------------

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// function DataUploader() {
//   const [uploadedData, setUploadedData] = useState(null);
//   const [graphType, setGraphType] = useState('');
//   const [graphData, setGraphData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   const fetchDataForGraph = async () => {
//     try {
//       let response;

//       switch (graphType) {
//         case 'scatter':
//           response = await axios.post('https://fastapi-x21t.onrender.com/plot/');
//           break;
//         case 'bar':
//           response = await axios.post('https://fastapi-x21t.onrender.com/plot/');
//           break;
//         case 'heatmap':
//           response = await axios.post('https://fastapi-x21t.onrender.com/plot/heatmap/');
//           break;
//         default:
//           setGraphData(null);
//           return;
//       }
//       setUploadedData(response.data);
//       setGraphData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setGraphData(null);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchDataForGraph();
//     };
//     if (graphType) {
//       fetchData();
//     }
//   }, [graphType]);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!file.name.endsWith('.csv')) {
//       setErrorMessage('Please select a CSV file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.post('https://fastapi-x21t.onrender.com/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setErrorMessage('Error uploading file. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".csv" onChange={handleFileUpload} />

//       <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
//         <option value="">Select Graph Type</option>
//         <option value="scatter">Scatter Plot</option>
//         <option value="bar">Bar Chart</option>
//         <option value="heatmap">Heatmap</option>
//       </select>

//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

//       {graphData && graphType === 'scatter' && (
//         <Plot
//           data={[{ type: 'scatter', x: graphData.x, y: graphData.y }]}
//           layout={{ width: 800, height: 400, title: 'Scatter Plot' }}
//         />
//       )}

//       {graphData && graphType === 'bar' && (
//         <Plot
//           data={[{ type: 'bar', x: graphData.x, y: graphData.y }]}
//           layout={{ width: 800, height: 400, title: 'Bar Chart' }}
//         />
//       )}

//       {graphData && graphType === 'heatmap' && (
//         <Plot
//           data={[{ type: 'heatmap', x: graphData.data }]}
//           layout={{ width: 800, height: 400, title: 'Heatmap' }}
//         />
//       )}
//     </div>
//   );
// }

// export default DataUploader;


//  My code  for the project


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import CsvDataDropdown from './CsvDataDropdown'; // Import the CsvDataDropdown component

function DataUploader() {
  const [uploadedData, setUploadedData] = useState(null);
  const [response, setResponse] = useState(null);
  const [graphType, setGraphType] = useState('');
  const [graphData, setGraphData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (uploadedData != null) {
        console.log('uploadedData = ',uploadedData)
        console.log('columnNames = ',uploadedData.column_data)
      const columnNames = Object.keys(uploadedData.column_data);
      setColumns(columnNames);
    //   if (columnNames.length >= 2) {
    //     setXColumn(columnNames[0]);
    //     setYColumn(columnNames[1]);
    //   }
    // <select value={setColumns} onChange={(e) => setColumns(e.target.value)}>
    //     {/* {setColumns.map(column => ( */}
    //       {/* <option key={column} value={column}>{column}</option> */}
    //     {/* ))} */}
    //     </select>

    }

  }, [uploadedData]);

  const fetchDataForGraph = async () => {
    try {
      let res;
      let data;

      switch (graphType) {
        case 'scatter':
          res = await axios.post(`https://fastapi-x21t.onrender.com/plot/scatter?x_column=ApplicantIncome&y_column=CoapplicantIncome`);
          break;
        case 'bar':
            res = await axios.post(`https://fastapi-x21t.onrender.com/plot/bar?x_column=ApplicantIncome&y_column=CoapplicantIncome`);
          break;
        case 'heatmap':
          res = await axios.post(`https://fastapi-x21t.onrender.com/plot/heatmap/?x_column=${xColumn}&y_column=${yColumn}`);
          break;
        default:
          setGraphData(null);
          return;
      }
    data=JSON.parse(res.data)
    data.layout['width'] = 1000;
    data.layout['height'] = 400;
    console.log('layout = ',data.layout)
      setResponse(data)
      console.log('res = ',res)
      console.log('response = ',response)
      setGraphData(response);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setGraphData(null);
    }
  };

  useEffect(() => {
    if (graphType) {
      fetchDataForGraph();
    }
  }, [graphType, xColumn, yColumn]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setErrorMessage('Please select a CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://fastapi-x21t.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadedData(response.data);
      console.log('this is uploaded data',response.data)
      setErrorMessage('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
        <option value="">Select Graph Type</option>
        <option value="scatter">Scatter Plot</option>
        <option value="bar">Bar Chart</option>
        <option value="heatmap">Heatmap</option>
      </select>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {columns.length > 0 && (
        <div>
          <CsvDataDropdown label="X Column:" columns={columns} selectedColumn={xColumn} onChange={setXColumn} />
          <CsvDataDropdown label="Y Column:" columns={columns} selectedColumn={yColumn} onChange={setYColumn} />
        </div>
      )}

      {graphData && graphType === 'scatter' && (
        <Plot
        data={response.data}
        layout={response.layout}
        />
      )}

      {graphData && graphType === 'bar' && (
        <Plot
          data={response.data}
          layout={response.layout}
        />
      )}

      {graphData && graphType === 'heatmap' && (
        <Plot
          data={[{ type: 'heatmap', x: graphData.data }]}
          layout={{ width: 800, height: 400, title: 'Heatmap' }}
        />
      )}
    </div>
  );
}

export default DataUploader;




