import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBotChat, setShowBotChat] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Como posso ajudá-lo com automações de IA?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("tipo_contato", "chat_suporte");

    try {
      const response = await fetch("https://webhook.kecs.com.br/webhook/coleta-formularios", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Nossa equipe entrará em contato pelo WhatsApp em breve.",
        });
        form.reset();
        setShowForm(false);
      } else {
        throw new Error("Erro no envio");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendMessageToBot = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://webhook.kecs.com.br/webhook/chat-bot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputMessage }),
        }
      );

      const data = await response.json();

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Erro ao se comunicar com o chatbot.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessageToBot();
  };

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 z-50 glow-card bg-card/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-3 h-3 bg-cta rounded-full animate-pulse"></div>
                Chat de Suporte
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-6 w-6">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {!showForm ? (
              <>
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <p className="text-sm text-foreground">
                    👋 Olá! Como posso ajudar você hoje?
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    className="w-full text-left p-2 rounded-lg bg-background hover:bg-muted transition-colors text-sm"
                    onClick={() => setShowForm(true)}
                  >
                    💬 Falar com o suporte
                  </button>

                  <button
                    className="w-full text-left p-2 rounded-lg bg-background hover:bg-muted transition-colors text-sm"
                    onClick={() => {
                      const element = document.getElementById("formulario");
                      element?.scrollIntoView({ behavior: "smooth" });
                      setIsOpen(false);
                    }}
                  >
                    🔧 Quero um workflow personalizado
                  </button>

                  <button
                    className="w-full text-left p-2 rounded-lg bg-background hover:bg-muted transition-colors text-sm"
                    onClick={() => window.open("https://wa.me/554797681119", "_blank")}
                  >
                    📱 Falar direto no WhatsApp
                  </button>

                  <button
                    className="w-full text-left p-2 rounded-lg bg-background hover:bg-muted transition-colors text-sm"
                    onClick={() => setShowBotChat(true)}
                  >
                    🤖 Falar com atendente virtual
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="space-y-2">
                  <Input name="nome" placeholder="Seu nome" required className="bg-background/50" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Seu e-mail"
                    required
                    className="bg-background/50"
                  />
                  <Input
                    name="número de whatsapp"
                    type="tel"
                    placeholder="Seu número de WhatsApp"
                    required
                    className="bg-background/50"
                  />
                  <Textarea
                    name="descricao"
                    placeholder="Digite sua mensagem..."
                    required
                    rows={3}
                    className="bg-background/50 resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    variant="cta"
                    size="sm"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                    ) : (
                      <Send className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      <button id="toggleChat" onClick={toggleChat} className="floating-chat group" aria-label="Abrir chat de suporte"
      data-tutorial-target="floating-chat">
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cta rounded-full border-2 border-background animate-pulse"></div>
      </button>

      {/* Dialog do Atendente Virtual */}
      <Dialog open={showBotChat} onOpenChange={setShowBotChat}>
        <DialogContent className="max-w-md h-[500px] flex flex-col p-0">
          <DialogHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-foreground">
                Chat - Atendente Virtual
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowBotChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={loading}
              />
              <Button onClick={sendMessageToBot} size="sm" disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChat;
