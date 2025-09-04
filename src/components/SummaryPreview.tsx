import ReactMarkdown from 'react-markdown';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Copy, Download, Eye } from 'lucide-react';
import { useState, type ChangeEvent, type MouseEventHandler } from 'react';

interface SummaryPreviewProps{
    response: string
}

const SummaryPreview = ( props: SummaryPreviewProps ) => {
    const [ copy, setCopy ] = useState<boolean>( false );


    const handleCopy = () => {
        setCopy(true);
        setTimeout(() => setCopy(false), 1000); // 1 second

        // if you also want to copy something to clipboard:
        // navigator.clipboard.writeText("your text here");
    };

  return (
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-blue-600" />
                        <CardTitle className="text-lg text-slate-700">Prévia do Resumo</CardTitle>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className='hover:cursor-pointer'>
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                        </Button>
                        <Button variant="outline" size="sm" className='hover:cursor-pointer'>
                            <Download className="w-4 h-4 mr-1" />
                            Word
                        </Button>
                        <Button variant="outline" size="sm" className='hover:cursor-pointer'
                            onClick={ handleCopy }
                        >
                            <Copy className="w-4 h-4 mr-1" />
                            {copy ? "Copiado" : "Copiar"}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="bg-white p-6 rounded-lg border border-slate-100 min-h-[200px]">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">{props.response.split("|")[0]}</h2>
                        <p className="text-slate-600">[{props.response.split("|")[1]}] | {props.response.split("|")[2]}</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-slate-600 space-y-1 text-justify">
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown
                                        components={{
                                            ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
                                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                            p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
                                            h1: ({ children }) => <h1 className="text-lg font-bold mb-3">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-md font-semibold mb-2 mt-4">{children}</h2>,
                                        }}
                                    >
                                        {props.response.split("|")[3]}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
  )
}

export default SummaryPreview;
