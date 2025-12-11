import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Message {
    id: string;
    role: 'user' | 'ai';
    text: string;
    timestamp?: Date;
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: '1', 
            role: 'ai', 
            text: '👋 Hello! I\'m your Physical AI & Robotics Assistant. I can help you with concepts from the textbook, answer questions about humanoid robotics, ROS 2, simulation environments, and more. What would you like to learn about?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');

        // Add User Message
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: userMessage,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        try {
            // Fetch response from backend
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMessage }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Network response was not ok');
            }

            const data = await response.json();
            const aiText = data.answer || "I'm having trouble processing that right now.";

            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: aiText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAiMessage]);
        } catch (error: any) {
            console.error('Chat error:', error);
            let errorMessage = "🔌 Sorry, I'm unable to connect to the server. Please ensure the backend is running on localhost:8000.";

            if (error.message.includes("Rate limit") || error.message.includes("429")) {
                errorMessage = "⏱️ I'm receiving too many requests right now. Please wait a minute and try again.";
            } else if (error.message) {
                errorMessage = `❌ Error: ${error.message}`;
            }

            const errorAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: errorMessage,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorAiMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Robot Avatar SVG
    const RobotAvatar = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
            <circle cx="12" cy="5" r="2"/>
            <path d="M12 7v4"/>
            <line x1="8" y1="16" x2="8" y2="16"/>
            <line x1="16" y1="16" x2="16" y2="16"/>
            <circle cx="8" cy="14" r="1"/>
            <circle cx="16" cy="14" r="1"/>
        </svg>
    );

    // User Avatar SVG
    const UserAvatar = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    );

    // Chat Icon SVG
    const ChatIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <path d="M8 10h8"/>
            <path d="M8 14h6"/>
        </svg>
    );

    // Send Icon SVG
    const SendIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22,2 15,22 11,13 2,9 22,2"/>
        </svg>
    );

    // Close Icon SVG
    const CloseIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    );

    return (
        <div className={styles.container}>
            {/* Toggle Button */}
            {!isOpen && (
                <button 
                    className={styles.toggleButton} 
                    onClick={toggleChat} 
                    aria-label="Open Physical AI Chat Assistant"
                    title="Chat with Physical AI Assistant"
                >
                    <ChatIcon />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.headerTitle}>
                            <RobotAvatar />
                            <span>Physical AI Tutor</span>
                        </div>
                        <button 
                            className={styles.closeButton} 
                            onClick={toggleChat} 
                            aria-label="Close Chat"
                            title="Close Chat"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={styles.messagesContainer}>
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={clsx(
                                    styles.messageRow, 
                                    msg.role === 'user' ? styles.userRow : styles.aiRow
                                )}
                            >
                                <div className={clsx(
                                    styles.avatar, 
                                    msg.role === 'user' ? styles.userAvatar : styles.aiAvatar
                                )}>
                                    {msg.role === 'user' ? <UserAvatar /> : <RobotAvatar />}
                                </div>
                                <div className={clsx(
                                    styles.bubble, 
                                    msg.role === 'user' ? styles.userBubble : styles.aiBubble
                                )}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isLoading && (
                            <div className={styles.messageRow}>
                                <div className={clsx(styles.avatar, styles.aiAvatar)}>
                                    <RobotAvatar />
                                </div>
                                <div className={styles.typing}>
                                    <div className={styles.dot}></div>
                                    <div className={styles.dot}></div>
                                    <div className={styles.dot}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form className={styles.inputArea} onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ask about Physical AI, robotics, ROS 2..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            maxLength={500}
                        />
                        <button 
                            type="submit" 
                            className={styles.sendButton} 
                            disabled={!input.trim() || isLoading}
                            title="Send message"
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;