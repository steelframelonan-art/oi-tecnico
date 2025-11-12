"use client";

import { useState } from "react";
import { Users, Plus, Phone, Mail, MapPin, Calendar, Wrench, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  servicos: Servico[];
}

interface Servico {
  id: number;
  data: string;
  tipo: string;
  equipamento: string;
  descricao: string;
  valor: string;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao@email.com",
      endereco: "Rua das Flores, 123 - São Paulo/SP",
      servicos: [
        {
          id: 1,
          data: "15/01/2024",
          tipo: "Manutenção Preventiva",
          equipamento: "Split 12.000 BTUs LG",
          descricao: "Limpeza completa e recarga de gás",
          valor: "R$ 250,00"
        },
        {
          id: 2,
          data: "10/12/2023",
          tipo: "Instalação",
          equipamento: "Split 12.000 BTUs LG",
          descricao: "Instalação de novo equipamento",
          valor: "R$ 450,00"
        }
      ]
    },
    {
      id: 2,
      nome: "Maria Santos",
      telefone: "(11) 91234-5678",
      email: "maria@email.com",
      endereco: "Av. Paulista, 1000 - São Paulo/SP",
      servicos: [
        {
          id: 1,
          data: "20/01/2024",
          tipo: "Reparo",
          equipamento: "Split 18.000 BTUs Samsung",
          descricao: "Troca de compressor",
          valor: "R$ 800,00"
        }
      ]
    }
  ]);

  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isAddingCliente, setIsAddingCliente] = useState(false);
  const [isAddingServico, setIsAddingServico] = useState(false);

  // Form states
  const [novoNome, setNovoNome] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoEndereco, setNovoEndereco] = useState("");

  const [novoServicoData, setNovoServicoData] = useState("");
  const [novoServicoTipo, setNovoServicoTipo] = useState("");
  const [novoServicoEquipamento, setNovoServicoEquipamento] = useState("");
  const [novoServicoDescricao, setNovoServicoDescricao] = useState("");
  const [novoServicoValor, setNovoServicoValor] = useState("");

  const handleAddCliente = () => {
    if (novoNome && novoTelefone) {
      const novoCliente: Cliente = {
        id: clientes.length + 1,
        nome: novoNome,
        telefone: novoTelefone,
        email: novoEmail,
        endereco: novoEndereco,
        servicos: []
      };
      setClientes([...clientes, novoCliente]);
      setNovoNome("");
      setNovoTelefone("");
      setNovoEmail("");
      setNovoEndereco("");
      setIsAddingCliente(false);
    }
  };

  const handleAddServico = () => {
    if (selectedCliente && novoServicoData && novoServicoTipo) {
      const novoServico: Servico = {
        id: selectedCliente.servicos.length + 1,
        data: novoServicoData,
        tipo: novoServicoTipo,
        equipamento: novoServicoEquipamento,
        descricao: novoServicoDescricao,
        valor: novoServicoValor
      };

      setClientes(clientes.map(cliente =>
        cliente.id === selectedCliente.id
          ? { ...cliente, servicos: [...cliente.servicos, novoServico] }
          : cliente
      ));

      setNovoServicoData("");
      setNovoServicoTipo("");
      setNovoServicoEquipamento("");
      setNovoServicoDescricao("");
      setNovoServicoValor("");
      setIsAddingServico(false);
    }
  };

  const handleDeleteCliente = (id: number) => {
    setClientes(clientes.filter(c => c.id !== id));
    setSelectedCliente(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Gestão de Clientes</h2>
          <p className="text-gray-600">Gerencie seus clientes e histórico de serviços</p>
        </div>

        <Dialog open={isAddingCliente} onOpenChange={setIsAddingCliente}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do cliente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  placeholder="Nome do cliente"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cliente@email.com"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Textarea
                  id="endereco"
                  placeholder="Rua, número, bairro, cidade/estado"
                  value={novoEndereco}
                  onChange={(e) => setNovoEndereco(e.target.value)}
                  rows={3}
                />
              </div>
              <Button 
                onClick={handleAddCliente}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
              >
                Cadastrar Cliente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Clientes */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Clientes ({clientes.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {clientes.map((cliente) => (
                <Card
                  key={cliente.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCliente?.id === cliente.id ? 'border-2 border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedCliente(cliente)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
                          {cliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{cliente.nome}</p>
                        <p className="text-sm text-gray-600">{cliente.telefone}</p>
                      </div>
                      <Badge variant="outline">{cliente.servicos.length}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {clientes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Nenhum cliente cadastrado</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detalhes do Cliente */}
        <div className="lg:col-span-2">
          {selectedCliente ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-xl">
                        {selectedCliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{selectedCliente.nome}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        Cliente desde {selectedCliente.servicos[selectedCliente.servicos.length - 1]?.data || 'hoje'}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteCliente(selectedCliente.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="info">Informações</TabsTrigger>
                    <TabsTrigger value="servicos">
                      Histórico ({selectedCliente.servicos.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Telefone</p>
                          <p className="font-semibold">{selectedCliente.telefone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">E-mail</p>
                          <p className="font-semibold">{selectedCliente.email || 'Não informado'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Endereço</p>
                        <p className="font-semibold">{selectedCliente.endereco || 'Não informado'}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="servicos" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Histórico de Serviços</h3>
                      <Dialog open={isAddingServico} onOpenChange={setIsAddingServico}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Serviço
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Registrar Novo Serviço</DialogTitle>
                            <DialogDescription>
                              Adicione um serviço ao histórico do cliente
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="data">Data *</Label>
                              <Input
                                id="data"
                                type="date"
                                value={novoServicoData}
                                onChange={(e) => setNovoServicoData(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="tipo">Tipo de Serviço *</Label>
                              <Input
                                id="tipo"
                                placeholder="Ex: Manutenção, Instalação, Reparo"
                                value={novoServicoTipo}
                                onChange={(e) => setNovoServicoTipo(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="equipamento">Equipamento</Label>
                              <Input
                                id="equipamento"
                                placeholder="Ex: Split 12.000 BTUs LG"
                                value={novoServicoEquipamento}
                                onChange={(e) => setNovoServicoEquipamento(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="descricao">Descrição</Label>
                              <Textarea
                                id="descricao"
                                placeholder="Descreva o serviço realizado"
                                value={novoServicoDescricao}
                                onChange={(e) => setNovoServicoDescricao(e.target.value)}
                                rows={3}
                              />
                            </div>
                            <div>
                              <Label htmlFor="valor">Valor</Label>
                              <Input
                                id="valor"
                                placeholder="R$ 0,00"
                                value={novoServicoValor}
                                onChange={(e) => setNovoServicoValor(e.target.value)}
                              />
                            </div>
                            <Button 
                              onClick={handleAddServico}
                              className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                            >
                              Registrar Serviço
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-3">
                      {selectedCliente.servicos.map((servico) => (
                        <Card key={servico.id} className="bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Wrench className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold">{servico.tipo}</span>
                              </div>
                              <Badge variant="outline">{servico.valor}</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <span>{servico.data}</span>
                              </div>
                              {servico.equipamento && (
                                <p className="font-medium text-gray-700">{servico.equipamento}</p>
                              )}
                              {servico.descricao && (
                                <p>{servico.descricao}</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {selectedCliente.servicos.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Wrench className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <p>Nenhum serviço registrado</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-24 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Selecione um cliente para ver os detalhes</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
