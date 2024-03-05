import React, { useState } from 'react';

const Activity = () => {
  const [formData, setFormData] = useState({
    venue: '',
    proof: '',
    discount: '',
    date: '',
    points: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can send the formData to your server or perform other actions.
  };

  return (
    <div>
      <h2>Activity Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="proof">Proof:</label>
          <input
            type="text"
            id="proof"
            name="proof"
            value={formData.proof}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="points">Points:</label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Activity;
