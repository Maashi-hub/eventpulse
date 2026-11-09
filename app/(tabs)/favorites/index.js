import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ConfirmModal from '../../../components/ConfirmModal';
import EventCard from '../../../components/EventCard';
import { colors } from '../../../constants/theme';
import { useEvents } from '../../../context/EventsContext';
import { EVENTS } from '../../../data/events';

export default function FavoritesScreen() {
  const { favoriteIds, isFavorite, toggleFavorite, clearFavorites } = useEvents();
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Read the SAME shared state that the Home screen updates.
  const favorites = EVENTS.filter((e) => favoriteIds.includes(e.id));

  return (
    <View style={styles.screen}>
      {favorites.length > 0 && (
        <View style={styles.toolbar}>
          <Text style={styles.count}>{favorites.length} saved</Text>
          <Pressable onPress={() => setConfirmVisible(true)} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={16} color={colors.danger} />
            <Text style={styles.clearText}>Clear all</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, favorites.length === 0 && styles.emptyContainer]}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => router.push(`/favorites/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-dislike-outline" size={56} color={colors.border} />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>Tap the heart on any event in the Explore tab and it will appear here.</Text>
          </View>
        }
      />

      <ConfirmModal
        visible={confirmVisible}
        title="Clear all favorites?"
        message="This removes every bookmarked event from your Favorites tab."
        confirmLabel="Clear all"
        onCancel={() => setConfirmVisible(false)}
        onConfirm={() => {
          clearFavorites();
          setConfirmVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingBottom: 0 },
  count: { fontSize: 16, fontWeight: '700', color: colors.text },
  clearButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  clearText: { color: colors.danger, fontWeight: '600' },
  list: { padding: 16 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  empty: { alignItems: 'center', paddingHorizontal: 30 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 12 },
  emptyText: { color: colors.muted, textAlign: 'center', marginTop: 6, lineHeight: 20 },
});
