import React from 'react'

export function useAi() {
    const [prompt, setPrompt] = React.useState<string>('')
    console.log("🚀 ~ useAi ~ prompt:", prompt)


    return {
        prompt,
        setPrompt
    }
}
