type ChatConfigType = {
  openapiKey: string;
  defaultModel: string;
  defaultSystemPrompt: string;
};

export const ChatConfig: ChatConfigType = {
  openapiKey: "sk-proj-KPFfOW8HbpFU6yDzAKEdT3BlbkFJYtYWosHsVZKQHN7RxOAZ",
  defaultModel: "gpt-3.5-turbo",
  defaultSystemPrompt:
    "You are oorb-cli, a helful assistant that answers questions about ros and only about ros",
};
