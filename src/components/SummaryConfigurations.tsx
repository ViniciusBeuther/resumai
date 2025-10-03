import { Button } from './ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { CircleQuestionMarkIcon, RefreshCw, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface ISummaryConfigurationProps {
    useBullets: boolean;
    setUseBullets: React.Dispatch<React.SetStateAction<boolean>>;
    useEmojis: boolean;
    setUseEmojis: React.Dispatch<React.SetStateAction<boolean>>;
    useTitleLevels: boolean;
    setUseTitleLevels: React.Dispatch<React.SetStateAction<boolean>>;
    abstractionLevel: string;
    setAbstractionLevel: React.Dispatch<React.SetStateAction<string>>;
}

const SummaryConfigurations = ({ 
    useBullets, 
    setUseBullets, 
    useEmojis,
    setUseEmojis,
    useTitleLevels,
    setUseTitleLevels,
    abstractionLevel, 
    setAbstractionLevel 
}: ISummaryConfigurationProps) => {
    return (
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg text-slate-700">Configurações do Resumo</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Format Options */}
                <div className="space-y-4">
                    <Label className="text-sm font-bold text-slate-700">Ajustes de Formato</Label>
                    
                    {/* Use Bullets */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col">
                            <Label htmlFor="bullets" className="text-sm font-medium text-slate-700 cursor-pointer">
                                Usar Bullet Points
                            </Label>
                            <span className="text-xs text-slate-500">
                                Lista com marcadores (•) ao invés de parágrafos
                            </span>
                        </div>
                        <Switch
                            id="bullets"
                            checked={useBullets}
                            onCheckedChange={setUseBullets}
                        />
                    </div>

                    {/* Use Emojis */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col">
                            <Label htmlFor="emojis" className="text-sm font-medium text-slate-700 cursor-pointer">
                                Usar Emojis
                            </Label>
                            <span className="text-xs text-slate-500">
                                Adicionar emojis nos títulos das seções
                            </span>
                        </div>
                        <Switch
                            id="emojis"
                            checked={useEmojis}
                            onCheckedChange={setUseEmojis}
                        />
                    </div>

                    {/* Use Title Levels */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col flex-1">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="title-levels" className="text-sm font-medium text-slate-700 cursor-pointer">
                                    Incluir Níveis de Título
                                </Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button 
                                            type="button" 
                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                            aria-label="Mais informações"
                                        >
                                            <CircleQuestionMarkIcon className="w-4 h-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="select-none bg-gray-800 text-white px-3 py-2 text-sm rounded-lg max-w-xs">
                                        <p>Adicionar títulos e subtítulos com diferentes tamanhos (H1, H2, H3) para melhor organização.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <span className="text-xs text-slate-500">
                                Hierarquia de títulos (H1, H2, H3)
                            </span>
                        </div>
                        <Switch
                            id="title-levels"
                            checked={useTitleLevels}
                            onCheckedChange={setUseTitleLevels}
                        />
                    </div>
                </div>

                <Separator />

                {/* Abstraction Level */}
                <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700">Nível de Detalhamento</Label>
                    <Select value={abstractionLevel} onValueChange={setAbstractionLevel}>
                        <SelectTrigger className="bg-slate-50/50">
                            <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="resumido">
                                <div className="flex flex-col">
                                    <span className="font-medium">Resumido</span>
                                    <span className="text-xs text-slate-500">5-8 pontos principais</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="moderado">
                                <div className="flex flex-col">
                                    <span className="font-medium">Moderado</span>
                                    <span className="text-xs text-slate-500">10-15 pontos principais</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="detalhado">
                                <div className="flex flex-col">
                                    <span className="font-medium">Detalhado</span>
                                    <span className="text-xs text-slate-500">15-25 pontos principais</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="completo">
                                <div className="flex flex-col">
                                    <span className="font-medium">Completo</span>
                                    <span className="text-xs text-slate-500">25+ pontos principais</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                {/* Version Management */}
                <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700">Versão do Resumo</Label>
                    <div className="flex gap-2">
                        <Select value={'1'} onValueChange={() => null}>
                            <SelectTrigger className="bg-slate-50/50 flex-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Versão 1.0</SelectItem>
                                <SelectItem value="2">Versão 1.1</SelectItem>
                                <SelectItem value="3">Versão 2.0</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" className="px-3">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SummaryConfigurations;