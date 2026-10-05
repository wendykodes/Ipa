import React, { useState } from 'react';
import { User, Bell, Shield, Lock, CreditCard, ExternalLink, LogOut } from 'lucide-react';

export const MobileProfileScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [biometrics, setBiometrics] = useState<boolean>(true);

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF8F5] pb-24 text-stone-900">
      <div className="bg-white border-b border-[#EDE8E1] px-5 pt-12 pb-4 sticky top-0 z-20">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#801D31] font-semibold">
          Account & Preferences
        </span>
        <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
          Client Profile
        </h1>
      </div>

      <div className="p-5 space-y-6">
        {/* Profile Card */}
        <div className="p-5 rounded-3xl bg-white border border-[#EDE8E1] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#EDE8E1] flex items-center justify-center text-[#801D31] font-serif-luxury text-xl font-bold">
              CH
            </div>
            <div>
              <h2 className="font-serif-luxury text-lg font-medium text-stone-900">
                Lady Catherine Hamilton
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                catherine.hamilton@belgravia-estates.com
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-[#EDE8E1] flex justify-between text-xs text-stone-600 font-mono">
            <span>Project #IPA-BEL-882</span>
            <span className="text-[#801D31] font-semibold">Verified Client</span>
          </div>
        </div>

        {/* Security & Biometrics */}
        <div className="p-5 rounded-3xl bg-white border border-[#EDE8E1] space-y-4">
          <h3 className="font-serif-luxury text-base font-medium text-stone-900">
            Security & Device
          </h3>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-stone-800">
              <Lock className="w-4 h-4 text-[#801D31]" />
              <span>Face ID / Biometric Sign-Off</span>
            </div>
            <input
              type="checkbox"
              checked={biometrics}
              onChange={() => setBiometrics(!biometrics)}
              className="accent-[#801D31] w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-stone-800">
              <Bell className="w-4 h-4 text-[#801D31]" />
              <span>Push Notifications (Site Logs & Approvals)</span>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="accent-[#801D31] w-4 h-4"
            />
          </div>
        </div>

        {/* Legal & App Store info */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE8E1] text-[11px] text-stone-500 font-mono space-y-1">
          <div>IPA Interiors Mobile App v1.0.0 (Build 42)</div>
          <div>Bundle ID: com.ipainteriors.app</div>
          <div>Encrypted End-to-End Client Gateway</div>
        </div>
      </div>
    </div>
  );
};
