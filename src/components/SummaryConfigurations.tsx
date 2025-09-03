import { Button } from './ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Settings } from 'lucide-react';

interface ISummaryConfigurationProps {
    useBullets: boolean,
    setUseBullets: React.Dispatch< React.SetStateAction< boolean > >,
    abstractionLevel: string,
    setAbstractionLevel: React.Dispatch< React.SetStateAction< string > >,

};

const SummaryConfigurations = ( { useBullets, setUseBullets, abstractionLevel, setAbstractionLevel } : ISummaryConfigurationProps ) => {
    return (
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg text-slate-700">Summary Settings</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Format Options */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Format Style</Label>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="bullets" className="text-sm text-slate-600">Use Bullet Points</Label>
                        <Switch
                            id="bullets"
                            checked={useBullets}
                            onCheckedChange={setUseBullets}
                        />
                    </div>
                </div>

                <Separator />

                {/* Abstraction Level */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Detail Level</Label>
                    <Select value={abstractionLevel} onValueChange={setAbstractionLevel}>
                        <SelectTrigger className="bg-slate-50/50">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="concise">Concise</SelectItem>
                            <SelectItem value="detailed">Detailed</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                {/* Version Management */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Summary Version</Label>
                    <div className="flex gap-2">
                        <Select value={'1'} onValueChange={() => null}>
                            <SelectTrigger className="bg-slate-50/50">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Version 1.0</SelectItem>
                                <SelectItem value="2">Version 1.1</SelectItem>
                                <SelectItem value="3">Version 2.0</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SummaryConfigurations
