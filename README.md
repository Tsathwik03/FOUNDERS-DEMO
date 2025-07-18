# styling

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/tsathwik03s-projects/v0-styling)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/StObWftSX8w)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/tsathwik03s-projects/v0-styling](https://vercel.com/tsathwik03s-projects/v0-styling)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/StObWftSX8w](https://v0.dev/chat/projects/StObWftSX8w)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Adding Custom Widgets (e.g., Notes) to Dashboard Cards

You can add custom widgets, such as a Note widget, to the draggable/resizable cards in the dashboard. Each widget can have its own styling and content that adapts to the card's current size.

### Step-by-Step Guide

1. **Create Your Widget Component**

   For example, create a `NoteWidget.tsx` in your `components/widgets/` directory:

   ```tsx
   // components/widgets/NoteWidget.tsx
   import React from "react";

   // Accepts a size prop to customize styling based on card size
   export default function NoteWidget({ size, text }: { size: string; text: string }) {
     let style = "";
     if (size === "small") style = "bg-yellow-100 text-xs p-2";
     else if (size === "wide") style = "bg-yellow-200 text-base p-4";
     else if (size === "large") style = "bg-yellow-300 text-lg p-6";
     else if (size === "xlarge") style = "bg-yellow-400 text-xl p-8";
     return (
       <div className={`rounded shadow ${style}`}>
         <b>Note:</b> {text}
       </div>
     );
   }
   ```

2. **Determine Card Size in the Dashboard**

   In your dashboard, you can map the card's grid size to a string for styling:

   ```tsx
   function getCardSize(w: number, h: number) {
     if (w === 2 && h === 2) return "small";
     if (w === 4 && h === 2) return "wide";
     if (w === 4 && h === 4) return "large";
     if (w === 8 && h === 4) return "xlarge";
     return "custom";
   }
   ```

3. **Render the Widget in a Card**

   Import your widget and render it inside the card content, passing the size and any other props:

   ```tsx
   import NoteWidget from "../widgets/NoteWidget";
   // ...
   {cards.map(card => (
     <div
       key={card.id}
       className="grid-stack-item"
       gs-x={card.x}
       gs-y={card.y}
       gs-w={card.w}
       gs-h={card.h}
       gs-min-w="2" gs-max-w="8"
       gs-min-h="2" gs-max-h="4"
       gs-resize-handles="e, se, s"
     >
       <div className="grid-stack-item-content bg-white border border-gray-300 rounded-xl flex items-center justify-center p-4">
         <NoteWidget size={getCardSize(card.w, card.h)} text={`This is note for card ${card.id}`} />
       </div>
     </div>
   ))}
   ```

4. **Custom Styling for Each Size**

   In your widget, use the `size` prop to apply different styles, layouts, or even content for each allowed card size.

### Example: Adding a Note Widget

- Create `components/widgets/NoteWidget.tsx` as above.
- Update your dashboard card rendering to use `<NoteWidget />` instead of plain text.
- The widget will automatically adapt its style based on the card's current size.

### Tips
- You can create as many widget types as you want (e.g., charts, todo lists, images) and use the same pattern.
- For more advanced behavior, you can pass additional props (e.g., card id, data, callbacks) to your widget.
- Use Tailwind or your preferred CSS framework for custom styles.

---