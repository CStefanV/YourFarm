export const actualizareTractor = async (
  slug, // Pass the slug as a parameter
  name,
  power,
  functioningHours,
  timeSpentInTheFarm,
  usedAt,
  maxSpeed,
  category,
  maxRPM,
  rented,
  description
) => {
  try {
    console.log('Starting AJAX request');
    const res = await axios({
      method: 'PATCH',
      // Use the slug to build the URL
      url: `http://127.0.0.1:8000/api/v1/tractoare/${slug}`,
      data: {
        name,
        power,
        functioningHours,
        timeSpentInTheFarm,
        usedAt,
        maxSpeed,
        category,
        maxRPM,
        rented,
        description,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Tractor actualizat cu succes');
      window.setTimeout(() => {
        location.assign('/listaTractoare');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
