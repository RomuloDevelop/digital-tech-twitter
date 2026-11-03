import {createContext, useContext, ReactElement} from "react";
import { Post } from "../../store/post";

const PostItemContext = createContext<Post | undefined>(undefined);

const CounterProvider = ({ children, value }: {children: ReactElement, value: Post}) => {
  return (
    <PostItemContext.Provider value={value}>{children}</PostItemContext.Provider>
  )
}

const usePostItemContext = () => {
  const context = useContext(PostItemContext);
  if (context === undefined) {
    throw new Error("usePostItemContext must be used within a PostProvider");
  }
  return context;
}

export { CounterProvider, usePostItemContext };