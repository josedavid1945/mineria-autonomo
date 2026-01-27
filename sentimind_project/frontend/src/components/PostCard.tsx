import type { Post } from "../adapters/postAdapter";
import { getCategoryConfig } from "../utils/constants";

interface Post {
  id: number;
  content: string;
  category: string;
  confidence: number;
  created_at: string;
  author?: {
    username: string;
  };
  categories?: Array<{ name: string; confidence: number }>;
}

export default function PostCard({ post }: { post: Post }) {
  const config = getCategoryConfig(post.category);
  const confidencePercent = Math.round(post.confidence * 100);

  // Obtener categorías detectadas (usar el array o crear uno con la principal)
  const categories =
    post.categories && post.categories.length > 0
      ? post.categories
      : [{ name: post.category, confidence: post.confidence }];

  return (
    <div
      className="card"
      style={{
        background: "rgba(50, 42, 35, 0.8)", // Semi-transparent rustic
        backdropFilter: "blur(5px)",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(92, 71, 53, 0.5)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
      }}
    >
      <div style={{ padding: "24px", flex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a06e3b 0%, #8b5e3c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f3f0eb",
                fontWeight: "bold",
                fontSize: "1.1rem",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              {post.author?.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#d6d3d1", // Author name light grey
                }}
              >
                {post.author?.username || "Anónimo"}
              </h3>
            </div>
          </div>
          <div
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              background: config.bgColor,
              color: config.textColor,
              border: `1px solid ${config.borderColor}`,
              fontSize: "0.85rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>{config.emoji}</span>
            {post.category}
          </div>
        </div>

        {/* Content */}
        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: "1.6",
            color: "#eaddcf", // Post content light beige
            marginBottom: "24px",
            whiteSpace: "pre-wrap",
          }}
        >
          {post.content}
        </p>

        {/* Categories Analysis */}
        <div style={{ marginTop: "auto" }}>
          <div style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#78716c",
            marginBottom: "10px",
            fontWeight: 600
          }}>
            Análisis de Sentimientos
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map((cat, idx) => {
              const catConfig = getCategoryConfig(cat.name);
              const percent = Math.round(cat.confidence * 100);

              return (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.85rem'
                }}>
                  <div style={{
                    width: '24px',
                    textAlign: 'center'
                  }}>{catConfig.emoji}</div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '2px',
                      color: "#d6d3d1"
                    }}>
                      <span>{cat.name}</span>
                      <span style={{ fontWeight: 600 }}>{percent}%</span>
                    </div>
                    <div style={{
                      height: "6px",
                      width: "100%",
                      background: "rgba(0,0,0,0.3)",
                      borderRadius: "3px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${percent}%`,
                        background: catConfig.borderColor,
                        borderRadius: "3px",
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
