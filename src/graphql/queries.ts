import {gql} from '@apollo/client';

export const GET_LAUNCHES_QUERY = gql`
  query LaunchesPast($filter: LaunchFind, $limit: Int, $offset: Int) {
    launchesPast(limit: $limit, find: $filter, offset: $offset) {
      id
      mission_name
      details
      launch_date_local
      launch_site {
        site_name
      }
      links {
        article_link
      }
      rocket {
        rocket_name
        rocket_type
      }
      ships {
        name
        image
      }
    }
  }
`;
