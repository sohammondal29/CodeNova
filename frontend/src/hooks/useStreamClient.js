import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance = null;
    let mounted = true;

    const initCall = async () => {
      try {
        if (!session?.callId) return;
        if (!isHost && !isParticipant) return;
        if (session.status === "completed") return;

        setIsInitializingCall(true);

        // GET STREAM TOKEN
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        // INIT VIDEO CLIENT
        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        if (!mounted) return;

        setStreamClient(client);

        // JOIN VIDEO CALL
        videoCall = client.call("default", session.callId);

        await videoCall.join({
          create: true,
        });

        if (!mounted) return;

        setCall(videoCall);

        // INIT CHAT CLIENT
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;

        chatClientInstance = StreamChat.getInstance(apiKey);

        // CONNECT USER
        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        if (!mounted) return;

        setChatClient(chatClientInstance);

        // CREATE SHARED CHANNEL
        const chatChannel = chatClientInstance.channel(
          "messaging",
          session.callId,
          {
            members: [
              session.host?.clerkId,
              session.participant?.clerkId,
            ].filter(Boolean),
          }
        );

        // WATCH CHANNEL
        await chatChannel.watch();

        console.log("JOINED CHANNEL:", chatChannel.id);

        if (!mounted) return;

        setChannel(chatChannel);
      } catch (error) {
        console.error("Error initializing Stream:", error);

        toast.error("Failed to join video call");
      } finally {
        if (mounted) {
          setIsInitializingCall(false);
        }
      }
    };

    if (session && !loadingSession) {
      initCall();
    }

    // CLEANUP
    return () => {
      mounted = false;

      (async () => {
        try {
          if (videoCall) {
            await videoCall.leave();
          }

          if (chatClientInstance) {
            await chatClientInstance.disconnectUser();
          }

          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [session, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;