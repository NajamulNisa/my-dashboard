import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import CsvDataDropdown from "./CsvDataDropdown";
import './Dashboard.css';

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
        case "heatmap":
          res = await axios.post(
            `https://fastapi-x21t.onrender.com/plot/heatmap/?x_column=${xColumn}&y_column=${yColumn}`
          );
          break;
          case "histogram":
            res = await axios.post(
              `https://fastapi-x21t.onrender.com/plot/histogram/?x_column=${xColumn}&y_column=${yColumn}`
            );
            break;
            case "scatter3D":
              res = await axios.post(
                `https://fastapi-x21t.onrender.com//plot/scatter3d/?x_column=${xColumn}&y_column=${yColumn}`
              );
              break;
              case "pie":
                res = await axios.post(
                  `https://fastapi-x21t.onrender.com/plot/pie/?x_column=${xColumn}&y_column=${yColumn}`
                );
                break;
                case "densitymapbox":
                  res = await axios.post(
                    `https://fastapi-x21t.onrender.com/plot/density_mapbox/?x_column=${xColumn}&y_column=${yColumn}`
                  );
                  break;
                  case "violin":
                    res = await axios.post(
                      `https://fastapi-x21t.onrender.com/plot/violin/?x_column=${xColumn}&y_column=${yColumn}`
                    );
                    break;
                    case "strip":
                      res = await axios.post(
                        `https://fastapi-x21t.onrender.com/plot/strip/?x_column=${xColumn}&y_column=${yColumn}`
                      );
                      break;
                      case "edfc":
                        res = await axios.post(
                          `https://fastapi-x21t.onrender.com/plot/ecdf/?x_column=${xColumn}&y_column=${yColumn}`
                        );
                        break;
                        case "density_contour":
                          res = await axios.post(
                            `https://fastapi-x21t.onrender.com/plot/density_contour/?x_column=${xColumn}&y_column=${yColumn}`
                          );
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
  }, [graphType, xColumn, yColumn]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setErrorMessage("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://fastapi-x21t.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedData(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <div>
      <input type="file"  accept=".csv" onChange={handleFileUpload} />
      <h1>Select Graph Type</h1>
      <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
        <option value="">Select Graph Type</option>
        <option value="scatter">Scatter Plot</option>
        <option value="bar">Bar Chart</option>
        <option value="heatmap">Heatmap</option>
        <option value="histogram">Histogram</option>
        <option value="scatter3D">Scatter3d</option>
        <option value="densitymapbox">Density_mapbox</option>
        <option value="pie">Pie Chart</option>
        <option value="violin">Violin</option>
        <option value="strip">Strip Chart</option>
        <option value="edfc">edfc Chart</option>
        <option value="density_contour">Density Contour Chart</option>
      </select>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {columns.length > 0 && (
        <div className="conatiner">
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
       {graphData && graphType === "histogram" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
       {graphData && graphType === "scatter3D" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
       {graphData && graphType === "pie" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
       {graphData && graphType === "densitymapbox" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
       {graphData && graphType === "violin" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
       {graphData && graphType === "strip" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
       {graphData && graphType === "edfc" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
       {graphData && graphType === "density_contour" && (
        <Plot data={graphData.data} layout={graphData.layout} />
      )}
    </div>
  );
}

export default DataUploader;
