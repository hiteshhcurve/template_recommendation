import Card from "./Card";

const Showcase = ({ data }) => {
  return (
    <div className="template-grid">
      {data.length !== 0 ? (
        data.map((template) => <Card key={template.id} template={template} />)
      ) : (
        <h2>No templates found</h2>
      )}
    </div>
  );
};

export default Showcase;
