"use client";

import { useState } from "react";
import { Search, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Dados de exemplo de códigos de erro
const errorCodes = [
  {
    id: 1,
    brand: "LG",
    code: "E1",
    title: "Erro de Sensor de Temperatura Interna",
    severity: "medium",
    causes: [
      "Sensor de temperatura desconectado ou danificado",
      "Fiação com mau contato",
      "Placa eletrônica com defeito"
    ],
    solutions: [
      "Verificar conexão do sensor na placa",
      "Medir resistência do sensor (deve estar entre 5-20kΩ)",
      "Substituir sensor se necessário",
      "Verificar trilhas da placa eletrônica"
    ]
  },
  {
    id: 2,
    brand: "Samsung",
    code: "E2",
    title: "Erro de Sensor de Temperatura Externa",
    severity: "medium",
    causes: [
      "Sensor externo com defeito",
      "Cabo rompido entre unidades",
      "Oxidação nos conectores"
    ],
    solutions: [
      "Testar continuidade do cabo",
      "Limpar conectores com spray limpa contatos",
      "Substituir sensor externo",
      "Verificar se há água nos conectores"
    ]
  },
  {
    id: 3,
    brand: "Midea",
    code: "E3",
    title: "Proteção de Alta Pressão",
    severity: "high",
    causes: [
      "Condensador sujo ou obstruído",
      "Ventilador externo não funciona",
      "Excesso de gás refrigerante",
      "Ambiente externo muito quente"
    ],
    solutions: [
      "Limpar serpentina do condensador",
      "Verificar funcionamento do ventilador",
      "Medir pressão e ajustar carga de gás",
      "Verificar capacitor do ventilador"
    ]
  },
  {
    id: 4,
    brand: "Gree",
    code: "E4",
    title: "Proteção de Baixa Pressão",
    severity: "high",
    causes: [
      "Falta de gás refrigerante",
      "Vazamento no sistema",
      "Filtro secador entupido",
      "Válvula de expansão com problema"
    ],
    solutions: [
      "Localizar e reparar vazamentos",
      "Fazer vácuo e recarregar sistema",
      "Substituir filtro secador",
      "Verificar válvula de expansão"
    ]
  },
  {
    id: 5,
    brand: "Carrier",
    code: "E5",
    title: "Erro de Comunicação",
    severity: "medium",
    causes: [
      "Cabo de comunicação danificado",
      "Interferência eletromagnética",
      "Placa eletrônica com defeito",
      "Conexões soltas"
    ],
    solutions: [
      "Verificar cabo de comunicação",
      "Afastar cabos de força de cabos de sinal",
      "Reapertar todas as conexões",
      "Testar placas eletrônicas"
    ]
  },
  {
    id: 6,
    brand: "Daikin",
    code: "E6",
    title: "Proteção do Compressor",
    severity: "critical",
    causes: [
      "Compressor travado",
      "Sobrecarga elétrica",
      "Falta de fase",
      "Capacitor de partida queimado"
    ],
    solutions: [
      "Verificar tensão de alimentação",
      "Testar capacitor de partida",
      "Medir corrente do compressor",
      "Verificar se compressor está travado"
    ]
  }
];

export default function CodigosErro() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const brands = ["all", ...Array.from(new Set(errorCodes.map(code => code.brand)))];

  const filteredCodes = errorCodes.filter(code => {
    const matchesSearch = 
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.causes.some(cause => cause.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesBrand = selectedBrand === "all" || code.brand === selectedBrand;
    
    return matchesSearch && matchesBrand;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      default: return "bg-blue-500";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <XCircle className="w-5 h-5" />;
      case "high": return <AlertCircle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Códigos de Erro</h2>
        <p className="text-gray-600">Consulte códigos de erro de todas as marcas com causas e soluções detalhadas</p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Buscar por código, problema ou solução..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Marcas</SelectItem>
            {brands.filter(b => b !== "all").map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Códigos */}
      <div className="space-y-4">
        {filteredCodes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum código de erro encontrado</p>
            </CardContent>
          </Card>
        ) : (
          filteredCodes.map((error) => (
            <Card key={error.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`${getSeverityColor(error.severity)} text-white`}>
                        {error.code}
                      </Badge>
                      <Badge variant="outline">{error.brand}</Badge>
                      <div className="flex items-center gap-1 text-gray-600">
                        {getSeverityIcon(error.severity)}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{error.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="causes">
                    <AccordionTrigger className="text-lg font-semibold">
                      Possíveis Causas
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {error.causes.map((cause, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="solutions">
                    <AccordionTrigger className="text-lg font-semibold">
                      Soluções Recomendadas
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {error.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
