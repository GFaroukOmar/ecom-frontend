import {Heading} from "../../components/in-components-reuseable-components/TypographyComponents";
import GoToLinkUnderlined from "../../components/in-components-reuseable-components/GoToLinkUnderlined";

import ArticleCard from "../../components/in-pages-reuseable-components/ArticleCard";

const Articles = () => {
  return(
      <div className={'container d-flex flex-column gap-3'} style={{marginTop: '48px',}}>
          <div className={'d-flex justify-content-between'}>
              <Heading className={'LittleBald'} level={4}>Articles</Heading>
              <div className={'align-self-center'}><GoToLinkUnderlined link={`/products`}>More Articles</GoToLinkUnderlined></div>
          </div>
          <div className={'d-flex gap-3 flex-column flex-lg-row justify-content-center align-items-center'}>
              <ArticleCard title={'7 Ways to decore your home'} image={'/images/home-page/article1.jpg'}></ArticleCard>
              <ArticleCard title={'7 Ways to decore your home'} image={'/images/home-page/article2.jpg'}></ArticleCard>
              <ArticleCard title={'7 Ways to decore your home'} image={'/images/home-page/article3.jpg'}></ArticleCard>
          </div>
      </div>
  )
}
export default Articles