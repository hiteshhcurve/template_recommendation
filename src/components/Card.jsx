import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Card = ({ template }) => {
  const { id, title, desc, thumbnail, meta_tags, videos_images } = template;

  const imageLink =
    videos_images !== undefined
      ? JSON.parse(videos_images.replace(/'/g, '"'))[1]
      : thumbnail;

  return (
    <div className="template-card">
      <div className="card-image-container">
        <img
          src={imageLink || null}
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

        <Link to={`/template/${id}`}>
          <Button
            text="View Details"
            icon={faEye}
            type={"button"}
            width={"full"}
            btnType={"primary"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Card;
