const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    lastUpdate: String
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
    placementUser: String
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
    comments(username: String): [Comment]
    comment(commentId: ID!): Comment
    me: User
    pixels: [Pixel]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(commentText: String!): Comment
    removeComment(commentId: ID!): Comment
    addPixel(pixelId: ID!, pixelColor: String!, placementUser: String!, coordinates: [Int]!): Pixel
    updatePixel(pixelId: ID!, pixelColor: String!, placementUser: String!): Auth
  }
`;

module.exports = typeDefs;
