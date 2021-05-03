import { simplyFetchFromGraph } from "lib/graphql";
import Image from "@crystallize/react-image";

export async function getStaticProps(){
  const path = `/info-sider`;

  const response = await simplyFetchFromGraph({
    query: `
    query GET_FOLDER($path: String!){
      catalogue(path: $path, language: "en") {
        children {
          id
          path
          name
          teaserImage: component(id:"main-image") {
            content{
              ...imageContent
            }
          }
          teaser: component(id: "teaser-text") {
            id
            name
            content {
              ... on RichTextContent {
                plainText
              }
            }
          }
        }
      }
    }
    fragment imageContent on ImageContent {
      images {
        url
        altText
        variants {
          url
          width
          height
        }
      }
    }
    `,
    variables: {
      path,
    }
  })

  if(!response.data.catalogue){
    return {
      notFound: true
    };
  }

  return {
    props: {
      response: response?.data
    }
  }
}



const InfoSider = ({ response }) => {

  const c = response.catalogue.children;
  return (
    <div>
      <h1>Info sider</h1>
      <div>
        {c.map(({name, path, teaser, teaserImage}, index) => {
          const teasImg = teaserImage?.content?.images?.[0].variants?.[3];
          return (
            <div key={index}>
              <h2>{name}</h2>
              <Image src={teasImg.url} width={teasImg.width} height={teasImg.height}/>
              <a href={path}>
                {teaser?.content?.plainText?.[0]}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default InfoSider;