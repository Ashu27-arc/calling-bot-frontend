import { Save } from 'lucide-react';

const AISettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Configuration</h1>
        <p className="text-slate-400">Customize how your AI agent sounds and behaves during calls.</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <h2 className="text-xl font-semibold border-b border-slate-700 pb-2">Agent Persona</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Agent Mode</label>
            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option value="sales">Sales / Cold Calling</option>
              <option value="support">Customer Support</option>
              <option value="interview">Interview Agent</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Voice Language</label>
            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option value="en-US">English (US)</option>
              <option value="hi-IN">Hindi</option>
              <option value="multilingual">Multilingual (Hindi + English)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">System Prompt / Instructions</label>
          <textarea 
            rows="6"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
            defaultValue="You are a helpful AI sales assistant. Introduce yourself briefly. Ask the user if they are interested in our new AI calling software. Keep responses under 2 sentences and sound natural."
          ></textarea>
          <p className="text-xs text-slate-500">This prompt dictates how the AI will behave during the call.</p>
        </div>
      </div>

      <div className="glass-card p-6 space-y-6">
        <h2 className="text-xl font-semibold border-b border-slate-700 pb-2">Voice Settings (TTS)</h2>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Select Voice Model</label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {['Rachel (Female, Calm)', 'Drew (Male, Professional)', 'Clyde (Male, Energetic)'].map((voice, i) => (
              <div key={i} className={`p-4 rounded-xl border cursor-pointer transition-all ${i === 0 ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                <p className="font-medium">{voice}</p>
                <p className="text-xs mt-1 opacity-70">ElevenLabs</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-lg shadow-primary/30">
          <Save size={18} /> Save Configuration
        </button>
      </div>
    </div>
  );
};

export default AISettings;
