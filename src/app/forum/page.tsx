"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Send, Plus, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ForumPost {
  id: number;
  author: string;
  title: string;
  content: string;
  category: string;
  votes: number;
  replies: number;
  timestamp: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  author: string;
  content: string;
  votes: number;
  timestamp: string;
}

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 1,
      author: "Carlos Silva",
      title: "Compressor não liga após troca de capacitor",
      content: "Troquei o capacitor de um split 12.000 BTUs mas o compressor continua sem ligar. Já verifiquei a tensão e está normal. Alguém já passou por isso?",
      category: "Compressor",
      votes: 15,
      replies: 8,
      timestamp: "há 2 horas",
      answers: [
        {
          id: 1,
          author: "João Técnico",
          content: "Verifique se o protetor térmico não está atuado. Às vezes ele demora para resetar.",
          votes: 12,
          timestamp: "há 1 hora"
        },
        {
          id: 2,
          author: "Maria Santos",
          content: "Pode ser a placa eletrônica também. Teste se está chegando comando no compressor.",
          votes: 8,
          timestamp: "há 45 min"
        }
      ]
    },
    {
      id: 2,
      author: "Pedro Oliveira",
      title: "Melhor método para localizar vazamento em tubulação embutida",
      content: "Preciso localizar um vazamento em uma tubulação que está embutida na parede. Qual o melhor método vocês recomendam? Nitrogênio com detector ou gás traçador?",
      category: "Vazamento",
      votes: 23,
      replies: 12,
      timestamp: "há 5 horas",
      answers: []
    },
    {
      id: 3,
      author: "Ana Costa",
      title: "Dica: Limpeza de evaporadora sem remover do local",
      content: "Pessoal, descobri um método eficiente para limpar evaporadora sem precisar remover. Uso um pulverizador com detergente específico e cubro a parede com plástico. Resultado excelente!",
      category: "Manutenção",
      votes: 45,
      replies: 20,
      timestamp: "há 1 dia",
      answers: []
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleVote = (postId: number, increment: boolean) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, votes: post.votes + (increment ? 1 : -1) }
        : post
    ));
  };

  const handleAnswerVote = (postId: number, answerId: number, increment: boolean) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            answers: post.answers.map(answer =>
              answer.id === answerId
                ? { ...answer, votes: answer.votes + (increment ? 1 : -1) }
                : answer
            )
          }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPostTitle && newPostContent && newPostCategory) {
      const newPost: ForumPost = {
        id: posts.length + 1,
        author: "Você",
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        votes: 0,
        replies: 0,
        timestamp: "agora",
        answers: []
      };
      setPosts([newPost, ...posts]);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostCategory("");
    }
  };

  const handleAddAnswer = () => {
    if (selectedPost && newAnswer) {
      const newAnswerObj: Answer = {
        id: selectedPost.answers.length + 1,
        author: "Você",
        content: newAnswer,
        votes: 0,
        timestamp: "agora"
      };
      
      setPosts(posts.map(post =>
        post.id === selectedPost.id
          ? { ...post, answers: [...post.answers, newAnswerObj], replies: post.replies + 1 }
          : post
      ));
      
      setNewAnswer("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Fórum Técnico</h2>
          <p className="text-gray-600">Compartilhe experiências e tire dúvidas com outros profissionais</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Pergunta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Pergunta</DialogTitle>
              <DialogDescription>
                Compartilhe sua dúvida ou experiência com a comunidade
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Descreva brevemente sua dúvida..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  placeholder="Ex: Compressor, Vazamento, Elétrica..."
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="content">Descrição Detalhada</Label>
                <Textarea
                  id="content"
                  placeholder="Descreva o problema em detalhes..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={6}
                />
              </div>
              <Button 
                onClick={handleCreatePost}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Publicar Pergunta
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader onClick={() => setSelectedPost(post)}>
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-800">{post.author}</span>
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.timestamp}
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <CardDescription className="text-base">{post.content}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(post.id, true);
                    }}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-lg">{post.votes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(post.id, false);
                    }}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.replies} respostas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de Respostas */}
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    {selectedPost.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedPost.author}</p>
                  <p className="text-sm text-gray-500">{selectedPost.timestamp}</p>
                </div>
                <Badge variant="outline">{selectedPost.category}</Badge>
              </div>
              <DialogTitle className="text-2xl">{selectedPost.title}</DialogTitle>
              <DialogDescription className="text-base pt-2">
                {selectedPost.content}
              </DialogDescription>
            </DialogHeader>

            {/* Respostas */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">{selectedPost.answers.length} Respostas</h3>
              
              {selectedPost.answers.map((answer) => (
                <Card key={answer.id} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                          {answer.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{answer.author}</span>
                          <span className="text-xs text-gray-500">{answer.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{answer.content}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-11">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAnswerVote(selectedPost.id, answer.id, true)}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-semibold">{answer.votes}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAnswerVote(selectedPost.id, answer.id, false)}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Nova Resposta */}
              <Card className="border-2 border-blue-200">
                <CardContent className="pt-6">
                  <Label htmlFor="new-answer" className="text-base font-semibold mb-2 block">
                    Sua Resposta
                  </Label>
                  <Textarea
                    id="new-answer"
                    placeholder="Compartilhe sua experiência ou solução..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    rows={4}
                    className="mb-3"
                  />
                  <Button 
                    onClick={handleAddAnswer}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Resposta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
