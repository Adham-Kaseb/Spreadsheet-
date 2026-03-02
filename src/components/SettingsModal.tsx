import React, { useState } from "react";
import { X, Save, RotateCcw, Link2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  onSave: (url: string) => void;
}

const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUrl,
  onSave,
}) => {
  const [url, setUrl] = useState(currentUrl);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "2rem",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(15, 12, 21, 0.4)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div
        className="glass-card"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "550px",
          padding: "2.5rem",
          background: "white",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          animation: "slideUp 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "800",
                color: "var(--text-bright)",
                margin: 0,
              }}
            >
              إعدادات المصدر
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                marginTop: "0.25rem",
              }}
            >
              قم بتغيير رابط جوجل شيت لجلب بيانات جديدة
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              color: "var(--text-muted)",
              background: "none",
              padding: "8px",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              padding: "0.75rem",
              background: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "var(--secondary)",
                marginBottom: "4px",
              }}
            >
              الرابط الافتراضي:
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                wordBreak: "break-all",
                opacity: 0.7,
              }}
            >
              https://docs.google.com/spreadsheets/d/1aGoZhXyPQjSHbR3VTsJDTzJ6QoIhGcvjvOzODDHGaCI/edit#gid=1651906944
            </div>
          </div>

          <div
            style={{
              padding: "0.75rem",
              background: "rgba(114, 77, 200, 0.05)",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "var(--primary)",
                marginBottom: "4px",
              }}
            >
              الرابط النشط حاليًا:
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--primary)",
                wordBreak: "break-all",
                fontWeight: "600",
              }}
            >
              {currentUrl || "المصنع الافتراضي"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: "700",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Link2 size={16} />
            تحديث الرابط (Update URL)
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="أدخل الرابط هنا..."
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "12px",
              border: "2px solid #eee",
              background: "#f9f9fb",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.3s ease",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
            onBlur={(e) => (e.target.style.borderColor = "#eee")}
          />
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              background: "rgba(114, 77, 200, 0.05)",
              padding: "10px",
              borderRadius: "8px",
              lineHeight: "1.5",
            }}
          >
            ⚠️ تأكد من أن الملف بوضعية{" "}
            <strong>"أي شخص لديه الرابط يمكنه العرض"</strong> في إعدادات
            المشاركة بجوجل شيت.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            onClick={() => onSave(url)}
            className="btn-primary"
            style={{ flex: 1, justifyContent: "center", padding: "1rem" }}
          >
            <Save size={18} />
            حفظ التغييرات
          </button>

          <button
            onClick={() => setUrl("")}
            className="glass-card"
            style={{
              padding: "1rem",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-main)",
              fontWeight: "600",
            }}
          >
            <RotateCcw size={18} />
            إعادة تعيين
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SettingsModal;
