// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// function DataUploader() {
//   const [file, setFile] = useState(null);
//   const [scatterData, setScatterData] = useState(null);
//   const [barData, setBarData] = useState(null);
//   // Add more state variables for other graph types as needed

//   useEffect(() => {
//     fetchDataForScatter();
//     fetchDataForBar();
//     // Fetch data for other graph types as needed
//   }, []);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.post('https://fastapi-x21t.onrender.com/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       // After successful upload, fetch data for graphs
//       fetchDataForScatter();
//       fetchDataForBar();
//       // Fetch data for other graph types as needed
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   const fetchDataForScatter = async () => {
//     try {
//       const response = await axios.post('https://fastapi-x21t.onrender.com/plot/scatter',  { params: { x_column: 'ApplicantIncome', y_column: 'CoapplicantIncome' }});
//       setScatterData(response.data);
//     } catch (error) {
//       console.error('Error fetching scatter data:', error);
//     }
//   };

//   const fetchDataForBar = async () => {
//     try {
//       const response = await axios.post('https://fastapi-x21t.onrender.com/plot/bar', { params: { x_column: 'ApplicantIncome', y_column: 'CoapplicantIncome' }});
//       setBarData(response.data);
//     } catch (error) {
//       console.error('Error fetching bar data:', error);
//     }
//   };

//   // Add more functions to fetch data for other graph types as needed

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload</button>

//       {scatterData && (
//         <div>
//           <h2>Scatter Plot</h2>
//           <Plot
//             data={[{ type: 'scatter', x: scatterData.x, y: scatterData.y }]}
//             layout={{ width: 800, height: 400, title: 'Scatter Plot' }}
//           />
//         </div>
//       )}

//       {barData && (
//         <div>
//           <h2>Bar Chart</h2>
//           <Plot
//             data={[{ type: 'bar', x: barData.x, y: barData.y }]}
//             layout={{ width: 800, height: 400, title: 'Bar Chart' }}
//           />
//         </div>
//       )}

//       {/* Render other graphs based on fetched data */}
//     </div>
//   );
// }

// export default DataUploader;
import React, { useState } from 'react';
import axios from 'axios';

function DataUploader() {
  const [uploadedData, setUploadedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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
      // Handle error, e.g., display error message to the user
    }
  };

  return (
    <div>
      {/* Input field for file upload */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display uploaded data */}
      {uploadedData && (
        <div style={styles.card}>
          <h2 style={styles.cardHeader}>Uploaded Data</h2>
          {/* Display uploaded data in a preformatted text */}
          <pre style={styles.cardContent}>{JSON.stringify(uploadedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// CSS styles
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  },
  cardHeader: {
    fontSize: '20px',
    marginBottom: '10px'
  },
  cardContent: {
    fontFamily: 'monospace',
    fontSize: '14px',
    whiteSpace: 'pre-wrap'
  }
};

export default DataUploader;



