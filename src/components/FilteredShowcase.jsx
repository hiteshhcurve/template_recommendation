import { useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import Showcase from "./Showcase";

const FilteredShowcase = () => {
  const { filters } = useParams();

  console.log(filters);

  return <Showcase />;
};

export default FilteredShowcase;
