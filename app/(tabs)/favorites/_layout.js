import { Stack } from 'expo-router';
import { colors } from '../../../constants/theme';

// A second nested STACK, so the Favorites tab keeps its own navigation history.
export default function FavoritesStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'My Favorites' }} />
      <Stack.Screen name="[id]" options={{ title: 'Event' }} />
    </Stack>
  );
}
