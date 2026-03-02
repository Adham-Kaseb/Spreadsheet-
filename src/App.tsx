import React, { useEffect, useState } from "react";
import {
  Database,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import type { AppState } from "./types";
import { fetchSheetData } from "./services/sheetService";
import DataTable from "./components/DataTable";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    data: null,
    isLoading: true,
    error: null,
  });

  const loadData = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchSheetData();
      setState({ data, isLoading: false, error: null });
    } catch (err: any) {
      setState({ data: null, isLoading: false, error: err });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem",
        width: "100%",
      }}
    >
      {/* Header Section */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "3rem",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <Database
              className="primary-glow"
              style={{ color: "var(--primary)" }}
              size={28}
            />
            <span
              style={{
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontSize: "0.75rem",
              }}
            >
              Data Intelligence Platform
            </span>
          </div>
          <h1
            className="premium-title"
            style={{ fontSize: "2.5rem", lineHeight: "1.1" }}
          >
            Spreadsheet Insights
          </h1>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={loadData}
            disabled={state.isLoading}
            className="glass-card"
            style={{
              padding: "0.75rem",
              borderRadius: "12px",
              color: "var(--text-main)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            <RefreshCw size={18} className={state.isLoading ? "spin" : ""} />
            {state.isLoading ? "Syncing..." : "Sync Data"}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {state.isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10rem 0",
            }}
          >
            <div className="loader"></div>
            <p
              style={{
                marginTop: "2rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              ANALYZING DATA STRUCTURE...
            </p>
          </div>
        ) : state.error ? (
          <div
            className="glass-card"
            style={{
              padding: "3rem",
              textAlign: "center",
              border: "1px solid rgba(255, 71, 71, 0.2)",
            }}
          >
            {state.error.isRestricted ? (
              <>
                <ShieldAlert
                  size={64}
                  style={{ color: "#ff7b72", marginBottom: "1.5rem" }}
                />
                <h2
                  style={{
                    fontSize: "1.75rem",
                    marginBottom: "1rem",
                    color: "var(--text-bright)",
                  }}
                >
                  Access Restricted
                </h2>
                <p
                  style={{
                    maxWidth: "600px",
                    margin: "0 auto 2rem",
                    color: "var(--text-muted)",
                    fontSize: "1.1rem",
                  }}
                >
                  The Google Sheet is currently private. To visualize your data,
                  please follow these steps:
                </p>
                <div
                  style={{
                    textAlign: "left",
                    maxWidth: "500px",
                    margin: "0 auto 2rem",
                    background: "rgba(0,0,0,0.2)",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <ol
                    style={{
                      paddingLeft: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <li>Open your Google Sheet</li>
                    <li>
                      Click the{" "}
                      <strong style={{ color: "var(--primary)" }}>Share</strong>{" "}
                      button (top right)
                    </li>
                    <li>
                      Under General access, select{" "}
                      <strong style={{ color: "var(--text-bright)" }}>
                        "Anyone with the link"
                      </strong>
                    </li>
                    <li>
                      Set the role to{" "}
                      <strong style={{ color: "var(--text-bright)" }}>
                        "Viewer"
                      </strong>
                    </li>
                  </ol>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <a
                    href={`https://docs.google.com/spreadsheets/d/1aGoZhXyPQjSHbR3VTsJDTzJ6QoIhGcvjvOzODDHGaCI/edit`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ textDecoration: "none" }}
                  >
                    Open Sheet <ExternalLink size={18} />
                  </a>
                  <button
                    onClick={loadData}
                    className="glass-card"
                    style={{
                      padding: "0.8rem 1.5rem",
                      borderRadius: "12px",
                      color: "var(--text-bright)",
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </>
            ) : (
              <>
                <AlertCircle
                  size={64}
                  style={{ color: "#ff7b72", marginBottom: "1.5rem" }}
                />
                <h2
                  style={{
                    fontSize: "1.75rem",
                    marginBottom: "1rem",
                    color: "var(--text-bright)",
                  }}
                >
                  Connection Error
                </h2>
                <p style={{ marginBottom: "2rem", color: "var(--text-muted)" }}>
                  {state.error.message}
                </p>
                <button onClick={loadData} className="btn-primary">
                  Retry Connection
                </button>
              </>
            )}
          </div>
        ) : (
          state.data && (
            <>
              <Dashboard data={state.data.rows} />
              <DataTable headers={state.data.headers} rows={state.data.rows} />

              <footer
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                }}
              >
                <span>Last synced: {state.data.lastUpdated}</span>
                <span>Proprietary Data Interface v1.0</span>
              </footer>
            </>
          )
        )}
      </main>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .loader {
          width: 48px;
          height: 48px;
          border: 3px solid var(--border-color);
          border-bottom-color: var(--primary);
          border-radius: 50%;
          display: inline-block;
          animation: rotation 1s linear infinite;
        }
        @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .primary-glow {
          filter: drop-shadow(0 0 8px var(--primary-glow));
        }
      `}</style>
    </div>
  );
};

export default App;
