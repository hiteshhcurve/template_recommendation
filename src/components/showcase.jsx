import Card from "./Card";

const Showcase = ({ data }) => {
  return (
    <div className="template-grid">
      {data.map((template) => (
        <Card key={template.id} template={template} />
      ))}
    </div>
  );
};

export default Showcase;
