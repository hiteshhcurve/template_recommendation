import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Card = ({ template, selected, selectTemplate }) => {
  const { title, desc, thumbnail, meta_tags, videos_images, adpreviews } =
    template;

  const imageLink =
    videos_images !== undefined
      ? JSON.parse(videos_images.replace(/'/g, '"'))[1]
      : thumbnail;

  const encodedPreview = btoa(adpreviews);

  const handleSelect = () => {
    selectTemplate(template);
  };

  return (
    <div className="template-card">
      <div className="card-image-container" onClick={handleSelect}>
        <img
          src={imageLink || null}
          alt={title}
          className="card-image"
          loading="lazy"
        />

        {selected && (
          <div className="selected-overlay">
            <FontAwesomeIcon icon={faCircleCheck} className="selected-icon" />
          </div>
        )}
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

        <div className="grid-2">
          <Link
            to={`https://selfserve.hockeycurve.com/public/adtag/blog2.php?d=${encodedPreview}`}
            target="_blank"
            style={{ display: "block" }}
            className="flex-1"
          >
            <Button
              text="View"
              icon={faEye}
              type={"button"}
              width={"full"}
              btnType={"primary"}
            />
          </Link>

          <Button
            text={selected ? "Unselect" : "Select"}
            icon={faCircleCheck}
            type={"button"}
            width={"full"}
            btnType={"secondary"}
            onClick={handleSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
