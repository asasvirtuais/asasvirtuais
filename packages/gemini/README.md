# asasvirtuais-gemini

A self-contained React package for generating text, structured objects, and images using Google's Gemini models and the Vercel AI SDK.

## Features

- **Text Generation (Chat)**: Streaming text generation using `useChat`.
- **Object Generation**: Structured data generation based on Zod schemas using `useObject`.
- **Image Generation**: Image creation using Google's Imagen 3 API, integrated with Vercel Blob for storage.
- **Custom API Key Support**: Pass keys via headers, body, or environment.

## API Setup (Next.js)

To use this package, you need to set up the following API routes in your Next.js application:

- `/api/gemini/chat`
- `/api/gemini/object`
- `/api/gemini/image`

Refer to the provided `route.ts` files in each directory.

## Frontend Usage

### 1. Simple Text Generation

```tsx
import { GeminiChat } from 'asasvirtuais-gemini'

function ChatApp() {
    return (
        <GeminiChat 
            instructions="You are a helpful assistant." 
            prompt="Hello, who are you?" 
            autoTrigger 
        >
            {({ messages, input, handleInputChange, handleSubmit, status }) => (
                <div>
                    {messages.map(m => (
                        <div key={m.id}>{m.role === 'user' ? 'User: ' : 'AI: '}{m.content}</div>
                    ))}
                    <form onSubmit={handleSubmit}>
                        <input value={input} onChange={handleInputChange} />
                        <button type="submit" disabled={status !== 'ready'}>Send</button>
                    </form>
                </div>
            )}
        </GeminiChat>
    )
}
```

### 2. Object Generation

```tsx
import { GeminiObject } from 'asasvirtuais-gemini'
import { z } from 'zod'

const recipeSchema = z.object({
    name: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string())
})

function RecipeGenerator() {
    return (
        <GeminiObject schema={recipeSchema} prompt="Create a chocolate cake recipe" autoTrigger>
            {({ submit, object, isLoading }) => (
                <div>
                    {!object && <button onClick={() => submit('Create a chocolate cake recipe')}>
                        Generate Recipe
                    </button>}
                    {isLoading && <p>Generating...</p>}
                    {object && (
                        <pre>{JSON.stringify(object, null, 2)}</pre>
                    )}
                </div>
            )}
        </GeminiObject>
    )
}
```


### 3. Image Generation

```tsx
import { GeminiImage } from 'asasvirtuais-gemini'

function ImageApp() {
    return (
        <GeminiImage>
            {({ submit, result, loading, error }) => (
                <div>
                    <button onClick={() => submit('A futuristic city at sunset')}>
                        Generate Image
                    </button>
                    {loading && <p>Drawing...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {result?.url && <img src={result.url} alt="Generated" />}
                </div>
            )}
        </GeminiImage>
    )
}
```

## Key Principles

1. **Self-Contained**: Each hook/component manages its own state.
2. **Flexible**: Use provided components or call hooks directly for custom logic.
3. **Optimized**: Uses streaming for text/object generation to provide better UX.
