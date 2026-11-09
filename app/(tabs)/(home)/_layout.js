import { Stack } from 'expo-router';
import { colors } from '../../../constants/theme';

// Nested STACK inside the Explore tab: list -> detail (back button works automatically).
export default function HomeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'EventPulse' }} />
      <Stack.Screen name="event/[id]" options={{ title: 'Event' }} />
    </Stack>
  );
}
