const apiURL = "https://selfserve.hockeycurve.com/public/hcgallery";

const fetchFilters = async () => {
  const res = await fetch(`${apiURL}/filters`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Network error");

  const data = await res.json();
  return data.data;
};

const fetchParams = async (id) => {
  const res = await fetch(`${apiURL}/params`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ id: id }),
  });

  if (!res.ok) throw new Error("Network error");

  const data = await res.json();
  return data.data;
};

const briefService = {
  fetchFilters,
  fetchParams,
};

export default briefService;
