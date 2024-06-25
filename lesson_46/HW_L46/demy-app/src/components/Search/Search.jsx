import searchStyles from "./_search.module.scss";
import mediaSearchStyles from "./_media-search.module.scss"

export function Search() {
  return (
    <form className={searchStyles.searchInput} action="">
      <input className={mediaSearchStyles.searchInput} type="search" placeholder="Search..."/>
    </form>
  );
}