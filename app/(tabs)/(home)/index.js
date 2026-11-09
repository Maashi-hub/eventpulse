import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import EventCard from '../../../components/EventCard';
import FilterModal from '../../../components/FilterModal';
import { colors } from '../../../constants/theme';
import { useEvents } from '../../../context/EventsContext';
import { EVENTS } from '../../../data/events';

export default function HomeScreen() {
  const { isFavorite, toggleFavorite } = useEvents();
  const [category, setCategory] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);

  const visibleEvents = useMemo(
    () => (category === 'All' ? EVENTS : EVENTS.filter((e) => e.category === category)),
    [category]
  );

  return (
    <View style={styles.screen}>
      <View style={styles.toolbar}>
        <View>
          <Text style={styles.heading}>Upcoming events</Text>
          <Text style={styles.subheading}>
            {visibleEvents.length} {visibleEvents.length === 1 ? 'event' : 'events'} · {category}
          </Text>
        </View>

        <Pressable style={styles.filterButton} onPress={() => setFilterVisible(true)}>
          <Ionicons name="options-outline" size={18} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>

      <FlatList
        data={visibleEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => router.push(`/event/${item.id}`)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events in this category yet.</Text>}
      />

      <FilterModal
        visible={filterVisible}
        selected={category}
        onSelect={setCategory}
        onClose={() => setFilterVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingBottom: 8 },
  heading: { fontSize: 22, fontWeight: '800', color: colors.text },
  subheading: { color: colors.muted, marginTop: 2 },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  filterText: { color: '#fff', fontWeight: '700' },
  list: { padding: 16, paddingTop: 8 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40 },
});
