import React, { useState } from "react";
import {
  Search,
  Mail,
  User,
  BookOpen,
  Briefcase,
  Calendar,
  Info,
  Hash,
} from "lucide-react";

interface Props {
  headers: string[];
  rows: Record<string, any>[];
}

const DataCardGrid: React.FC<Props> = ({ headers, rows }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const getIcon = (header: string) => {
    const h = header.toLowerCase();
    if (h.includes("اسم") || h.includes("name")) return <User size={16} />;
    if (h.includes("بريد") || h.includes("mail")) return <Mail size={16} />;
    if (
      h.includes("دراسي") ||
      h.includes("study") ||
      h.includes("جامعة") ||
      h.includes("university")
    )
      return <BookOpen size={16} />;
    if (h.includes("عمل") || h.includes("work") || h.includes("job"))
      return <Briefcase size={16} />;
    if (h.includes("طابع") || h.includes("time") || h.includes("date"))
      return <Calendar size={16} />;
    if (h.includes("هل") || h.includes("is") || h.includes("status"))
      return <Info size={16} />;
    return <Hash size={16} />;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Enhanced Search Header */}
      <div
        className="glass-card"
        style={{
          padding: "1.25rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "12px",
              height: "24px",
              background: "var(--primary)",
              borderRadius: "4px",
            }}
          />
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              color: "var(--text-bright)",
              margin: 0,
            }}
          >
            مستودع البيانات
          </h2>
        </div>

        <div style={{ position: "relative", flex: "1", maxWidth: "450px" }}>
          <Search
            size={20}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--primary)",
            }}
          />
          <input
            type="text"
            placeholder="ابحث عن أي معلومة هنا..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 42px 12px 16px",
              background: "var(--bg-color)",
              border: "2px solid transparent",
              borderRadius: "14px",
              color: "var(--text-main)",
              outline: "none",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "var(--transition-smooth)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
            onBlur={(e) => (e.target.style.borderColor = "transparent")}
          />
        </div>
      </div>

      {/* Upgraded Cards Grid */}
      <div className="cards-grid">
        {filteredRows.map((row, idx) => {
          const mainTitleHeader = headers[2]; // Usually the name
          const timestampHeader = headers[0];
          const secondaryTitleHeader = headers[1];

          return (
            <div
              key={idx}
              className="glass-card premium-card"
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                background: "white",
                border: "1px solid rgba(100, 110, 167, 0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative Accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100%",
                  height: "4px",
                  background: `linear-gradient(90deg, var(--primary), var(--accent))`,
                }}
              />

              {/* Card Header Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      color: "var(--secondary)",
                      background: "rgba(183, 171, 208, 0.15)",
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {row[timestampHeader]}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "900",
                    color: "var(--text-bright)",
                    margin: "0.5rem 0 0",
                    lineHeight: "1.2",
                  }}
                >
                  {row[mainTitleHeader]}
                </h3>

                {row[secondaryTitleHeader] && (
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--primary)",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Mail size={14} />
                    {row[secondaryTitleHeader]}
                  </div>
                )}
              </div>

              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(to left, var(--border-color), transparent)",
                  margin: "0.25rem 0",
                }}
              />

              {/* Information Rows */}
              <div style={{ display: "grid", gap: "1.25rem" }}>
                {headers.slice(3).map((header) => {
                  const value = row[header];
                  if (!value || String(value).trim() === "............")
                    return null;
                  const icon = getIcon(header);

                  return (
                    <div
                      key={header}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                        background: "rgba(243, 244, 248, 0.5)",
                        padding: "1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(0,0,0,0.02)",
                        transition: "var(--transition-smooth)",
                      }}
                    >
                      <div
                        style={{
                          color: "var(--primary)",
                          background: "white",
                          padding: "8px",
                          borderRadius: "10px",
                          boxShadow: "0 2px 8px rgba(100, 110, 167, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {icon}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          gap: "0.25rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--secondary)",
                            fontWeight: "800",
                            textTransform: "uppercase",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {header}
                        </span>
                        <span
                          style={{
                            fontSize: "1.05rem",
                            color: "var(--text-main)",
                            fontWeight: "600",
                            lineHeight: "1.4",
                          }}
                        >
                          {String(value)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredRows.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              padding: "6rem",
              textAlign: "center",
              background: "white",
              borderRadius: "24px",
              border: "2px dashed var(--border-color)",
            }}
          >
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1.25rem",
                fontWeight: "600",
              }}
            >
              عذراً، لم يتم العثور على أي بيانات مطابقة لبحثك.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        @media (max-width: 1024px) {
            .cards-grid {
                grid-template-columns: 1fr;
            }
        }

        .premium-card {
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        }
        .premium-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(100, 110, 167, 0.12);
            border-color: var(--primary);
        }
        .premium-card:hover div[style*="background: white"] {
            color: var(--accent) !important;
            transform: rotate(5deg);
        }
      `}</style>
    </div>
  );
};

export default DataCardGrid;
