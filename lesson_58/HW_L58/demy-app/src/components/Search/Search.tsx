import {FC} from "react";
import searchStyles from "./_search.module.scss";
import mediaSearchStyles from "./_media-search.module.scss"

export const Search: FC = () => {
  const combinedStyles = `${searchStyles.searchInput} ${mediaSearchStyles.searchInput}`;
  return (
    <form className={combinedStyles} action="">
      <input type="search" placeholder="Search..."/>
    </form>
  );
};