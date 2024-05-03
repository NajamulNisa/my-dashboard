import React from 'react';
import DataUploader from './components/DataUploader';
import CsvDataDropdown from './components/CsvDataDropdown';


function App() {
  const [csvData, setCsvData] = React.useState(null);

  const handleDataUpload = (data) => {
    setCsvData(data);
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <DataUploader onDataUpload={handleDataUpload} />
      {csvData && <CsvDataDropdown data={csvData} />}


    </div>
  );
}

export default App;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Plot from "react-plotly.js";

// function App() {
//   const [file, setFile] = useState(null);
//   const [plotData, setPlotData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (file) {
//       const uploadFileAndPlot = async () => {
//         setLoading(true);
//         const formData = new FormData();
//         formData.append("file", file);
//         try {
//           // Upload CSV file
//           await axios.post("https://fastapi-x21t.onrender.com/upload/", formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           // Fetch plot data
//           const response = await axios.post("https://fastapi-x21t.onrender.com/plot/bar/?x_column=ApplicantIncome&y_column=CoapplicantIncome");
//           setPlotData(response.data);
//         } catch (error) {
//           console.error("Error uploading file or fetching plot data: ", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       uploadFileAndPlot();
//     }
//   }, [file]);

//   const handleFileUpload = (event) => {
//     setFile(event.target.files[0]);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       {loading && <p>Loading...</p>}
//       {plotData && (
//         <div>
//           <Plot
//             data={[
//               {
//                 x: plotData.x,
//                 y: plotData.y,
//                 type: 'scatter',
//                 mode: 'markers',
//                 marker: { color: 'blue' },
//               },
//             ]}
//             layout={{
//               width: 800,
//               height: 600,
//               title: 'Scatter Plot',
//               xaxis: { title: 'Applicant Income' },
//               yaxis: { title: 'Coapplicant Income' },
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;






