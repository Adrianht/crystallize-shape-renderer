import Image from "@crystallize/react-image";

const simpleArticleRenderer = ({ catalogue }) => {
  const headerImage = catalogue.mainImage?.content?.images[0].variants[5];
  const mainParagraphs = catalogue.mainText?.content?.paragraphs
  console.log(catalogue)

  return (
    <article>
      <h1>{catalogue.title.content.text}</h1>
      <Image src={headerImage.url} width={headerImage.width} height={headerImage.height} />
      <div>
        {mainParagraphs.map(({title, body}, index) => {
          return (
            <div key={index}>
              <h2>{title?.text}</h2>
              <div>{body.json[0]?.children[0]?.textContent}</div>
            </div>
          );
        })}
      </div>
    </article>
  )
}

export default simpleArticleRenderer;