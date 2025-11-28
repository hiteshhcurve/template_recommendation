// src/features/templates/templateService.js
const apiURL = "https://selfserve.hockeycurve.com/public/hcgallery";

const fetchTemplates = async () => {
  const res = await fetch(`${apiURL}/template_rec`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.data;
};

const fetchClientInfo = async () => {
  const res = await fetch(`${apiURL}/client_info`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.data;
};

const searchTemplates = async (query) => {
  const res = await fetch(`${apiURL}/template_search`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  return data.data;
};

const applyFilters = async (queryObj) => {
  const res = await fetch(`${apiURL}/apply_filters`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ query: queryObj }),
  });
  const json = await res.json();

  return {
    data: json.data,
    total: json.total_temps,
    filtered: json.filtered_temps,
  };
};

const fetchSelected = async (queryArr) => {
  const res = await fetch(`${apiURL}/get_selected`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ query: queryArr }),
  });
  const json = await res.json();

  return json.data;
};

const templateService = {
  fetchTemplates,
  fetchClientInfo,
  searchTemplates,
  applyFilters,
  fetchSelected,
};

export default templateService;
