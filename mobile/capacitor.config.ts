import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ipainteriors.app',
  appName: 'IPA Interiors',
  webDir: 'dist',
  bundledWebRuntime: false,
  backgroundColor: '#FFFFFF',
  ios: {
    contentInset: 'always',
    preferredContentMode: 'mobile',
    scheme: 'IPA Interiors'
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#801D31',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#FFFFFF'
    }
  }
};

export default config;
