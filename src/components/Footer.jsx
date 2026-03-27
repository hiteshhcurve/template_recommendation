export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} Hockeycurve
          </span>
          <nav className="footer-ai-links" aria-label="AI agent links">
            <a href="/llms.txt" className="footer-ai-link">
              llms.txt
            </a>
            <a href="/ai-manifest" className="footer-ai-link">
              AI Manifest
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
