const Loader = ({ size = "md", color = "#3b82f6" }) => {
  const sizeStyles = {
    sm: { width: "32px", height: "32px" },
    md: { width: "48px", height: "48px" },
    lg: { width: "64px", height: "64px" },
  };

  const containerStyle = {
    position: "static",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.4)",
    zIndex: 9999,
    margin: "2rem auto",
  };

  const wrapperStyle = {
    ...sizeStyles[size],
    position: "relative",
  };

  const squareBaseStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "4px",
    transformOrigin: "center",
  };

  const square1Style = {
    ...squareBaseStyle,
    backgroundColor: color,
    animation: "morph 2s ease-in-out infinite",
  };

  const square2Style = {
    ...squareBaseStyle,
    backgroundColor: color + "99",
    animation: "morph 2s ease-in-out infinite",
    animationDelay: "0.5s",
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={wrapperStyle}>
          <div style={square1Style} />
          <div style={square2Style} />
        </div>
      </div>
    </>
  );
};

export default Loader;
