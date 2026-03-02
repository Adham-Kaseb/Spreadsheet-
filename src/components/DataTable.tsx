import React, { useState } from "react";
import { Search, ChevronUp, ChevronDown, Filter } from "lucide-react";

interface Props {
  headers: string[];
  rows: Record<string, any>[];
}

const DataTable: React.FC<Props> = ({ headers, rows }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredRows = sortedRows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div
      className="glass-card"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
          Data Repository
        </h2>
        <div style={{ position: "relative", flex: "1", maxWidth: "400px" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            placeholder="Search all records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              background: "rgba(0,0,0,0.2)",
              border: "1px solid var(--border-color)",
              borderRadius: "10px",
              color: "var(--text-main)",
              outline: "none",
              transition: "var(--transition-smooth)",
            }}
          />
        </div>
      </div>

      <div style={{ overflowX: "auto", flex: "1" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {headers.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  style={{
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {header}
                    {sortConfig?.key === header ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )
                    ) : (
                      <Filter size={14} style={{ opacity: 0.3 }} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: "1px solid var(--border-color)",
                  transition: "var(--transition-smooth)",
                  cursor: "default",
                }}
                className="table-row-hover"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    style={{ padding: "1rem", fontSize: "0.875rem" }}
                  >
                    {String(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRows.length === 0 && (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            No records found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
