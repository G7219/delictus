// Narrow slice of Meta's WhatsApp Cloud API webhook payload — only the
// fields this codebase actually reads. Extend as new message types
// (media, buttons, location) are handled.
export interface MetaWebhookPayload {
  entry: Array<{
    changes: Array<{
      value: {
        metadata: { phone_number_id: string };
        messages?: Array<{
          from: string;
          type: string;
          text?: { body: string };
        }>;
        statuses?: Array<{ status: string; recipient_id: string }>;
      };
    }>;
  }>;
}
