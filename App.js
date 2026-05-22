import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView } from "react-native";

export default function App() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const response = await fetch("https://ghibliapi.vercel.app/films");
        const dados = await response.json();
        setFilmes(dados);
      } catch (error) {
        console.log("Erro ao buscar filmes:", error);
      }
    }
    buscarFilmes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Matt Ghibli!</Text>
      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => {
          return (
            <View style={styles.cartao}>
              <Text style={styles.nomeFilme}>Nome: {item.title}</Text>
              <Image 
                source={{ uri: item.movie_banner }}  
                style={styles.imagem}
                resizeMode="cover"
              />
              <Text style={styles.descricao}>{item.description || 'Sinopse não encontrada'}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    
  },
  lista: {
    paddingHorizontal: 16,
  },
  cartao: {
    marginBottom: 25,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
  },
  nomeFilme: {
    fontSize: 18,
    fontWeight: "600",
  },
  imagem: {
    width: "100%",  
    height: 200,    
    marginVertical: 12,
    borderRadius: 10,
    backgroundColor: '#ddd'
  },
  descricao: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  }
});
