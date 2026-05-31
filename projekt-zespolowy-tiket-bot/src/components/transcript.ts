export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
}

export interface TranscriptMessage {
  id: string;

  content: string;

  createdAt: string;

  isEdited?: boolean;

  author: {
    id: string;
    username: string;
    avatar: string;
    isBot?: boolean;
  };

  attachments?: Attachment[];
}