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



export const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-black">
      <div className="py-4 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-5 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6>You call is ended</h6>
            <p className="text-sm">Summary will appear in few minutes</p>
          </div>

          <div className="flex items-center justify-between w-full gap-x-2">
            <Button asChild variant={"ghost"}>
              <Link href={"/meetings"}>Back to meeting</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
