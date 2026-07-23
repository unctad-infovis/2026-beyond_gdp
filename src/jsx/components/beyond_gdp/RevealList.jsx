import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import './RevealList.css';

const RevealList = ({ items = [], layout = 'rows' }) => {
  const [ref, inView] = useIsVisible(0.2);

  return (
    <div className={`rl_container rl_container--${layout}${inView ? ' rl_container--inview' : ''}`} ref={ref}>
      {items.map((item, idx) => (
        <div className="rl_item" key={item.title} style={{ transitionDelay: `${idx * 91}ms` }}>
          <h4 className="rl_item_title">{item.title}</h4>
          <p className="rl_item_description">{item.description}</p>
          {item.links?.length > 0 && (
            <ul className="rl_item_links">
              {item.links.map(link =>
                link.url ? (
                  <li key={link.label}>
                    <a href={link.url} rel="noreferrer" target="_blank">
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>{link.label}</li>
                )
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RevealList;
