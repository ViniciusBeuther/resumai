import type { IGetMessagesResponse } from '@/types/interfaces'
import { User } from 'lucide-react'

interface IChatProps {
    messages: IGetMessagesResponse[]
}

const Chat = ({ messages }: IChatProps) => {
    return (
        <div className="h-64 overflow-y-auto space-y-3 pr-2 border rounded-lg bg-slate-50/50 p-3">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-500">
                    <p className="text-sm">No messages yet. Start a conversation!</p>
                </div>
            ) : (
                messages.map((message, index) => (
                    <div key={message.message_id || index} className="space-y-3">
                        {/* User Question */}
                        <div className="flex gap-2 justify-end">
                            <div className="p-2 rounded-lg max-w-[75%] bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                                <p className="text-xs leading-relaxed text-white break-words">
                                    {message.question}
                                </p>
                            </div>
                            <div className="w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-3 h-3 text-white" />
                            </div>
                        </div>

                        {/* AI Response - Uncomment if you want to show responses in chat */}
                        {/* 
                        <div className="flex gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Brain className="w-3 h-3 text-white" />
                            </div>
                            <div className="p-2 rounded-lg max-w-[75%] bg-white shadow-sm border border-slate-100">
                                <p className="text-xs leading-relaxed text-slate-700 break-words">
                                    {message.response}
                                </p>
                            </div>
                        </div>
                        */}
                    </div>
                ))
            )}
        </div>
    )
}

export default Chat