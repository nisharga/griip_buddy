// components/WhatsAppChat.tsx
import { PhoneCallIcon } from "lucide-react";
import React from "react";
// import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppChatProps {
  phoneNumber: string; // e.g. "+8801712345678"
  message?: string; // optional prefilled message
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  phoneNumber,
  message,
}) => {
  const encodedMessage = encodeURIComponent(
    message || "Hello, I’m interested in your product."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(
    /\D/g,
    ""
  )}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-white bg-linear-to-tr from-green-400 to-green-600 rounded-md transition hover:opacity-90"
    >
      <PhoneCallIcon className="size-8" />
      <div>
        <h1 className="text-lg leading-6">Message</h1>
        <p className="text-xs text-gray-100">on WhatsApp</p>
      </div>
    </a>
  );
};

export default WhatsAppChat;
