import { simplyFetchFromGraph } from "lib/graphql";

// Fine tune the query in the playground: https://api.crystallize.com/<your-tenant-identifier>/catalogue
// Fetching a grid from our Voyage example directly by ID, change the ID your grid or fetch it from a folder with gridrelation, its up to you.
const query = `
  {
  }
`;

// export async function getStaticProps() {
//   const data = await simplyFetchFromGraph(query);

//   return { props: { data }, revalidate: 1 };
// }

export default function Home(props) {
  return (
    <div>
      hei
    </div>
  );
}
