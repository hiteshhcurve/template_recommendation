const apiURL = "https://selfserve.hockeycurve.com/public/hcgallery";

const fetchFilters = async () => {
  const res = await fetch(`${apiURL}/filters`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.data;
};

const filterService = {
  fetchFilters,
};

export default filterService;
