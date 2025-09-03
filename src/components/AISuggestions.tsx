import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const AISuggestions = () => {
    return (
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                    <CardTitle className="text-lg text-slate-700">AI Suggestions</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                            💡 Consider adding specific patient cases or procedures you observed
                        </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                            📚 Include learning outcomes and clinical skills developed
                        </p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                        <p className="text-sm text-teal-800">
                            🏥 Highlight interdisciplinary collaboration experiences
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AISuggestions
