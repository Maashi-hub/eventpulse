import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

/**
 * Subscribes to React Native's AppState API.
 *  - onChange(next)    -> called on every change: 'active' | 'inactive' | 'background'
 *  - onForeground()    -> called only when the app goes from background/inactive -> active
 */
export function useAppStateListener({ onChange, onForeground }) {
  const previous = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (previous.current.match(/inactive|background/) && nextState === 'active') {
        onForeground?.();
      }
      onChange?.(nextState);
      previous.current = nextState;
    });

    // Always clean up the listener when the component unmounts.
    return () => subscription.remove();
  }, [onChange, onForeground]);
}
