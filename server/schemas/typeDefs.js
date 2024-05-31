const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    lastUpdate: String
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Pixel {
    _id: ID
    pixelColor: String!
    placementUser: String!
    coordinates: [Int]!
    updatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
    pixels: [Pixel]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addPixel(pixelId: ID!, pixelColor: String!, placementUser: String!, coordinates: [Int]!): Pixel
    updatePixel(pixelId: ID!, pixelColor: String!, placementUser: String!, coordinates: [Int]!): Pixel
  }
`;

module.exports = typeDefs;
