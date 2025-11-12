"use client";

import { useState } from "react";
import { Search, Wrench, Calculator, BookOpen, Users, MessageSquare, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginPage from "./login/page";
import CodigosErro from "./codigos-erro/page";
import Forum from "./forum/page";
import Calculadora from "./calculadora/page";
import Manuais from "./manuais/page";
import Clientes from "./clientes/page";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="w-8 h-8" />
              <h1 className="text-3xl font-bold">OI TÉCNICO</h1>
            </div>
            <Button 
              variant="outline" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => setIsLoggedIn(false)}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
          <p className="text-blue-100 mt-2">Seu assistente completo para refrigeração e ar condicionado</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-0">
              <TabsTrigger 
                value="home" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-4"
              >
                <Search className="w-4 h-4 mr-2" />
                Início
              </TabsTrigger>
              <TabsTrigger 
                value="codigos" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-4"
              >
                <Wrench className="w-4 h-4 mr-2" />
                Códigos de Erro
              </TabsTrigger>
              <TabsTrigger 
                value="forum" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-4"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Fórum
              </TabsTrigger>
              <TabsTrigger 
                value="calculadora" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-4"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculadora
              </TabsTrigger>
              <TabsTrigger 
                value="manuais" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-4"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Manuais
              </TabsTrigger>
              <TabsTrigger 
                value="clientes" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-4"
              >
                <Users className="w-4 h-4 mr-2" />
                Clientes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="mt-0">
              <HomeContent />
            </TabsContent>

            <TabsContent value="codigos" className="mt-0">
              <CodigosErro />
            </TabsContent>

            <TabsContent value="forum" className="mt-0">
              <Forum />
            </TabsContent>

            <TabsContent value="calculadora" className="mt-0">
              <Calculadora />
            </TabsContent>

            <TabsContent value="manuais" className="mt-0">
              <Manuais />
            </TabsContent>

            <TabsContent value="clientes" className="mt-0">
              <Clientes />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function HomeContent() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <Card className="mb-8 shadow-lg border-2 border-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">Buscar Soluções</CardTitle>
          <CardDescription>Digite o código de erro ou problema para encontrar soluções</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Ex: E1, E2, vazamento, compressor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg"
            />
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-2">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <CardTitle>Códigos de Erro</CardTitle>
            <CardDescription>Consulte códigos de todas as marcas com ilustrações</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-2">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <CardTitle>Fórum Técnico</CardTitle>
            <CardDescription>Troque experiências com outros profissionais</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-2">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <CardTitle>Calculadora Técnica</CardTitle>
            <CardDescription>Calcule carga de gás, perda de carga e conversões</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <CardTitle>Manuais Técnicos</CardTitle>
            <CardDescription>Acesse manuais em PDF para download</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <CardTitle>Gestão de Clientes</CardTitle>
            <CardDescription>Gerencie seus clientes e histórico de serviços</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
