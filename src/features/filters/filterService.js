const apiURL = "https://selfserve.hockeycurve.com/public/hcgallery";

const fetchFilters = async () => {
  const res = await fetch(`${apiURL}/filters`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.data;
};

const getCampaignData = async (value) => {
  const res = await fetch(`${apiURL}/get_campaign_data`, {
    method: "post",
    credentials: "include",
    body: JSON.stringify({ id: value }),
  });
  const data = await res.json();
  return data;
};

const filterService = {
  fetchFilters,
  getCampaignData,
};

export default filterService;
