export const typeDefs = `#graphql 
    # Game type, !fields are required, add #graphql for syntax highlighting
    type Game{ 
        id: ID!
        title: String!
        platform: [String!]!
        #===
        reviews: [Review!]
    }
    type Review{
        id: ID!
        rating: Int!
        content: String!
        #===
        game: Game!
        author: Author!
    }
    type Author{
        id: ID!
        name: String!
        verified: Boolean!
        #===
        reviews: [Review!]
    }
    # necessary for every schema
    type Query{
        # list
        reviews: [Review]
        games: [Game]
        authors: [Author]
        # single
        review(id: ID!): Review
        game(id: ID!): Game
        author(id: ID!): Author
    }
    # mutation for creating, updating, deleting
    type Mutation{
        deleteGame(id: ID!): [Game]
        addGame(game: AddGameInput!): Game
        updateGame(id: ID!, edits: EditGameInput!): Game
    }
    input AddGameInput{
        title: String!,
        platform: [String!]!
    }
    input EditGameInput{
        title: String,
        platform: [String!]
    }
`