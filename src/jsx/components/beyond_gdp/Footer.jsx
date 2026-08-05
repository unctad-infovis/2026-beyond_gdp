import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import './Footer.css';

const SOCIAL_LINKS = [
  { label: 'X', glyph: '𝕏', url: 'https://x.com/unctad' },
  { label: 'Instagram', glyph: 'IG', url: 'https://instagram.com/unctad' },
  { label: 'Facebook', glyph: 'f', url: 'https://unctad.org/facebook' },
  { label: 'YouTube', glyph: '▶', url: 'https://unctad.org/youtube' },
  { label: 'LinkedIn', glyph: 'in', url: 'https://unctad.org/linkedin' }
];

// Closing section — matches the design-proposal v2 mockup's "#closing" minus the UNCTAD
// logo, which the site's own Drupal-embedded footer already carries.
const Footer = ({ children, downloadUrl, title }) => (
  <footer className="width_100vw bgdp_footer">
    <div className="bgdp_footer_inner">
      <h2 className="bgdp_footer_title">{title}</h2>
      <div className="bgdp_footer_body">{children}</div>
      <div className="bgdp_footer_ctas">
        {downloadUrl && <ButtonAnchor className="bgdp_footer_cta bgdp_footer_cta--primary" text="Download the report (PDF)" url={downloadUrl} />}
        <ButtonAnchor className="bgdp_footer_cta bgdp_footer_cta--ghost" text="Explore the dashboard" url=".anchor_data" />
      </div>
      <div className="bgdp_footer_social">
        {SOCIAL_LINKS.map(link => (
          <a aria-label={link.label} className="bgdp_footer_social_link" href={link.url} key={link.label} rel="noreferrer" target="_blank">
            {link.glyph}
          </a>
        ))}
      </div>
      <p className="bgdp_footer_copyright">© 2026, United Nations Conference on Trade and Development.</p>
    </div>
  </footer>
);

export default Footer;
