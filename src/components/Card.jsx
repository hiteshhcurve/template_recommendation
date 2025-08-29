import Button from "./Button";

const Card = ({ template }) => {
  const { title, desc, ctr, thumbnail, meta_tags, videos_images } = template;

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

        <Button text="View Template" icon={true} type={"button"} />
      </div>
    </div>
  );
};

export default Card;
