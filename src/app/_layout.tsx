import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { store } from "@/store";
import { TrackFlyThemeProvider } from "@/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <TrackFlyThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
        </Stack>
      </TrackFlyThemeProvider>
    </Provider>
  );
}
