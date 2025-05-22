const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const formDataToSend = new FormData();
    
    // Ajout des champs requis
    Object.keys(formData).forEach(key => {
      if (key === 'date_naissance' && formData[key]) {
        formDataToSend.append(key, formData[key].toISOString());
      } else if (key === 'cv' || key === 'lettre_motivation' || key === 'diplome') {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      } else if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    const url = candidat 
      ? `http://localhost:5000/candidat/updateCandidatsBYID/${candidat._id}`
      : 'http://localhost:5000/candidat/addCandidats';

    const response = await fetch(url, {
      method: candidat ? 'PUT' : 'POST',
      body: formDataToSend,
      credentials: 'include',
      // Remove Content-Type header to let the browser set it automatically with the boundary
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de l\'enregistrement');
    }

    onSuccess();
  } catch (error) {
    console.error('Error submitting form:', error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
}; 