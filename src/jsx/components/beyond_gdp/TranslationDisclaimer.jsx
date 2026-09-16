import './TranslationDisclaimer.css';

// AI-translation notice, matching the wording/intent of the
// "unctad-ai-translation-disclaimer" block Drupal shows on other machine-translated
// UNCTAD pages (e.g. the Global Trade Update FR/ES publication pages) — reproduced here since
// this minisite's content isn't Drupal-node text, so that Drupal block can't apply to it.
// English-only content has no disclaimer, so this is never rendered from Article.mdx.
const TranslationDisclaimer = ({ body, heading }) => (
  <div className="bgdp_translation_disclaimer" role="note">
    <span className="bgdp_translation_disclaimer_icon" aria-hidden="true" />
    <div className="bgdp_translation_disclaimer_content">
      <strong>{heading}</strong>
      <p>{body}</p>
    </div>
  </div>
);

export default TranslationDisclaimer;
