const apiURL = "https://selfserve.hockeycurve.com/public/hcgallery";

const fetchBrief = async (id) => {
  const res = await fetch(`${apiURL}/get_campaign_data`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ id: id }),
  });

  if (!res.ok) throw new Error("Network error");

  const data = await res.json();
  return data.data;
};

const briefService = {
  fetchBrief,
};

export default briefService;
