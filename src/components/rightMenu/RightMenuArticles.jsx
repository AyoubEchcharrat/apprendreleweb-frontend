import GetAllTags from '@/components/getAllTags/GetAllTags'
import RandomArticle from '@/components/randomArticle/RandomArticle'
import './rightMenu.css'

export default function RightMenuArticles({articles}) {

    return (
        <div className='sticky'>
          <p className='title_rightMenu'>Table des <span style={{color:'#6d6dec'}}>tags</span></p>
          <GetAllTags/>
            <p className='title_rightMenu'>Article populaire</p>
            <RandomArticle articles={articles}/>
        </div>
    )
}