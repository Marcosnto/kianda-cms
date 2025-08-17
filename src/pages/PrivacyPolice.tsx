import {
  Box,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";

export default function PrivacyPolicy() {
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
          Política de Privacidade
        </Heading>

        <Text mb={4}>
          Esta Política de Privacidade descreve como coletamos, utilizamos,
          armazenamos e protegemos os dados pessoais dos usuários/pacientes
          cadastrados em nosso site, em conformidade com a{" "}
          <strong>
            Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)
          </strong>
          , demais legislações aplicáveis e a{" "}
          <strong>Resolução CFP nº 007/2003</strong>.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          1. Coleta de Dados
        </Heading>
        <Text mb={4}>
          Ao realizar o cadastro em nosso site, poderão ser solicitadas
          informações pessoais, tais como:
        </Text>
        <UnorderedList mb={4}>
          <ListItem>Nome completo</ListItem>
          <ListItem>Endereço de e-mail</ListItem>
          <ListItem>Telefone de contato</ListItem>
          <ListItem>
            Informações de identificação necessárias para utilização dos
            serviços oferecidos
          </ListItem>
        </UnorderedList>
        <Text mb={4}>
          Esses dados são coletados de forma transparente e com o consentimento
          do usuário/paciente.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          2. Finalidade do Uso dos Dados
        </Heading>
        <Text mb={4}>Os dados coletados têm como finalidade:</Text>
        <UnorderedList mb={4}>
          <ListItem>
            Viabilizar o acesso e utilização dos serviços oferecidos no site;
          </ListItem>
          <ListItem>Manter comunicação com os usuários/pacientes;</ListItem>
          <ListItem>Cumprir com obrigações legais e regulatórias.</ListItem>
        </UnorderedList>
        <Text mb={4}>
          Não utilizamos os dados para fins de marketing ou publicidade.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          3. Armazenamento e Prazo de Retenção
        </Heading>
        <Text mb={4}>
          Em conformidade com a <strong>Resolução CFP nº 007/2003</strong>, os
          dados dos usuários/pacientes serão armazenados pelo prazo mínimo de{" "}
          <strong>05 (cinco) anos</strong>, contados a partir do registro, em
          ambiente seguro e protegido contra acessos não autorizados.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          4. Compartilhamento de Dados
        </Heading>
        <Text mb={4}>
          Os dados dos usuários/pacientes{" "}
          <strong>não serão compartilhados</strong> com outros usuários do site,
          empresas de marketing, publicidade ou quaisquer terceiros para fins
          comerciais. As informações serão mantidas em{" "}
          <strong>total sigilo</strong>, acessíveis somente a profissionais
          autorizados e quando estritamente necessário.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          5. Direitos dos Usuários (LGPD)
        </Heading>
        <Text mb={4}>
          Em conformidade com a <strong>LGPD</strong>, o usuário/paciente tem
          direito a:
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            Confirmar a existência de tratamento de seus dados pessoais;
          </ListItem>
          <ListItem>Solicitar acesso aos seus dados;</ListItem>
          <ListItem>
            Corrigir dados incompletos, inexatos ou desatualizados;
          </ListItem>
          <ListItem>
            Solicitar a eliminação de dados pessoais tratados com base em
            consentimento, respeitado o prazo legal mínimo de guarda (05 anos);
          </ListItem>
          <ListItem>
            Solicitar a portabilidade de seus dados, conforme regulamentação da
            ANPD;
          </ListItem>
          <ListItem>
            Revogar o consentimento a qualquer momento, quando aplicável.
          </ListItem>
        </UnorderedList>
        <Text mb={4}>
          As solicitações podem ser feitas através do canal de contato indicado
          nesta Política.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          6. Segurança da Informação
        </Heading>
        <Text mb={4}>
          Adotamos medidas técnicas e administrativas adequadas para proteger os
          dados pessoais contra acessos não autorizados, destruição, perda,
          alteração, comunicação ou qualquer forma de tratamento inadequado ou
          ilícito.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          7. Alterações nesta Política
        </Heading>
        <Text mb={4}>
          Esta Política de Privacidade poderá ser atualizada periodicamente para
          refletir melhorias nos processos de tratamento de dados, bem como
          adequações legais e regulatórias. Recomendamos a revisão periódica
          desta página.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2} color="green.700">
          8. Contato
        </Heading>
        <Text>
          Em caso de dúvidas, solicitações ou exercício de direitos previstos
          nesta Política, o usuário/paciente poderá entrar em contato pelo
          e-mail:{" "}
          <Link color="green.600" href="mailto:contato@kiandadiversidade.com">
            contato@kiandadiversidade.com
          </Link>
        </Text>
      </Container>
    </Box>
  );
}
