import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';
import { useEvents } from '../context/EventsContext';
import { getEventById } from '../data/events';
import { scheduleEventReminder } from '../services/notifications';
import { formatDate, formatPrice, formatTime } from '../utils/format';

// Shared detail screen. It is rendered by BOTH the Home stack and the Favorites stack.
export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const event = getEventById(id);
  const { isFavorite, toggleFavorite, reminderIds, markReminder, addLog } = useEvents();

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Event not found</Text>
      </View>
    );
  }

  const favorite = isFavorite(event.id);
  const hasReminder = reminderIds.includes(event.id);

  const handleReminder = async () => {
    const scheduledId = await scheduleEventReminder(event, 10); // scheduled local notification
    if (scheduledId) {
      markReminder(event.id);
      addLog(`Reminder scheduled for "${event.title}" (fires in 10 s)`);
      Alert.alert('Reminder set', 'You will get a notification in 10 seconds. Try sending the app to the background!');
    } else {
      Alert.alert('Notifications unavailable', 'Please allow notifications for this app (not supported on web).');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: event.category }} />
      <Image source={event.image} style={styles.hero} resizeMode="cover" />

      <View style={styles.body}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.organizer}>by {event.organizer}</Text>

        <View style={styles.infoCard}>
          <InfoRow icon="calendar-outline" label={`${formatDate(event.date)} · ${formatTime(event.date)}`} />
          <InfoRow icon="location-outline" label={`${event.venue}, ${event.city}`} />
          <InfoRow icon="pricetag-outline" label={formatPrice(event.price)} />
          <InfoRow icon="people-outline" label={`${event.attendees.toLocaleString('en-US')} people expected`} />
        </View>

        <Text style={styles.sectionTitle}>About this event</Text>
        <Text style={styles.description}>{event.description}</Text>

        <Pressable
          style={[styles.button, favorite ? styles.buttonOutline : styles.buttonPrimary]}
          onPress={() => toggleFavorite(event)}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={20}
            color={favorite ? colors.accent : '#fff'}
          />
          <Text style={[styles.buttonText, favorite && { color: colors.accent }]}>
            {favorite ? 'Bookmarked — tap to remove' : 'Bookmark this event'}
          </Text>
        </Pressable>

        <Pressable style={[styles.button, styles.buttonSecondary]} onPress={handleReminder}>
          <Ionicons name="alarm-outline" size={20} color={colors.primary} />
          <Text style={[styles.buttonText, { color: colors.primary }]}>
            {hasReminder ? 'Remind me again (10 s demo)' : 'Remind me in 10 seconds (demo)'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, label }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={styles.infoText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { width: '100%', height: 220 },
  body: { padding: 20 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  organizer: { color: colors.muted, marginTop: 4, marginBottom: 16 },
  infoCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 12, marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { color: colors.text, fontSize: 15, flexShrink: 1 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 6 },
  description: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: 24 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonOutline: { backgroundColor: '#FFF0F2', borderWidth: 1, borderColor: colors.accent },
  buttonSecondary: { backgroundColor: '#EFEDFD' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
