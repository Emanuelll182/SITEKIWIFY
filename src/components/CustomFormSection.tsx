import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Shield, Clock, Users } from "lucide-react";

const LeadForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    whatsapp: "",
    canal: "",
    objetivo: "",
    detalhes: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.empresa || !formData.whatsapp || !formData.canal || !formData.objetivo) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://webhook.kecs.com.br/webhook/coleta-formularios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Erro ao enviar para o webhook');

      toast({
        title: "Proposta solicitada com sucesso!",
        description: "Nossa equipe entrará em contato em até 24 horas.",
      });

      setFormData({
        nome: "",
        empresa: "",
        whatsapp: "",
        canal: "",
        objetivo: "",
        detalhes: ""
      });

    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="formulario" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Solicite sua Proposta
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conte-nos sobre seu negócio e receba uma proposta personalizada 
              para automatizar seus processos com inteligência artificial.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Resposta em 24h</h3>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe analisa sua necessidade e retorna rapidamente com uma proposta detalhada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Consultoria Gratuita</h3>
                  <p className="text-sm text-muted-foreground">
                    Primeira consultoria sem custo para entender suas necessidades e propor soluções.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Suporte Dedicado</h3>
                  <p className="text-sm text-muted-foreground">
                    Acompanhamento completo desde o planejamento até a implementação das automações.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Fale com nossos especialistas</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e receba uma proposta personalizada para sua empresa.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo *</Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => handleInputChange("nome", e.target.value)}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="empresa">Empresa *</Label>
                        <Input
                          id="empresa"
                          value={formData.empresa}
                          onChange={(e) => handleInputChange("empresa", e.target.value)}
                          placeholder="Nome da sua empresa"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp *</Label>
                      <Input
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="canal">Canal que deseja automatizar *</Label>
                      <select
                        id="canal"
                        className="w-full px-4 py-2 border rounded-md bg-background text-foreground"
                        value={formData.canal}
                        onChange={(e) => handleInputChange("canal", e.target.value)}
                        required
                      >
                        <option value="">Selecione o canal</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telegram">Telegram</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="email">E-mail</option>
                        <option value="site">Site/Landing Page</option>
                        <option value="multiplos">Múltiplos canais</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="objetivo">Objetivo da automação *</Label>
                      <select
                        id="objetivo"
                        className="w-full px-4 py-2 border rounded-md bg-background text-foreground"
                        value={formData.objetivo}
                        onChange={(e) => handleInputChange("objetivo", e.target.value)}
                        required
                      >
                        <option value="">Selecione o objetivo</option>
                        <option value="vendas">Aumentar vendas</option>
                        <option value="agendamento">Automatizar agendamentos</option>
                        <option value="atendimento">Melhorar atendimento</option>
                        <option value="leads">Captar e qualificar leads</option>
                        <option value="suporte">Suporte ao cliente</option>
                        <option value="integracao">Integrar sistemas</option>
                        <option value="outros">Outros processos</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="detalhes">Detalhes adicionais (opcional)</Label>
                      <Textarea
                        id="detalhes"
                        value={formData.detalhes}
                        onChange={(e) => handleInputChange("detalhes", e.target.value)}
                        placeholder="Conte-nos mais sobre sua necessidade, volume de clientes, processos atuais, etc."
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Enviando..."
                      ) : (
                        <>
                          Solicitar Proposta
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Ao enviar este formulário, você concorda com nossa Política de Privacidade 
                      e autoriza o contato de nossa equipe.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
