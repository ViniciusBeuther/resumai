import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
    RefreshCw,
    MessageSquare,
    User,
    Save,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import type { IGetMessagesResponse } from '@/types/interfaces';
import SummaryPreview from '@/components/SummaryPreview';
import InputMessagePrompt from '@/components/InputMessagePrompt';
import SummaryConfigurations from '@/components/SummaryConfigurations';
import Chat from '@/components/Chat';

interface ISummaryConfig {
    useBullets: boolean,
    detailLevel: string,
    useEmojis: boolean,
    useTitleLevels: boolean
}

const Home = () => {

    const [messages, setMessages] = useState<IGetMessagesResponse[]>([]);
    const token = localStorage.getItem('token');
    const [inputMessage, setInputMessage] = useState<string>('');
    const [useBullets, setUseBullets] = useState<boolean>(true);
    const [abstractionLevel, setAbstractionLevel] = useState<string>('detailed');
    const [summaryMd, setSummaryMd] = useState<string>("");
    const [refreshMessages, setRefreshMessages] = useState<boolean>(false);
    const [useEmojis, setUseEmojis] = useState<boolean>(false);
    const [useTitleLevels, setUseTitleLevels] = useState<boolean>(false);
    
    // Add resizable state
    const [leftWidth, setLeftWidth] = useState(50); // percentage

    /**
     * Function to submit the message (content to summarize)
     */
    const onSubmitMessage = async () => {
        try {
            const userId = localStorage.getItem('user_id');
            const configuration: ISummaryConfig = {
                detailLevel: abstractionLevel,
                useBullets: useBullets,
                useEmojis: useEmojis,
                useTitleLevels: useTitleLevels
            }

            const submit = async () => {
                const fileInput = document.getElementById("file-upload") as HTMLInputElement;
                const file = fileInput?.files?.[0];

                const formData = new FormData();
                formData.append( "userId", userId ?? "" );
                formData.append( "question", inputMessage );
                formData.append( "configuration", JSON.stringify( configuration ) );
                
                if( file )
                    formData.append( "file", file );
                

                const res = await fetch(import.meta.env.VITE_API_ASK_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });


                const result: IGetMessagesResponse = await res.json()
                console.log(`question result: ${result.response}`);
                setSummaryMd(result.response);
                setInputMessage("");
                setRefreshMessages( !refreshMessages );
            }

            submit();
        } catch (error) {
            console.log(`Error submitting message. ${error}`);
        }

    };

    // Resizable divider handler
    const handleMouseDown = (e: any) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = leftWidth;
        
        const handleMouseMove = (e: any) => {
            const container = document.querySelector('.main-container');
            if (!container) return;
            
            const containerRect = container.getBoundingClientRect();
            const deltaX = e.clientX - startX;
            const newWidth = startWidth + (deltaX / containerRect.width) * 100;
            
            // Constrain between 25% and 75%
            const constrainedWidth = Math.min(Math.max(newWidth, 25), 75);
            setLeftWidth(constrainedWidth);
        };
        
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };
        
        // Prevent text selection while dragging
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // fetch all user messages and set up the markup summary content
    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const res = await fetch(import.meta.env.VITE_API_GET_ALL_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "userId": userId
                    })
                });
                const data: IGetMessagesResponse[] = await res.json();

                // set messages
                setMessages(data);

                // set the markup content
                setSummaryMd(data[0].response);
                // console.log(data[0].response)
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        getAllMessages();
    }, [refreshMessages]);

    return (
        <div className="min-h-screen bg-gradient-to-tl from-yellow-50 via-teal-50 to-blue-50 flex">
            { /* sidebar menu */}
            <Sidebar />

            {/* Main Content Area - Split Layout like Overleaf */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="border-b border-white/20 bg-white/30 backdrop-blur-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-700">Criador de Resumos de Medicina</h2>
                            <p className="text-sm text-slate-500">Crie resumos com AI assistence.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Save className="w-4 h-4 mr-1" />
                                Save
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content - Resizable Two Column Layout */}
                <div className="flex-1 flex main-container">
                    {/* Left Column - Chat + Configurations */}
                    <div 
                        className="flex flex-col p-6 space-y-4" 
                        style={{ width: `${leftWidth}%` }}
                    >
                        {/* Chat Interface - Fixed Height with proper flex layout */}
                        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm flex flex-col" style={{ height: '28rem' }}>
                            <CardHeader className="pb-3 flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-teal-600" />
                                        <CardTitle className="text-base text-slate-700">Chat History</CardTitle>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col pb-3 min-h-0">
                                {/* Messages Container - Takes remaining space and scrolls */}
                                <div className="flex-1 overflow-hidden mb-4">
                                    <Chat messages={ messages } />
                                </div>

                                {/* Message Input - Fixed at bottom */}
                                <div className="flex-shrink-0">
                                    <InputMessagePrompt
                                        inputMessage={ inputMessage }
                                        onSubmitMessage={ onSubmitMessage }
                                        setInputMessage={ setInputMessage }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Summary Configurations - Below Chat */}
                        <SummaryConfigurations
                            useBullets={ useBullets }
                            setUseBullets={ setUseBullets }
                            abstractionLevel={ abstractionLevel }
                            setAbstractionLevel={ setAbstractionLevel }
                            setUseEmojis={ setUseEmojis }
                            useEmojis={ useEmojis }
                            setUseTitleLevels={ setUseTitleLevels }
                            useTitleLevels={ useTitleLevels }
                        />
                    </div>

                    {/* Draggable Divider */}
                    <div 
                        className="w-1 bg-slate-200 hover:bg-teal-400 cursor-col-resize transition-colors duration-200 relative group"
                        onMouseDown={handleMouseDown}
                    >
                        {/* Visual indicator */}
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
                            <div className="w-1 h-8 bg-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </div>
                    </div>

                    {/* Right Column - Preview */}
                    <div 
                        className="p-6 flex-1"
                        style={{ width: `${100 - leftWidth}%` }}
                    >
                        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm h-full">
                            <CardContent className="h-full">
                                <SummaryPreview response={summaryMd} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;