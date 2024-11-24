import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import stylów Bootstrap

function App() {
  // Stan przechowujący listę usług
  const [services, setServices] = useState([
    { id: 1, name: "Konsultacja IT", duration: "30 minut", price: "200 zł" },
    { id: 2, name: "Audyt bezpieczeństwa", duration: "2 godziny", price: "500 zł" },
  ]);

  // Stan dla danych formularza
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
  });

  // Stan dla błędów walidacji formularza
  const [errors, setErrors] = useState({});

  // Funkcja obsługująca zmiany w polach formularza
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, // Zachowanie istniejących wartości
      [name]: value, // Aktualizacja zmienionego pola
    }));
  };

  // Funkcja walidująca dane formularza
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Nazwa usługi jest wymagana."; // Sprawdzenie pola "nazwa"
    if (!formData.duration) errors.duration = "Czas trwania jest wymagany."; // Sprawdzenie pola "czas trwania"
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      errors.price = "Cena musi być liczbą dodatnią."; // Sprawdzenie pola "cena"
    }
    return errors; // Zwrócenie błędów
  };

  // Funkcja obsługująca przesyłanie formularza
  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiegaj przeładowaniu strony
    const validationErrors = validateForm(); // Walidacja danych
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Ustawienie błędów, jeśli istnieją
    } else {
      setErrors({}); // Wyczyszczenie błędów, jeśli dane są poprawne
      const newService = {
        id: services.length + 1, // Generowanie nowego ID
        ...formData, // Przekazanie danych formularza
      };
      setServices((prev) => [...prev, newService]); // Dodanie nowej usługi do listy
      setFormData({ name: "", duration: "", price: "" }); // Zresetowanie formularza
    }
  };

  return (
    <div className="container my-5">
      {/* Nagłówek wyświetlający liczbę usług */}
      <h2 className="text-center">Dostępne usługi: {services.length}</h2>

      {/* Tabela usług */}
      <table className="table table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nazwa usługi</th>
            <th>Czas trwania</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.duration}</td>
              <td>{service.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formularz dodawania usług */}
      <form className="mt-5" onSubmit={handleSubmit}>
        {/* Pole "Nazwa usługi" */}
        <div className="form-group">
          <label htmlFor="name">Nazwa usługi:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`} // Klasa walidacji
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>} {/* Komunikat błędu */}
        </div>

        {/* Pole "Czas trwania" */}
        <div className="form-group mt-3">
          <label htmlFor="duration">Czas trwania:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            className={`form-control ${errors.duration ? "is-invalid" : ""}`} // Klasa walidacji
            value={formData.duration}
            onChange={handleChange}
          />
          {errors.duration && <div className="invalid-feedback">{errors.duration}</div>} {/* Komunikat błędu */}
        </div>

        {/* Pole "Cena" */}
        <div className="form-group mt-3">
          <label htmlFor="price">Cena (zł):</label>
          <input
            type="number"
            id="price"
            name="price"
            className={`form-control ${errors.price ? "is-invalid" : ""}`} // Klasa walidacji
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>} {/* Komunikat błędu */}
        </div>

        {/* Przycisk dodawania usługi */}
        <button type="submit" className="btn btn-primary mt-4">
          Dodaj usługę
        </button>
      </form>
    </div>
  );
}

export default App;
