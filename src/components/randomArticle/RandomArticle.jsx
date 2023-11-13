import '@/components/randomArticle/randomArticle.css'
import ResumeArticles from '../ResumeArticles'
import Button from '../button/Button'

export default async function randomArticle({articles}) {
    const randomArticle = articles[Math.floor(Math.random() * articles.length)]

    const dateObj = new Date(randomArticle.date);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
    const words = randomArticle.content.split(' ');
    const readTime = Math.floor(words.length / 200)

    return (
        <div className="randomArticle-container">
                <div className="randomArticle-title">{randomArticle.title}</div>
                <ResumeArticles article={randomArticle} className='randomArticle-content'/>
                <div className='randomArticle-infos'>
                    <div className="randomArticle-readTime">&#x2022; {readTime} min de lécture</div>
                    <div className="randomArticle-date">{formattedDate}</div>
                </div>
                

                <Button link={`/articles/${randomArticle._id}`} content="Lire l'article" />
        </div>
    )
}