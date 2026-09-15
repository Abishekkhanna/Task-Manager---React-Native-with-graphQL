const typeDef = `#graphql
  enum TaskStatus {
    TODO
    IN_PROGRESS
    COMPLETED
  }

  type User {
    id: Int!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Task {
    id: Int!
    title: String!
    description: String
    status: TaskStatus!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  type Query {
    health: String!
    userByEmail(email: String!): User
    me: User!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
    ): User!

    login(
      email: String!
      password: String!
    ): AuthPayload!

    createTask(
      title: String!
      description: String
      status: TaskStatus
    ): Task!
  }
`;

export default typeDef;