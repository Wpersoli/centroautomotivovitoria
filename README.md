# Centro Automotivo Vitória

Landing page responsiva do Centro Automotivo Vitória, com identidade azul-marinho, vermelho e branco.

## Funcionalidades

- Hero com frases rotativas, efeitos de entrada e ilustração automotiva animada em CSS.
- Seções de serviços, apresentação da oficina, avaliações, contato e redes sociais.
- Atalhos de WhatsApp e telefone, links do Instagram e CTAs distribuídos ao longo da página.
- CTA contextual em cada cartão de serviço, formulário de solicitação que prepara uma mensagem para revisão e envio manual pelo WhatsApp.
- Assistente local de dúvidas frequentes com respostas predefinidas, sem persistência de conversas.
- Compartilhamento nativo do link com fallback para cópia, além de navegação para Google Maps e Waze.
- Menu mobile com fechamento por Escape, toque fora e mudança para desktop; skip link e foco de navegação.
- Aviso de privacidade em privacidade.html que descreve o comportamento atualmente implementado.
- Barra fixa inferior no mobile com WhatsApp e Como chegar.
- Navegação mobile com menu expansível.
- Animações acionadas por scroll com IntersectionObserver e respeito a `prefers-reduced-motion`.
- Mapa interativo com OpenStreetMap/Leaflet.
- Cálculo de rota de carro na página: pede permissão para acessar a localização, consulta o serviço de roteamento OSRM e mostra geometria do trajeto, distância e tempo estimado. O visitante também pode abrir o Google Maps para navegação passo a passo e condições de trânsito.
- Seção de reputação com nota encontrada para o perfil local (4,6/5, 12 avaliações no momento da consulta) e link para conferir as avaliações originais no Google.
- Metadados de SEO (canonical, Open Graph básico e dados estruturados `AutoRepair` com endereço, telefone e Instagram).
- Favicon SVG com a identidade visual da marca e página 404 personalizada para endereços inexistentes.
- Cabeçalhos de segurança configurados na Vercel: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` e `Permissions-Policy` compatível com a geolocalização solicitada pelo visitante.
- Foco de teclado visível e respostas do assistente anunciadas para tecnologias assistivas.
- A demonstração pré-venda está marcada com noindex,nofollow,noarchive; o sitemap está intencionalmente vazio para não submeter uma demo aos buscadores. Após a venda, revisar domínio/canonical, reativar indexação e regenerar o sitemap.
- Geocodificação do endereço adiada até o visitante solicitar uma rota, reduzindo chamadas desnecessárias ao Nominatim; requisições de geocodificação/roteamento têm limite de tempo.
- Layout adaptado para desktop, tablet e celular.

## Dados públicos utilizados

- Endereço identificado para o Centro Automotivo Vitória: Rua Doze de Maio, 493, Vila Galvão, Guarulhos – SP, CEP 07056-120.
- WhatsApp: (11) 99554-3736.
- Telefone: (11) 2485-5370.
- Instagram: https://www.instagram.com/automotivovitoria/

A nota e o número de avaliações do Google podem mudar; o link para o perfil permite consultar os dados atuais diretamente na plataforma.

## Serviços externos e atribuições

- Leaflet para o mapa interativo.
- OpenStreetMap para dados cartográficos e tiles (atribuição visível no mapa).
- Nominatim para localizar o endereço no mapa.
- OSRM para calcular a rota e a estimativa de duração/distância.
- Google Maps para abrir a navegação externa e consultar avaliações.
- Google Fonts para tipografia.

O cálculo de rota depende de conexão à internet, disponibilidade dos serviços externos e permissão de geolocalização do visitante. O tempo calculado por OSRM é uma estimativa e não incorpora necessariamente trânsito ao vivo; o Google Maps é oferecido para navegação e condições de trânsito.

## Publicação

Projeto estático em HTML, CSS e JavaScript, sem etapa de build. A publicação de produção está configurada na Vercel.


## Limites conhecidos e ativação pós-venda

- O formulário de atendimento não envia sozinho: ele abre o WhatsApp com a mensagem preenchida, que a pessoa revisa e envia.
- O assistente é um FAQ local, não um chatbot conectado a IA ou a um sistema de atendimento.
- Não há cadastro persistente para newsletter, campanhas automatizadas de e-mail/WhatsApp, lista de supressão ou fluxo de descadastro ativo. Esses recursos exigem um backend e um provedor de mensagens configurado com credenciais próprias e consentimento explícito por canal; não foram simulados no frontend.
- Os horários de funcionamento não foram confirmados e, por isso, o site orienta o visitante a consultar a oficina.
- As imagens principais são ilustrações CSS originais. Não foram usadas fotos não verificadas do Google ou Instagram.
- Antes de comercializar/publicar como site definitivo: confirmar autorização do estabelecimento para conteúdo e marca; validar fotos, horários, endereço e avaliações; configurar domínio do cliente; revisar o aviso de privacidade; testar visualmente em navegadores reais; e, se campanhas forem contratadas, configurar opt-in separado, double opt-in quando aplicável, descadastro e suppression list.

## Checklist pós-venda

1. Confirmar titularidade/autorização e dados comerciais.
2. Conectar domínio final e HTTPS.
3. Remover noindex somente quando a página estiver pronta para indexação.
4. Atualizar canonical, Open Graph URL/imagem, robots.txt e sitemap.xml.
5. Testar WhatsApp, telefone, menu mobile, assistente, mapa, geolocalização, Google Maps, Waze e compartilhamento em dispositivos reais.
6. Configurar e testar qualquer provedor de e-mail/WhatsApp antes de coletar assinantes.
