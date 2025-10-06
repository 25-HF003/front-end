import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';

export function useProgressWebSocket(taskId: string): {progress: number, ready: boolean} {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!taskId) {
      setProgress(0);
      setReady(false);
      return;
    }

    const socket = new SockJS(`${import.meta.env.VITE_WS_BASE}`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 2000,
      debug: (m) => console.log("stomp", m),

      onConnect: () => {
        console.log("WebSocket 연결 성공!", taskId);
        setReady(true);

        stompClient.subscribe(`/user/queue/progress/${taskId}`, (message) => {
          console.log("수신 원문: ", message.body);
            const data = JSON.parse(message.body);
            console.log("진행률 메시지 수신:", data.progress);
            setProgress(data.progress);
        });
      },
      onStompError: (frame) => {
        console.error("WebSocket STOMP 에러:", frame.headers['message'], frame.body);
        setReady(false);
      }
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      setReady(false);
      console.log("🔌 WebSocket 연결 해제");
    };
  }, [taskId]);

  return {progress, ready};
}