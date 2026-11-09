import { Ionicons } from '@expo/vector-icons';
import { AppState, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { colors } from '../../constants/theme';
import { useEvents } from '../../context/EventsContext';
import { cancelAllReminders, scheduleIn, sendNow } from '../../services/notifications';

export default function ActivityScreen() {
  const { favoriteIds, reminderIds, foregroundCount, appStateLog, addLog, clearReminders } = useEvents();
  const [current] = useState(AppState.currentState);

  const handleSendNow = async () => {
    const id = await sendNow('EventPulse', 'This is an immediate local notification 🎉');
    if (id) addLog('Immediate notification sent');
    else Alert.alert('Notifications unavailable', 'Please allow notifications for this app (not supported on web).');
  };

  const handleSchedule = async () => {
    const id = await scheduleIn(5, 'Scheduled reminder ⏰', 'This notification was scheduled 5 seconds ago.');
    if (id) {
      addLog('Notification scheduled (fires in 5 s) — send the app to the background now!');
      Alert.alert('Scheduled', 'A notification will arrive in 5 seconds.');
    }
  };

  const handleCancel = async () => {
    await cancelAllReminders();
    clearReminders();
    addLog('All scheduled notifications cancelled');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.statsRow}>
        <Stat label="Favorites" value={favoriteIds.length} icon="heart" />
        <Stat label="Reminders" value={reminderIds.length} icon="alarm" />
        <Stat label="Foreground returns" value={foregroundCount} icon="phone-portrait" />
      </View>

      <Text style={styles.section}>Local notifications</Text>
      <ActionButton icon="notifications" label="Send notification now" onPress={handleSendNow} primary />
      <ActionButton icon="timer-outline" label="Schedule one in 5 seconds" onPress={handleSchedule} />
      <ActionButton icon="close-circle-outline" label="Cancel all scheduled" onPress={handleCancel} />

      <Text style={styles.section}>AppState log</Text>
      <Text style={styles.hint}>
        Started as "{current}". Press the Home button, wait a moment, then reopen the app to see the log update.
      </Text>

      <View style={styles.logCard}>
        {appStateLog.length === 0 ? (
          <Text style={styles.logEmpty}>No AppState changes yet.</Text>
        ) : (
          appStateLog.map((entry) => (
            <View key={entry.id} style={styles.logRow}>
              <Text style={styles.logTime}>{entry.time}</Text>
              <Text style={styles.logMessage}>{entry.message}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

function Stat({ label, value, icon }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActionButton({ icon, label, onPress, primary }) {
  return (
    <Pressable style={[styles.action, primary && styles.actionPrimary]} onPress={onPress}>
      <Ionicons name={icon} size={20} color={primary ? '#fff' : colors.primary} />
      <Text style={[styles.actionText, primary && { color: '#fff' }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, backgroundColor: colors.card, borderRadius: 14, padding: 14, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 4 },
  statLabel: { fontSize: 11, color: colors.muted, textAlign: 'center' },
  section: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 24, marginBottom: 10 },
  hint: { color: colors.muted, marginBottom: 10, lineHeight: 19 },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EFEDFD',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  actionPrimary: { backgroundColor: colors.primary },
  actionText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
  logCard: { backgroundColor: colors.card, borderRadius: 14, padding: 14, gap: 10 },
  logEmpty: { color: colors.muted },
  logRow: { flexDirection: 'row', gap: 10 },
  logTime: { color: colors.primary, fontWeight: '700', fontSize: 12, width: 62 },
  logMessage: { color: colors.text, flex: 1, fontSize: 13 },
});
