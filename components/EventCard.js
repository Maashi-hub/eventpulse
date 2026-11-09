import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';
import { formatDate, formatPrice } from '../utils/format';

export default function EventCard({ event, isFavorite, onPress, onToggleFavorite }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Open ${event.title}`}
    >
      <Image source={event.image} style={styles.image} resizeMode="cover" />

      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <Text style={styles.category}>{event.category.toUpperCase()}</Text>
          <Text style={styles.price}>{formatPrice(event.price)}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={14} color={colors.muted} />
          <Text style={styles.meta}>{formatDate(event.date)}</Text>
          <Ionicons name="location-outline" size={14} color={colors.muted} style={styles.gap} />
          <Text style={styles.meta} numberOfLines={1}>
            {event.city}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => onToggleFavorite(event)}
        hitSlop={10}
        style={styles.heart}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={isFavorite ? colors.accent : '#fff'} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  pressed: { opacity: 0.85 },
  image: { width: '100%', height: 150 },
  body: { padding: 14 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  category: { color: colors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 0.8 },
  price: { color: colors.text, fontSize: 13, fontWeight: '700' },
  title: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 8 },
  meta: { color: colors.muted, fontSize: 13, marginLeft: 4 },
  gap: { marginLeft: 14 },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 8,
  },
});
