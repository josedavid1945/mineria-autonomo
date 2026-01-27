import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import PostInput from "../components/PostInput";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const { posts, loading, error, filter, setFilter, addPost } = usePosts();

  return (
    <div
      style={{
        minHeight: "100vh",
        // background handled by body in index.css
        padding: "20px",
        paddingTop: "100px", // Adjusted for fixed navbar
      }}
    >
      {/* Contenedor principal */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ========== HEADER ========== */}
        <header
          style={{
            textAlign: "center",
            marginBottom: "40px",
            paddingTop: "20px",
          }}
        >
          {/* Logo animado */}
          <div
            className="animate-float"
            style={{
              width: "100px",
              height: "100px",
              margin: "0 auto 20px",
              background: "#383028", // Rustic brown
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "50px",
              boxShadow: "0 20px 60spx rgba(0, 0, 0, 0)",
              border: "1px solid #5c4735"
            }}
          >
            🤔
          </div>

          {/* Título */}
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#eaddcf", // Light warm beige
              marginBottom: "10px",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            Como te sientes pe causa
          </h1>


        </header>

        {/* ========== ÁREA DE INPUT ========== */}
        <PostInput onSubmit={addPost} loading={loading} />

        {/* ========== MENSAJE DE ERROR ========== */}
        {error && (
          <div
            className="animate-fade-in"
            style={{
              background: "rgba(107, 80, 80, 0)",
              border: "1px solid #7f1d1d",
              borderRadius: "16px",
              padding: "16px 20px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#fca5a5",
            }}
          >
            <span style={{ fontSize: "24px" }}>⚠️</span>
            <span style={{ fontWeight: 500 }}>{error}</span>
          </div>
        )}

        {/* ========== BARRA DE FILTROS ========== */}
        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        {/* ========== ESTADÍSTICAS ========== */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(56, 48, 40, 0.6)",
              backdropFilter: "blur(10px)",
              padding: "12px 24px",
              borderRadius: "30px",
              color: "#d6d3d1",
              fontSize: "0.9rem",
              border: "1px solid rgba(139, 94, 60, 0.3)"
            }}
          >
            {filter ? (
              <>
                📊 Mostrando <strong>{posts.length}</strong> posts de{" "}
                <strong>{filter}</strong>
              </>
            ) : (
              <>
                📊 Mostrando <strong>{posts.length}</strong> posts totales
              </>
            )}
          </div>
        </div>

        {/* ========== GRID DE POSTS ========== */}
        {loading && posts.length === 0 ? (
          <div
            style={{
              background: "rgba(56, 48, 40, 0.8)",
              borderRadius: "24px",
              padding: "60px 20px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
              border: "1px solid #5c4735"
            }}
          >
            <div
              className="animate-spin"
              style={{
                width: "60px",
                height: "60px",
                margin: "0 auto 20px",
                border: "4px solid #4a4036",
                borderTop: "4px solid #a06e3b",
                borderRadius: "50%",
              }}
            />
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#eaddcf",
                marginBottom: "8px",
              }}
            >
              Cargando posts...
            </p>
            <p style={{ color: "#a8a29e" }}>Conectando con la IA</p>
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              background: "rgba(56, 48, 40, 0.8)",
              borderRadius: "24px",
              padding: "60px 20px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
              border: "1px solid #5c4735"
            }}
          >
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>📝</div>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#eaddcf",
                marginBottom: "8px",
              }}
            >
              No hay posts aún
            </p>
            <p style={{ color: "#a8a29e", fontSize: "1rem" }}>
              ¡Sé el primero en publicar algo y ver la magia de la IA!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "24px",
            }}
          >
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
