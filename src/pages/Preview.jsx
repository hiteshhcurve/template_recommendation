import { useLocation } from "react-router-dom";

const Preview = () => {
  const { pathname } = useLocation();

  const decodedURL = atob(pathname.split("/")[2]);

  const iframeDims = decodedURL.split("zoneid=")[1].split("&")[0];

  const width = iframeDims.split("x")[0];
  const height = iframeDims.split("x")[1];

  return (
    <section className="preview">
      <iframe
        id="adPreview"
        src={decodedURL}
        frameborder="0"
        width={width}
        height={height}
        title="iFrame"
      ></iframe>
    </section>
  );
};

export default Preview;
