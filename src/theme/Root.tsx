import React from 'react';
import ChatBot from '@site/src/components/ChatBot';

interface Props {
  children: React.ReactNode;
}

// Default implementation, that you can customize
export default function Root({children}: Props): React.ReactElement {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
}