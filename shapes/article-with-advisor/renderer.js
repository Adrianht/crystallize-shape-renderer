import Image from "@crystallize/react-image";

const articleWithAdvisorRenderer = ({ catalogue }) => {
  const headerImage = catalogue.mainImage?.content?.images[0].variants[5];
  const mainParagraphs = catalogue.mainText?.content?.paragraphs
  const advisor = catalogue.radgiver?.content?.chunks[0]
  const advisorImage = advisor[1].content.images[0].variants[5]
  const secondParagraph = catalogue.secondParagraph?.content?.paragraphs

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
      <div>
        <h2>{advisor[0].content.text}</h2>
        <Image src={advisorImage.url} width={advisorImage.width} height={advisorImage.height}/>
        <p>{advisor[2].content.plainText[0]}</p>
      </div>
      <div>
      {secondParagraph.map(({title, body, images}, index) => {
          return (
            <div key={index}>
              <h2>{title?.text}</h2>
              <div>{body.json[0]?.children[0]?.textContent}</div>
              <Image {...images?.[0]} sizes="500px" />
            </div>
          );
        })}
      </div>
    </article>
  )
}

export default articleWithAdvisorRenderer;