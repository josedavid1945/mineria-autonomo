import { useState } from "react";

interface PostInputProps {
  onSubmit: (content: string) => void;
  loading: boolean;
}

export default function PostInput({ onSubmit, loading }: PostInputProps) {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!inputText.trim() || loading) return;
    onSubmit(inputText);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  const isValid = inputText.trim().length > 0;

  return (
    <div
      style={{
        background: "rgba(50, 42, 35, 0.8)", // Semi-transparent rustic
        borderRadius: "24px",
        boxShadow: isFocused
          ? "0 25px 80px rgba(0, 0, 0, 0.4)"
          : "0 20px 60px rgba(0, 0, 0, 0.2)",
        marginBottom: "32px",
        transition: "all 0.3s ease",
        transform: isFocused ? "scale(1.01)" : "scale(1)",
        border: "1px solid rgba(92, 71, 53, 0.5)"
      }}
    >
      <div style={{ padding: "28px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #a06e3b 0%, #8b5e3c 100%)", // Earthy gradient
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            🧠
          </div>
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#eaddcf", // Light beige
                marginBottom: "4px",
              }}
            >
              ¿Qué estás pensando?
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#a8a29e" }}>
              Escribe algo y la IA lo clasificará automáticamente
            </p>
          </div>
        </div>

        {/* Textarea */}
        <div
          style={{
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading}
            placeholder="Comparte algo gracioso, triste, filosófico, o lo que se te ocurra..."
            style={{
              width: "100%",
              minHeight: "140px",
              padding: "20px",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "#d6d3d1", // Light grey text
              backgroundColor: isFocused ? "#211d18" : "#2b2620", // Darker BG
              border: isFocused ? "2px solid #a06e3b" : "2px solid rgba(92, 71, 53, 0.3)",
              borderRadius: "16px",
              outline: "none",
              resize: "vertical",
              transition: "all 0.2s ease",
              boxShadow: isFocused
                ? "0 0 0 4px rgba(160, 110, 59, 0.1)"
                : "inset 0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              color: "#9ca3af",
              fontSize: "0.85rem",
            }}
          >
            {/* Atajo de teclado */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <kbd
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#383028",
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  border: "1px solid #5c4735",
                  color: "#d6d3d1"
                }}
              >
                Ctrl
              </kbd>
              <span>+</span>
              <kbd
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#383028",
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  border: "1px solid #5c4735",
                  color: "#d6d3d1"
                }}
              >
                Enter
              </kbd>
            </div>

            {/* Contador */}
            <span
              style={{
                color: inputText.length > 900 ? "#ef4444" : "#78716c",
                fontWeight: inputText.length > 900 ? 600 : 400,
              }}
            >
              {inputText.length} / 1000
            </span>
          </div>

          {/* Botón */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isValid}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: 700,
              color: "white",
              background:
                loading || !isValid
                  ? "#4b5563"
                  : "linear-gradient(135deg, #a06e3b 0%, #8b5e3c 100%)",
              border: "none",
              borderRadius: "14px",
              cursor: loading || !isValid ? "not-allowed" : "pointer",
              boxShadow:
                loading || !isValid
                  ? "none"
                  : "0 8px 25px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
              transform: loading || !isValid ? "none" : "translateY(0)",
              opacity: loading || !isValid ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading && isValid) {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(0, 0, 0, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(0, 0, 0, 0.3)";
            }}
          >
            {loading ? (
              <>
                <div
                  className="animate-spin"
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "3px solid rgba(255,255,255,0.3)",
                    borderTop: "3px solid white",
                    borderRadius: "50%",
                  }}
                />
                <span>Analizando...</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: "1.2rem" }}>🚀</span>
                <span>Publicar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
