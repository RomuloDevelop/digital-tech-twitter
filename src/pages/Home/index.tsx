import Header from '../../components/MainHeader'
import PostItem from '../../components/PostItem'
import PostForm from '../../components/PostForm';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../store/post/selects';
import { selectSearch } from '../../store/search/selects';
import './Home.scss'
import UserTag from '../../components/UserTag';

const Home = () => {
  const posts = useSelector(selectPosts)
  const search = useSelector(selectSearch)

  return (
    <>
      <Header></Header>
      <div className='home sm:p-8 p-0 gap-5'>
        <div className='px-2 md:p-0 flex flex-col items-center'>
          <PostForm />
          <div className='w-full sm:hidden' style={{maxWidth: 600}}>
            {
              search &&
              <span className='text-gray-500 block mt-6 text-left'>Buscando por: {search}</span>
            }
          </div>
          {
            posts.length ?
            posts.map((post, i) => (
              <PostItem key={i} {...post}/>
              )) :
              <div className='sm:text-xl text-lg mt-8'>
                <span>No hay publicaciónes disponibles en tu muro</span>
              </div>
          }
        </div>
        <div className='justify-center'>
          <UserTag />
        </div>
      </div>
    </>
  )
}


export default Home;