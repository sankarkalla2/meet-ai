import { inngest } from "@/lib/inngest/client";
import { helloWorld, meetingProcessing } from "@/lib/inngest/functions";
import { serve } from "inngest/next";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  signingKey: 'signkey-prod-1116ad73ac79f9b398eb28b2d21d97b102d655e6696c513879ace198c7acbf95',
  functions: [
    /* your functions will be passed here later! */
    meetingProcessing
  ],
});
