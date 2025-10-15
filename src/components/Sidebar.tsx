import { Award, BookOpen, Brain, Calendar, Clock, Download, FileText, GraduationCap, HelpCircle, Save, Stethoscope } from 'lucide-react';
import React, { useState } from 'react'
import { Badge } from './ui/badge';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';


const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch( "http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include"
      } )

      localStorage.removeItem( "token" );
      localStorage.removeItem( "user_id" );
      navigate( "/login" );
    } catch (error) {
      console.error( "sidebar.logout: error logging out: ", error );
    }
  }

return (
    <>
    {/* Left Sidebar - Profile & Features */}
      <div className="w-80 bg-white/30 backdrop-blur-md border-r border-white/20 flex flex-col">
        {/* Profile Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-2 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                MedSummary AI
              </h1>
              <p className="text-xs text-slate-500">Criador de Resumos Médicos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Connected
            </Badge>
            
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/20">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'profile' 
                ? 'text-teal-600 border-b-2 border-teal-500 bg-white/20' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('features')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'features' 
                ? 'text-teal-600 border-b-2 border-teal-500 bg-white/20' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Features
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* User Profile Card */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-lg font-semibold">
                      CG
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg text-slate-700">Estudante de Medicina</CardTitle>
                  <Button 
                    className='bg-red-400 hover:bg-red-500 hover:cursor-pointer'
                    onClick={() => logout()}
                  >Sair</Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <GraduationCap className="w-4 h-4" />
                    <span>Universidade de Medicina</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>Ano de Formatura: 2028</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Stethoscope className="w-4 h-4" />
                    <span>Residência desejada: Cirugia</span>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Progress */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Academic Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Clinical Rotations</span>
                      <span className="text-teal-600 font-medium">6/12</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Research Papers</span>
                      <span className="text-blue-600 font-medium">3</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Conferences</span>
                      <span className="text-purple-600 font-medium">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-slate-700">Surgery rotation summary created</p>
                        <p className="text-slate-500 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-slate-700">Research experience summarized</p>
                        <p className="text-slate-500 text-xs">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-slate-700">Clinical skills assessment</p>
                        <p className="text-slate-500 text-xs">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              {/* Question Generator */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-base text-slate-700">Question Generator</CardTitle>
                  </div>
                  <CardDescription>Generate study questions from your summaries</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" size="sm">
                    Generate Questions
                  </Button>
                  <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-700">
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>

              {/* Study Guide Creator */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-base text-slate-700">Study Guide Creator</CardTitle>
                  </div>
                  <CardDescription>Create structured study guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" size="sm" disabled>
                    Create Study Guide
                  </Button>
                  <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-700">
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>

              {/* Summary Templates */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <CardTitle className="text-base text-slate-700">Summary Templates</CardTitle>
                  </div>
                  <CardDescription>Pre-built templates for different medical topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      Clinical Rotation
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      Research Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-base text-slate-700">Export & Share</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Word
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      </>
  )
}

export default Sidebar
