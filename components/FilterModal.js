import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../data/events';
import { colors } from '../constants/theme';

// Modal #1 - used for FILTERING the FlatList data by category.
export default function FilterModal({ visible, selected, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Inner Pressable stops taps on the sheet from closing the modal */}
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handle} />
          <Text style={styles.title}>Filter by category</Text>

          {CATEGORIES.map((category) => {
            const active = category === selected;
            return (
              <Pressable
                key={category}
                style={[styles.option, active && styles.optionActive]}
                onPress={() => {
                  onSelect(category);
                  onClose();
                }}
              >
                <Text style={[styles.optionText, active && styles.optionTextActive]}>{category}</Text>
                {active && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
              </Pressable>
            );
          })}

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 32,
  },
  handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: colors.border, marginBottom: 14 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 10 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  optionActive: { backgroundColor: '#EFEDFD' },
  optionText: { fontSize: 16, color: colors.text },
  optionTextActive: { color: colors.primary, fontWeight: '700' },
  closeButton: { marginTop: 12, alignItems: 'center', paddingVertical: 12 },
  closeText: { color: colors.muted, fontSize: 15, fontWeight: '600' },
});
