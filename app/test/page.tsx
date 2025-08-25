'use client';

import { useState } from 'react';

export default function TestPage() {
  const [count, setCount] = useState(0);

  return (
    <div className=\"min-h-screen flex items-center justify-center bg-gray-100\">
      <div className=\"text-center p-8 bg-white rounded-lg shadow-lg\">
        <h1 className=\"text-3xl font-bold mb-4\">Test Page</h1>
        <p className=\"text-gray-600 mb-4\">If you can see this, the basic Next.js setup is working.</p>
        <div className=\"space-y-4\">
          <p className=\"text-lg\">Count: {count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className=\"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600\"
          >
            Increment
          </button>
          <div>
            <a 
              href=\"/\"
              className=\"text-blue-500 hover:text-blue-600 underline\"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}