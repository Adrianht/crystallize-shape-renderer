import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { simplyFetchFromGraph } from "lib/graphql";

const AdvisorArticle = dynamic(() => import("../../shapes/article-with-advisor/renderer"));
const SimpleArticle = dynamic(() => import("../../shapes/simple-article/renderer"))
export async function getStaticProps({params}) {
  const path = `/info-sider/${params.slug}`;

  const response = await simplyFetchFromGraph({
    query: `
      {
        catalogue(path: "${path}", language:"en"){
          shape {
            identifier
          }
        }
      }
    `
  });
  
  if(!response.data.catalogue){
    return {
      notFound: true
    };
  }

  let dataGetter;
  const shapeIdentifier = response.data?.catalogue?.shape?.identifier;

  switch (shapeIdentifier) {
    case "artikkel-med-radgiver":
      dataGetter = await import("../../shapes/article-with-advisor/data");
      break;
    case "simple-article":
      dataGetter = await import("../../shapes/simple-article/data");
    default:
      break;
  }

  const data = await dataGetter.getData({ path });
  return {
    props: {
      data: data?.data,
      shapeIdentifier
    },
    revalidate: 1,
  };
}

export async function getStaticPaths(){
  const response = await simplyFetchFromGraph({
    query: `
      {
        catalogue(path: "/info-sider", language: "en"){
          children {
            path
          }
        }
      }
    `,
  });

  return {
    paths: response.data.catalogue.children.map((c) => c.path),
    fallback: true
  }
}

const Main = ({ data, shapeIdentifier }) => {
  const router = useRouter();

  if(router.isFallback){
    return <div>..loading</div>
  }

  if(shapeIdentifier === "artikkel-med-radgiver"){
    return <AdvisorArticle {...data} />
  } else if(shapeIdentifier === "simple-article"){
    return <SimpleArticle {...data} />
  }

  return <div>???</div>;
}

export default Main;