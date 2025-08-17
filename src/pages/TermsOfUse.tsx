import {
  Box,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";

export default function TermsOfUse() {
  return (
    <Box bg="#1A240F" minH="100vh" py={10}>
      <Container
        maxW="container.lg"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
      >
        <Heading as="h1" size="xl" mb={6} color="green.700">
          Termos de Uso
        </Heading>

        <Text mb={4}>
          Bem-vindo ao Kianda. Ao acessar ou utilizar nossos serviços, você
          concorda com os seguintes termos:
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          1. Aceitação dos Termos
        </Heading>
        <Text mb={4}>
          Ao utilizar este site, você declara que leu, compreendeu e concorda
          com todos os termos aqui descritos. Caso não concorde, solicitamos que
          não utilize os serviços oferecidos.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          2. Cadastro de Usuário
        </Heading>
        <Text mb={4}>
          Para acessar determinados serviços, é necessário criar uma conta
          fornecendo informações pessoais, tais como:
        </Text>
        <UnorderedList mb={4}>
          <ListItem>Nome completo</ListItem>
          <ListItem>E-mail</ListItem>
          <ListItem>Telefone</ListItem>
          <ListItem>
            Dados de identificação necessários para utilização do serviço
          </ListItem>
        </UnorderedList>
        <Text mb={4}>
          O usuário se compromete a fornecer informações verdadeiras, completas
          e atualizadas.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          3. Uso dos Serviços
        </Heading>
        <Text mb={4}>
          O usuário concorda em utilizar o site de forma responsável,
          respeitando as leis vigentes e os direitos de terceiros. É proibido:
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            Utilizar informações do site de forma ilegal ou não autorizada;
          </ListItem>
          <ListItem>
            Praticar qualquer atividade que possa comprometer a segurança ou
            funcionamento do site;
          </ListItem>
          <ListItem>Compartilhar dados de login com terceiros.</ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          4. Privacidade e Proteção de Dados
        </Heading>
        <Text mb={4}>
          Os dados pessoais dos usuários/pacientes serão tratados conforme nossa{" "}
          <strong>Política de Privacidade</strong>, respeitando:
        </Text>
        <UnorderedList mb={4}>
          <ListItem>LGPD (Lei nº 13.709/2018)</ListItem>
          <ListItem>Resolução CFP nº 007/2003</ListItem>
        </UnorderedList>
        <Text mb={4}>
          Todos os dados são mantidos em sigilo, não sendo compartilhados com
          outros usuários, empresas de marketing ou terceiros, e armazenados
          pelo prazo mínimo de 5 anos.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          5. Responsabilidades do Usuário
        </Heading>
        <Text mb={4}>O usuário é responsável por:</Text>
        <UnorderedList mb={4}>
          <ListItem>Manter a confidencialidade de sua conta e senha;</ListItem>
          <ListItem>Todas as atividades realizadas em sua conta;</ListItem>
          <ListItem>
            Notificar imediatamente sobre qualquer uso não autorizado da sua
            conta ou violação de segurança.
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          6. Direitos do Site
        </Heading>
        <Text mb={4}>O site reserva-se o direito de:</Text>
        <UnorderedList mb={4}>
          <ListItem>
            Modificar ou atualizar os Termos de Uso a qualquer momento;
          </ListItem>
          <ListItem>
            Suspender ou encerrar contas que violem os termos aqui descritos;
          </ListItem>
          <ListItem>
            Interromper temporária ou permanentemente o acesso ao site, por
            razões técnicas ou legais.
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          7. Limitação de Responsabilidade
        </Heading>
        <Text mb={4}>O site não se responsabiliza por:</Text>
        <UnorderedList mb={4}>
          <ListItem>
            Danose indiretos, incidentais ou consequentes decorrentes do uso ou
            impossibilidade de uso dos serviços;
          </ListItem>
          <ListItem>Informações incorretas fornecidas pelo usuário;</ListItem>
          <ListItem>
            Acesso não autorizado à conta do usuário, quando decorrente de
            negligência na guarda das credenciais.
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          8. Alterações nos Termos
        </Heading>
        <Text mb={4}>
          Os Termos de Uso poderão ser alterados a qualquer momento, mediante
          publicação de nova versão no site. É responsabilidade do usuário
          revisar periodicamente os termos.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          9. Contato
        </Heading>
        <Text>
          Em caso de dúvidas sobre os Termos de Uso ou sobre nossos serviços,
          entre em contato pelo e-mail:{" "}
          <Link color="blue.600" href="mailto:contato@kiandadiversidade.com">
            contato@kiandadiversidade.com
          </Link>
        </Text>
      </Container>
    </Box>
  );
}
