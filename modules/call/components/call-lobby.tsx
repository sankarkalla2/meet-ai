import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import Link from "next/link";

interface Props {
  onJoin: () => void;
}

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermissions = hasCameraPermission && hasMicPermission;

  const disableVideoPreview = () => {
    const { data } = authClient.useSession();

    return (
      <DefaultVideoPlaceholder
        participant={
          {
            name: data?.user.name ?? "",
            image: data?.user.image ?? "https://github.com/evilrabbit.png",
          } as StreamVideoParticipant
        }
      />
    );
  };

  const allowBrowswerPermissions = () => {
    return (
      <p className="text-sm">
        Please grant browswer a permission to access you camara and mircrophone.
      </p>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-black">
      <div className="py-4 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-5 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm">Setup your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermissions
                ? disableVideoPreview
                : allowBrowswerPermissions
            }
          />
          <div className="flex gap-x-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex items-center justify-between w-full gap-x-2">
            <Button asChild variant={"ghost"}>
              <Link href={"/meetings"}>Cancel</Link>
            </Button>
            <Button onClick={onJoin}>Join Call</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
