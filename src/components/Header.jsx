import "bootstrap/dist/css/bootstrap.min.css";

export default function Header({ children }) {
  return (
    <div
      id="header"
      className="d-flex justify-content-between align-items-center"
    >
      {children}
    </div>
  );
}
