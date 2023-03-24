import { store } from '../modules';

let socket = null;
export default {
  initWebSocket() {
    const token = store.getters.token;
    // console.log(token);
    if (token == '' || token == null || token == 'null') {
      return;
    }
    const isDev = process.env.NODE_ENV === 'development';
    const path = isDev ? 'web-asia-dev.prdws.com' : window.location.host;
    const wsuri = `wss://${path}/ws?token=${token}`;
    socket = new WebSocket(wsuri);
    socket.onopen = this.websocketonopen;
    socket.onerror = this.websocketonerror;
    socket.onmessage = this.websocketonmessage;
    socket.onclose = this.websocketclose;
  },
  websocketonopen() {
    window.ws = { success: true };
  },
  websocketonerror(e) {
    window.ws = { success: false };
  },
  websocketonmessage(e) {
    const data = JSON.parse(e.data);
    switch (data.message_type) {
      case 'station_letter_unread_count':
        store.commit('SET_MAIL_NUMBERMBER', data.message);
        break;
      default:
        break;
    }
  },
  websocketsend(agentData) {},
  websocketclose(e) {},
  close() {
    if (socket) socket.close();
  },
};
