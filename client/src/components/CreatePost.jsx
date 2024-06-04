import React, { useState } from 'react';
import axios from 'axios';
export default function CreatePost() {
  const [formData, setFormData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(`http://127.0.0.1:7000/api/posts`, {
        post: formData,
      });
      // console.log(res.data);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-post-form">
        <label htmlFor="">Create post:</label>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setFormData(e.target.value)}
          value={formData}
        />
        <button>submit</button>
      </form>
    </div>
  );
}
