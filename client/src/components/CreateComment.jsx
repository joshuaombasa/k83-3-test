import React, { useState } from 'react';
import axios from 'axios';
export default function CreateComment({ postId }) {
  const [formData, setFormData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `http://127.0.0.1:7001/api/${postId}/comments`,
        {
          comment: formData,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-comment-form">
        <label htmlFor="">Create comment:</label>
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
