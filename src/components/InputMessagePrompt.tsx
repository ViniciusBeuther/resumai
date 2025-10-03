import React from 'react'
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Paperclip, Send } from 'lucide-react';

interface IInputMessageProps {
    inputMessage: string, // message state in textbox
    setInputMessage: React.Dispatch<React.SetStateAction<string>>; // set state method to update message value
    onSubmitMessage: () => void // function used when the submit button is pressed
}

const InputMessagePrompt = ({ inputMessage, setInputMessage, onSubmitMessage }: IInputMessageProps) => {
    return (
        <div>
            <div className="flex gap-2 items-center">
                <Textarea
                    placeholder="Describe your medical experience, clinical rotations, research, or any content you'd like summarized..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 max-h-60 resize-none bg-slate-50/50 border-slate-200 overflow-y-auto"
                    onKeyDown={(e) => {
                        // handle enter pressing to submit message
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (inputMessage.trim()) {
                                onSubmitMessage();
                                setInputMessage("");
                            }
                        }
                    }
                    }
                />
                <Button
                    className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 px-6"
                    disabled={!inputMessage.trim()}
                    onClick={onSubmitMessage}
                    onKeyDown={(ev) => ev.keyCode == 13 ? onSubmitMessage : null}
                >
                    <Send className="w-4 h-4" />
                </Button>
                <Button
                    asChild
                    type="button"
                    className="bg-gradient-to-r from-teal-500 to-blue-500 
                   hover:from-teal-600 hover:to-blue-600 px-6"
                >
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <Paperclip className="w-4 h-4" />
                    </label>
                </Button>

                {/* Hidden input */}
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => console.log(e.target.files)}
                />

            </div>
        </div>
    )
}
export default InputMessagePrompt