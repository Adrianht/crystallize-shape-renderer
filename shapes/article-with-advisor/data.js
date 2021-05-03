import { simplyFetchFromGraph } from "../../lib/graphql";

export function getData({ path }) {
  return simplyFetchFromGraph({
    query: `
      query getAdvisorArticle($path: String!) {
        catalogue(path: $path, language: "en") {
          name
          title: component(id: "title") {
            content {
              ... on SingleLineContent {
                text
              }
            }
          }
          mainImage: component(id:"main-image") {
            content{
              ...imageContent  
            }
          }
          teaser: component(id: "teaser-text") {
            content {
              ... on SingleLineContent {
                text
              }
            }
          }
          breadText: component(id: "bread-text") {
            content {
              ... on RichTextContent {
                plainText
              }
            }
          }
          mainText: component(id: "main-text") {
            content {
              ... on ParagraphCollectionContent {
                paragraphs {
                  title {
                    text
                  }
                  body {
                    json
                  }
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
              }
            }
          }
          radgiver: component(id: "radgiver") {
            content {
              ... on ContentChunkContent {
                chunks {
                  name
                  content {
                    ...singleLineContent
                    ...imageContent
                    ... on RichTextContent {
                      plainText
                    }
                  }
                }
              }
            }
          }
          secondParagraph: component(id: "second-paragraph") {
            content {
              ... on ParagraphCollectionContent {
                paragraphs {
                  title {
                    text
                  }
                  body {
                    json
                  }
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
              }
            }
          }
        }
      }
      ${imageContentFragment}
      ${singleLineContentFragment}
    `,
    variables: {
      path,
    },
  });
}

const singleLineContentFragment = `
  fragment singleLineContent on SingleLineContent {
    text
  }
`;

const imageContentFragment = `
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
`;