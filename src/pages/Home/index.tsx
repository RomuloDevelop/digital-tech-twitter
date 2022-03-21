import Header from '../../components/MainHeader'
import PostItem from '../../components/PostItem'
import PostForm from '../../components/PostForm';
import { connect, useSelector } from 'react-redux';
import { PostUser, selectPosts } from '../../store/post/selects';
import { RootState } from '../../store';
import { selectSearch } from '../../store/search/selects';
import './Home.scss'
import UserTag from '../../components/UserTag';

const Home = ({posts}: {posts: PostUser[]}) => {
  let search = useSelector(selectSearch)

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

const mapping = (state: RootState) => ({
  posts: selectPosts(state),
});


export default connect(mapping)(Home);