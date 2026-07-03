# 💬 Chat App — Frontend

A real-time messaging web app built with **React 19**, featuring JWT authentication, WebSocket-powered live messaging, and AI-assisted message translation. Built as a full-stack pet project to demonstrate practical React architecture, real-time systems, and clean API integration — paired with a [Laravel backend](https://github.com/joseph2k00/chat_app_be).

## ✨ Features

- **Live messaging** — new messages and conversations appear instantly via WebSockets, no polling or manual refresh required
- **JWT authentication** — token-based login/signup with session restoration on page reload and automatic logout on token expiry (401 handling)
- **Protected routing** — route guards that redirect unauthenticated users away from the app and authenticated users away from login/signup
- **AI-powered translation** — one-click translation of any received message
- **Debounced live user search** — search-as-you-type with request debouncing and `AbortController` to cancel stale in-flight requests
- **Start-new-chat flow** — search for a user and start a conversation on first message, without a conversation existing yet
- **Loading states throughout** — dedicated loading UI for auth bootstrap, chat loads, searches, and form submissions

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| UI Library | React 19 |
| Routing | React Router 7 |
| Real-time | Laravel Echo + Reverb (WebSocket, Pusher protocol) |
| Styling | Tailwind CSS |
| State | React Context API + hooks |
| Backend | [Laravel API](https://github.com/joseph2k00/chat_app_be) (JWT auth, broadcasting, AI translation) |

## 🏗️ Architecture Highlights

**Auth as a cross-cutting concern.** `AuthContext` centralizes login, signup, logout, and profile bootstrapping, and exposes `AuthenticatedRoute` / `PublicRoute` wrapper components so route-level access control stays declarative in `App.js` rather than scattered through pages.

```jsx
<Route path="/" element={
  <AuthenticatedRoute>
    <ChatApp />
  </AuthenticatedRoute>
} />
```

**Real-time via private channels.** Each conversation and each user subscribes to its own private Echo channel (`message.received.{id}`, `new.conversation.received.{userId}`). Components clean up subscriptions on unmount, and the WebSocket auth header is kept in sync with the JWT after login/signup so private channel authorization always uses a valid token.

**Resilient async UI.** The user search component debounces input and aborts superseded requests with `AbortController`, preventing race conditions where an older, slower response overwrites a newer one:

```js
const controller = new AbortController();
const debounceTimeout = setTimeout(initiateSearch, 400);
return () => {
  clearTimeout(debounceTimeout);
  controller.abort();
};
```

**Optimistic-feeling conversation start.** Selecting a search result opens a *temporary* chat view before a conversation exists on the backend; sending the first message transparently creates the conversation and transitions into it.

## 📂 Project Structure

```
src/
├── ApiRoutes/         # Centralized API endpoint definitions
├── Common/Components/ # Shared UI (loaders, buttons)
├── Context/           # AuthContext — auth state, guards, session bootstrap
├── realtime/           # Laravel Echo WebSocket client setup
└── Routes/
    ├── Login/ Signup/  # Auth screens
    └── ChatApp/
        └── Components/
            ├── ChatSearch/  # Debounced user search
            ├── ChatList/    # Conversation list + live updates
            └── ActiveChat/  # Message thread, send + translate
```

## 🚀 Getting Started

```bash
npm install
npm start
```

Requires a running instance of the [backend API](https://github.com/joseph2k00/chat_app_be) and a `REACT_APP_API_URL` environment variable pointing to it.

## 👤 About

Built by [Joseph John](https://github.com/joseph2k00) as a hands-on exploration of real-time frontend architecture — WebSocket lifecycle management, auth-aware routing, and integrating AI features into a conventional CRUD app.
