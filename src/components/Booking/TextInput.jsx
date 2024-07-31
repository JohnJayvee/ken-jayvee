import { useState } from 'react';

export default function TextInput({placeholderValue}) {
    const [text, setText] = useState('');
  
  
    return (
      <form>
        <label>{``}
          <input
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Enter ${placeholderValue}`}
            required
          />
        </label>
      </form>
    )
  }