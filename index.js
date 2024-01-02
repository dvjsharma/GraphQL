import { ApolloServer } from "@apollo/server"; //our server apollo config
import { startStandaloneServer } from "@apollo/server/standalone"; //event listner
import { typeDefs } from "./schema.js";
import { games as gameData, authors as authorData, reviews as reviewData } from "./database.js";


const resolvers = {
    Query: {
        games() {
            return gameData
        },
        reviews() {
            return reviewData
        },
        authors() {
            return authorData
        },
        review (parent,args,context,info) {
            return reviewData.find(review => review.id === args.id)
        },
        author (parent,args,context,info) {
            return authorData.find(review => author.id === args.id)
        },
        game (parent,args,context,info) {
            return gameData.find(review => game.id === args.id)
        }
    },
    Game: {
        reviews(parent){
            return reviewData.filter(review => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return reviewData.filter(review => review.author_id === parent.id)
        }
    },
    Review: {
        author(parent){
            return authorData.find(author => author.id === parent.author_id)
        },
        game(parent){
            return gameData.find(game => game.id === parent.game_id)
        }
    },
    Mutation:{
        deleteGame(parent,args,context,info){
            gameData = gameData.filter(game => game.id !== args.id)
            return gameData
        },
        addGame(parent,args,context,info){
            let game ={
                ...gameData,
                id: gameData.length + 1,
            }
            gameData.push(game)
            return game
        },
        updateGame(parent,args,context,info){
            gameData = gameData.map(game => {
                if(game.id === args.id){
                    return {
                        ...game,
                        ...args.edits
                    }
                }else{
                    return game
                }
            })
            return game
        }
    }
}


const server = new ApolloServer({
    // typeDefs: our schema | Modal
    typeDefs,
    // resolvers: our response | Controllers
    resolvers

})

const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 }
})
console.log("Server is up and burning at: ", url)