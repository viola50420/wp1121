// Message.tsx

interface MessageProps {
  message: {
    documentId: string;
    content: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div>
      {/* 根据需要在此处呈现消息的内容 */}
      {message?.content}
    </div>
  );
};

export default Message;
