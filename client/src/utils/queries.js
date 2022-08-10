import { gql } from '@apollo/client';

//TODO: add pageCount and published date to savedBooks
export const QUERY_ME = gql`
{
    me {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            image
            description
            title
            link
            pageCount
            publishedDate
        }
    }
}
`;