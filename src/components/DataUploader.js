import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import CsvDataDropdown from "./CsvDataDropdown";

function DataUploader() {
  const [uploadedData, setUploadedData] = useState(null);
  const [graphType, setGraphType] = useState("");
  const [graphData, setGraphData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [xColumn, setXColumn] = useState("");
  const [yColumn, setYColumn] = useState("");
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (uploadedData != null) {
      let cols = Object.keys(uploadedData.column_data);
      setColumns(cols);
      if (cols.length >= 2) {
        setXColumn(cols[0]);
        setYColumn(cols[1]);
      }
    }
  }, [uploadedData]);

  const fetchDataForGraph = async () => {
    try {
      let res, data;

      switch (graphType) {
        case "scatter":
          res = await axios.post(
            `https://fastapi-x21t.onrender.com/plot/scatter?x_column=${xColumn}&y_column=${yColumn}`
          );
          break;
        case "bar":
          res = await axios.post(
            `https://fastapi-x21t.onrender.com/plot/bar?x_column=${xColumn}&y_column=${yColumn}`
          );
          break;
        case 'heatmap':
          response = await axios.post('https://fastapi-x21t.onrender.com/plot/heatmap/?x_column=ApplicantIncome&y_column=CoapplicantIncome');
          break;
        default:
          setGraphData(null);
          return;
      }
      data = JSON.parse(res.data);
      data.layout["width"] = 1200;
      data.layout["height"] = 800;
      setGraphData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setGraphData(null);
    }
  };

  useEffect(() => {
    if (graphType) {
      fetchDataForGraph();
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
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
        <option value="">Select Graph Type</option>
        <option value="scatter">Scatter Plot</option>
        <option value="bar">Bar Chart</option>
        <option value="heatmap">Heatmap</option>
        <option value="histogram">Histogram</option>
      </select>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {columns.length > 0 && (
        <div>
          <CsvDataDropdown
            label="X Column:"
            columns={columns}
            selectedColumn={xColumn}
            onChange={setXColumn}
          />
          <CsvDataDropdown
            label="Y Column:"
            columns={columns}
            selectedColumn={yColumn}
            onChange={setYColumn}
          />
        </div>
      )}

      {graphData && graphType === "scatter" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}

      {graphData && graphType === "bar" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}

      {graphData && graphType === "heatmap" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
    </div>
  );
}

export default DataUploader;
