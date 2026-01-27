import { useState } from "react";
import { CATEGORIES, getCategoryConfig } from "../utils/constants";

interface FilterBarProps {
  currentFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

export default function FilterBar({
  currentFilter,
  onFilterChange,
}: FilterBarProps) {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  return (
    <div
      style={{
        background: "rgba(50, 42, 35, 0.8)", // Semi-transparent rustic
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(92, 71, 53, 0.5)"
      }}
    >
      {/* Título */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#a8a29e", // Muted rustic
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          🎯 Filtrar por categoría
        </span>
      </div>

      {/* Botones de filtro */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive =
            currentFilter === cat || (cat === "Todas" && !currentFilter);
          const isHovered = hoveredCat === cat;
          const config = getCategoryConfig(cat);

          return (
            <button
              key={cat}
              onClick={() => onFilterChange(cat === "Todas" ? null : cat)}
              onMouseEnter={() => setHoveredCat(cat)}
              onMouseLeave={() => setHoveredCat(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: isActive ? "1px solid transparent" : "1px solid #5c4735",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isActive
                  ? cat === "Todas"
                    ? "linear-gradient(135deg, #a06e3b 0%, #8b5e3c 100%)"
                    : config.borderColor // Use border color as strong bg for active
                  : isHovered
                    ? "#4a4036" // Lighter rustic brown hover
                    : "#383028", // Dark rustic brown default
                color: isActive ? "#f3f0eb" : "#d6d3d1",
                boxShadow: isActive
                  ? "0 6px 20px rgba(0, 0, 0, 0.3)"
                  : "0 2px 8px rgba(0, 0, 0, 0.1)",
                transform: isActive
                  ? "scale(1.05)"
                  : isHovered
                    ? "scale(1.02)"
                    : "scale(1)",
              }}
            >
              {cat !== "Todas" && (
                <span style={{ fontSize: "1rem" }}>{config.emoji}</span>
              )}
              {cat === "Todas" && <span style={{ fontSize: "1rem" }}>🌐</span>}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
