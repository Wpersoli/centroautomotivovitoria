# Centro Automotivo Vitória

Landing page responsiva do Centro Automotivo Vitória, com identidade azul-marinho, vermelho e branco.

## Funcionalidades

- Hero com frases rotativas, efeitos de entrada e ilustração automotiva animada em CSS.
- Seções de serviços, apresentação da oficina, avaliações, contato e redes sociais.
- Atalhos de WhatsApp e telefone, links do Instagram e CTAs distribuídos ao longo da página.
- Barra fixa inferior no mobile com WhatsApp e Como chegar.
- Navegação mobile com menu expansível.
- Animações acionadas por scroll com IntersectionObserver e respeito a `prefers-reduced-motion`.
- Mapa interativo com OpenStreetMap/Leaflet.
- Cálculo de rota de carro na página: pede permissão para acessar a localização, consulta o serviço de roteamento OSRM e mostra geometria do trajeto, distância e tempo estimado. O visitante também pode abrir o Google Maps para navegação passo a passo e condições de trânsito.
- Seção de reputação com nota encontrada para o perfil local (4,6/5, 12 avaliações no momento da consulta) e link para conferir as avaliações originais no Google.
- Metadados de SEO (canonical, robots, Open Graph básico e dados estruturados `AutoRepair` com endereço, telefone e Instagram).
- `robots.txt` e `sitemap.xml` para facilitar a descoberta da página pelos buscadores.
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
