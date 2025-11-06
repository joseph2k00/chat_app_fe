import Echo from 'laravel-echo';

window.Pusher = require('pusher-js'); // keep this so Echo can use Pusher protocol

export const echo = new Echo({
  broadcaster: 'reverb',
  key: 'bxfwpotiwu2offgpippd',
  wsHost: 'localhost',      // e.g. ws.your-domain.com
  wsPort: 8080 || 80,
  wssPort: 8080 || 443,
  forceTLS: false,
  enabledTransports: ['ws'],

  // Tell Echo where to POST for private/presence auth (Laravel registers this)
  authEndpoint: `http://127.0.0.1:8000/broadcasting/auth`,

  // Include the JWT on every auth attempt
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      Accept: 'application/json',
    },
  },
});