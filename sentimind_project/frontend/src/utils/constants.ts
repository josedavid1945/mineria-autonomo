// Categorías disponibles para los botones de filtro (12 categorías + Todas)
export const CATEGORIES = [
  "Todas",
  // Emociones básicas
  "Alegría",
  "Tristeza",
  "Enojo",
  "Miedo",
  "Sorpresa",
  "Asco",
  // Emociones sociales importantes
  "Amor",
  // Contenido
  "Humor",
  "Inspiración",
  "Queja",
  "Reflexión",
  // Especial
  "Sarcasmo",
];

// Configuración de colores y emojis para cada categoría (Rustic Dark Theme)
export interface CategoryConfig {
  emoji: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  lightBg: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  // Emociones básicas
  Alegría: {
    emoji: "😊",
    bgColor: "#4d3b2a", // Dark warm brown
    textColor: "#fcd34d", // Soft gold
    borderColor: "#d97706",
    lightBg: "#5c4735",
  },
  Tristeza: {
    emoji: "😢",
    bgColor: "#2a364d", // Dark blue-grey
    textColor: "#93c5fd", // Light blue
    borderColor: "#3b82f6",
    lightBg: "#354363",
  },
  Enojo: {
    emoji: "😠",
    bgColor: "#4d2a2a", // Dark red
    textColor: "#fca5a5", // Light red
    borderColor: "#ef4444",
    lightBg: "#633535",
  },
  Miedo: {
    emoji: "😨",
    bgColor: "#2d333b", // Dark grey
    textColor: "#cbd5e1", // Light grey
    borderColor: "#64748b",
    lightBg: "#3e4652",
  },
  Sorpresa: {
    emoji: "😲",
    bgColor: "#2a464d", // Dark cyan
    textColor: "#67e8f9", // Light cyan
    borderColor: "#06b6d4",
    lightBg: "#355963",
  },
  Asco: {
    emoji: "🤢",
    bgColor: "#3a4d2a", // Dark lime/green
    textColor: "#bef264", // Light lime
    borderColor: "#84cc16",
    lightBg: "#4a6335",
  },
  // Emociones sociales
  Amor: {
    emoji: "❤️",
    bgColor: "#4d2a3e", // Dark pink/maroon
    textColor: "#f9a8d4", // Light pink
    borderColor: "#ec4899",
    lightBg: "#63354f",
  },
  // Contenido
  Humor: {
    emoji: "😂",
    bgColor: "#4d462a", // Dark yellow/olive
    textColor: "#fde047", // Light yellow
    borderColor: "#eab308",
    lightBg: "#635a35",
  },
  Inspiración: {
    emoji: "✨",
    bgColor: "#2a4d3e", // Dark emerald
    textColor: "#6ee7b7", // Light emerald
    borderColor: "#10b981",
    lightBg: "#356350",
  },
  Queja: {
    emoji: "😤",
    bgColor: "#3f3f46", // Dark zinc
    textColor: "#d4d4d8", // Light zinc
    borderColor: "#a1a1aa",
    lightBg: "#52525b",
  },
  Reflexión: {
    emoji: "🤔",
    bgColor: "#3b2a4d", // Dark purple
    textColor: "#d8b4fe", // Light purple
    borderColor: "#a855f7",
    lightBg: "#4e3563",
  },
  // Especial
  Sarcasmo: {
    emoji: "😏",
    bgColor: "#574c35", // Dark amber/brown
    textColor: "#fbbf24", // Amber
    borderColor: "#f59e0b",
    lightBg: "#6b5d41",
  },
};

export const getCategoryConfig = (category: string): CategoryConfig => {
  return (
    CATEGORY_CONFIG[category] || {
      emoji: "📝",
      bgColor: "#374151",
      textColor: "#e5e7eb",
      borderColor: "#6b7280",
      lightBg: "#4b5563",
    }
  );
};

// Mantener para compatibilidad si algo lo usa (aunque PostCard usa getCategoryConfig)
export const CATEGORY_COLORS: Record<string, string> = {};

export const getCategoryColor = (category: string): string => {
  // Fallback dummy implementation since we moved to inline styles with config
  return "bg-gray-800 text-gray-200 border-gray-600";
};
