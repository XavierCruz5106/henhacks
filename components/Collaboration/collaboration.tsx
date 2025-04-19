import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  Calendar,
  Clock,
  BookOpen,
  MessageSquare,
  Video,
  Plus,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import AgoraRTC, { IAgoraRTCRemoteUser, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import StudyBuddies from "./StudyBuddies";

export function Collaboration() {
  const [AppID, setAppID] = useState(""); // Replace with your Agora App ID
  const [token, setToken] = useState(null); // Replace with your Agora Token or null for no token
  const [activeSession, setActiveSession] = useState<{ id: string, name: string, channel: string } | null>(null);
  const [localTracks, setLocalTracks] = useState<{ videoTrack: any, audioTrack: any }>({ videoTrack: null, audioTrack: null });
  const [remoteUsers, setRemoteUsers] = useState<{ user: IAgoraRTCRemoteUser; videoTrack: IRemoteVideoTrack | undefined; }[]>([]);
  const client = useRef(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
  const localVideoRef = useRef(null);

  const studyGroups = [
    { id: "calculus", name: "Calculus Study Group", channel: "calculus-session" },
    { id: "physics", name: "Physics Problem Solvers", channel: "physics-session" },
    // Add more study groups here
  ];

  useEffect(() => {
    async function setupLocalTracks() {
      if (activeSession) {
        try {
          const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          const videoTrack = await AgoraRTC.createCameraVideoTrack();
          setLocalTracks({ audioTrack, videoTrack });
        } catch (error) {
          console.error("Error creating local tracks:", error);
        }
      } else {
        if (localTracks.audioTrack) {
          localTracks.audioTrack.close();
        }
        if (localTracks.videoTrack) {
          localTracks.videoTrack.close();
        }
        setLocalTracks({ videoTrack: null, audioTrack: null });
      }
    }

    setupLocalTracks();
  }, [activeSession]);

  useEffect(() => {
    if (activeSession && localTracks.videoTrack && localVideoRef.current) {
      localTracks.videoTrack.play(localVideoRef.current);
    }
  }, [activeSession, localTracks.videoTrack]);

  useEffect(() => {
    async function joinCall() {
      if (!activeSession || !AppID) return;

      try {
        await client.current.join(AppID, activeSession.channel, token, null);

        if (localTracks.audioTrack) {
          await client.current.publish(localTracks.audioTrack);
        }
        if (localTracks.videoTrack) {
          await client.current.publish(localTracks.videoTrack);
        }

        client.current.on("user-published", async (user, mediaType) => {
          await client.current.subscribe(user, mediaType);
          if (mediaType === "video") {
            setRemoteUsers((prevUsers) => [...prevUsers, { user, videoTrack: user.videoTrack }]);
          }
          if (mediaType === "audio") {
            if (user.audioTrack) {
              user.audioTrack.play();
            }
          }
        });

        client.current.on("user-unpublished", (user, mediaType) => {
          if (mediaType === "video") {
            setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.user.uid !== user.uid));
          }
        });

        client.current.on("user-left", (user) => {
          setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.user.uid !== user.uid));
        });
      } catch (error) {
        console.error("Error joining call:", error);
        setActiveSession(null);
      }
    }

    joinCall();

    return () => {
      if (activeSession) {
        client.current.leave();
        client.current.removeAllListeners();
      }
    };
  }, [activeSession, AppID, token, localTracks]);

  const handleJoinSession = (group: any) => {
    setActiveSession(group);
  };

  const handleLeaveSession = () => {
    setActiveSession(null);
    setRemoteUsers([]);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Study Groups & Collaboration</CardTitle>
          <CardDescription>
            Connect with classmates and join study sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeSession ? (
            <div className="space-y-4">
              <div ref={localVideoRef} className="w-full aspect-video bg-black" />
              <div className="grid grid-cols-2 gap-4">
                {remoteUsers.map(({ user, videoTrack }) => (
                  <div key={user.uid} className="aspect-video bg-black">
                    {videoTrack && <div ref={(el) => { if (el) videoTrack.play(el); }} />}
                  </div>
                ))}
              </div>
              <Button onClick={handleLeaveSession}>Leave Session</Button>
            </div>
          ) : (
            <>
              <Input
                placeholder="Agora App ID"
                value={AppID}
                onChange={(e) => setAppID(e.target.value)}
              />
              <Tabs defaultValue="groups">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="groups">Study Groups</TabsTrigger>
                  <TabsTrigger value="buddies">Study Buddies</TabsTrigger>
                  <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
                </TabsList>
                <TabsContent value="groups" className="space-y-4 pt-4">
                  {/* ... (Search input) */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {studyGroups.map((group) => (
                      <Card key={group.id}>
                        <CardHeader className="pb-2">
                          {/* ... (Badge, members, title) */}
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                        </CardHeader>
                        <CardContent>{/* ... (Description, avatars) */}</CardContent>
                        <CardFooter>
                          <Button onClick={() => handleJoinSession(group)}>Join Session</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  {/* ... (Create new group button) */}
                </TabsContent>
                {/* ... (Other TabsContent) */}
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}