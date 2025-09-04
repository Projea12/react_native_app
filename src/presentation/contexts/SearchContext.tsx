import React, { createContext, useState, useContext } from "react";

type ConversationState = {
  skill: string | null;
  location: string | null;
  time: string | null;
  missingFields: string[];
};

type ConversationContextType = {
  conversation: ConversationState;
  setConversation: React.Dispatch<React.SetStateAction<ConversationState>>;
};

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [conversation, setConversation] = useState<ConversationState>({
    skill: null,
    location: null,
    time: null,
    missingFields: ["skill", "location", "time"],
  });

  return (
    <ConversationContext.Provider value={{ conversation, setConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
};
