import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

// Modal #2 - used for CONFIRMING a user action (e.g. clearing all favorites).
export default function ConfirmModal({ visible, title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <Pressable style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.confirm]} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 28 },
  dialog: { backgroundColor: colors.card, borderRadius: 20, padding: 22 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 },
  message: { fontSize: 15, color: colors.muted, lineHeight: 21, marginBottom: 20 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  button: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12 },
  cancel: { backgroundColor: colors.background },
  confirm: { backgroundColor: colors.danger },
  cancelText: { color: colors.text, fontWeight: '600' },
  confirmText: { color: '#fff', fontWeight: '700' },
});
