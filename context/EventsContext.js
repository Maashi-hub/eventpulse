import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAppStateListener } from '../hooks/useAppStateListener';
import { notifyBookmarked } from '../services/notifications';
import { nowLabel } from '../utils/format';

// Global state shared by every screen (favorites, reminders, AppState log).
const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [reminderIds, setReminderIds] = useState([]);
  const [appStateLog, setAppStateLog] = useState([]);
  const [foregroundCount, setForegroundCount] = useState(0);
  const [welcomeBack, setWelcomeBack] = useState(false);
  const hideTimer = useRef(null);

  const addLog = useCallback((message) => {
    setAppStateLog((prev) => [{ id: `${Date.now()}-${prev.length}`, time: nowLabel(), message }, ...prev].slice(0, 30));
  }, []);

  // ---- AppState API: log every change, react when returning to the foreground ----
  const handleChange = useCallback((next) => addLog(`App state changed to "${next}"`), [addLog]);

  const handleForeground = useCallback(() => {
    setForegroundCount((c) => c + 1);
    setWelcomeBack(true);
    addLog('Welcome back! App moved from background to foreground');
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setWelcomeBack(false), 3500);
  }, [addLog]);

  useAppStateListener({ onChange: handleChange, onForeground: handleForeground });
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  // ---- Favorites (shared between Home, Favorites and Detail screens) ----
  const toggleFavorite = useCallback(
    (event) => {
      const alreadyFavorite = favoriteIds.includes(event.id);
      setFavoriteIds((prev) => (alreadyFavorite ? prev.filter((id) => id !== event.id) : [...prev, event.id]));
      if (!alreadyFavorite) notifyBookmarked(event); // immediate local notification
    },
    [favoriteIds]
  );

  const clearFavorites = useCallback(() => setFavoriteIds([]), []);
  const isFavorite = useCallback((id) => favoriteIds.includes(id), [favoriteIds]);
  const markReminder = useCallback((id) => setReminderIds((prev) => (prev.includes(id) ? prev : [...prev, id])), []);
  const clearReminders = useCallback(() => setReminderIds([]), []);

  const value = useMemo(
    () => ({
      favoriteIds,
      reminderIds,
      appStateLog,
      foregroundCount,
      welcomeBack,
      toggleFavorite,
      clearFavorites,
      isFavorite,
      markReminder,
      clearReminders,
      addLog,
    }),
    [favoriteIds, reminderIds, appStateLog, foregroundCount, welcomeBack, toggleFavorite, clearFavorites, isFavorite, markReminder, clearReminders, addLog]
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEvents must be used inside <EventsProvider>');
  return ctx;
}
