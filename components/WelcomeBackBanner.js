import { StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';
import { useEvents } from '../context/EventsContext';

// Visual proof of the AppState listener: appears when the app returns to the foreground.
export default function WelcomeBackBanner() {
  const { welcomeBack, foregroundCount } = useEvents();
  const insets = useSafeAreaInsets();
  if (!welcomeBack) return null;

  return (
    <Text style={[styles.banner, { top: insets.top + 6 }]}>
      👋 Welcome back! (foreground #{foregroundCount})
    </Text>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 100,
    backgroundColor: colors.success,
    color: '#fff',
    fontWeight: '700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
