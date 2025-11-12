"use client";

import { useState } from "react";
import { Calculator, Gauge, Ruler, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Calculadora() {
  // Carga de Gás
  const [potencia, setPotencia] = useState("");
  const [comprimentoTubulacao, setComprimentoTubulacao] = useState("");
  const [tipoGas, setTipoGas] = useState("R410A");
  const [cargaGasResult, setCargaGasResult] = useState<string | null>(null);

  // Perda de Carga
  const [diametroTubo, setDiametroTubo] = useState("");
  const [comprimentoTubo, setComprimentoTubo] = useState("");
  const [vazao, setVazao] = useState("");
  const [perdaCargaResult, setPerdaCargaResult] = useState<string | null>(null);

  // Conversão de Unidades
  const [valorConversao, setValorConversao] = useState("");
  const [tipoConversao, setTipoConversao] = useState("psi-bar");
  const [conversaoResult, setConversaoResult] = useState<string | null>(null);

  const calcularCargaGas = () => {
    const pot = parseFloat(potencia);
    const comp = parseFloat(comprimentoTubulacao);
    
    if (isNaN(pot) || isNaN(comp)) {
      setCargaGasResult("Por favor, preencha todos os campos corretamente");
      return;
    }

    // Fórmula simplificada: carga base + adicional por metro
    let cargaBase = 0;
    let adicionalPorMetro = 0;

    if (tipoGas === "R410A") {
      cargaBase = pot * 0.08; // 80g por 1000 BTUs
      adicionalPorMetro = 20; // 20g por metro adicional
    } else if (tipoGas === "R22") {
      cargaBase = pot * 0.06;
      adicionalPorMetro = 15;
    } else {
      cargaBase = pot * 0.09;
      adicionalPorMetro = 25;
    }

    const metrosAdicionais = Math.max(0, comp - 5); // Primeiros 5m inclusos
    const cargaTotal = cargaBase + (metrosAdicionais * adicionalPorMetro);

    setCargaGasResult(
      `Carga de Gás Recomendada:\n\n` +
      `• Carga Base: ${cargaBase.toFixed(0)}g\n` +
      `• Adicional (${metrosAdicionais.toFixed(1)}m): ${(metrosAdicionais * adicionalPorMetro).toFixed(0)}g\n` +
      `• TOTAL: ${cargaTotal.toFixed(0)}g (${(cargaTotal / 1000).toFixed(2)}kg)\n\n` +
      `Gás: ${tipoGas}`
    );
  };

  const calcularPerdaCarga = () => {
    const diam = parseFloat(diametroTubo);
    const comp = parseFloat(comprimentoTubo);
    const vaz = parseFloat(vazao);

    if (isNaN(diam) || isNaN(comp) || isNaN(vaz)) {
      setPerdaCargaResult("Por favor, preencha todos os campos corretamente");
      return;
    }

    // Fórmula de Darcy-Weisbach simplificada
    const velocidade = (vaz * 4) / (Math.PI * Math.pow(diam / 1000, 2));
    const perdaPorMetro = 0.02 * (velocidade * velocidade) / (2 * 9.81 * (diam / 1000));
    const perdaTotal = perdaPorMetro * comp;

    setPerdaCargaResult(
      `Resultado da Perda de Carga:\n\n` +
      `• Velocidade do fluido: ${velocidade.toFixed(2)} m/s\n` +
      `• Perda por metro: ${perdaPorMetro.toFixed(4)} bar/m\n` +
      `• Perda Total: ${perdaTotal.toFixed(3)} bar\n` +
      `• Perda Total: ${(perdaTotal * 14.5038).toFixed(2)} PSI\n\n` +
      `${velocidade > 5 ? "⚠️ Velocidade alta! Considere aumentar o diâmetro." : "✓ Velocidade adequada"}`
    );
  };

  const converterUnidade = () => {
    const valor = parseFloat(valorConversao);

    if (isNaN(valor)) {
      setConversaoResult("Por favor, insira um valor válido");
      return;
    }

    let resultado = "";

    switch (tipoConversao) {
      case "psi-bar":
        resultado = `${valor} PSI = ${(valor * 0.0689476).toFixed(4)} Bar`;
        break;
      case "bar-psi":
        resultado = `${valor} Bar = ${(valor * 14.5038).toFixed(2)} PSI`;
        break;
      case "btu-watts":
        resultado = `${valor} BTU/h = ${(valor * 0.293071).toFixed(2)} Watts`;
        break;
      case "watts-btu":
        resultado = `${valor} Watts = ${(valor * 3.41214).toFixed(2)} BTU/h`;
        break;
      case "celsius-fahrenheit":
        resultado = `${valor}°C = ${((valor * 9/5) + 32).toFixed(1)}°F`;
        break;
      case "fahrenheit-celsius":
        resultado = `${valor}°F = ${((valor - 32) * 5/9).toFixed(1)}°C`;
        break;
    }

    setConversaoResult(resultado);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Calculadora Técnica</h2>
        <p className="text-gray-600">Ferramentas de cálculo para facilitar seu trabalho</p>
      </div>

      <Tabs defaultValue="carga-gas" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="carga-gas">
            <Gauge className="w-4 h-4 mr-2" />
            Carga de Gás
          </TabsTrigger>
          <TabsTrigger value="perda-carga">
            <Ruler className="w-4 h-4 mr-2" />
            Perda de Carga
          </TabsTrigger>
          <TabsTrigger value="conversao">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Conversão
          </TabsTrigger>
        </TabsList>

        {/* Carga de Gás */}
        <TabsContent value="carga-gas">
          <Card>
            <CardHeader>
              <CardTitle>Cálculo de Carga de Gás Refrigerante</CardTitle>
              <CardDescription>
                Calcule a quantidade de gás necessária baseada na potência e comprimento da tubulação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="potencia">Potência (BTUs)</Label>
                  <Input
                    id="potencia"
                    type="number"
                    placeholder="Ex: 12000"
                    value={potencia}
                    onChange={(e) => setPotencia(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comprimento">Comprimento da Tubulação (metros)</Label>
                  <Input
                    id="comprimento"
                    type="number"
                    placeholder="Ex: 10"
                    value={comprimentoTubulacao}
                    onChange={(e) => setComprimentoTubulacao(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo-gas">Tipo de Gás</Label>
                  <Select value={tipoGas} onValueChange={setTipoGas}>
                    <SelectTrigger id="tipo-gas">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="R410A">R410A</SelectItem>
                      <SelectItem value="R22">R22</SelectItem>
                      <SelectItem value="R32">R32</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={calcularCargaGas}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular Carga
              </Button>

              {cargaGasResult && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                      {cargaGasResult}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Perda de Carga */}
        <TabsContent value="perda-carga">
          <Card>
            <CardHeader>
              <CardTitle>Cálculo de Perda de Carga em Tubulações</CardTitle>
              <CardDescription>
                Calcule a perda de pressão em tubulações de refrigeração
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diametro">Diâmetro do Tubo (mm)</Label>
                  <Input
                    id="diametro"
                    type="number"
                    placeholder="Ex: 15.88"
                    value={diametroTubo}
                    onChange={(e) => setDiametroTubo(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comprimento-tubo">Comprimento (metros)</Label>
                  <Input
                    id="comprimento-tubo"
                    type="number"
                    placeholder="Ex: 20"
                    value={comprimentoTubo}
                    onChange={(e) => setComprimentoTubo(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vazao">Vazão (m³/h)</Label>
                  <Input
                    id="vazao"
                    type="number"
                    placeholder="Ex: 5"
                    value={vazao}
                    onChange={(e) => setVazao(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={calcularPerdaCarga}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular Perda de Carga
              </Button>

              {perdaCargaResult && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                      {perdaCargaResult}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversão de Unidades */}
        <TabsContent value="conversao">
          <Card>
            <CardHeader>
              <CardTitle>Conversão de Unidades</CardTitle>
              <CardDescription>
                Converta entre diferentes unidades de medida
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo-conversao">Tipo de Conversão</Label>
                  <Select value={tipoConversao} onValueChange={setTipoConversao}>
                    <SelectTrigger id="tipo-conversao">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="psi-bar">PSI → Bar</SelectItem>
                      <SelectItem value="bar-psi">Bar → PSI</SelectItem>
                      <SelectItem value="btu-watts">BTU/h → Watts</SelectItem>
                      <SelectItem value="watts-btu">Watts → BTU/h</SelectItem>
                      <SelectItem value="celsius-fahrenheit">°C → °F</SelectItem>
                      <SelectItem value="fahrenheit-celsius">°F → °C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor-conversao">Valor</Label>
                  <Input
                    id="valor-conversao"
                    type="number"
                    placeholder="Digite o valor"
                    value={valorConversao}
                    onChange={(e) => setValorConversao(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={converterUnidade}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Converter
              </Button>

              {conversaoResult && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <p className="text-xl font-semibold text-center text-gray-800">
                      {conversaoResult}
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
