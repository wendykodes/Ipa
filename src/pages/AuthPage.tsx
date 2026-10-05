import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIpaData } from '../context/IpaDataContext';
import { Lock, Mail, User, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('catherine.hamilton@belgravia-estates.com');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useIpaData();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      setCurrentUser({
        id: `usr-${Date.now()}`,
        name: name || 'Private Client',
        email,
        phone: phone || '+256 700 000 000',
        role: 'customer',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        preferredCurrency: 'UGX'
      });
      setStatusMsg('Account created successfully. Redirecting to My Home...');
    } else {
      setStatusMsg('Signing in... Welcome back.');
    }

    setTimeout(() => {
      navigate('/my-home');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#FAF8F5]">
      <div className="max-w-md w-full p-8 bg-white border border-[#EDE8E1] space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <span className="type-eyebrow">
            {isRegister ? 'Client Registration' : 'Client Access'}
          </span>
          <h1 className="font-serif-luxury text-3xl font-light text-stone-900">
            {isRegister ? 'Create Your Account' : 'Sign in to My Home'}
          </h1>
          <p className="text-xs text-stone-600 font-light">
            {isRegister
              ? 'Access your residence workspace, design approvals, and invoices.'
              : 'Review your ongoing projects, approve room specifications, and make payments.'}
          </p>
        </div>

        {statusMsg && (
          <div className="p-3 bg-[#F0F7F4] border border-[#B7E4C7] text-[#2D6A4F] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 mb-1">
                Your full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Catherine Hamilton"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#EDE8E1] text-stone-900 focus:outline-none focus:border-[#801D31]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@estate.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#EDE8E1] text-stone-900 focus:outline-none focus:border-[#801D31]"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 mb-1">
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256 700 890 123"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#EDE8E1] text-stone-900 focus:outline-none focus:border-[#801D31]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#EDE8E1] text-stone-900 focus:outline-none focus:border-[#801D31]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary-rosewood text-xs justify-center py-3 mt-2"
          >
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#EDE8E1] text-xs text-stone-600">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-[#801D31] font-semibold hover:underline"
              >
                Sign in
              </button>
            </span>
          ) : (
            <span>
              Starting a new residence?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-[#801D31] font-semibold hover:underline"
              >
                Create client account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
