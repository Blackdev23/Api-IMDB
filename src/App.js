import React, { useState } from 'react'; // Importa as funções essenciais do React
import axios from 'axios'; // Importa o Axios para fazer as requisições HTTP
import Select from 'react-select'; // Importa o componente Select para dropdowns estilizados
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import * as C from '@chakra-ui/react'


// Componente principal da busca
const ComponenteDeBusca = () => {
  const [tipoDeBusca, definirTipoDeBusca] = useState('movie'); // Define o tipo de busca (Filme por padrão)
  const [conteudo, nomeConteudo] = useState(''); // Define o termo de busca inserido pelo usuário
  const [conteudos, buscarConteudos] = useState([]); // Armazena os resultados da busca

  // Opções do dropdown de seleção
  const opcoesDeBusca = [
    { value: 'movie', label: 'Filme' },
    { value: 'series', label: 'Série' },
  ];

  // Função que é chamada quando o usuário clica no botão de busca
  const Buscar = async () => {
    try {
      // Faz a requisição à API usando Axios
      const busca = await axios.get(`https://www.omdbapi.com/?apikey=3344f8b6&type=${tipoDeBusca}&s=${conteudo}&lang=pt-BR`);
      
      // Atualiza os resultados com os dados retornados
      buscarConteudos(busca.data.Search || []);
      console.log(conteudos)
    } catch (erro) {
      console.error('Erro ao buscar dados:', erro); // Loga qualquer erro encontrado
    }
  };

  return (
    <C.Stack>
      <C.Heading textAlign='center'>Busca Filmes e Series</C.Heading>
      <Select
        options={opcoesDeBusca} // Define as opções do dropdown
        onChange={(opcao) => definirTipoDeBusca(opcao.value)} // Atualiza o tipo de busca selecionado
      />
      <C.Input
        marginTop={6}
        textAlign='center'

        type="text"
        value={conteudo} // Define o valor atual do campo de texto
        onChange={(e) => nomeConteudo(e.target.value)} // Atualiza o termo de busca inserido
        placeholder="Digite sua pesquisa..." // Placeholder do campo de texto
      />
      <C.Button marginTop={5} colorScheme='green' onClick={Buscar}>Buscar</C.Button>
      <div>
        {/* Mapeia e exibe os resultados */}
        {conteudos.map((conteudo, indice) => (
          <Center key={indice}>
            <Center py={12}>
            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg='gray.800'
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${conteudo.Poster})`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src={conteudo.Poster}
                  alt="#"
                />
              </Box>
              <Stack pt={10} align={'center'}>
                <Heading fontSize={'2xl'} fontFamily={'body'} color='white' fontWeight={500}>
                  {conteudo.Title}
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} color='white' fontSize={'xl'}>
                    {conteudo.Year}
                  </Text>
                </Stack>
              </Stack>
            </Box>
            </Center>
          </Center>
        ))}
      </div>
    </C.Stack>
  );
};

export default ComponenteDeBusca; // Exporta o componente para uso no App.js
