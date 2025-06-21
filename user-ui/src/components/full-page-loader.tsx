function FullPageLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <span className="loader"></span> {/* Sử dụng lại loader của bạn */}
    </div>
  );
}

export default FullPageLoader;
