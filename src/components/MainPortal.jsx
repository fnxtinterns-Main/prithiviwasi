import React from 'react';
import { Link } from 'react-router-dom';

/**
 * MainPortal component
 * The destination portal page navigated to upon pressing the ENTER button.
 * Faithfully recreates home.php with authentic organization branding,
 * mission pillars, impact metrics, and return navigation to the Hero Page.
 */
export default function MainPortal() {
  return (
    <div className="portal-master-container">
      {/* Top Header */}
      <header className="portal-header">
        <div className="header-inner">
          <Link to="/" className="brand-link" title="Hero Landing Page">
            <img
              src="/assets/logo.png"
              alt="पृथ्वीवासी सेवा और सुधार संगठन लोगो"
              className="brand-logo"
            />
            <div className="brand-info">
              <span className="brand-title">पृथ्वीवासी सेवा और सुधार संगठन</span>
              <span className="brand-subtitle">prithviwasi</span>
            </div>
          </Link>

          <nav className="portal-nav" aria-label="Portal Navigation">
            <a href="#initiatives" className="active">मुख्य पृष्ठ</a>
            <a href="#initiatives">हमारे बारे में</a>
            <a href="#impact">संपर्क व सहयोग</a>
          </nav>

          <div className="header-actions">
            <Link to="/" className="hero-return-btn" title="Return to Hero Landing Page">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Hero Page</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Portal Body */}
      <main className="portal-main">
        {/* Hero Banner */}
        <section className="portal-hero">
          <div className="hero-accent-strip" aria-hidden="true" />
          <span className="motto-tag">संघे शक्ति कलियुगे • आधिकारिक पोर्टल</span>
          <h1 className="portal-hero-title">पृथ्वी का कर्ज कब चुकाओगे?</h1>
          <p className="hero-lead">
            हम प्रकृति, पर्यावरण और जन-कल्याण के लिए समर्पित एक निष्ठावान संगठन हैं। हमारा विश्वास है कि संगठित होकर ही हम एक स्वस्थ, हरित और सशक्त समाज का निर्माण कर सकते हैं।
          </p>
        </section>

        {/* Key Initiatives / Pillars */}
        <section className="pillars-grid" id="initiatives" aria-label="मुख्य कार्यक्षेत्र">
          <div className="pillar-card" style={{ '--card-color': '#15803d' }}>
            <span className="card-icon" aria-hidden="true">🌱</span>
            <h3>पर्यावरण एवं वृक्षारोपण</h3>
            <p>
              प्राकृतिक जल स्रोतों का संरक्षण, सघन वृक्षारोपण, तथा प्लास्टिक मुक्त पर्यावरण हेतु निरंतर जन-जागरूकता अभियान।
            </p>
          </div>

          <div className="pillar-card" style={{ '--card-color': '#ea580c' }}>
            <span className="card-icon" aria-hidden="true">🤝</span>
            <h3>मानव सेवा एवं सहायता</h3>
            <p>
              वंचित, वृद्ध एवं दिव्यांग बंधुओं की चिकित्सा व शिक्षा में सहयोग, आपदा काल में प्रत्यक्ष सहायता और अन्नदान।
            </p>
          </div>

          <div className="pillar-card" style={{ '--card-color': '#0284c7' }}>
            <span className="card-icon" aria-hidden="true">🕊️</span>
            <h3>संस्कार एवं सामाजिक सुधार</h3>
            <p>
              युवा शक्ति में राष्ट्रप्रेम, चरित्र निर्माण, नैतिक संस्कार और सामाजिक कुरीतियों के उन्मूलन हेतु विचार गोष्ठियां।
            </p>
          </div>
        </section>

        {/* Impact Stats Strip */}
        <section className="stats-strip" id="impact" aria-label="प्रभाव और आंकड़े">
          <div className="stat-item">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">सफल वृक्षारोपण</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1,250+</div>
            <div className="stat-label">सेवा एवं स्वास्थ्य शिविर</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">18,000+</div>
            <div className="stat-label">लाभान्वित परिवार</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">निःस्वार्थ जन-समर्पण</div>
          </div>
        </section>
      </main>

      {/* Portal Footer */}
      <footer className="portal-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-title">पृथ्वीवासी सेवा और सुधार संगठन</div>
            <p className="footer-desc">
              सेवा ही संकल्प, सुधार ही हमारा लक्ष्य। सेवा • सहयोग • संस्कार • सुधार • समर्पण।
            </p>
          </div>

          <div className="footer-links">
            <Link to="/">Hero Landing</Link>
            <a href="#initiatives">मुख्य पोर्टल</a>
            <a href="#initiatives">हमारे बारे में</a>
            <a href="#impact">संपर्क</a>
          </div>

          <div className="footer-copy">
            <p>© 2026 पृथ्वीवासी सेवा और सुधार संगठन - prithviwasi। सर्वस्व राष्ट्राय।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
