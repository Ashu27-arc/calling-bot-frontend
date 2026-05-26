import { useState, useEffect, useRef } from 'react';
import { Phone, Mic, PhoneOff, User, Monitor } from 'lucide-react';
import { io } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';

const LiveCall = () => {
  const [searchParams] = useSearchParams();
  const contactName = searchParams.get('contact');
  
  const [status, setStatus] = useState('Idle');
  const [transcripts, setTranscripts] = useState([
    { role: 'system', text: 'Ready to start free browser call. Click the green button.' },
  ]);
  const socketRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const isCallActiveRef = useRef(false);

  useEffect(() => {
    // Connect to Backend (Use env variable for production, fallback to localhost for dev)
    const backendUrl = import.meta.env.VITE_API_URL || 'https://calling-bot-backend.onrender.com';
    socketRef.current = io(backendUrl);
    
    socketRef.current.on('connect', () => {
      if (contactName && !isCallActiveRef.current) {
        // Auto-start the call if we navigated from Contacts with a specific contact
        setTimeout(() => {
          if (!isCallActiveRef.current) startCall();
        }, 500); // short delay for UI
      }
    });

    socketRef.current.on('transcript', (data) => {
      setTranscripts((prev) => [...prev, data]);
    });

    // Handle 100% Free Text-to-Speech via Browser
    socketRef.current.on('ai_audio_response_text', (text) => {
      if (synthRef.current) {
        const utterance = new SpeechSynthesisUtterance(text);
        // Optional: pick a nice voice
        const voices = synthRef.current.getVoices();
        const enVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Female'));
        if(enVoice) utterance.voice = enVoice;
        
        // Pause microphone while AI is speaking so it doesn't hear itself
        utterance.onstart = () => {
          if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch(e) {}
          }
        };
        
        utterance.onend = () => {
          // Resume microphone after AI finishes speaking
          if (recognitionRef.current && isCallActiveRef.current) {
            try { recognitionRef.current.start(); } catch(e) {}
          }
        };
        
        synthRef.current.speak(utterance);
      }
    });

    // Handle 100% Free Speech-to-Text via Browser
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        if (transcript.trim().length > 0) {
          // Send recognized text to backend
          socketRef.current.emit('web_speech_text', transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      recognitionRef.current.onend = () => {
        // Chrome sometimes stops recognition automatically. Restart it if call is still active.
        if (isCallActiveRef.current && recognitionRef.current) {
           try {
             recognitionRef.current.start();
           } catch(e) {}
        }
      };
    }

    return () => {
      socketRef.current?.disconnect();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startCall = () => {
    setStatus('In Progress');
    isCallActiveRef.current = true;
    socketRef.current.emit('start_web_call');
    setTranscripts([{ role: 'system', text: 'Call started from browser. Start speaking...' }]);
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const endCall = () => {
    setStatus('Idle');
    isCallActiveRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    synthRef.current.cancel(); // Stop AI speaking
    setTranscripts((prev) => [...prev, { role: 'system', text: 'Call ended.' }]);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-80px)]">
      <div className="w-1/3 glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden">
        {status === 'In Progress' && (
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
        )}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-2xl transition-colors duration-500 ${status === 'Idle' ? 'bg-slate-700' : 'bg-green-500'}`}>
            <Monitor size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {contactName ? `Calling ${contactName}...` : 'Web Browser Agent'}
          </h2>
          <p className="text-slate-400 mb-2">Status: <span className="text-white font-medium">{status}</span></p>
          <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full mb-8 border border-blue-400/20">100% Free Testing</span>
          
          <div className="flex gap-4">
            <button 
              className="p-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 disabled:opacity-50"
              onClick={startCall}
              disabled={status === 'In Progress'}
            >
              <Phone className="text-white" />
            </button>
            <button 
              className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 disabled:opacity-50"
              onClick={endCall}
              disabled={status === 'Idle'}
            >
              <PhoneOff className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 glass-card p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-4">Live Transcript</h2>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {transcripts.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 rounded-2xl flex items-start gap-3 ${
                msg.role === 'user' 
                  ? 'bg-primary/20 border border-primary/30 rounded-tr-none' 
                  : msg.role === 'system'
                    ? 'bg-slate-800 border border-slate-700 w-full text-center italic text-sm text-slate-400'
                    : 'bg-slate-700/50 border border-slate-600 rounded-tl-none'
              }`}>
                {msg.role !== 'system' && (
                  <div className={`p-2 rounded-full mt-1 ${msg.role === 'user' ? 'bg-primary/30 text-primary' : 'bg-slate-600 text-slate-300'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Mic size={16} />}
                  </div>
                )}
                <div className={msg.role === 'system' ? 'w-full' : 'flex-1'}>
                  {msg.role !== 'system' && <p className="text-xs font-semibold mb-1 opacity-60 uppercase tracking-wider">{msg.role === 'ai' ? 'AI Agent' : 'You (Browser)'}</p>}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCall;
