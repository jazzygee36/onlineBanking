// components/chatBox.tsx
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      {isOpen ? (
        <div className='w-80 bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b'>
            <h2 className='text-base font-semibold text-[#5534A5]'>
              Live Chat
            </h2>
            <X className='cursor-pointer' onClick={() => setIsOpen(false)} />
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto max-h-60 p-4 space-y-2 text-sm text-gray-700'>
            {messages.length ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className='bg-[#F1EEF6] p-2 rounded-md self-end text-right'
                >
                  {msg}
                </div>
              ))
            ) : (
              <p className='text-gray-400 text-center'>Say hello 👋</p>
            )}
          </div>

          {/* Input */}
          <div className='flex items-center border-t p-2'>
            <input
              type='text'
              className='flex-1 px-2 py-1 border rounded-md text-sm'
              placeholder='Type your message...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className='ml-2 bg-[#5534A5] text-white px-3 py-1 text-sm rounded-md'
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          className='bg-[#3c1414] hover:bg-[#6f49c4] text-white rounded-full p-3 shadow-lg'
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare />
        </button>
      )}
    </div>
  );
};

export default ChatBox;
