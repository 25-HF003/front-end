import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';


export function useProgressWebSocket(taskId: string): {progress: number, ready: boolean} {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const startedRef = useRef(false);  
  const subRef = useRef<StompSubscription | null>(null);
  //const userId = useSelector((state: RootState) => state.auth.user?.userId); 

  useEffect(() => {
    if (!taskId) {
      setProgress(0);
      setReady(false);
      return;
    }
    if (startedRef.current) return;          // 두 번째 호출 차단
    startedRef.current = true;

    const socket = new SockJS(`${import.meta.env.VITE_WS_BASE}`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 2000,
      debug: (m) => console.log("stomp", m),
      /*
      connectHeaders: {
        loginId: userId?.toString() || "", 
      },*/

      onConnect: () => {
        console.log("WebSocket 연결 성공!", taskId);
        setReady(true);
      },
      onDisconnect: () => {
        console.log("STOMP DISCONNECTED (client side)");
        setReady(false);
      },
      onStompError: (frame) => {
        console.error("WebSocket STOMP 에러:", frame.headers['message'], frame.body);
        setReady(false);
      },
      onWebSocketClose: (ev) => {
        console.warn("WS closed", ev.code, ev.reason);
        setReady(false);
      },
      heartbeatIncoming: 20000,
      heartbeatOutgoing: 20000,
    });

    clientRef.current = stompClient;
    stompClient.activate();

    return () => {
      stompClient.deactivate();
      setReady(false);
      clientRef.current = null;
      startedRef.current = false;
      console.log("🔌 WebSocket 연결 해제");
    };
  }, []);

  useEffect(() => {
    if (!ready || !clientRef.current || !taskId) return;

    const dest = `/user/queue/progress/${taskId}`;
    console.log("SUBSCRIBE:", dest);

    subRef.current?.unsubscribe(); // 이전 구독 해제
    subRef.current = clientRef.current.subscribe(dest, (msg: IMessage) => {
      console.log("수신 원문: ", msg.body);
      try {
        const data = JSON.parse(msg.body);
        console.log("진행률 메시지 수신: ", data.progress);
        // setProgress(data.progress);
      } catch (e) {
        console.error("JSON parse 실패:", e);
      }
    });

    // taskId가 바뀔 때만 해제
    return () => {
      subRef.current?.unsubscribe();
      subRef.current = null;
    };
  }, [ready, taskId]);

  return {progress, ready};
}