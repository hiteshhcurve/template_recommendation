import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const Card = ({ template }) => {
  const { title, desc, ctr, thumbnail, meta_tags } = template;

  return (
    <div className="template-card">
      <div className="card-image-container">
        <img
          src={thumbnail || null}
          alt={title}
          className="card-image"
          loading="lazy"
        />
      </div>

      <div className="card-header">
        <div className="card-title-row">
          <h3 className="card-title">{title}</h3>
        </div>
        <p className="card-description">{desc}</p>
        <p className="card-ctr">Avg CTR: {ctr}</p>
      </div>

      <div className="card-content">
        {meta_tags !== "" ? (
          <div className="tags">
            {meta_tags?.split(",").map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        ) : (
          ""
        )}

        <button className="view-btn">
          <FontAwesomeIcon icon={faEye} />
          View Template
        </button>
      </div>
    </div>
  );
};

export default Card;
