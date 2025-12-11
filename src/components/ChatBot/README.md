# Modern ChatBot Component

A beautiful, responsive chatbot UI component for the Physical AI & Humanoid Robotics textbook website.

## Features

### 🎨 Modern Design
- Matches website color palette (cyan, teal, blue gradients)
- Glass morphism effects with backdrop blur
- Smooth animations and transitions
- Responsive design for all screen sizes

### 🤖 Smart UI Elements
- Custom robot and user avatars
- Animated typing indicators
- Gradient backgrounds with shimmer effects
- Pulsing chat button with glow effects

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layout for tablets and phones
- Touch-friendly interface
- Optimized for different screen sizes

### ⚡ Animations & Effects
- Slide-up animation for chat window
- Fade-in animations for messages
- Rotating robot icon in header
- Pulse effect on chat button
- Smooth hover transitions

### 🔧 Technical Features
- TypeScript support
- Error handling with user-friendly messages
- Auto-scroll to latest messages
- Loading states and disabled states
- Keyboard accessibility

## API Integration

The chatbot connects to your FastAPI backend at `http://localhost:8000/chat` with:

```typescript
POST /chat
{
  "query": "user message"
}
```

Response:
```typescript
{
  "answer": "AI response"
}
```

## Usage

The chatbot is automatically included on all pages through the Layout wrapper. Users can:

1. Click the floating chat button to open
2. Type questions about Physical AI, robotics, ROS 2, etc.
3. Receive intelligent responses from your AI assistant
4. Close the chat when done

## Customization

Colors and styles can be customized through CSS variables in `styles.module.css`:

- `--accent-cyan`: Primary accent color
- `--accent-blue`: Secondary accent color  
- `--accent-teal`: Tertiary accent color
- `--glass-alpha`: Glass effect transparency
- `--card-bg`: Background colors

The component automatically adapts to light/dark theme changes.