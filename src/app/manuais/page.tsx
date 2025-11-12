"use client";

import { useState } from "react";
import { BookOpen, Download, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Manual {
  id: number;
  title: string;
  brand: string;
  category: string;
  size: string;
  pages: number;
  isFavorite: boolean;
}

export default function Manuais() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [manuais, setManuais] = useState<Manual[]>([
    {
      id: 1,
      title: "Manual Técnico Split 9.000 a 24.000 BTUs",
      brand: "LG",
      category: "Split",
      size: "2.5 MB",
      pages: 48,
      isFavorite: false
    },
    {
      id: 2,
      title: "Guia de Instalação e Manutenção - Linha Inverter",
      brand: "Samsung",
      category: "Inverter",
      size: "3.8 MB",
      pages: 62,
      isFavorite: true
    },
    {
      id: 3,
      title: "Manual de Serviço - VRF Multi V",
      brand: "LG",
      category: "VRF",
      size: "5.2 MB",
      pages: 124,
      isFavorite: false
    },
    {
      id: 4,
      title: "Códigos de Erro e Diagnóstico",
      brand: "Midea",
      category: "Diagnóstico",
      size: "1.8 MB",
      pages: 32,
      isFavorite: true
    },
    {
      id: 5,
      title: "Manual Técnico Cassete 4 Vias",
      brand: "Gree",
      category: "Cassete",
      size: "4.1 MB",
      pages: 56,
      isFavorite: false
    },
    {
      id: 6,
      title: "Instalação e Manutenção - Piso Teto",
      brand: "Carrier",
      category: "Piso Teto",
      size: "3.3 MB",
      pages: 44,
      isFavorite: false
    },
    {
      id: 7,
      title: "Manual de Serviço - Sky Air",
      brand: "Daikin",
      category: "Multi Split",
      size: "6.7 MB",
      pages: 98,
      isFavorite: true
    },
    {
      id: 8,
      title: "Guia Rápido de Troubleshooting",
      brand: "Midea",
      category: "Diagnóstico",
      size: "1.2 MB",
      pages: 24,
      isFavorite: false
    }
  ]);

  const brands = ["all", ...Array.from(new Set(manuais.map(m => m.brand)))];
  const categories = ["all", ...Array.from(new Set(manuais.map(m => m.category)))];

  const toggleFavorite = (id: number) => {
    setManuais(manuais.map(manual =>
      manual.id === id ? { ...manual, isFavorite: !manual.isFavorite } : manual
    ));
  };

  const filteredManuais = manuais.filter(manual => {
    const matchesSearch = 
      manual.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manual.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manual.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = selectedBrand === "all" || manual.brand === selectedBrand;
    const matchesCategory = selectedCategory === "all" || manual.category === selectedCategory;
    
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const favoritos = manuais.filter(m => m.isFavorite);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manuais Técnicos</h2>
        <p className="text-gray-600">Acesse e baixe manuais de equipamentos em PDF</p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Buscar manuais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger>
            <SelectValue placeholder="Marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Marcas</SelectItem>
            {brands.filter(b => b !== "all").map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            {categories.filter(c => c !== "all").map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Favoritos */}
      {favoritos.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Meus Favoritos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoritos.map((manual) => (
              <Card key={manual.id} className="hover:shadow-lg transition-shadow border-2 border-yellow-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{manual.brand}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(manual.id)}
                    >
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg">{manual.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span>{manual.pages} páginas</span>
                      <span>{manual.size}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Todos os Manuais */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Todos os Manuais ({filteredManuais.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredManuais.map((manual) => (
            <Card key={manual.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex gap-2">
                    <Badge variant="outline">{manual.brand}</Badge>
                    <Badge className="bg-blue-100 text-blue-700">{manual.category}</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(manual.id)}
                  >
                    <Star 
                      className={`w-4 h-4 ${manual.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} 
                    />
                  </Button>
                </div>
                <CardTitle className="text-lg">{manual.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>{manual.pages} páginas</span>
                    <span>{manual.size}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredManuais.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum manual encontrado</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
