// components/chatBox.tsx
import { useEffect, useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const TAWK_TO_PROPERTY_ID = 'YOUR_TAWKTO_PROPERTY_ID'; // Replace with your actual Tawk.to ID
const TAWK_TO_WIDGET_ID = 'default'; // Usually it's 'default', but double-check from Tawk.to embed code
declare global {
  interface Window {
    Tawk_API?: {
      maximize: () => void;
      minimize: () => void;
    };
  }
}
const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://embed.tawk.to/${TAWK_TO_PROPERTY_ID}/${TAWK_TO_WIDGET_ID}`;
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      // Optional: Clean up the script when component unmounts
      script.remove();
    };
  }, []);

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      {!isOpen ? (
        <button
          className='bg-[#3c1414] hover:bg-[#6f49c4] text-white rounded-full p-3 shadow-lg'
          onClick={() => {
            setIsOpen(true);
            if (window.Tawk_API) {
              window.Tawk_API.maximize();
            }
          }}
        >
          <MessageSquare />
        </button>
      ) : (
        <button
          className='bg-[#5534A5] text-white rounded-full p-3 shadow-lg'
          onClick={() => {
            setIsOpen(false);
            if (window.Tawk_API) {
              window.Tawk_API.minimize();
            }
          }}
        >
          <X />
        </button>
      )}
    </div>
  );
};

export default ChatBox;
// mPt,Fdn?y3#&v*R
