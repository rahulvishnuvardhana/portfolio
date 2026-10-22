"use client";

import type { ReactNode } from "react";

/** Any button on the page can open the chat widget by dispatching this event. */
export const OPEN_CHAT_EVENT = "portfolio:open-chat";

export default function OpenChatButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
    >
      {children}
    </button>
  );
}
