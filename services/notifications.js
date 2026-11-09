import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHANNEL_ID = 'default';
const isWeb = Platform.OS === 'web';

// Decide how a notification is shown while the app is open (foreground).
if (!isWeb) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

// Creates the Android channel and asks for permission (once). Returns true if allowed.
export async function setupNotifications() {
  if (isWeb) return false;

  try {
    if (Platform.OS === 'android') {
      try {
        await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
          name: 'EventPulse alerts',
          importance: Notifications.AndroidImportance.MAX,
        });
      } catch (error) {
        console.log('Channel setup skipped:', error?.message);
      }
    }

    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    if (!current.canAskAgain) return false;

    const requested = await Notifications.requestPermissionsAsync();
    return requested.granted;
  } catch (error) {
    console.log('Notification setup failed:', error?.message);
    return false;
  }
}

// IMMEDIATE notification (trigger: null means "deliver now").
export async function sendNow(title, body, data = {}) {
  if (!(await setupNotifications())) return null;
  return Notifications.scheduleNotificationAsync({
    content: { title, body, data },
    trigger: Platform.OS === 'android' ? { channelId: CHANNEL_ID } : null,
  });
}

// SCHEDULED notification that fires after `seconds` seconds.
export async function scheduleIn(seconds, title, body, data = {}) {
  if (!(await setupNotifications())) return null;
  return Notifications.scheduleNotificationAsync({
    content: { title, body, data },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: CHANNEL_ID,
    },
  });
}

export function notifyBookmarked(event) {
  return sendNow('Event bookmarked! 🔖', `${event.title} was added to your favorites.`, {
    url: `/event/${event.id}`,
  });
}

export function scheduleEventReminder(event, seconds = 10) {
  return scheduleIn(seconds, `Reminder: ${event.title}`, `Don't forget — it starts at ${event.venue}.`, {
    url: `/event/${event.id}`,
  });
}

export function cancelAllReminders() {
  if (isWeb) return Promise.resolve();
  return Notifications.cancelAllScheduledNotificationsAsync();
}
