import React, { useState } from 'react'
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Paperclip, Send, X } from 'lucide-react';

interface IInputMessageProps {
    inputMessage: string, // message state in textbox
    setInputMessage: React.Dispatch<React.SetStateAction<string>>; // set state method to update message value
    onSubmitMessage: () => void // function used when the submit button is pressed
}

const InputMessagePrompt = ({ inputMessage, setInputMessage, onSubmitMessage }: IInputMessageProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            console.log(file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        // Reset the file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <div>
            <div className="flex gap-2 items-center">
                <Textarea
                    placeholder="Adicione detalhes para o resumo a ser gerado. Digite o tema que desejar..."
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
                    }}
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
                    onChange={handleFileChange}
                />
            </div>

            {/* Display selected file name */}
            {selectedFile && (
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-md border border-slate-200">
                    <Paperclip className="w-4 h-4" />
                    <span className="flex-1">{selectedFile.name}</span>
                    <button
                        onClick={removeFile}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Remove file"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
}
export default InputMessagePrompt