import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function buscarFilmes() {
      const response = await fetch('https://ghibliapi.vercel.app/films');
      const dados = await response.json();
      setFilmes(dados);
    }
    buscarFilmes();
  }, [])

  return (
    <View>
      <Text>Lista de filmes!</Text>
      <FlatList
        data={filmes}
        renderItem={({item}) => {
          return(
          <View> 
            <Text>Nome: {item.title}</Text>
            <Text>Descrição: {item.description}</Text>
          </View>
          )
        }}
      />
    </View>
  );
}

