import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeBackBanner from '../components/WelcomeBackBanner';
import { EventsProvider } from '../context/EventsContext';
import { setupNotifications } from '../services/notifications';

// Opens the matching event screen when the user taps a notification.
function useNotificationObserver() {
  useEffect(() => {
    if (Platform.OS === 'web') return;

    const open = (response) => {
      const url = response?.notification?.request?.content?.data?.url;
      if (typeof url === 'string') router.push(url);
    };

    const last = Notifications.getLastNotificationResponse();
    if (last) open(last);

    const subscription = Notifications.addNotificationResponseReceivedListener(open);
    return () => subscription.remove();
  }, []);
}

function RootNavigator() {
  useNotificationObserver();

  // Ask for notification permission as soon as the app starts.
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <WelcomeBackBanner />
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EventsProvider>
        <RootNavigator />
      </EventsProvider>
    </SafeAreaProvider>
  );
}
