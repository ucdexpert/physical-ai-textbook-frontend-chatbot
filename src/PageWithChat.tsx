// src/components/PageWithChat.tsx
import React from 'react';
import Layout from '@theme/Layout';
// import ChatBot from './components/ChatBot';

interface Props {
  children: React.ReactNode;
}

export default function PageWithChat({ children }: Props) {
  return (
    <Layout>
      {children}      {/* Original page content */}
      {/* <ChatBot/>    ChatBot har page pe visible */}
    </Layout>
  );
}
