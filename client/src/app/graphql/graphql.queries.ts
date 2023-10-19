import {gql} from 'apollo-angular'

const CONFIRM = gql`
    query Query {
        confirm
    }
`

const AUTH = gql`
    mutation Mutation {
        auth 
    }
`

export {CONFIRM,  AUTH}